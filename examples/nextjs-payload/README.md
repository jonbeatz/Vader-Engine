# nextjs-payload — Full-Stack CMS Sandbox

Isolated Payload CMS v3.x + Next.js sandbox. SQLite data files (`*.db`) are gitignored; the `database/` directory is committed via `database/.gitkeep`.

## Next.js pin

**Next.js `15.4.11`** is locked in `package.json` to satisfy Payload v3.x peer-dependency range. Do not bump without verifying Payload compatibility.

## Quick start

```bash
cp .env.example .env.local
# Set PAYLOAD_SECRET in .env.local
npm ci
npm run dev
```

Admin: `http://127.0.0.1:3001/admin` (default `MSC_PUBLIC_ORIGIN`).

## Environment

| Variable | Purpose |
|----------|---------|
| `PAYLOAD_SECRET` | Required in production builds |
| `DATABASE_URI` | Default `file:./database/payload.db` (local dev) |
| `MSC_PUBLIC_ORIGIN` | Default `http://127.0.0.1:3001` |
| `PAYLOAD_DB_PUSH` | Set `false` to disable Drizzle schema push |

**E2E note:** Playwright CI uses `database/payload-e2e.db` (auto-created) — separate from local dev DB.

Powered by the MSC Media Engine.
