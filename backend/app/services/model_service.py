"""Model loading and inference service.

Handles loading scikit-learn classifiers from disk and running predictions.
Models are loaded once at startup via FastAPI lifespan and stored in app.state.
"""

from pathlib import Path
from typing import Any

import joblib
import numpy as np

MODEL_DIR = Path(__file__).parent.parent / "ai" / "models"

NUM_HANDS = 2
NUM_LANDMARKS = 21
NUM_COORDS = 3
FEATURE_SIZE = NUM_HANDS * NUM_LANDMARKS * NUM_COORDS  # 126


def load_models() -> dict[str, Any]:
    """Load SIBI and BISINDO models from disk.

    Loads whichever models are available and warns about missing ones.
    Does not raise — callers receive an empty dict entry for missing models.

    Returns:
        Dict mapping mode name (lowercase) to loaded classifier.
        Missing model files are omitted from the dict with a printed warning.
    """
    models: dict[str, Any] = {}
    for mode in ("sibi", "bisindo"):
        model_path = MODEL_DIR / f"{mode}_model.joblib"
        if not model_path.exists():
            print(
                f"[WARNING] Model not found: {model_path}. "
                f"Run: python scripts/train_model.py --mode {mode}"
            )
            continue
        models[mode] = joblib.load(model_path)
        print(f"[OK] Loaded {mode} model from {model_path}")
    return models


def predict(features: list[float], model: Any) -> tuple[str, float]:
    """Run inference and return (label, confidence).

    Args:
        features: Flat list of 126 floats (2 hands × 21 landmarks × 3 coords).
        model: A fitted scikit-learn classifier with predict_proba support.

    Returns:
        Tuple of (predicted_label, confidence_score).
    """
    arr = np.array(features, dtype=np.float32).reshape(1, -1)
    label: str = str(model.predict(arr)[0])
    proba: np.ndarray = model.predict_proba(arr)[0]
    confidence = float(proba.max())
    return label, confidence
