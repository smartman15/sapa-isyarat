# docker-expert: Dockerfile placed at repo root so Render finds it without
# any dashboard configuration. COPY paths reference backend/ subdirectory
# since build context is the repo root.
FROM python:3.13-slim

# Security: non-root user (docker-expert guideline)
RUN addgroup --system appgroup && adduser --system --group appuser

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Copy requirements first to leverage Docker layer cache
COPY backend/requirements.txt .

# opencv-python-headless avoids needing libgl1 system libs on slim image
RUN pip install --no-cache-dir -r requirements.txt

# Copy only the backend source — frontend is excluded entirely
COPY backend/ .

# Give the non-root user ownership
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 8000

# Render injects $PORT at runtime
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
