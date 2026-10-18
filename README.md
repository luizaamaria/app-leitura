# App de Leitura

PWA para organizar leituras, com assistente de IA sem spoiler e alerta de preço de livros.
Visão do produto, roadmap e decisões: [PRODUTO.md](PRODUTO.md).

## Estrutura

```
app-leitura/
├── web/                 # Frontend: Next.js + TypeScript + Tailwind (o PWA)
│   └── src/
│       ├── app/         # Páginas (cada pasta = uma rota) + manifest do PWA
│       └── components/  # Pedaços de tela reutilizáveis
├── api/                 # Backend: FastAPI (Python)
│   ├── app/             # Código da API
│   └── tests/           # Pytest
├── docker-compose.yml   # Postgres (com pgvector), Redis e a API
└── .github/workflows/   # CI: testes e lint a cada push
```

## Rodando localmente

Pré-requisitos: Docker, Node 22+ e Python 3.12+.

```bash
# 1. Variáveis de ambiente (só na primeira vez)
cp .env.example .env
cp web/.env.example web/.env.local

# 2. Backend + banco + Redis
docker compose up -d --build

# 3. Frontend (em outro terminal)
cd web
npm install
npm run dev
```

- Frontend: http://localhost:3000
- API: http://localhost:8000 (documentação automática em http://localhost:8000/docs)

## Testes e lint

```bash
# Backend (fora do Docker)
cd api
python3 -m venv .venv && .venv/bin/pip install -e ".[dev]"
.venv/bin/pytest
.venv/bin/ruff check . && .venv/bin/ruff format --check .

# Backend (dentro do Docker)
docker compose exec api pytest

# Frontend
cd web
npm run lint
npm run build
```

## Testar o PWA no celular

O navegador só deixa instalar um PWA em `https://` ou em `localhost`. Para testar no celular antes
do deploy, use um túnel (ex.: `npx localtunnel --port 3000` ou Cloudflare Tunnel) e abra o link
HTTPS no celular → menu do navegador → "Instalar app" / "Adicionar à tela inicial".
