FROM python:3.14-slim

WORKDIR /code

# Copia só o pyproject primeiro: se o código mudar mas as dependências não,
# o Docker reaproveita esta camada do cache e o build fica bem mais rápido.
COPY pyproject.toml .
RUN mkdir app && touch app/__init__.py \
    && pip install --no-cache-dir ".[dev]"

COPY . .

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
