from fastapi import APIRouter
from app.schemas.translate_schema import TranslateRequest, TranslateResponse
from app.services.gesture_service import translate_gesture

router = APIRouter()

@router.post("/", response_model=TranslateResponse)
def translate(req: TranslateRequest):
    result = translate_gesture(req.text)
    return {"result": result}