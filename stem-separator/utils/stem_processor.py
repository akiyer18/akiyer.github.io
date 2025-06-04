import os
import tempfile
import asyncio
import shutil
from typing import Dict, List, Optional, Tuple
from pathlib import Path
import librosa
import soundfile as sf
import numpy as np
from spleeter.separator import Separator
from loguru import logger
import psutil
import time

class StemProcessor:
    """
    Handles audio stem separation using Spleeter with optimized performance and cleanup.
    """
    
    def __init__(self, model_name: str = "2stems-16kHz"):
        """
        Initialize the stem processor.
        
        Args:
            model_name: Spleeter model to use ('2stems-16kHz', '4stems-16kHz', '5stems-16kHz')
        """
        self.model_name = model_name
        self.separator = None
        self.temp_dirs: List[str] = []
        self.max_file_size_mb = int(os.getenv("MAX_FILE_SIZE_MB", "100"))
        self.temp_dir_base = os.getenv("TEMP_DIR_BASE", "/tmp/audio_processing")
        
        # Create base temp directory
        os.makedirs(self.temp_dir_base, exist_ok=True)
        
    async def initialize_separator(self):
        """Lazy initialization of Spleeter separator."""
        if self.separator is None:
            logger.info(f"Initializing Spleeter with model: {self.model_name}")
            # Run in thread pool to avoid blocking
            loop = asyncio.get_event_loop()
            self.separator = await loop.run_in_executor(
                None, lambda: Separator(f'spleeter:{self.model_name}')
            )
            logger.info("Spleeter initialized successfully")
    
    def validate_audio_file(self, file_path: str) -> Tuple[bool, str]:
        """
        Validate uploaded audio file.
        
        Returns:
            Tuple of (is_valid, error_message)
        """
        try:
            # Check file size
            file_size_mb = os.path.getsize(file_path) / (1024 * 1024)
            if file_size_mb > self.max_file_size_mb:
                return False, f"File size ({file_size_mb:.1f}MB) exceeds limit ({self.max_file_size_mb}MB)"
            
            # Check if file can be loaded by librosa
            duration = librosa.get_duration(path=file_path)
            if duration > 600:  # 10 minutes limit
                return False, f"Audio duration ({duration:.1f}s) exceeds 600s limit"
                
            # Check sample rate and channels
            info = sf.info(file_path)
            if info.channels > 2:
                return False, f"Audio has {info.channels} channels, maximum 2 supported"
                
            return True, ""
            
        except Exception as e:
            return False, f"Invalid audio file: {str(e)}"
    
    def create_temp_directory(self) -> str:
        """Create a temporary directory for processing."""
        temp_dir = tempfile.mkdtemp(dir=self.temp_dir_base)
        self.temp_dirs.append(temp_dir)
        logger.info(f"Created temp directory: {temp_dir}")
        return temp_dir
    
    async def separate_stems(self, audio_file_path: str) -> Dict[str, str]:
        """
        Separate audio stems using Spleeter.
        
        Args:
            audio_file_path: Path to the input audio file
            
        Returns:
            Dictionary mapping stem names to file paths
        """
        await self.initialize_separator()
        
        # Validate input file
        is_valid, error_msg = self.validate_audio_file(audio_file_path)
        if not is_valid:
            raise ValueError(error_msg)
        
        # Create temporary directory for processing
        temp_dir = self.create_temp_directory()
        output_dir = os.path.join(temp_dir, "output")
        os.makedirs(output_dir, exist_ok=True)
        
        try:
            logger.info(f"Starting stem separation for: {audio_file_path}")
            start_time = time.time()
            
            # Load audio file
            waveform, sample_rate = librosa.load(audio_file_path, sr=None, mono=False)
            
            # Ensure stereo
            if waveform.ndim == 1:
                waveform = np.stack([waveform, waveform])
            elif waveform.shape[0] > 2:
                waveform = waveform[:2]  # Take first 2 channels
            
            # Run separation in thread pool
            loop = asyncio.get_event_loop()
            prediction = await loop.run_in_executor(
                None, 
                lambda: self.separator.separate(waveform.T)
            )
            
            # Save separated stems
            stem_files = {}
            input_filename = Path(audio_file_path).stem
            
            for stem_name, stem_audio in prediction.items():
                output_filename = f"{input_filename}_{stem_name}.wav"
                output_path = os.path.join(output_dir, output_filename)
                
                # Save as WAV file
                sf.write(output_path, stem_audio, sample_rate)
                stem_files[stem_name] = output_path
                
                logger.info(f"Saved stem: {stem_name} -> {output_path}")
            
            processing_time = time.time() - start_time
            logger.info(f"Stem separation completed in {processing_time:.2f}s")
            
            return stem_files
            
        except Exception as e:
            logger.error(f"Error during stem separation: {str(e)}")
            # Cleanup on error
            self.cleanup_temp_directory(temp_dir)
            raise
    
    def cleanup_temp_directory(self, temp_dir: str):
        """Clean up a specific temporary directory."""
        try:
            if os.path.exists(temp_dir):
                shutil.rmtree(temp_dir)
                if temp_dir in self.temp_dirs:
                    self.temp_dirs.remove(temp_dir)
                logger.info(f"Cleaned up temp directory: {temp_dir}")
        except Exception as e:
            logger.error(f"Error cleaning up {temp_dir}: {str(e)}")
    
    def cleanup_all_temp_directories(self):
        """Clean up all temporary directories created by this processor."""
        for temp_dir in self.temp_dirs.copy():
            self.cleanup_temp_directory(temp_dir)
    
    def get_system_stats(self) -> Dict[str, float]:
        """Get current system resource usage."""
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage(self.temp_dir_base)
        
        return {
            "memory_used_percent": memory.percent,
            "memory_available_gb": memory.available / (1024**3),
            "disk_used_percent": disk.percent,
            "disk_free_gb": disk.free / (1024**3),
            "cpu_percent": psutil.cpu_percent(interval=1)
        }
    
    async def cleanup_old_files(self, max_age_hours: int = 2):
        """Clean up old temporary files to prevent disk space issues."""
        current_time = time.time()
        cutoff_time = current_time - (max_age_hours * 3600)
        
        cleaned_count = 0
        try:
            for root, dirs, files in os.walk(self.temp_dir_base):
                for file_path in [os.path.join(root, f) for f in files]:
                    try:
                        if os.path.getmtime(file_path) < cutoff_time:
                            os.remove(file_path)
                            cleaned_count += 1
                    except (OSError, FileNotFoundError):
                        continue
                        
                # Remove empty directories
                for dir_path in [os.path.join(root, d) for d in dirs]:
                    try:
                        if os.path.getmtime(dir_path) < cutoff_time:
                            os.rmdir(dir_path)
                    except (OSError, FileNotFoundError):
                        continue
                        
            logger.info(f"Cleaned up {cleaned_count} old files")
            
        except Exception as e:
            logger.error(f"Error during cleanup: {str(e)}")

# Global processor instance
processor = StemProcessor()

async def get_processor() -> StemProcessor:
    """Dependency injection for FastAPI."""
    return processor 