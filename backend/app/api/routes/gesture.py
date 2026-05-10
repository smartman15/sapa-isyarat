from fastapi import APIRouter, Request, HTTPException

from app.schemas.gesture_schema import (
    GesturePredictRequest,
    GesturePredictResponse,
)
from app.services.model_service import predict

router = APIRouter()

NUM_LANDMARKS = 21
NUM_COORDS = 3
HAND_FEATURE_SIZE = NUM_LANDMARKS * NUM_COORDS  # 63 per hand
TOTAL_FEATURE_SIZE = HAND_FEATURE_SIZE * 2  # 126 total


def _flatten_and_normalize(req: GesturePredictRequest) -> list[float]:
    """Flatten up to 2 hands into a normalized 126-float feature vector.

    Each hand's landmarks are normalized relative to that hand's wrist
    (landmark index 0) to make the prediction position-independent.
    Missing hands are zero-padded.
    """
    features: list[float] = []

    for hand_idx in range(2):
        if hand_idx < len(req.hands):
            hand = req.hands[hand_idx]
            wrist = hand[0]
            for point in hand:
                features.append(point.x - wrist.x)
                features.append(point.y - wrist.y)
                features.append(point.z - wrist.z)
        else:
            # Zero-pad for missing second hand
            features.extend([0.0] * HAND_FEATURE_SIZE)

    return features


@router.post("/predict", response_model=GesturePredictResponse)
async def predict_gesture(
    req: GesturePredictRequest,
    request: Request,
) -> GesturePredictResponse:
    """Predict the gesture label from hand landmarks.

    Accepts up to 2 hands of 21 landmarks each, normalizes them,
    and runs inference using the model for the selected mode.
    """
    models: dict = getattr(request.app.state, "models", {})

    mode_key = req.mode.lower()
    if mode_key not in models:
        raise HTTPException(
            status_code=503,
            detail=(
                f"Model for mode '{req.mode}' is not loaded. "
                "Run the training script first."
            ),
        )

    features = _flatten_and_normalize(req)
    label, confidence = predict(features, models[mode_key])

    return GesturePredictResponse(label=label, confidence=confidence)
