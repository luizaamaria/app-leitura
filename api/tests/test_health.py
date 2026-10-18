from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_responde_ok():
    resposta = client.get("/health")

    assert resposta.status_code == 200
    assert resposta.json()["status"] == "ok"


def test_cors_libera_o_frontend():
    resposta = client.get("/health", headers={"Origin": "http://localhost:3000"})

    assert resposta.headers["access-control-allow-origin"] == "http://localhost:3000"
