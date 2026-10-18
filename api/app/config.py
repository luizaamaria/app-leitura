from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Configurações lidas de variáveis de ambiente (ou do arquivo .env)."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    ambiente: str = "dev"
    # Endereços do frontend autorizados a chamar a API (CORS), separados por vírgula
    cors_origens: str = "http://localhost:3000"
    database_url: str = "postgresql://leitura:leitura@localhost:5432/leitura"
    redis_url: str = "redis://localhost:6379/0"
    # Qual IA usar: "mock" (testes), "ollama" (dev) ou "claude" (produção)
    ia_provedor: str = "mock"

    @property
    def cors_origens_lista(self) -> list[str]:
        return [o.strip() for o in self.cors_origens.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
