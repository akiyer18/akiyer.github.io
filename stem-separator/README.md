# 🎵 Audio Stem Separation API

A FastAPI-based service for separating audio stems using Spleeter, designed for deployment on Render and integration with GitHub Pages.

## 🚀 Features

- **Multiple Stem Models**: Support for 2, 4, and 5-stem separation using Spleeter
- **File Upload & Processing**: Handle audio files up to 100MB with validation
- **Temporary Storage**: Efficient file management with automatic cleanup
- **REST API**: Clean, documented endpoints with OpenAPI/Swagger support
- **CORS Support**: Pre-configured for GitHub Pages integration
- **Health Monitoring**: System resource monitoring and health checks
- **Background Jobs**: Asynchronous processing with job status tracking
- **Auto Cleanup**: Scheduled cleanup of old files and completed jobs

## 📁 Project Structure

```
stem-separator/
├── main.py                 # FastAPI application
├── requirements.txt        # Python dependencies
├── .render.yaml           # Render deployment configuration
├── config.py              # Application configuration
├── README.md              # This file
└── utils/
    └── stem_processor.py  # Spleeter integration & file management
```

## 🛠️ Setup & Installation

### Local Development

1. **Clone and navigate to the stem-separator directory**:
   ```bash
   cd stem-separator
   ```

2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

5. **Access the API**:
   - API Documentation: http://localhost:8000/docs
   - Health Check: http://localhost:8000/health
   - Root Endpoint: http://localhost:8000/

### Render Deployment

1. **Connect your GitHub repository to Render**
2. **Create a new Web Service**
3. **Configure the service**:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port 10000`
   - **Environment**: Python 3.9+
   - **Plan**: Free (sufficient for basic usage)

4. **Set environment variables** (optional):
   ```
   MAX_FILE_SIZE_MB=100
   CLEANUP_INTERVAL_HOURS=2
   TEMP_DIR_MAX_SIZE_GB=1
   ```

## 📡 API Endpoints

### Core Endpoints

#### `POST /separate`
Separate audio stems from an uploaded file.

**Request**:
```bash
curl -X POST "https://your-render-url.onrender.com/separate" \
  -F "file=@audio.mp3" \
  -F "model=2stems-16kHz"
```

**Response**:
```json
{
  "job_id": "abc123ef",
  "status": "completed",
  "stems": {
    "vocals": "/download/abc123ef/vocals",
    "accompaniment": "/download/abc123ef/accompaniment"
  },
  "processing_time_seconds": 45.2,
  "file_sizes": {
    "vocals": 5242880,
    "accompaniment": 4718592
  },
  "message": "Successfully separated 2 stems"
}
```

#### `GET /download/{job_id}/{stem_name}`
Download a separated stem file.

**Example**:
```bash
curl -O "https://your-render-url.onrender.com/download/abc123ef/vocals"
```

#### `GET /status/{job_id}`
Get the status of a separation job.

**Response**:
```json
{
  "job_id": "abc123ef",
  "status": "completed",
  "completed_at": "2024-12-19T15:30:45",
  "processing_time": 45.2,
  "stems": ["vocals", "accompaniment"]
}
```

#### `GET /health`
Health check endpoint for monitoring.

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2024-12-19T15:30:45",
  "system_stats": {
    "memory_used_percent": 65.4,
    "memory_available_gb": 1.2,
    "disk_used_percent": 23.1,
    "disk_free_gb": 0.8,
    "cpu_percent": 15.3
  },
  "active_jobs": 0
}
```

### Available Spleeter Models

- **`2stems-16kHz`**: Separates vocals and accompaniment
- **`4stems-16kHz`**: Separates vocals, drums, bass, and other
- **`5stems-16kHz`**: Separates vocals, drums, bass, piano, and other

### Supported Audio Formats

- MP3 (.mp3)
- WAV (.wav)
- FLAC (.flac)
- M4A (.m4a)
- AAC (.aac)
- OGG (.ogg)

## 🎯 GitHub Pages Integration

### Frontend JavaScript Example

```javascript
async function separateAudio(audioFile) {
    const formData = new FormData();
    formData.append('file', audioFile);
    formData.append('model', '2stems-16kHz');
    
    try {
        const response = await fetch('https://your-render-url.onrender.com/separate', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.status === 'completed') {
            // Create download links
            Object.entries(result.stems).forEach(([stemName, downloadUrl]) => {
                const fullUrl = `https://your-render-url.onrender.com${downloadUrl}`;
                createDownloadLink(stemName, fullUrl);
            });
        }
    } catch (error) {
        console.error('Separation failed:', error);
    }
}

function createDownloadLink(stemName, downloadUrl) {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${stemName}.wav`;
    link.textContent = `Download ${stemName}`;
    document.body.appendChild(link);
}
```

### HTML Upload Form

```html
<form id="upload-form">
    <input type="file" id="audio-file" accept="audio/*" required>
    <select id="model-select">
        <option value="2stems-16kHz">2 Stems (Vocals + Accompaniment)</option>
        <option value="4stems-16kHz">4 Stems (Vocals, Drums, Bass, Other)</option>
        <option value="5stems-16kHz">5 Stems (Vocals, Drums, Bass, Piano, Other)</option>
    </select>
    <button type="submit">Separate Audio</button>
</form>

<div id="results"></div>

<script>
document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('audio-file');
    const modelSelect = document.getElementById('model-select');
    
    if (fileInput.files[0]) {
        await separateAudio(fileInput.files[0], modelSelect.value);
    }
});
</script>
```

## 🔧 Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `MAX_FILE_SIZE_MB` | 100 | Maximum upload file size in MB |
| `MAX_AUDIO_DURATION_SECONDS` | 600 | Maximum audio duration (10 minutes) |
| `CLEANUP_INTERVAL_HOURS` | 2 | How often to clean up old files |
| `TEMP_DIR_MAX_SIZE_GB` | 1 | Maximum temporary storage size |
| `DEFAULT_MODEL` | 2stems-16kHz | Default Spleeter model |

### Performance Tuning

For better performance on Render's free tier:

1. **Conservative Limits**: Keep file sizes under 50MB for faster processing
2. **Model Selection**: Use `2stems-16kHz` for fastest processing
3. **Cleanup**: Enable aggressive cleanup to manage disk space
4. **Monitoring**: Use the `/health` endpoint to monitor resource usage

## 📊 Monitoring & Logs

### Health Monitoring

The `/health` endpoint provides system statistics:
- Memory usage and availability
- Disk usage and free space
- CPU utilization
- Active job count

### Logging

The application uses structured logging with loguru:
- Request/response logging
- Processing time tracking
- Error reporting
- Cleanup operations

## 🛡️ Best Practices

### Security

- **File Validation**: Strict validation of file types and sizes
- **CORS Configuration**: Limited to specific origins
- **Input Sanitization**: Proper handling of user inputs
- **Error Handling**: No sensitive information in error responses

### Performance

- **Async Processing**: Non-blocking file processing
- **Resource Management**: Automatic cleanup and memory monitoring
- **Concurrent Limits**: Controlled number of simultaneous jobs
- **Efficient Storage**: Temporary files with automatic cleanup

### Error Handling

- **Graceful Failures**: Proper error responses with helpful messages
- **Resource Cleanup**: Automatic cleanup on errors
- **Timeout Handling**: Prevents long-running jobs from blocking
- **Logging**: Comprehensive error tracking

## 🚨 Limitations

### Render Free Tier

- **CPU**: Limited processing power
- **Memory**: 512MB RAM limit
- **Disk**: 1GB storage limit
- **Timeout**: 15-minute request timeout
- **Sleep**: Service sleeps after 15 minutes of inactivity

### Audio Processing

- **File Size**: 100MB maximum
- **Duration**: 10 minutes maximum
- **Formats**: Limited to common audio formats
- **Quality**: Processing quality depends on input file

## 🆘 Troubleshooting

### Common Issues

1. **Large File Uploads**: Reduce file size or duration
2. **Memory Errors**: Use smaller models or reduce concurrent jobs
3. **Timeout Errors**: Process shorter audio files
4. **Service Sleep**: First request after sleep takes longer

### Debug Mode

Set `ENVIRONMENT=development` for verbose logging:
```bash
export ENVIRONMENT=development
uvicorn main:app --reload
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check the API documentation at `/docs`
- Monitor system health at `/health`

---

**Ready to separate some stems?** 🎵 Upload your audio and let the magic happen! 