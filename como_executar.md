# Como Executar a Aplicação

Este guia detalha como configurar e executar o sistema (backend, frontend e banco de dados) localmente, com ou sem Docker.

Repositório: [https://github.com/andref03/contacts-list-system](https://github.com/andref03/contacts-list-system/tree/main)

## Pré-requisitos

- Git

- Docker Desktop (Windows/macOS) ou Docker Engine + docker-compose (Linux)

- (Opcional, para execução sem Docker) Node.js 18+ e npm, PostgreSQL

## 1. Clonar o Repositório

```bash
git clone https://github.com/andref03/contacts-list-system.git
cd contacts-list-system
```

## 2. Execução com Docker (Recomendado)

### Iniciar Serviços

No diretório raiz do repositório, execute:

```bash
docker compose up --build
```

**Serviços e Portas:**

- **db (Postgres):** `5432`

- **backend (API):** `3000`

- **frontend:** `5173`

Verifique os logs para confirmar que os serviços estão ativos:

```bash
docker compose logs -f
```

### Rodar Migrations e Seed

Após o Postgres estar pronto, execute as migrations e o seed dentro do container do backend:

```bash
docker compose exec backend sh -c "npx prisma migrate deploy --schema=prisma/schema.prisma && node --loader ts-node/esm prisma/seed.ts"
```

### Acessar a Aplicação

- **Frontend:** [http://localhost:5173/home](http://localhost:5173/home)

- **Backend API:** [http://localhost:3000/contacts](http://localhost:3000/contacts)

- **PostgreSQL:** `host: localhost`, `port: 5432`, `database: contacts_db`, `user: postgres`, `password: postgres`

### Parar e Remover

- **Parar serviços:** `docker compose down`

- **Parar e remover volumes (apaga dados do DB):** `docker compose down -v`

## 3. Execução sem Docker (Desenvolvimento Local)

### Configuração Inicial

1. **Instalar dependências:**

1. **Criar arquivo ****`.env`**** no root:**

1. **Preparar o banco de dados (migrations + seed):**

```bash
npx prisma generate npx prisma migrate dev --schema=prisma/schema.prisma node --loader ts-node/esm prisma/seed.ts ```
```

### Iniciar Backend

No diretório raiz, execute:

```bash
npm run dev
```

O backend estará disponível em [http://localhost:3000/contacts](http://localhost:3000/contacts).

### Iniciar Frontend

No diretório `frontend`, execute:

```bash
npm run dev
```

O Vite informará a URL local (geralmente [http://localhost:5173/home](http://localhost:5173/home)).

## 4. Acessar o Banco de Dados com DBeaver

Utilize as seguintes credenciais para conectar ao PostgreSQL:

- **Host:** `localhost`

- **Porta:** `5432`

- **Database:** `contacts_db`

- **Username:** `postgres`

- **Password:** `postgres`

**Dicas de Conexão:**

- Confirme que o container `db` está `Up` (`docker compose ps`).

- Verifique os logs do DB: `docker compose logs -f db`.

- Se a senha foi alterada, recrie o volume (`docker compose down -v` e `docker compose up --build`).

## 5. Comandos Docker Úteis

- **Subir (build):** `docker compose up --build`

- **Subir em background:** `docker compose up -d`

- **Parar:** `docker compose down`

- **Ver logs:** `docker compose logs -f`

- **Executar comando no backend:** `docker compose exec backend sh -c "<comando>"`

---

## Nota sobre este documento

Este guia foi revisado e otimizado com o auxílio de Inteligência Artificial para garantir clareza e concisão.
