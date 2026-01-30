# Quiz Builder

Next.js frontend and Express backend (TypeScript, Prisma, PostgreSQL). Create and manage quizzes with True/False, short-answer, and multiple-choice questions.

---

## 1. Set up the database

- Use **PostgreSQL** (local or cloud). The app connects to whatever you put in `DATABASE_URL`; no need to install PostgreSQL on your machine if you use a hosted service (e.g. [Supabase](https://supabase.com), [Neon](https://neon.tech)).
- Create a database (e.g. `quiz_builder`). Connection URL format:  
  `postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public`

In the **backend** folder:

1. Copy env and set the URL:
   ```bash
   cd backend
   cp .env.example .env
   ```
   Edit `.env` and set `DATABASE_URL` to your PostgreSQL connection string.

2. Install dependencies (from repo root: `npm install`, or `cd backend && npm install`).

3. Generate the Prisma client and create tables:
   ```bash
   npm run db:generate
   npm run db:push
   ```
   (For migrations instead of push: `npm run db:migrate`.)

---

## 2. Start backend and frontend

From the **repository root** (after `npm install` once):

- **Both:**  
  ```bash
  npm run dev
  ```
  Backend: **http://localhost:4000** · Frontend: **http://localhost:3000**

- **Backend only:** `npm run dev:backend`  
- **Frontend only:** `npm run dev:frontend`  
  (Optional: `cd frontend` → `cp .env.example .env.local` if you need a different API URL; default is `http://localhost:4000`.)

---

## 3. Create a sample quiz

From the **backend** folder:

```bash
cd backend
npm run db:seed
```

This adds one **Example Quiz** (only if no quizzes exist yet) with three questions: True/False, short-answer, and multiple-choice. Run it once to try the app; running it again skips if quizzes already exist.

You can also create quizzes in the app at **http://localhost:3000/create**.

---

## Quick reference

| Task           | Command |
|----------------|---------|
| Install        | `npm install` (from root) |
| Start both     | `npm run dev` (from root) |
| DB tables      | `cd backend` → `npm run db:generate` then `npm run db:push` |
| Sample quiz    | `cd backend` → `npm run db:seed` |
| Format / lint  | `npm run format` and `npm run lint` (from root) |

Tech: **Backend** – Node, Express, Prisma, PostgreSQL. **Frontend** – Next.js, Tailwind, Formik.
