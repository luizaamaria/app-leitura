from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings

settings = get_settings()

app = FastAPI(title="App de Leitura API", version="0.1.0")

# O frontend (localhost:3000) e a API (localhost:8000) estão em "origens" diferentes.
# Sem CORS, o navegador bloqueia o frontend de ler as respostas da API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origens_lista,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    """Usado pelo frontend, pelo Docker e pelo deploy para saber se a API está de pé."""
    return {"status": "ok", "ambiente": settings.ambiente}
