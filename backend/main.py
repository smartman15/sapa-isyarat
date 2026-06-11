from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import translate
from app.api.routes import gesture
from app.api.routes import stt
from app.services.model_service import load_models
from app.services.stt_service import load_whisper_model
import warnings
warnings.filterwarnings("ignore", category=UserWarning, module="sklearn")



@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load ML models at startup."""
    app.state.models = load_models()
    app.state.whisper = load_whisper_model()
    yield


app = FastAPI(lifespan=lifespan)

# CORS — required for Vercel frontend calling this Render backend.
# vercel-deployment skill: allow_origins=["*"] + allow_credentials=True is
# invalid per the CORS spec and silently rejected by all browsers.
# Use an explicit origin list instead.
import os

ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "https://sapa-isyarat.vercel.app,http://localhost:3000,http://127.0.0.1:3000"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,   # No cookies/auth headers used — keep False
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],       # Needed for multipart/form-data preflight (STT upload)
)

# Routers
app.include_router(translate.router, prefix="/translate", tags=["Translate"])
app.include_router(gesture.router, prefix="/gesture", tags=["Gesture"])
app.include_router(stt.router, prefix="/stt", tags=["Speech-to-Text"])

@app.get("/", tags=["Health"])
def root():
    """Health check endpoint for Render/Cloud deployment."""
    return {"status": "ok", "message": "Sapa Isyarat Backend is running"}