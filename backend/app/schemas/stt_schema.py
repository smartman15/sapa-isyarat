from pydantic import BaseModel, Field


class STTResponse(BaseModel):
    """Response model for the Speech-to-Text transcription endpoint."""

    transcript: str = Field(
        description="The transcribed text from the uploaded audio."
    )
    language: str = Field(
        default="id",
        description="Detected language code (e.g. 'id' for Indonesian).",
    )
    duration_seconds: float = Field(
        description="Duration of the audio clip in seconds."
    )
    confidence: float = Field(
        description="Whisper's average log-probability mapped to 0-1 (1 = highest).",
        ge=0.0,
        le=1.0,
    )


class STTErrorResponse(BaseModel):
    """Returned when transcription fails (400 / 422 / 500)."""

    detail: str
