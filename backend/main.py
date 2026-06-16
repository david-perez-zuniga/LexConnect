from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import api_router

app = FastAPI(title="LexConnect API", version="1.0.0")

# Configuración de middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rutas de las versiones de ENDPOINTS
app.include_router(api_router, prefix="/api/v1")
