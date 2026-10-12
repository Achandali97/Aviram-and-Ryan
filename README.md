# Full-stack starter (Vite + Node)

Simple TypeScript monorepo ready for:

- **Frontend** → [Vercel](https://vercel.com) (`frontend/`)
- **Backend** → [Render](https://render.com) (`backend/`)

```text
my_work/
├── frontend/          React + Vite + TypeScript
│   ├── src/api/       REST client
│   └── vercel.json
└── backend/           Node.js + Express + TypeScript
    ├── src/routes/    REST routes
    └── render.yaml
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

App: `http://localhost:5173`

Set `VITE_API_URL` in `frontend/.env` to your backend URL.

## Deploy

### 1. Backend on Render

1. Push this repo to GitHub.
2. Create a **Web Service** on Render.
3. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/health`
4. Environment variables:
   - `FRONTEND_ORIGIN` = your Vercel URL (e.g. `https://your-app.vercel.app`)
     - Comma-separated if you need multiple origins

Or use Blueprint: connect the repo and select `backend/render.yaml`.

### 2. Frontend on Vercel

1. Import the same GitHub repo into Vercel.
2. Settings:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Environment variable:
   - `VITE_API_URL` = your Render URL (e.g. `https://your-api.onrender.com`)
4. Redeploy after setting env vars.

### 3. Wire CORS

After both URLs exist:

1. Set Render `FRONTEND_ORIGIN` to the Vercel URL.
2. Set Vercel `VITE_API_URL` to the Render URL.
3. Redeploy both if needed.

## Notes

- Free Render services may sleep after idle time; the first request can be slow.
- Vite only exposes env vars prefixed with `VITE_`.
- Keep secrets out of the frontend; use the backend for anything sensitive.
