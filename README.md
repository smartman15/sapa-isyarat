# Sapa Isyarat 🤟

Sapa Isyarat is a real-time sign language gesture recognition application built to translate **SIBI** (Sistem Isyarat Bahasa Indonesia) alphabet gestures into text using a webcam.

The system uses a hybrid architecture:
1. **Frontend (Browser):** Next.js with React captures webcam frames and uses MediaPipe's lightweight Tasks API to extract 3D hand landmarks in real-time.
2. **Backend (Server):** FastAPI receives the landmark coordinates and uses a trained Scikit-Learn Random Forest Classifier to predict the gesture label.

---

## 🛠 Tech Stack

- **Frontend:** Next.js (React), TypeScript, Tailwind CSS
- **Computer Vision:** Google MediaPipe Tasks API (`HandLandmarker`)
- **Backend:** Python 3.13, FastAPI, Uvicorn
- **Machine Learning:** Scikit-Learn (Random Forest), Joblib, Pandas, NumPy

---

## 📂 Architecture overview

```
sapa-isyarat/
├── frontend/                 # Next.js Application
│   ├── app/                  # Pages and routing
│   ├── components/           # React components (e.g. gestureTranslator.tsx)
│   └── hooks/                # Custom hooks (MediaPipe logic, buffering)
│
└── backend/                  # Python FastAPI & ML Pipeline
    ├── app/
    │   ├── api/routes/       # API Endpoints (e.g., /gesture/predict)
    │   ├── ai/models/        # Saved .joblib model files
    │   └── services/         # Inference and model loading logic
    ├── data/                 # Extracted CSV datasets go here
    └── scripts/              # Dataset extraction & training scripts
        ├── extract_landmarks.py
        └── train_model.py
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

- **Python 3.13** — [python.org/downloads](https://www.python.org/downloads/)
- **Node.js 18+** — [nodejs.org](https://nodejs.org/)
- **Git** — [git-scm.com](https://git-scm.com/)
- **ffmpeg** *(required for Speech-to-Text)* — [ffmpeg.org/download](https://ffmpeg.org/download.html)

  On Windows, the easiest way to install ffmpeg is via [winget](https://learn.microsoft.com/en-us/windows/package-manager/):
  ```powershell
  winget install ffmpeg
  ```
  After installing, **restart your terminal** so the PATH is updated, then verify with:
  ```powershell
  ffmpeg -version
  ```

You need **two terminal windows** to run the application (one for the backend, one for the frontend).

### 1. Backend Setup (Terminal 1)

Navigate to the backend directory and set up the Python environment:

```powershell
cd backend

# Create virtual environment explicitly using Python 3.13 to avoid version conflicts
py -3.13 -m venv venv
.\venv\Scripts\Activate.ps1

# Install dependencies safely via the venv's python executable
.\venv\Scripts\python.exe -m pip install -r requirements.txt
```

> **Note:** If PowerShell blocks script execution, run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

Start the FastAPI server:

```powershell
.\venv\Scripts\python.exe -m uvicorn main:app --reload --port 8000
```

### 2. Frontend Setup (Terminal 2)

Navigate to the frontend directory:

```powershell
cd frontend

# Install Node modules
npm install
```

**Configure environment variables (required):**

The frontend needs to know where the backend is running. Run these commands **from inside the `frontend/` directory** (i.e., after the `cd frontend` step above):

```powershell
# Windows (PowerShell) — run from inside frontend/
Copy-Item .env.example .env.local

# macOS / Linux — run from inside frontend/
cp .env.example .env.local
```

> **Note:** `.env.local` is gitignored and must be created on every machine that clones this repo. Without it, the app will still attempt to connect to `http://127.0.0.1:8000` as a fallback, but it is best practice to have the file present.

Start the development server:

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧠 Training Custom Models

The repository comes with the code required to train your own SIBI alphabets using custom image datasets.

### Prerequisites for Dataset
You need a folder containing subfolders for each label (e.g., A, B, C...).
```
Dataset_Folder/
├── A/
│   ├── image1.jpg
│   └── image2.jpg
├── B/
...
```

### Step 1: Extract Landmarks to CSV

Run the extraction script on your dataset. This uses MediaPipe to find hand skeletons in the static images and saves their normalized coordinates to a CSV file.

```powershell
# Ensure you are in the backend directory
cd backend

# Always run scripts using the explicit venv executable
# Note: Name your output file according to your dataset (e.g., sibi_landmarks.csv)
.\venv\Scripts\python.exe scripts/extract_landmarks.py --input "C:\path\to\your\Dataset_Folder" --output data/sibi_landmarks.csv
```

**Options:**
- `--confidence 0.1` : Adjust detection strictness. If many images are being skipped ("no hand detected"), try lowering this to `0.05`.

### Step 2: Train the Classifier

Train the Random Forest model on the generated CSV file.

```powershell
# Ensure the --dataset path points EXACTLY to the file generated in Step 1
.\venv\Scripts\python.exe scripts/train_model.py --mode sibi --dataset data/sibi_landmarks.csv
```


The script will evaluate the model, output a precision/recall report, and automatically save the trained model to `backend/app/ai/models/`.

### Step 3: Restart Backend
Restart the FastAPI server so it picks up the newly generated `.joblib` model files.

---

## 🐛 Troubleshooting

**"Backend error: Model for mode X is not loaded."**
- The `.joblib` file for that specific mode is missing. Follow the Training Custom Models guide above to train and generate the model file.

**extract_landmarks.py skips too many images**
- By default, MediaPipe expects clearly visible hands. Dataset images often have weird lighting or crops. Run the script with `--confidence 0.05` to make the detector more forgiving.

**ModuleNotFoundError: No module named 'cv2' in VS Code**
- This is just VS Code using the wrong Python interpreter for linting. Press `Ctrl+Shift+P` -> `Python: Select Interpreter` -> choose `./venv/Scripts/python.exe`.

**"Transcription failed: [WinError 2] The system cannot find the file specified"**
- `ffmpeg` is not installed or not on your system PATH. The Whisper model uses `ffmpeg` internally to decode audio files.
- Install it with `winget install ffmpeg`, then **restart your terminal** and verify with `ffmpeg -version`.
- On macOS: `brew install ffmpeg`. On Linux: `sudo apt install ffmpeg`.

- Make sure the backend is running on port 8000 before opening the frontend.
- Check that `frontend/.env.local` exists. If it doesn't, run `Copy-Item .env.example .env.local` (Windows) or `cp .env.example .env.local` (macOS/Linux) from the `frontend/` directory.

