import os
import asyncio
import tempfile
import mimetypes
from datetime import datetime, timedelta
from typing import Dict, List, Optional
from pathlib import Path

from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, BackgroundTasks, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from loguru import logger
import aiofiles

from utils.stem_processor import StemProcessor, get_processor

# Initialize FastAPI app
app = FastAPI(
    title="Audio Stem Separation API",
    description="FastAPI service for separating audio stems using Spleeter",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS for GitHub Pages integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://akiyer18.github.io",
        "http://localhost:3000",
        "http://localhost:8000",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:8000"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Pydantic models
class SeparationResponse(BaseModel):
    job_id: str
    status: str
    stems: Dict[str, str]
    processing_time_seconds: float
    file_sizes: Dict[str, int]
    message: str

class HealthResponse(BaseModel):
    status: str
    timestamp: str
    system_stats: Dict[str, float]
    active_jobs: int

class ErrorResponse(BaseModel):
    error: str
    details: str
    timestamp: str

# Global variables for job tracking
active_jobs: Dict[str, dict] = {}
completed_jobs: Dict[str, dict] = {}

# Configuration
MAX_FILE_SIZE = int(os.getenv("MAX_FILE_SIZE_MB", "100")) * 1024 * 1024  # Convert to bytes
SUPPORTED_FORMATS = {'.mp3', '.wav', '.flac', '.m4a', '.aac', '.ogg'}

def generate_job_id() -> str:
    """Generate a unique job ID."""
    import uuid
    return str(uuid.uuid4())[:8]

def validate_audio_file(file: UploadFile) -> tuple[bool, str]:
    """Validate uploaded audio file."""
    # Check file size
    if hasattr(file, 'size') and file.size and file.size > MAX_FILE_SIZE:
        return False, f"File size ({file.size / (1024*1024):.1f}MB) exceeds limit ({MAX_FILE_SIZE / (1024*1024)}MB)"
    
    # Check file extension
    if file.filename:
        file_ext = Path(file.filename).suffix.lower()
        if file_ext not in SUPPORTED_FORMATS:
            return False, f"Unsupported format {file_ext}. Supported: {', '.join(SUPPORTED_FORMATS)}"
    
    # Check content type
    if file.content_type and not file.content_type.startswith('audio/'):
        return False, f"Invalid content type: {file.content_type}"
    
    return True, ""

async def save_uploaded_file(file: UploadFile, temp_dir: str) -> str:
    """Save uploaded file to temporary directory."""
    file_path = os.path.join(temp_dir, file.filename or "uploaded_audio")
    
    async with aiofiles.open(file_path, 'wb') as f:
        content = await file.read()
        await f.write(content)
    
    return file_path

def cleanup_job(job_id: str):
    """Clean up job files and data."""
    if job_id in completed_jobs:
        job_data = completed_jobs[job_id]
        temp_dir = job_data.get('temp_dir')
        if temp_dir and os.path.exists(temp_dir):
            import shutil
            shutil.rmtree(temp_dir)
        del completed_jobs[job_id]
        logger.info(f"Cleaned up job {job_id}")

async def background_cleanup():
    """Background task to clean up old jobs."""
    while True:
        try:
            current_time = datetime.now()
            expired_jobs = []
            
            for job_id, job_data in completed_jobs.items():
                if current_time - job_data['completed_at'] > timedelta(hours=2):
                    expired_jobs.append(job_id)
            
            for job_id in expired_jobs:
                cleanup_job(job_id)
            
            if expired_jobs:
                logger.info(f"Cleaned up {len(expired_jobs)} expired jobs")
            
        except Exception as e:
            logger.error(f"Error in background cleanup: {str(e)}")
        
        await asyncio.sleep(3600)  # Run every hour

# Start background cleanup task
@app.on_event("startup")
async def startup_event():
    """Initialize background tasks."""
    asyncio.create_task(background_cleanup())
    logger.info("Stem separation API started")

@app.get("/health", response_model=HealthResponse)
async def health_check(processor: StemProcessor = Depends(get_processor)):
    """Health check endpoint for Render."""
    try:
        system_stats = processor.get_system_stats()
        return HealthResponse(
            status="healthy",
            timestamp=datetime.now().isoformat(),
            system_stats=system_stats,
            active_jobs=len(active_jobs)
        )
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        raise HTTPException(status_code=503, detail="Service unhealthy")

@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "Audio Stem Separation API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "separate": "/separate",
            "download": "/download/{job_id}/{stem_name}",
            "status": "/status/{job_id}",
            "docs": "/docs"
        }
    }

@app.post("/separate", response_model=SeparationResponse)
async def separate_audio(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    model: str = "2stems-16kHz",
    processor: StemProcessor = Depends(get_processor)
):
    """
    Separate audio stems from uploaded file.
    
    Args:
        file: Audio file to process
        model: Spleeter model to use ('2stems-16kHz', '4stems-16kHz', '5stems-16kHz')
    
    Returns:
        SeparationResponse with download links for separated stems
    """
    job_id = generate_job_id()
    
    try:
        # Mark job as active
        active_jobs[job_id] = {
            'status': 'processing',
            'started_at': datetime.now(),
            'filename': file.filename
        }
        
        logger.info(f"Starting separation job {job_id} for file: {file.filename}")
        
        # Validate file
        is_valid, error_msg = validate_audio_file(file)
        if not is_valid:
            raise HTTPException(status_code=400, detail=error_msg)
        
        # Create temporary directory
        temp_dir = processor.create_temp_directory()
        
        # Save uploaded file
        input_file_path = await save_uploaded_file(file, temp_dir)
        logger.info(f"Saved uploaded file to: {input_file_path}")
        
        # Set processor model if different
        if processor.model_name != model:
            processor.model_name = model
            processor.separator = None  # Force re-initialization
        
        # Process the audio
        start_time = datetime.now()
        stem_files = await processor.separate_stems(input_file_path)
        processing_time = (datetime.now() - start_time).total_seconds()
        
        # Calculate file sizes
        file_sizes = {}
        for stem_name, file_path in stem_files.items():
            file_sizes[stem_name] = os.path.getsize(file_path)
        
        # Create download URLs
        download_urls = {}
        for stem_name in stem_files.keys():
            download_urls[stem_name] = f"/download/{job_id}/{stem_name}"
        
        # Store job result
        completed_jobs[job_id] = {
            'status': 'completed',
            'completed_at': datetime.now(),
            'stem_files': stem_files,
            'temp_dir': temp_dir,
            'processing_time': processing_time,
            'file_sizes': file_sizes
        }
        
        # Remove from active jobs
        if job_id in active_jobs:
            del active_jobs[job_id]
        
        # Schedule cleanup
        background_tasks.add_task(cleanup_job, job_id)
        
        logger.info(f"Job {job_id} completed successfully in {processing_time:.2f}s")
        
        return SeparationResponse(
            job_id=job_id,
            status="completed",
            stems=download_urls,
            processing_time_seconds=processing_time,
            file_sizes=file_sizes,
            message=f"Successfully separated {len(stem_files)} stems"
        )
        
    except Exception as e:
        # Clean up on error
        if job_id in active_jobs:
            del active_jobs[job_id]
        
        error_msg = str(e)
        logger.error(f"Job {job_id} failed: {error_msg}")
        
        raise HTTPException(
            status_code=500,
            detail=f"Stem separation failed: {error_msg}"
        )

@app.get("/download/{job_id}/{stem_name}")
async def download_stem(job_id: str, stem_name: str):
    """Download a separated stem file."""
    if job_id not in completed_jobs:
        raise HTTPException(status_code=404, detail="Job not found or expired")
    
    job_data = completed_jobs[job_id]
    stem_files = job_data.get('stem_files', {})
    
    if stem_name not in stem_files:
        raise HTTPException(status_code=404, detail=f"Stem '{stem_name}' not found")
    
    file_path = stem_files[stem_name]
    
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File no longer available")
    
    # Determine MIME type
    mime_type, _ = mimetypes.guess_type(file_path)
    if not mime_type:
        mime_type = "audio/wav"
    
    filename = os.path.basename(file_path)
    
    return FileResponse(
        path=file_path,
        media_type=mime_type,
        filename=filename,
        headers={
            "Content-Disposition": f"attachment; filename={filename}",
            "Cache-Control": "no-cache"
        }
    )

@app.get("/status/{job_id}")
async def get_job_status(job_id: str):
    """Get status of a separation job."""
    if job_id in active_jobs:
        job_data = active_jobs[job_id]
        return {
            "job_id": job_id,
            "status": job_data['status'],
            "started_at": job_data['started_at'].isoformat(),
            "filename": job_data.get('filename')
        }
    
    if job_id in completed_jobs:
        job_data = completed_jobs[job_id]
        return {
            "job_id": job_id,
            "status": job_data['status'],
            "completed_at": job_data['completed_at'].isoformat(),
            "processing_time": job_data['processing_time'],
            "stems": list(job_data['stem_files'].keys())
        }
    
    raise HTTPException(status_code=404, detail="Job not found")

@app.get("/jobs")
async def list_jobs():
    """List all active and recent jobs."""
    return {
        "active_jobs": len(active_jobs),
        "completed_jobs": len(completed_jobs),
        "active": [
            {
                "job_id": job_id,
                "status": data['status'],
                "started_at": data['started_at'].isoformat(),
                "filename": data.get('filename')
            }
            for job_id, data in active_jobs.items()
        ],
        "recent_completed": [
            {
                "job_id": job_id,
                "status": data['status'],
                "completed_at": data['completed_at'].isoformat(),
                "processing_time": data['processing_time']
            }
            for job_id, data in list(completed_jobs.items())[-10:]  # Last 10 jobs
        ]
    }

@app.post("/cleanup")
async def manual_cleanup(processor: StemProcessor = Depends(get_processor)):
    """Manually trigger cleanup of old files."""
    try:
        await processor.cleanup_old_files(max_age_hours=1)
        
        # Also cleanup completed jobs older than 1 hour
        current_time = datetime.now()
        expired_jobs = [
            job_id for job_id, job_data in completed_jobs.items()
            if current_time - job_data['completed_at'] > timedelta(hours=1)
        ]
        
        for job_id in expired_jobs:
            cleanup_job(job_id)
        
        return {
            "message": "Cleanup completed",
            "expired_jobs_cleaned": len(expired_jobs),
            "remaining_jobs": len(completed_jobs)
        }
        
    except Exception as e:
        logger.error(f"Manual cleanup failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Cleanup failed: {str(e)}")

# Error handlers
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler."""
    logger.error(f"Unhandled exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content=ErrorResponse(
            error="Internal server error",
            details=str(exc),
            timestamp=datetime.now().isoformat()
        ).dict()
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=False,
        workers=1
    ) 