# Base image optimized for Python
FROM python:3.13-slim

# Create a non-root user for security (docker-expert guideline)
RUN addgroup --system appgroup && adduser --system --group appuser

# Set working directory
WORKDIR /app

# Prevent Python from writing pyc files and keep stdout unbuffered
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Copy requirements first to leverage Docker cache
COPY requirements.txt .

# Install dependencies (opencv-python-headless avoids needing libgl1 system libraries)
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Ensure the non-root user owns the files
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

# Expose the port (Render passes the actual port via $PORT)
EXPOSE 8000

# Start FastAPI server using uvicorn, falling back to 8000 if PORT is not set
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
