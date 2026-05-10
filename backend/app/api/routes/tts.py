from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["TTS"])

@router.post("/tts")
def generate_audio(data: dict):
    text = data.get("text")

    return {
        "message": "TTS generated",
        "text": text
    }