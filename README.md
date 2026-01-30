# Quiz Builder

Monorepo with a **Next.js** frontend and **Node.js/Express** backend. Backend uses TypeScript, Prisma, and PostgreSQL. Frontend uses TypeScript, Tailwind CSS, and Formik for forms.

## Project structure

```
quiz-builder/
├── backend/          # Express API, Prisma, PostgreSQL
├── frontend/         # Next.js app, Tailwind, Formik
├── package.json      # Root workspace (npm workspaces)
└── README.md
```

## Prerequisites

- **Node.js** 18+ and npm
- **PostgreSQL** (local or remote) for the backend database

---

## 1. Database setup (PostgreSQL)

1. Install and run PostgreSQL (e.g. [PostgreSQL downloads](https://www.postgresql.org/download/) or Docker: `docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres`).

2. Create a database (e.g. `quiz_builder`):
   ```bash
   # Using psql or any PostgreSQL client:
   CREATE DATABASE quiz_builder;
   ```

3. **Connection details** – where each value comes from:

   | Value      | Local install | Docker (`postgres` image) |
   |-----------|----------------|---------------------------|
   | **Host**  | `localhost`    | `localhost`               |
   | **Port**  | `5432` (default) | `5432`                  |
   | **User**  | The OS user you use for PostgreSQL, or `postgres` | `postgres` |
   | **Password** | The one you set during PostgreSQL install | Value of `POSTGRES_PASSWORD` (e.g. `postgres`) |
   | **Database** | Name you created, e.g. `quiz_builder` | Same; create it with `CREATE DATABASE quiz_builder;` inside the container or via a client |

   **Local (Windows):** After installing PostgreSQL, the default superuser is often `postgres`; the installer may ask you to set its password. Use that user and password in `DATABASE_URL`.

   **Docker:** With `-e POSTGRES_PASSWORD=postgres`, user is `postgres`, password is `postgres`. To create the DB:  
   `docker exec -it <container_id> psql -U postgres -c "CREATE DATABASE quiz_builder;"`

   **URL format:** `postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public`

---

## 2. Backend setup

1. Go to the backend folder:
   ```bash
   cd backend
   ```

2. Copy the example env file and set your database URL:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/quiz_builder?schema=public"
   ```
   Replace `USER` and `PASSWORD` with your PostgreSQL user and password.

3. Install dependencies (from repo root or from `backend`):
   ```bash
   # From repo root:
   npm install
   # Or only backend:
   cd backend && npm install
   ```

4. Generate the Prisma client and sync the database:
   ```bash
   cd backend
   npm run db:generate
   npm run db:push
   ```
   - `db:generate` – generates the Prisma client.
   - `db:push` – pushes the schema to the database (creates/updates tables).  
   For migration-based workflow use: `npm run db:migrate` instead of `db:push`.

5. (Optional) Seed the database:
   ```bash
   npm run db:seed
   ```

6. Start the backend:
   ```bash
   npm run dev
   ```
   API runs at **http://localhost:4000** (or the port in `PORT` in `.env`).  
   - Health: http://localhost:4000/health  

---

## 3. Frontend setup

1. Go to the frontend folder:
   ```bash
   cd frontend
   ```

2. (Optional) Copy the example env if you need to point to a different API:
   ```bash
   cp .env.example .env.local
   ```
   Default is `NEXT_PUBLIC_API_URL=http://localhost:4000`.

3. Install dependencies (from repo root or from `frontend`):
   ```bash
   # From repo root (if not done yet):
   npm install
   # Or only frontend:
   cd frontend && npm install
   ```

4. Start the frontend:
   ```bash
   npm run dev
   ```
   App runs at **http://localhost:3000**.

---

## 4. Running everything from the root

From the **repository root** (after `npm install` once):

- **Backend only:**
  ```bash
  npm run dev:backend
  ```

- **Frontend only:**
  ```bash
  npm run dev:frontend
  ```

- **Both at once:**
  ```bash
  npm run dev
  ```
  This starts backend (port 4000) and frontend (port 3000) together.

---

## Quick reference

| Task              | Command (from root)   | Command (from package dir) |
|-------------------|------------------------|----------------------------|
| Install all       | `npm install`          | `cd backend` or `cd frontend` then `npm install` |
| Run both          | `npm run dev`          | -                          |
| Run backend       | `npm run dev:backend`  | `cd backend` → `npm run dev` |
| Run frontend      | `npm run dev:frontend` | `cd frontend` → `npm run dev` |
| DB generate       | -                      | `cd backend` → `npm run db:generate` |
| DB push schema    | -                      | `cd backend` → `npm run db:push` |
| DB migrations     | -                      | `cd backend` → `npm run db:migrate` |
| DB seed           | -                      | `cd backend` → `npm run db:seed` |
| Prisma Studio     | -                      | `cd backend` → `npm run db:studio` |

---

## Tech stack

- **Backend:** Node.js, Express, TypeScript, Prisma, PostgreSQL  
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Formik  

Ensure PostgreSQL is running and `backend/.env` has a valid `DATABASE_URL` before starting the backend.
