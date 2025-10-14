# Como executar esta aplicação (guia completo)

Este guia explica passo-a-passo como clonar, configurar e executar o sistema inteiro (backend + frontend + banco) na sua máquina, tanto usando Docker (recomendado) quanto rodando localmente sem Docker.

Repositório: https://github.com/andref03/contacts-list-system/tree/main

---

## Pré-requisitos

- Git
- Docker Desktop (Windows/macOS) ou Docker Engine + docker-compose (Linux)
- (Opcional, para rodar sem Docker) Node.js 18+ e npm, PostgreSQL

---

## 1) Clonar o repositório

```bash
git clone https://github.com/andref03/contacts-list-system.git
cd contacts-list-system
```

---

## 2) Rodar com Docker (recomendado)

### 2.1 Subir os serviços

```bash
# no diretório raiz do repositório
docker compose up --build
```

Serviços iniciados (padrão no `docker-compose.yml` que acompanha o repositório):
- db (Postgres) — mapeado para a porta 5432 no host
- backend (API) — mapeado para a porta 3000 no host
- frontend (build estático servido) — mapeado para a porta 4173

### 2.2 aguardar o DB e backend inicializarem

Verifique os logs para confirmar os serviços estão up:

```bash
docker compose logs -f
```

### 2.3 Rodar migrations e seed (uma vez)

Depois que o Postgres estiver pronto, execute migrations e seed dentro do container backend:

```bash
# executa migrations e seed usando o container backend
docker compose exec backend sh -c "npx prisma migrate deploy --schema=prisma/schema.prisma && node --loader ts-node/esm prisma/seed.ts"
```

ou (alternativa usando prisma db seed):

```bash
docker compose exec backend sh -c "npx prisma db seed --schema=prisma/schema.prisma"
```

### 2.4 Acessar a aplicação

- Frontend: http://localhost:4173
- Backend API: http://localhost:3000
- PostgreSQL (para clientes DB): host `localhost` port `5432`, database `contacts_db`, user `postgres`, password `postgres`

### 2.5 Parar e remover

```bash
# parar
docker compose down
# parar e remover volumes (apaga dados do DB)
docker compose down -v
```

---

## 3) Rodar sem Docker (desenvolvimento local)

### 3.1 Backend

Instale dependências no root (backend) e no frontend separadamente:

```bash
# no root
npm install
# frontend
cd frontend
npm install
cd ..
```

Crie `.env` no root com as variáveis necessárias (exemplo):

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/contacts_db"
PORT=3000
```

Prepare o banco (migrations + seed):

```bash
npx prisma generate
npx prisma migrate dev --schema=prisma/schema.prisma
node --loader ts-node/esm prisma/seed.ts
```

Inicie o backend:

```bash
npm run dev
# (usa: node --loader ts-node/esm index.ts)
```

O backend fica em http://localhost:3000.

### 3.2 Frontend (Vite)

```bash
cd frontend
npm run dev
```

Vite irá informar a URL local (geralmente http://localhost:5173 ou similar).

---

## 4) Acessar o banco com DBeaver

Dados de conexão (padrão docker-compose):
- Host: localhost
- Porta: 5432
- Database: contacts_db
- Username: postgres
- Password: postgres

No DBeaver: Database -> New Database Connection -> PostgreSQL -> preencher os campos -> Test Connection -> Finish

Dicas se houver erro de conexão:
- Confirme que o container db está `Up` (`docker compose ps`)
- Verifique logs do db: `docker compose logs -f db`
- Se a senha foi alterada, recrie o volume (perigoso, apaga dados): `docker compose down -v` e `docker compose up --build`

---

## 5) Comandos úteis

- Subir (build): `docker compose up --build`
- Subir em background: `docker compose up -d`
- Parar: `docker compose down`
- Ver logs: `docker compose logs -f`
- Executar comando no backend: `docker compose exec backend sh -c "<comando>"`

---

## 6) Solução de problemas comuns

- `Connection refused` (DB): verifique `docker compose ps` e `docker compose logs db`.
- `authentication failed`: verifique usuário/senha no `docker-compose.yml`.
- Erro de porta ocupada: altere mapeamento no `docker-compose.yml` (ex.: `5432:5432` -> `55432:5432`).
- Prisma: se houver conflito no client, rode `npx prisma generate`.

---

## 7) Observações e melhorias sugeridas

- Para produção, crie Dockerfiles multi-stage e remova volumes de código fonte (a montagem `./:/usr/src/app` é para dev). Use nginx ou CDN para servir o frontend.
- Adicionar healthcheck no `docker-compose.yml` e aguardar o DB antes de executar migrations automaticamente.
- Criar scripts `Makefile` para simplificar comandos (up/migrate/seed/down).
