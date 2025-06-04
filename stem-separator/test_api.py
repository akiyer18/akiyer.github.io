#!/usr/bin/env python3
"""
Test script for the Audio Stem Separation API.
Run this to validate your setup before deployment.
"""

import asyncio
import os
import tempfile
import requests
from pathlib import Path
import subprocess
import sys

# Configuration
API_BASE_URL = "http://localhost:8000"  # Change this for testing deployed version
TEST_AUDIO_DURATION = 5  # seconds
TEST_SAMPLE_RATE = 44100

def create_test_audio():
    """Create a simple test audio file using pure Python."""
    try:
        import numpy as np
        from scipy.io.wavfile import write
        
        # Generate a simple sine wave
        duration = TEST_AUDIO_DURATION
        sample_rate = TEST_SAMPLE_RATE
        frequency = 440  # A4 note
        
        t = np.linspace(0, duration, int(sample_rate * duration), False)
        # Create stereo audio with different frequencies for left/right
        left_channel = np.sin(frequency * 2 * np.pi * t)
        right_channel = np.sin(frequency * 1.5 * 2 * np.pi * t)
        
        # Combine to stereo
        stereo_audio = np.column_stack((left_channel, right_channel))
        
        # Convert to 16-bit PCM
        stereo_audio = (stereo_audio * 32767).astype(np.int16)
        
        # Save to temporary file
        temp_file = tempfile.NamedTemporaryFile(suffix='.wav', delete=False)
        write(temp_file.name, sample_rate, stereo_audio)
        
        return temp_file.name
        
    except ImportError:
        print("❌ Missing scipy or numpy. Install with: pip install scipy numpy")
        return None

def test_health_check():
    """Test the health check endpoint."""
    print("🏥 Testing health check...")
    try:
        response = requests.get(f"{API_BASE_URL}/health", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health check passed: {data['status']}")
            print(f"   Memory: {data['system_stats']['memory_used_percent']:.1f}%")
            print(f"   Disk: {data['system_stats']['disk_used_percent']:.1f}%")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {str(e)}")
        return False

def test_root_endpoint():
    """Test the root endpoint."""
    print("🌐 Testing root endpoint...")
    try:
        response = requests.get(f"{API_BASE_URL}/", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Root endpoint working: {data['message']}")
            return True
        else:
            print(f"❌ Root endpoint failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Root endpoint error: {str(e)}")
        return False

def test_audio_separation(audio_file_path):
    """Test audio separation functionality."""
    print("🎵 Testing audio separation...")
    
    if not audio_file_path or not os.path.exists(audio_file_path):
        print("❌ No test audio file available")
        return False
    
    try:
        # Upload file for separation
        with open(audio_file_path, 'rb') as f:
            files = {'file': ('test_audio.wav', f, 'audio/wav')}
            data = {'model': '2stems-16kHz'}
            
            print("   Uploading and processing audio...")
            response = requests.post(
                f"{API_BASE_URL}/separate", 
                files=files, 
                data=data, 
                timeout=120  # Allow more time for processing
            )
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Separation successful: {result['message']}")
            print(f"   Job ID: {result['job_id']}")
            print(f"   Processing time: {result['processing_time_seconds']:.2f}s")
            print(f"   Stems: {list(result['stems'].keys())}")
            
            # Test downloading a stem
            if result['stems']:
                stem_name = list(result['stems'].keys())[0]
                download_url = result['stems'][stem_name]
                
                print(f"   Testing download of '{stem_name}' stem...")
                download_response = requests.get(f"{API_BASE_URL}{download_url}", timeout=30)
                
                if download_response.status_code == 200:
                    print(f"✅ Download successful: {len(download_response.content)} bytes")
                    return True
                else:
                    print(f"❌ Download failed: {download_response.status_code}")
                    return False
            
            return True
            
        else:
            print(f"❌ Separation failed: {response.status_code}")
            if response.content:
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data.get('detail', 'Unknown error')}")
                except:
                    print(f"   Error: {response.text[:200]}")
            return False
            
    except Exception as e:
        print(f"❌ Separation test error: {str(e)}")
        return False

def test_job_status():
    """Test job status and listing endpoints."""
    print("📊 Testing job management endpoints...")
    try:
        # Test jobs listing
        response = requests.get(f"{API_BASE_URL}/jobs", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Jobs endpoint working: {data['active_jobs']} active, {data['completed_jobs']} completed")
            return True
        else:
            print(f"❌ Jobs endpoint failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Jobs endpoint error: {str(e)}")
        return False

def check_dependencies():
    """Check if required dependencies are installed."""
    print("📦 Checking dependencies...")
    
    required_packages = [
        'fastapi', 'uvicorn', 'spleeter', 'librosa', 
        'soundfile', 'numpy', 'loguru'
    ]
    
    missing = []
    for package in required_packages:
        try:
            __import__(package)
            print(f"   ✅ {package}")
        except ImportError:
            print(f"   ❌ {package} (missing)")
            missing.append(package)
    
    if missing:
        print(f"\n❌ Missing packages: {', '.join(missing)}")
        print("   Install with: pip install -r requirements.txt")
        return False
    
    print("✅ All dependencies installed")
    return True

def run_tests():
    """Run all tests."""
    print("🚀 Starting API tests...\n")
    
    # Check dependencies first
    if not check_dependencies():
        print("\n❌ Tests failed due to missing dependencies")
        return False
    
    # Create test audio file
    print("\n🎵 Creating test audio...")
    audio_file = create_test_audio()
    if audio_file:
        print(f"✅ Test audio created: {audio_file}")
    else:
        print("⚠️  No test audio created, will skip separation test")
    
    print(f"\n🌐 Testing API at {API_BASE_URL}")
    
    # Run tests
    tests = [
        ("Root Endpoint", test_root_endpoint),
        ("Health Check", test_health_check),
        ("Job Management", test_job_status),
    ]
    
    if audio_file:
        tests.append(("Audio Separation", lambda: test_audio_separation(audio_file)))
    
    passed = 0
    total = len(tests)
    
    print("\n" + "="*50)
    for test_name, test_func in tests:
        result = test_func()
        if result:
            passed += 1
        print()  # Add spacing between tests
    
    # Cleanup
    if audio_file and os.path.exists(audio_file):
        os.unlink(audio_file)
        print(f"🧹 Cleaned up test file: {audio_file}")
    
    # Summary
    print("="*50)
    print(f"📊 Test Results: {passed}/{total} passed")
    
    if passed == total:
        print("🎉 All tests passed! Your API is ready for deployment.")
        return True
    else:
        print("❌ Some tests failed. Check the output above for details.")
        return False

def main():
    """Main function."""
    if len(sys.argv) > 1:
        global API_BASE_URL
        API_BASE_URL = sys.argv[1]
        print(f"🌐 Testing API at: {API_BASE_URL}")
    
    success = run_tests()
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main() 