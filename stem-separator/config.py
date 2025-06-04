"""
Configuration module for the Stem Separation API.
"""
import os
from typing import List

class Settings:
    """Application settings and configuration."""
    
    # Server Configuration
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "10000"))
    
    # File Processing Limits
    MAX_FILE_SIZE_MB: int = int(os.getenv("MAX_FILE_SIZE_MB", "100"))
    MAX_AUDIO_DURATION_SECONDS: int = int(os.getenv("MAX_AUDIO_DURATION_SECONDS", "600"))
    
    # Temporary Storage
    TEMP_DIR_BASE: str = os.getenv("TEMP_DIR_BASE", "/tmp/audio_processing")
    CLEANUP_INTERVAL_HOURS: int = int(os.getenv("CLEANUP_INTERVAL_HOURS", "2"))
    TEMP_DIR_MAX_SIZE_GB: int = int(os.getenv("TEMP_DIR_MAX_SIZE_GB", "1"))
    
    # Spleeter Configuration
    DEFAULT_MODEL: str = os.getenv("DEFAULT_MODEL", "2stems-16kHz")
    MODELS_CACHE_DIR: str = os.getenv("MODELS_CACHE_DIR", "/tmp/spleeter_models")
    AVAILABLE_MODELS: List[str] = ["2stems-16kHz", "4stems-16kHz", "5stems-16kHz"]
    
    # Performance Settings
    MAX_CONCURRENT_JOBS: int = int(os.getenv("MAX_CONCURRENT_JOBS", "2"))
    WORKER_TIMEOUT_SECONDS: int = int(os.getenv("WORKER_TIMEOUT_SECONDS", "300"))
    
    # Logging
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    LOG_FILE: str = os.getenv("LOG_FILE", "/tmp/stem_separator.log")
    
    # Security
    ALLOWED_ORIGINS: List[str] = os.getenv(
        "ALLOWED_ORIGINS", 
        "https://akiyer18.github.io,http://localhost:3000,http://localhost:8000"
    ).split(",")
    
    # Supported audio formats
    SUPPORTED_FORMATS: List[str] = [".mp3", ".wav", ".flac", ".m4a", ".aac", ".ogg"]
    
    # API Configuration
    API_TITLE: str = "Audio Stem Separation API"
    API_VERSION: str = "1.0.0"
    API_DESCRIPTION: str = "FastAPI service for separating audio stems using Spleeter"
    
    # Health Check
    HEALTH_CHECK_INTERVAL: int = int(os.getenv("HEALTH_CHECK_INTERVAL", "30"))
    
    # Redis Configuration (for production scaling)
    REDIS_URL: str = os.getenv("REDIS_URL", "")
    CELERY_BROKER_URL: str = os.getenv("CELERY_BROKER_URL", "")
    
    @classmethod
    def create_directories(cls):
        """Create necessary directories on startup."""
        os.makedirs(cls.TEMP_DIR_BASE, exist_ok=True)
        os.makedirs(cls.MODELS_CACHE_DIR, exist_ok=True)

# Global settings instance
settings = Settings()

# Environment-specific configurations
class DevelopmentConfig(Settings):
    """Development environment configuration."""
    LOG_LEVEL = "DEBUG"
    MAX_FILE_SIZE_MB = 50
    
class ProductionConfig(Settings):
    """Production environment configuration."""
    LOG_LEVEL = "WARNING"
    MAX_CONCURRENT_JOBS = 1  # Conservative for free tier
    
class TestConfig(Settings):
    """Test environment configuration."""
    TEMP_DIR_BASE = "/tmp/test_audio_processing"
    MAX_FILE_SIZE_MB = 10
    MAX_AUDIO_DURATION_SECONDS = 60

def get_settings() -> Settings:
    """Get settings based on environment."""
    env = os.getenv("ENVIRONMENT", "production").lower()
    
    if env == "development":
        return DevelopmentConfig()
    elif env == "test":
        return TestConfig()
    else:
        return ProductionConfig() 