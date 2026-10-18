# App de Leitura — Documento do Produto

> Nome provisório: **[a definir]** · Sem domínio por enquanto · Versão 0.1 (18/10/2026)

---

## 1. Visão em uma frase

Um app (PWA) para organizar suas leituras e entender melhor o que você lê, com um **assistente de IA sem spoiler**, metas, clube do livro por capítulo e **alerta de preço** para comprar livros mais barato.

## 2. O problema

| Dor | Quem sente |
|---|---|
| Livros de fantasia têm muitos personagens, lugares e nomes estrangeiros. A pessoa fica voltando páginas, procurando mapa, e pesquisar no Google traz spoiler. | Quem lê fantasia, ficção científica, sagas longas |
| Parou de ler por semanas e não lembra o que aconteceu. | Quem lê vários livros ao mesmo tempo ou com pausas |
| Quer conversar sobre o livro, mas ninguém por perto está lendo o mesmo, e em grupo grande alguém sempre dá spoiler. | Leitores em geral |
| Quer comprar o livro, mas o preço varia muito entre lojas e ao longo do tempo. | Todo mundo que compra livro |
| Quer mostrar nas redes o que está lendo, mas montar a imagem dá trabalho. | Público de booktok e bookstagram |

## 3. Para quem é (persona principal)

**Leitora/leitor de fantasia e sagas, 18–35 anos**, ativo(a) no booktok e bookstagram, lê de 1 a 4 livros por mês, compra livros físicos e e-books e gosta de metas como "ler 30 livros em 2027".

Persona secundária: leitores casuais que só querem organizar a estante e bater uma meta.

## 4. Diferencial em relação à concorrência

| Concorrente | O que faz bem | O que falta e nós teremos |
|---|---|---|
| Skoob | Estante e comunidade brasileira | IA, sem spoiler, alerta de preço, UX moderna |
| Goodreads | Base enorme | Parado no tempo, em inglês, sem IA |
| StoryGraph | Estatísticas e recomendações | Sem assistente de leitura, pouco presente no Brasil |
| Fable | Clube do livro | Sem assistente e sem preços |
| Keepa e Zoom | Histórico de preço | Não tem nada de leitura |

**Nosso diferencial central:** o assistente **sabe até onde você leu** e nunca conta o que vem depois.

## 5. Funcionalidades

### 5.1 Estante (base do app)
- Buscar livro por título, autor ou ISBN, ou ler o código de barras com a câmera
- Status: *quero ler*, *lendo*, *lido*, *abandonado*
- Progresso por página ou %, nota e resenha curta
- Histórico de leitura (datas de início e fim)

### 5.2 Meta de leitura (opcional)
- Meta anual em livros ou páginas, com meta mensal opcional
- Sequência de dias lendo (streak) e lembrete diário opcional
- Estatísticas: gêneros, páginas por mês, ritmo

### 5.3 Card para redes sociais
- Gerar imagem 9:16 (story) e 1:1 (feed): "Terminei *X* em 12 dias ★4,5", "Meu mês de leitura", "Meta 2027: 18/30"
- Compartilhar direto pelo celular (Web Share API)
- Marca discreta do app no card, o que divulga o app de graça

### 5.4 Assistente de leitura sem spoiler ⭐ (diferencial)
- **Foto da página ou trecho selecionado → explicação**: quem é o personagem, o que é o lugar, pronúncia e significado de nomes em inglês ou inventados
- **Glossário pessoal** de personagens, lugares, facções e termos que **cresce conforme você lê**
- **"Onde eu parei?"**: resumo do que aconteceu até a página atual
- **Mapa**: foto do mapa do livro e o app marca os lugares já citados na leitura

**Regra de ouro do sem spoiler:** o conhecimento do assistente vem **das páginas que o próprio usuário capturou** (RAG sobre o que já foi lido), e não da memória geral da IA sobre o livro. O prompt proíbe usar informação posterior à página atual. Isso também reduz alucinação.

**Direitos autorais:** não armazenar o texto integral das páginas para outros usuários. Guardar só o que é derivado e pessoal (glossário, resumos) por usuário.

### 5.5 Comprar + alerta de preço 💰 (receita)
- Na página do livro: "Comprar" com preços de várias lojas (links de afiliado: Amazon, Magalu, Shopee, lojas da Awin)
- **"Me avise quando baixar de R$ X"** → notificação push e/ou e-mail
- Histórico de preço do livro (gráfico simples)
- Coleta via **APIs e feeds oficiais de afiliados**, evitando scraping que viole os termos de uso (risco de perder a conta de afiliada)

### 5.6 Clube do livro (fase 2)
- Sala automática por livro, com quem está lendo o mesmo título
- Discussão **separada por capítulo**: você só vê os capítulos que já leu
- Leituras coletivas com data ("vamos ler juntos em novembro")

## 6. Como ganha dinheiro

| Fonte | Quando | Observação |
|---|---|---|
| **Afiliados** (compra de livros) | Desde o MVP | Receita sem cobrar nada do usuário |
| **Plano Premium** (assinatura) | Depois de ter usuários ativos | Assistente de IA ilimitado, estatísticas avançadas, cards exclusivos |
| Plano gratuito | Sempre | Estante, meta, cards básicos, X perguntas de IA por mês |

A IA tem custo por uso, então é preciso limitar o plano gratuito desde o início e acompanhar o custo por usuário.

## 7. Arquitetura técnica

```
[PWA - Next.js + TypeScript]  ──HTTPS──>  [API - FastAPI (Python)]
   │ manifest + service worker                │
   │ push, câmera, offline                     ├── PostgreSQL + pgvector (dados + RAG)
   │                                           ├── Redis + worker (Celery/ARQ)
   │                                           │     └── verificação de preços, envio de alertas
   │                                           ├── Camada de IA (ProvedorIA) → Ollama | mock | Claude
   │                                           ├── Google Books / Open Library (dados de livros)
   │                                           └── APIs de afiliados (preços e links)
```

| Camada | Tecnologia | Objetivo de aprendizado |
|---|---|---|
| Frontend | Next.js, TypeScript, Tailwind | **Novo:** React, TS, PWA |
| Backend | FastAPI, SQLAlchemy, Pytest | Já domina, foco em velocidade |
| Banco | PostgreSQL + pgvector | **Novo:** busca vetorial e RAG |
| Jobs | Celery ou ARQ + Redis | Já domina |
| Autenticação | Supabase Auth ou Auth.js | **Novo:** login social, sessão |
| IA | Camada `ProvedorIA`: Ollama (dev), mock (testes), Claude Haiku e Sonnet (produção) | **Novo:** visão, RAG, controle de custo, adapter pattern |
| Deploy | Vercel (front), Fly.io ou Railway (back) | **Novo:** ser dona do deploy de ponta a ponta |
| Experimento futuro | Worker de preços em **Go** | **Novo:** outra linguagem, módulo isolado |

### Camada de IA (troca de provedor)

O backend nunca chama um provedor de IA direto. Tudo passa por uma interface única, e a implementação é escolhida por variável de ambiente (`IA_PROVEDOR`).

```python
class ProvedorIA(Protocol):
    def explicar(self, imagem: bytes | None, trecho: str | None,
                 glossario: list[Entidade], pagina_atual: int) -> Explicacao: ...
    def extrair_entidades(self, imagem: bytes | None, texto: str | None) -> list[Entidade]: ...
    def resumir_ate(self, capturas: list[Captura], pagina_atual: int) -> str: ...
```

| Ambiente | `IA_PROVEDOR` | Implementação | Custo |
|---|---|---|---|
| Desenvolvimento | `ollama` | Modelo open source local com visão (Qwen, Gemma, Llama) via Ollama | Grátis |
| Testes automáticos (Pytest, CI) | `mock` | Respostas fixas e previsíveis | Grátis |
| Beta e produção | `claude` | **Claude Haiku 5.5** por padrão; **Claude Sonnet 5.5** para tarefas difíceis (mapa, resumo "onde parei") | ~US$ 0,70 (Haiku) a ~US$ 14 (Sonnet) a cada 1.000 perguntas* |

\* Estimativa com ~4.500 tokens de entrada (foto + glossário + instruções) e ~500 de saída. Preços de out/2026: Haiku 5.5 US$ 0,10 / 0,50 e Sonnet 5.5 US$ 2 / 10 por milhão de tokens (entrada / saída).

**Regras:**
- **A qualidade é validada no modelo de produção,** não no local. Antes de codar cada recurso de IA, testar o prompt na mão no chat do Claude (foto + glossário + instruções). Um modelo local fraco pode dar a falsa impressão de que a ideia não funciona.
- **Dados de usuários reais nunca vão para planos gratuitos de terceiros** que possam usar os dados para treino (ex.: plano grátis do Gemini). Esses planos ficam só para testes com dados fictícios.
- **Limite de gasto mensal** configurado no Console da Anthropic.
- **Cache de respostas** por (livro, trecho, página) para não pagar duas vezes pela mesma pergunta.
- Registrar tokens usados por chamada para acompanhar o **custo por usuário**.

**RAG em etapas:**
1. **MVP:** o glossário de um livro é pequeno (centenas de verbetes), então vai **inteiro no prompt**, sem busca vetorial.
2. **Quando o glossário crescer:** pgvector com embeddings geradas **localmente e de graça** (sentence-transformers, em Python).

### Modelo de dados inicial (rascunho)

- `users`: id, nome, e-mail, plano, preferências
- `books`: id, isbn, título, autores, capa, páginas, gêneros (cache do Google Books)
- `user_books`: user_id, book_id, status, página_atual, nota, início, fim
- `reading_goals`: user_id, ano, tipo (livros ou páginas), alvo
- `captures`: user_id, book_id, página, imagem/texto extraído, criado_em
- `entities`: user_id, book_id, tipo (personagem, lugar, termo), nome, descrição, primeira_página, embedding
- `offers`: book_id, loja, preço, url_afiliado, coletado_em
- `price_alerts`: user_id, book_id, preço_alvo, ativo, último_aviso
- `push_subscriptions`: user_id, endpoint, chaves

## 8. Roteiro do MVP

| Etapa | Entrega | Aprendizado principal |
|---|---|---|
| **0. Setup** (1 sem.) | Monorepo, Docker, CI, deploy "olá mundo" do front e do back | Infra de ponta a ponta |
| **1. Estante + PWA** (2 sem.) | Login, busca, estante, progresso, app instalável | React, TS, PWA |
| **2. Meta + card** (1 sem.) | Metas, estatísticas simples, gerar e compartilhar imagem | Geração de imagem, Web Share |
| **3. Comprar + alerta** (2 sem.) | Ofertas com afiliado, alerta de preço, push | Web Push, integração com afiliados |
| **4. Assistente sem spoiler** (3 sem.) | Camada `ProvedorIA` (Ollama + mock + Claude); foto ou trecho → explicação, glossário, "onde parei" | Visão, prompts, adapter pattern, custo de IA |
| **— Lançamento beta —** | 20 a 50 leitores convidados (amigos, booktok, grupos de leitura) | Feedback real |
| 5. Clube por capítulo | Depois do beta | Tempo real, moderação |
| 6. Premium | Depois de medir uso da IA | Pagamentos (Stripe ou Mercado Pago) |

Prazo total estimado: **9 a 10 semanas** em paralelo com o trabalho.

## 9. Como saber se está dando certo

- **Ativação:** % de quem cadastra e adiciona pelo menos 3 livros
- **Retenção:** % que volta na semana 1 e na semana 4
- **Uso do diferencial:** perguntas ao assistente por usuário ativo
- **Viralização:** cards compartilhados por semana
- **Receita:** cliques em "comprar", conversões de afiliado, alertas disparados que viraram compra

## 10. Riscos e cuidados

| Risco | Mitigação |
|---|---|
| Custo da IA crescer mais rápido que a receita | Limite no plano gratuito, cache de respostas, Haiku por padrão, limite de gasto no Console, desenvolvimento com Ollama e mock |
| Modelo local fraco mascarar a qualidade real | Validar prompts no Claude antes de codar; testar o beta já com Claude |
| Assistente dar spoiler | RAG só com páginas capturadas e instrução rígida no prompt; testar com livros conhecidos |
| Perder conta de afiliada | Usar APIs e feeds oficiais; ler os termos de cada programa |
| PA-API da Amazon exige vendas mínimas para liberar e manter acesso | Começar por outras lojas e feeds e usar links simples da Amazon até ter volume |
| Push limitado no iPhone (só com o app instalado na tela inicial) | Tela explicando como instalar; e-mail como alternativa |
| Direitos autorais das páginas fotografadas | Uso pessoal, sem expor texto do livro a terceiros, guardar só dados derivados |
| LGPD | Política de privacidade, exclusão de conta e dados, consentimento para e-mails |

## 11. Decisões em aberto

- [ ] Nome do app (e depois domínio e @ nas redes)
- [ ] Supabase (mais rápido) ou Postgres + auth próprios (mais aprendizado)?
- [ ] Quais lojas de afiliado entram primeiro?
- [ ] Gênero de lançamento: só fantasia no começo, para ter um nicho claro, ou todos?
- [ ] Idioma: só português no MVP?
