# {{PROJECT_NAME}} — VaderLabz Site

Next.js 15 + Payload v3 marketing site with Vader Protocol design system.

## Quick start

### Static mode (production / Hostinger — default)

1. Copy `.env.example` → `.env.local` (`ENABLE_PAYLOAD=false`).
2. `npm install` — no database seed.
3. `npm run build` && `npm run start` — port **{{PORT}}**.

### CMS mode (local editing)

1. Set `ENABLE_PAYLOAD=true` in `.env.local` + `PAYLOAD_SECRET` / `DATABASE_URI`.
2. `npm install` — seeds projects + stack when Payload is enabled.
3. `npm run dev` — site + `/admin` on port **{{PORT}}**.

### Hostinger deploy

```bash
bash scripts/deploy-prep.sh
npm ci --omit=dev
ENABLE_PAYLOAD=false npm run build
pm2 start pm2.config.js
```

## CMS collections

| Collection | Slug | Purpose |
|----------|------|---------|
| Projects | `vader-projects` | Portfolio cards (status, tags, GitHub URL) |
| Tech Stack | `vader-stack` | Stack grid labels (`// Next.js`, etc.) |
| Users | `users` | Admin auth |

## Seed commands

| Command | Action |
|---------|--------|
| `npm run seed:fresh` | Wipe DB + re-import vaderlabz.com baseline |
| `npm run seed` | Idempotent seed if empty |

## Deploy

Build: `npm run build` · Start: `npm run start` (port **{{PORT}}**).

Set production env: `PAYLOAD_SECRET`, `DATABASE_URI`, `MSC_PUBLIC_ORIGIN`.
