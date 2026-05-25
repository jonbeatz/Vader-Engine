# {{PROJECT_NAME}} (Full-Stack Task Manager Engine)

Payload v3 + Next.js task & client vault (msc-clients, msc-tasks).

## Quick start

1. Copy `.env.example` to `.env.local` and set `PAYLOAD_SECRET`.
2. `npm install` — runs **postinstall** seeder (demo clients + tasks into SQLite)
3. `npm run dev` — app on port **{{PORT}}** · Admin at `/admin`

### Demo data

| Command | When to use |
|---------|-------------|
| *(automatic)* `postinstall` | First install or when DB is empty — idempotent skip if data exists |
| `npm run seed` | Re-run seed if collections were cleared |
| `npm run seed:fresh` | Wipe `database/payload.db*` and re-insert mock rows |
| `MSC_SKIP_SEED=1 npm install` | CI / no local DB writes |
| `MSC_SEED_FRESH=1 npm run seed` | Same as `seed:fresh` via env |

## Configuration Profiles
- **Database Engine:** Local SQLite (`database/payload.db`)
- **Core CMS Layer:** Payload v3 + `@payloadcms/next`
- **Operational Interface:** Port `{{PORT}}`
