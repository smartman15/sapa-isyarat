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

# CORS — required for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(translate.router, prefix="/translate", tags=["Translate"])
app.include_router(gesture.router, prefix="/gesture", tags=["Gesture"])