# Base image optimized for Python
FROM python:3.13-slim

# Create a non-root user for security (docker-expert guideline)
RUN addgroup --system appgroup && adduser --system --group appuser

# Set working directory
WORKDIR /app

# Prevent Python from writing pyc files and keep stdout unbuffered
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Tell Whisper where to store model files.
# System users (--system) have no home dir (/nonexistent), so the default
# ~/.cache/whisper path fails with Permission denied at runtime.
# /app/whisper_cache is under WORKDIR and will be owned by appuser.
ENV WHISPER_CACHE=/app/whisper_cache

# Install ffmpeg — required by Whisper to decode audio files (webm, ogg, mp3)
RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first to leverage Docker cache
COPY requirements.txt .

# Install dependencies (opencv-python-headless avoids needing libgl1 system libraries)
RUN pip install --no-cache-dir -r requirements.txt

# Pre-download the Whisper base model into WHISPER_CACHE at build time.
# This avoids a cold-start download that times out on Render's free tier.
RUN python -c "import whisper; whisper.load_model('base', download_root='/app/whisper_cache')"

# Copy the rest of the application code
COPY . .

# Ensure the non-root user owns everything including the model cache
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

# Expose the port (Render passes the actual port via $PORT)
EXPOSE 8000

# Start FastAPI server using uvicorn, falling back to 8000 if PORT is not set
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
