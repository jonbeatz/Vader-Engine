# Vader Construct Dashboard

Developer operations control plane for **Vader Engine v2.5.0** (Lean Boundary Next.js app).

| Item | Value |
| --- | --- |
| Port | **3010** (`MSC_DASHBOARD_PORT`) |
| Dev | From repo root: `npm run msc:dev:dashboard` |
| UI path | Path B — Tailwind 3 + shadcn; tokens from `ui/msc-shield.css` |

## API routes (Phase 2)

| Route | Method | Backing |
| --- | --- | --- |
| `/api/health` | GET | `msc:health:json` |
| `/api/grade` | GET | `npm run grade` (parsed) |
| `/api/run-script` | POST | Allowlisted root `package.json` scripts |
| `/api/logs` | GET | SSE log buffer from spawns |

Repo root resolution: `process.cwd()` is `ui/dashboard` → `../../` is Vader Engine root.

## Local setup

```bash
cd ui/dashboard
npm install
npm run build
npm run dev -- -p 3010
```

Open http://127.0.0.1:3010
