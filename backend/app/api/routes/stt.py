"""Speech-to-Text route.

Endpoint
--------
POST /stt/transcribe
  - Accepts a multipart audio file upload
  - Returns a JSON transcription result
  - Uses the Whisper model loaded at startup (app.state.whisper)
"""

from fastapi import APIRouter, File, HTTPException, Request, UploadFile

from app.schemas.stt_schema import STTResponse
from app.services.stt_service import transcribe

router = APIRouter()

# Maximum accepted audio size: 25 MB
MAX_AUDIO_BYTES = 25 * 1024 * 1024


@router.post(
    "/transcribe",
    response_model=STTResponse,
    summary="Transcribe an audio clip to text",
    description=(
        "Accepts a short audio recording (webm, ogg, wav, mp3, mp4/m4a) "
        "and returns the Indonesian transcription produced by OpenAI Whisper."
    ),
)
async def transcribe_audio(
    request: Request,
    file: UploadFile = File(..., description="Audio file to transcribe"),
) -> STTResponse:
    """Transcribe speech from an uploaded audio file.

    Args:
        request: FastAPI request — used to access app.state.whisper.
        file:    Uploaded audio file (multipart/form-data).

    Returns:
        STTResponse with transcript, language, duration, and confidence.

    Raises:
        400: File is empty or exceeds the size limit.
        503: Whisper model is not loaded.
        500: Unexpected transcription error.
    """
    # --- Read audio bytes -------------------------------------------------
    audio_bytes = await file.read()

    if not audio_bytes:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    if len(audio_bytes) > MAX_AUDIO_BYTES:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Maximum allowed size is 25 MB.",
        )

    # --- Retrieve Whisper model from app state ----------------------------
    whisper_model = getattr(request.app.state, "whisper", None)

    if whisper_model is None:
        raise HTTPException(
            status_code=503,
            detail=(
                "Speech-to-Text model is not available. "
                "Install openai-whisper and restart the server."
            ),
        )

    # --- Transcribe -------------------------------------------------------
    content_type = file.content_type or "audio/webm"

    try:
        result = transcribe(
            audio_bytes=audio_bytes,
            content_type=content_type,
            model=whisper_model,
        )
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc))
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Transcription failed: {exc}",
        )

    return STTResponse(**result)
