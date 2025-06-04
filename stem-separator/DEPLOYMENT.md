# 🚀 Deployment Guide for Render

This guide will walk you through deploying your Audio Stem Separation API to Render.

## 📋 Prerequisites

1. **GitHub Repository**: Push your `stem-separator/` directory to GitHub
2. **Render Account**: Sign up at [render.com](https://render.com) (free account)
3. **Testing**: Run `python test_api.py` locally to ensure everything works

## 🔄 Step-by-Step Deployment

### 1. Prepare Your Repository

Ensure your repository structure looks like this:
```
your-repo/
├── stem-separator/
│   ├── main.py
│   ├── requirements.txt
│   ├── .render.yaml
│   ├── config.py
│   ├── utils/
│   │   └── stem_processor.py
│   └── README.md
├── (other project files)
```

### 2. Connect to Render

1. **Login to Render**: Go to [dashboard.render.com](https://dashboard.render.com)
2. **Connect GitHub**: Click "New +" → "Web Service"
3. **Connect Repository**: Authorize Render to access your GitHub repository
4. **Select Repository**: Choose your repository from the list

### 3. Configure the Web Service

#### Basic Settings:
- **Name**: `audio-stem-separator` (or your preferred name)
- **Environment**: `Python 3`
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)
- **Root Directory**: `stem-separator`

#### Build & Deploy Settings:
- **Build Command**: 
  ```bash
  pip install -r requirements.txt
  ```
- **Start Command**: 
  ```bash
  uvicorn main:app --host 0.0.0.0 --port 10000
  ```

#### Plan:
- **Plan**: `Free` (sufficient for basic usage)
- **Instance Type**: `Standard` (free tier)

### 4. Environment Variables (Optional)

Add these environment variables in Render dashboard:

| Variable | Value | Description |
|----------|--------|-------------|
| `MAX_FILE_SIZE_MB` | `50` | Smaller for free tier |
| `CLEANUP_INTERVAL_HOURS` | `1` | More frequent cleanup |
| `ENVIRONMENT` | `production` | Production settings |
| `LOG_LEVEL` | `INFO` | Appropriate logging |

### 5. Deploy

1. **Review Settings**: Double-check all configuration
2. **Create Web Service**: Click "Create Web Service"
3. **Wait for Build**: First deployment takes 5-10 minutes
4. **Monitor Logs**: Watch the deploy logs for any errors

### 6. Test Your Deployment

Once deployed, you'll get a URL like: `https://your-service-name.onrender.com`

#### Quick Health Check:
```bash
curl https://your-service-name.onrender.com/health
```

#### Run Full Tests:
```bash
python test_api.py https://your-service-name.onrender.com
```

### 7. Update Your GitHub Pages

Update your frontend to use the new API URL:

```javascript
// Replace localhost with your Render URL
const API_BASE_URL = 'https://your-service-name.onrender.com';

async function separateAudio(audioFile) {
    const formData = new FormData();
    formData.append('file', audioFile);
    formData.append('model', '2stems-16kHz');
    
    const response = await fetch(`${API_BASE_URL}/separate`, {
        method: 'POST',
        body: formData
    });
    
    return await response.json();
}
```

## 🔧 Common Issues & Solutions

### 1. Build Failures

**Problem**: Dependencies fail to install
**Solution**: 
- Check `requirements.txt` for version conflicts
- Use specific versions: `tensorflow==2.13.0`
- Remove optional dependencies if needed

### 2. Memory Issues

**Problem**: Out of memory during processing
**Solution**:
- Reduce `MAX_FILE_SIZE_MB` to 25-50MB
- Use `2stems-16kHz` model only
- Set `MAX_CONCURRENT_JOBS=1`

### 3. Timeout Issues

**Problem**: Requests timeout after 30 seconds
**Solution**:
- Process shorter audio files
- Optimize audio before upload
- Use faster models

### 4. Service Sleep

**Problem**: First request after inactivity is slow
**Solution**:
- This is normal for free tier
- Consider paid plan for always-on service
- Add warming mechanism to your frontend

### 5. CORS Issues

**Problem**: Browser blocks requests from GitHub Pages
**Solution**:
- Verify CORS settings in `main.py`
- Add your GitHub Pages URL to allowed origins
- Check browser console for exact error

## 📊 Monitoring Your Service

### Health Monitoring
```bash
# Check service health
curl https://your-service-name.onrender.com/health

# View active jobs
curl https://your-service-name.onrender.com/jobs
```

### Render Dashboard
- **Logs**: View real-time application logs
- **Metrics**: Monitor CPU, memory, and disk usage
- **Events**: Track deployments and restarts

### Log Analysis
Look for these log patterns:
- ✅ `Stem separation API started` - Service started successfully
- ✅ `Job {id} completed successfully` - Processing working
- ❌ `Error during stem separation` - Processing issues
- ⚠️ `Cleaned up {n} old files` - Cleanup running

## 🚀 Optimization Tips

### For Free Tier:
1. **Aggressive Cleanup**: Clean files every hour
2. **Small Files**: Limit uploads to 25-50MB
3. **Simple Models**: Stick to 2-stem separation
4. **Efficient Processing**: Optimize audio before upload

### For Better Performance:
1. **Paid Plan**: Upgrade to paid plan for better resources
2. **Multiple Models**: Enable 4 and 5-stem models
3. **Larger Files**: Support up to 100MB files
4. **Persistent Storage**: Add persistent disk for model caching

## 🔄 Updates & Redeployment

### Automatic Deployment:
Render automatically redeploys when you push to your main branch.

### Manual Deployment:
1. Go to your service dashboard
2. Click "Manual Deploy" → "Deploy latest commit"

### Rollback:
1. Go to "Events" tab
2. Click "Rollback" on a previous successful deployment

## 📞 Support & Troubleshooting

### Check Service Status:
1. **Health Endpoint**: `GET /health`
2. **Render Logs**: Real-time logs in dashboard
3. **System Resources**: Monitor memory/disk usage

### Common Log Messages:
```
✅ "Spleeter initialized successfully" - AI model loaded
❌ "Health check failed" - Service having issues
⚠️ "File size exceeds limit" - User uploaded large file
📊 "Cleaned up X old files" - Automatic maintenance
```

### Getting Help:
- **Render Community**: [community.render.com](https://community.render.com)
- **API Documentation**: `https://your-service-name.onrender.com/docs`
- **GitHub Issues**: Create issues in your repository

## 🎉 Success!

Once deployed successfully, you'll have:
- ✅ Working API at `https://your-service-name.onrender.com`
- ✅ Automatic HTTPS and SSL certificates
- ✅ Health monitoring and logging
- ✅ Integration ready for your GitHub Pages site

Your users can now upload audio files and get separated stems! 🎵

---

**Next Steps**: Update your GitHub Pages frontend to use the deployed API URL and start separating some stems! 