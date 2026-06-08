# docker-expert: Dockerfile placed at repo root so Render finds it without
# any dashboard configuration. COPY paths reference backend/ subdirectory
# since build context is the repo root.
FROM python:3.13-slim

# Security: non-root user (docker-expert guideline)
RUN addgroup --system appgroup && adduser --system --group appuser

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Tell Whisper where to store model files.
# System users (--system) have no home dir (/nonexistent), so the default
# ~/.cache/whisper path fails with Permission denied. Using a path under
# /app (which appuser owns) solves this on both Render and local Docker.
ENV WHISPER_CACHE=/app/whisper_cache

# Install ffmpeg — required by Whisper to decode audio (webm, ogg, mp3)
RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first to leverage Docker layer cache
COPY backend/requirements.txt .

# opencv-python-headless avoids needing libgl1 system libs on slim image
RUN pip install --no-cache-dir -r requirements.txt

# Pre-download the Whisper base model into WHISPER_CACHE at build time.
# This avoids runtime downloads that time out on Render's free tier.
RUN python -c "import whisper; whisper.load_model('base', download_root='/app/whisper_cache')"

# Copy only the backend source — frontend is excluded entirely
COPY backend/ .

# Give appuser ownership of everything under /app (including the model cache)
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 8000

# Render injects $PORT at runtime
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
