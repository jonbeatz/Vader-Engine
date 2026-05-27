# {{PROJECT_NAME}} — Task Manager Template

> **Vader Engine** · **Template blueprint** · Port **{{PORT}}** · Payload v3 + Next.js (clients + tasks CRM stubs)

## Setup

```bash
cp .env.example .env.local
# Set PAYLOAD_SECRET in .env.local
npm install
npm run dev
```

- App: port **{{PORT}}**
- Admin: `http://127.0.0.1:{{PORT}}/admin` (adjust host if `MSC_PUBLIC_ORIGIN` differs)

### Demo data

| Command | When to use |
| --- | --- |
| *(automatic)* `postinstall` | First install or empty DB |
| `npm run seed` | Re-run seed if collections were cleared |
| `npm run seed:fresh` | Wipe `database/payload.db*` and re-insert mock rows |
| `MSC_SKIP_SEED=1 npm install` | CI / no local DB writes |

## Configuration

| Item | Value |
| --- | --- |
| Database | SQLite `database/payload.db` |
| CMS | Payload v3 + `@payloadcms/next` |
