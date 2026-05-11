"""Extract hand landmarks from a folder of labeled images using MediaPipe.

Uses the MediaPipe Tasks API (mediapipe >= 0.10).
Downloads the hand landmark model automatically on first run (~24 MB).

Expected input folder structure:
    <input_dir>/
        <label_name>/
            image1.jpg
            image2.png
            ...

For SIBI/BISINDO alphabets, label names are typically single letters: A, B, C...

Output CSV format:
    - 126 feature columns (f0..f125): 2 hands x 21 landmarks x (x, y, z)
      Already normalized relative to each hand's wrist.
      Second hand columns are 0.0 when only one hand is detected.
    - 1 label column

Usage:
    python scripts/extract_landmarks.py --input data/bisindo_images --output data/bisindo_landmarks.csv
    python scripts/extract_landmarks.py --input data/sibi_images --output data/sibi_landmarks.csv

Then train:
    python scripts/train_model.py --mode bisindo --dataset data/bisindo_landmarks.csv
"""

import argparse
import csv
import urllib.request
from pathlib import Path

import cv2
import mediapipe as mp
from mediapipe.tasks import python as mp_python
from mediapipe.tasks.python import vision as mp_vision

# --- Constants ---

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".webp"}

NUM_LANDMARKS = 21
NUM_COORDS = 3
HAND_FEATURE_SIZE = NUM_LANDMARKS * NUM_COORDS  # 63 per hand
TOTAL_FEATURE_SIZE = HAND_FEATURE_SIZE * 2      # 126 total

FEATURE_COLS = [f"f{i}" for i in range(TOTAL_FEATURE_SIZE)]
CSV_HEADERS = FEATURE_COLS + ["label"]

# MediaPipe hand landmark model (Tasks API)
MODEL_URL = (
    "https://storage.googleapis.com/mediapipe-models/"
    "hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task"
)
MODEL_PATH = Path(__file__).parent / "hand_landmarker.task"


# --- Model setup ---

def ensure_model() -> Path:
    """Download the hand landmark .task model if not already present."""
    if not MODEL_PATH.exists():
        print(f"Downloading hand landmark model (~24 MB) to: {MODEL_PATH}")
        print("This only happens once.")
        urllib.request.urlretrieve(MODEL_URL, MODEL_PATH)
        print("Download complete.\n")
    return MODEL_PATH


def create_landmarker(confidence: float = 0.5) -> mp_vision.HandLandmarker:
    """Create a HandLandmarker configured for static image processing.

    Args:
        confidence: Detection/presence confidence threshold (0.0-1.0).
            Lower values detect more hands at the cost of more false positives.
            Default 0.1 is suitable for diverse dataset images.
    """
    model_path = ensure_model()
    base_options = mp_python.BaseOptions(model_asset_path=str(model_path))
    options = mp_vision.HandLandmarkerOptions(
        base_options=base_options,
        num_hands=2,
        min_hand_detection_confidence=confidence,
        min_hand_presence_confidence=confidence,
        min_tracking_confidence=confidence,
        running_mode=mp_vision.RunningMode.IMAGE,
    )
    return mp_vision.HandLandmarker.create_from_options(options)


# --- Feature extraction ---

def normalize_hand(hand: list) -> list[float]:
    """Normalize 21 landmarks relative to the wrist (landmark 0).

    Args:
        hand: List of 21 NormalizedLandmark objects (x, y, z attributes).

    Returns:
        Flat list of 63 floats, wrist-centered.
    """
    wrist = hand[0]
    features: list[float] = []
    for lm in hand:
        features.append(lm.x - wrist.x)
        features.append(lm.y - wrist.y)
        features.append(lm.z - wrist.z)
    return features


def extract_from_image(
    image_path: Path,
    landmarker: mp_vision.HandLandmarker,
) -> list[float] | None:
    """Run MediaPipe HandLandmarker on one image, return a 126-float feature vector.

    Args:
        image_path: Path to the image file.
        landmarker: Initialized HandLandmarker (RunningMode.IMAGE).

    Returns:
        126-float feature vector, or None if no hand was detected.
    """
    image_bgr = cv2.imread(str(image_path))
    if image_bgr is None:
        print(f"  [SKIP] Could not read: {image_path.name}")
        return None

    image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=image_rgb)

    result = landmarker.detect(mp_image)

    if not result.hand_landmarks:
        return None

    features: list[float] = []

    # Process up to 2 hands; zero-pad the second if only 1 detected
    for i in range(2):
        if i < len(result.hand_landmarks):
            features.extend(normalize_hand(result.hand_landmarks[i]))
        else:
            features.extend([0.0] * HAND_FEATURE_SIZE)

    return features


# --- Dataset processing ---

def extract_dataset(input_dir: Path, output_csv: Path, confidence: float = 0.1) -> None:
    """Process all images in the input directory and write landmark CSV.

    Args:
        input_dir: Root folder with one subfolder per gesture label.
        output_csv: Path to write the output CSV file.
        confidence: Hand detection confidence threshold passed to MediaPipe.
    """
    label_dirs = sorted([d for d in input_dir.iterdir() if d.is_dir()])
    if not label_dirs:
        print(f"[ERROR] No label subfolders found in: {input_dir}")
        return

    print(f"\n{'='*50}")
    print(f"Input  : {input_dir}")
    print(f"Output : {output_csv}")
    print(f"Labels : {[d.name for d in label_dirs]}")
    print(f"{'='*50}\n")

    output_csv.parent.mkdir(parents=True, exist_ok=True)

    total_written = 0
    total_skipped = 0

    print(f"Detection confidence threshold : {confidence}")
    with create_landmarker(confidence) as landmarker:
        with open(output_csv, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(CSV_HEADERS)

            for label_dir in label_dirs:
                label = label_dir.name
                image_paths = [
                    p for p in label_dir.iterdir()
                    if p.suffix.lower() in IMAGE_EXTENSIONS
                ]

                written = 0
                skipped = 0

                for img_path in image_paths:
                    features = extract_from_image(img_path, landmarker)
                    if features is not None:
                        writer.writerow(features + [label])
                        written += 1
                    else:
                        skipped += 1

                print(
                    f"  [{label:>15}]  "
                    f"written: {written:>4}  |  "
                    f"skipped (no hand): {skipped:>4}  |  "
                    f"total: {len(image_paths):>4}"
                )
                total_written += written
                total_skipped += skipped

    print(f"\n{'='*50}")
    print(f"Done.")
    print(f"  Rows written : {total_written}")
    print(f"  Skipped (no hand detected) : {total_skipped}")
    print(f"  Output saved to: {output_csv}")

    if total_written == 0:
        print("\n[WARNING] No landmarks extracted. Check:")
        print("  - Images contain clearly visible hands")
        print("  - Folder structure is correct (<label>/<images>)")
        print("  - Try lowering min_hand_detection_confidence in the script")


# --- Entry point ---

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Extract MediaPipe hand landmarks from labeled image folders."
    )
    parser.add_argument(
        "--input",
        required=True,
        help="Root folder with one subfolder per gesture label.",
    )
    parser.add_argument(
        "--output",
        required=True,
        help="Path to write the output CSV file.",
    )
    parser.add_argument(
        "--confidence",
        type=float,
        default=0.1,
        help=(
            "Hand detection confidence threshold (0.0-1.0). "
            "Lower values detect more hands. Default: 0.1"
        ),
    )
    args = parser.parse_args()

    input_dir = Path(args.input)
    output_csv = Path(args.output)

    if not input_dir.exists() or not input_dir.is_dir():
        print(f"[ERROR] Input directory not found: {input_dir}")
        return

    extract_dataset(input_dir, output_csv, confidence=args.confidence)


if __name__ == "__main__":
    main()
