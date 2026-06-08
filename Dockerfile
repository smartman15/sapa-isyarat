# docker-expert: Dockerfile placed at repo root so Render finds it without
# any dashboard configuration. COPY paths reference backend/ subdirectory
# since build context is the repo root.
FROM python:3.13-slim

# Security: non-root user (docker-expert guideline)
RUN addgroup --system appgroup && adduser --system --group appuser

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install ffmpeg — required by Whisper to decode audio files (webm, ogg, mp3)
RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first to leverage Docker layer cache
COPY backend/requirements.txt .

# opencv-python-headless avoids needing libgl1 system libs on slim image
RUN pip install --no-cache-dir -r requirements.txt

# Pre-download the Whisper base model at build time so it is baked into the
# image. This avoids a cold-start download that times out on Render free tier.
# The model is cached in /root/.cache/whisper/ and made world-readable so the
# non-root appuser can access it at runtime.
RUN python -c "import whisper; whisper.load_model('base')" \
    && chmod -R a+rX /root/.cache/whisper

# Copy only the backend source — frontend is excluded entirely
COPY backend/ .

# Give the non-root user ownership of the app directory
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 8000

# Render injects $PORT at runtime
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
