from pydantic import BaseModel
from typing import Literal


class LandmarkPoint(BaseModel):
    x: float
    y: float
    z: float


class GesturePredictRequest(BaseModel):
    hands: list[list[LandmarkPoint]]  # 1–2 hands, each with 21 points
    mode: Literal["SIBI", "BISINDO"]


class GesturePredictResponse(BaseModel):
    label: str
    confidence: float
