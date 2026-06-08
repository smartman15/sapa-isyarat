"""Speech-to-Text service using OpenAI Whisper.

Whisper is loaded once at startup (via FastAPI lifespan) and stored in
app.state, exactly like the gesture classifiers in model_service.py.

The transcribe() function accepts raw audio bytes, writes them to a
temp file, runs Whisper, cleans up, and returns a structured result.
"""

import tempfile
import os
from pathlib import Path
from typing import Any

# Whisper is imported lazily inside load_whisper_model() so that the rest
# of the app can still start if the package is not yet installed.

# Default model size — "small" gives better Indonesian accuracy locally.
# On Render, render.yaml overrides this to "base" to fit the free tier.
WHISPER_MODEL_SIZE = os.getenv("WHISPER_MODEL_SIZE", "small")

# Where Whisper stores/finds its model weights.
# Set to /app/whisper_cache in the Dockerfile so the non-root appuser
# (which has no home dir on Render) can read the pre-downloaded model.
# Locally this is unset and Whisper defaults to ~/.cache/whisper/.
WHISPER_CACHE = os.getenv("WHISPER_CACHE", None)

# Supported audio MIME types → file extensions for the temp file
MIME_TO_EXT: dict[str, str] = {
    "audio/webm":       ".webm",
    "audio/webm;codecs=opus": ".webm",
    "audio/ogg":        ".ogg",
    "audio/ogg;codecs=opus":  ".ogg",
    "audio/wav":        ".wav",
    "audio/mpeg":       ".mp3",
    "audio/mp4":        ".mp4",
    "audio/m4a":        ".m4a",
}


def load_whisper_model() -> Any | None:
    """Load the Whisper model.  Returns None (with a warning) if whisper is
    not installed, so the rest of the backend keeps running.

    Called once during FastAPI lifespan startup.
    """
    try:
        import whisper  # type: ignore
        model = whisper.load_model(WHISPER_MODEL_SIZE, download_root=WHISPER_CACHE)
        print(f"[OK] Whisper '{WHISPER_MODEL_SIZE}' model loaded.")
        return model
    except ImportError:
        print(
            "[WARNING] 'openai-whisper' is not installed. "
            "Run: pip install openai-whisper"
        )
        return None
    except Exception as exc:
        print(f"[WARNING] Failed to load Whisper model: {exc}")
        return None


def transcribe(
    audio_bytes: bytes,
    content_type: str,
    model: Any,
) -> dict[str, Any]:
    """Transcribe audio bytes using the preloaded Whisper model.

    Args:
        audio_bytes:  Raw bytes from the uploaded audio file.
        content_type: MIME type of the upload (e.g. "audio/webm").
        model:        Preloaded Whisper model from app.state.

    Returns:
        Dict with keys: transcript, language, duration_seconds, confidence.

    Raises:
        RuntimeError: If Whisper model is not available.
        ValueError:   If the content_type is not supported.
    """
    if model is None:
        raise RuntimeError(
            "Whisper model is not loaded. "
            "Install openai-whisper and restart the server."
        )

    # Normalise content_type (strip params like '; codecs=opus')
    mime_base = content_type.split(";")[0].strip().lower()
    ext = MIME_TO_EXT.get(mime_base) or MIME_TO_EXT.get(content_type.lower())
    if ext is None:
        # Fall back to .webm — ffmpeg inside Whisper handles most containers
        ext = ".webm"

    # Write to a temp file; Whisper requires a file path, not a stream
    tmp_path: Path | None = None
    try:
        with tempfile.NamedTemporaryFile(
            suffix=ext, delete=False
        ) as tmp:
            tmp.write(audio_bytes)
            tmp_path = Path(tmp.name)

        # Run Whisper inference
        # initial_prompt biases the model toward Indonesian vocabulary and
        # natural sentence structure, improving accuracy at no extra cost.
        INDONESIAN_PROMPT = (
            "Halo, selamat pagi, selamat siang, selamat malam. "
            "Terima kasih, sama-sama, maaf, permisi, tolong bantu saya. "
            "Saya tidak mengerti, bisa diulang? Di mana, kapan, bagaimana, mengapa. "
            "Ya, tidak, baik, oke, benar, salah. "
            "Saya mau pesan, berapa harganya, di mana toilet? "
            "Nama saya, saya dari Indonesia, senang bertemu dengan Anda."
        )
        result = model.transcribe(
            str(tmp_path),
            language="id",
            initial_prompt=INDONESIAN_PROMPT,
            fp16=False,       # fp16 causes errors on CPU-only environments
            verbose=False,
        )

        transcript: str = result.get("text", "").strip()
        language: str   = result.get("language", "id")

        # Duration: sum segment durations if available, else 0
        segments = result.get("segments", [])
        duration: float = (
            segments[-1]["end"] if segments else 0.0
        )

        # Confidence: average of segment avg_logprob, mapped to 0-1
        if segments:
            avg_logprob = sum(s["avg_logprob"] for s in segments) / len(segments)
            # avg_logprob is typically in [-1, 0]; clamp and invert
            confidence = float(max(0.0, min(1.0, 1.0 + avg_logprob)))
        else:
            confidence = 0.0

        return {
            "transcript":       transcript,
            "language":         language,
            "duration_seconds": round(duration, 2),
            "confidence":       round(confidence, 3),
        }

    finally:
        # Always clean up the temp file
        if tmp_path and tmp_path.exists():
            tmp_path.unlink()
