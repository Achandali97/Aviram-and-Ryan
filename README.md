# Full-stack starter (Vite + Node)

Client stack:

- **GitHub** → source repo
- **Frontend** → [Vercel](https://vercel.com) (`frontend/`)
- **Backend** → [Railway](https://railway.app) (`backend/`)

```text
my_work/
├── frontend/          React + Vite + TypeScript → Vercel
│   ├── src/api/       REST client
│   └── vercel.json
└── backend/           Node.js + Express + TypeScript → Railway
    ├── src/routes/    REST routes
    └── railway.toml
```

## Local development

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

API: `http://localhost:3002`  
Health: `GET /health`  
Sample: `GET /api/hello`

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

App: `http://127.0.0.1:5173`

Set `VITE_API_URL` in `frontend/.env` to your backend URL.

## Deploy (client: GitHub + Vercel + Railway)

You need access to the shared GitHub repo, Vercel project, and Railway project from the client invite.

### 1. Backend on Railway

1. Open the Railway project the client shared with you.
2. **New Service** → **GitHub Repo** → select this repo.
3. Settings:
   - **Root Directory:** `backend`
   - Build / start are already in `backend/railway.toml`
     - Build: `npm install && npm run build`
     - Start: `npm start`
4. Variables:
   - `FRONTEND_ORIGIN` = your Vercel URL  
     e.g. `https://your-app.vercel.app`  
     (comma-separated if you need preview + production)
5. Generate a public domain (Settings → Networking → Generate Domain).
6. Confirm: `https://<your-railway-domain>/health` returns `{ "status": "ok" }`.

Railway sets `PORT` automatically — do not hardcode it in production.

### 2. Frontend on Vercel

1. Open the Vercel team/project from the client invite.
2. Import (or connect) the same GitHub repo.
3. Settings:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Environment variable (Production + Preview as needed):
   - `VITE_API_URL` = your Railway public URL  
     e.g. `https://your-api.up.railway.app`  
     (no trailing slash)
5. Deploy. Open the Vercel URL and confirm the API message loads.

### 3. Wire CORS (required)

After both URLs exist:

| Where   | Variable           | Value              |
|---------|--------------------|--------------------|
| Railway | `FRONTEND_ORIGIN`  | Vercel URL         |
| Vercel  | `VITE_API_URL`     | Railway public URL |

Redeploy both after changing env vars (`VITE_*` is baked in at build time on Vercel).

## Day-to-day workflow

1. Work in a branch (or `main` if the client asks).
2. Push to GitHub.
3. Vercel and Railway redeploy from that push (if auto-deploy is on).
4. Keep secrets only in Railway / Vercel dashboards — never commit `.env`.

## Notes

- Vite only exposes env vars prefixed with `VITE_`.
- Keep secrets on the backend; the frontend URL is public.
- Local ports: frontend `5173`, backend `3002` (avoid clashing with other apps on `3000`/`3001`).
