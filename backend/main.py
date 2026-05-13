from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import translate
from app.api.routes import gesture
from app.services.model_service import load_models


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load ML models at startup."""
    app.state.models = load_models()
    yield


app = FastAPI(lifespan=lifespan)

# CORS — required for Vercel frontend calling this Render backend.
# vercel-deployment skill: allow_origins=["*"] + allow_credentials=True is
# invalid per the CORS spec and silently rejected by all browsers.
# Use an explicit origin list instead.
import os

ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "https://sapa-isyarat.vercel.app,http://localhost:3000"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,   # No cookies/auth headers used — keep False
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)

# Routers
app.include_router(translate.router, prefix="/translate", tags=["Translate"])
app.include_router(gesture.router, prefix="/gesture", tags=["Gesture"])

@app.get("/", tags=["Health"])
def root():
    """Health check endpoint for Render/Cloud deployment."""
    return {"status": "ok", "message": "Sapa Isyarat Backend is running"}