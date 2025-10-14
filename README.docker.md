# Docker instructions

This repository contains a Node/TypeScript backend (Prisma) and a Vite React frontend.

Quick steps to run with Docker Desktop (docker-compose):

1. Build and start services:

```bash
# from repo root
docker compose up --build
```

This will start:
- Postgres (port 5432)
- Backend (port 3000)
- Frontend (port 4173)

2. Initialize database (migrations + seed):

Open a new terminal and run the migration and seed commands inside the backend container:

```bash
# run prisma migrate and seed inside backend container
docker compose exec backend sh -c "npx prisma migrate deploy --schema=prisma/schema.prisma && node --loader ts-node/esm prisma/seed.ts"
```

Alternatively, run the seed directly (repo root):

```bash
docker compose exec backend npm run prisma:seed
```

3. Access the app:
- Frontend: http://localhost:4173
- Backend API: http://localhost:3000
- Postgres: localhost:5432

Notes:
- The backend uses the environment variable `DATABASE_URL` already configured in `docker-compose.yml`.
- If you change Prisma schema, re-run migrations accordingly.
- For dev convenience the backend mounts the repository as a volume (hot-reload with nodemon if configured). For production you would build and run the compiled JS instead.
