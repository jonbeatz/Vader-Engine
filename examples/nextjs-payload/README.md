# nextjs-payload — Full-Stack CMS Sandbox

Isolated Payload CMS v3.x + Next.js sandbox. SQLite data lives in `database/payload.db` (gitignored).

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
| `DATABASE_URI` | Default `file:./database/payload.db` |
| `MSC_PUBLIC_ORIGIN` | Default `http://127.0.0.1:3001` |
| `PAYLOAD_DB_PUSH` | Set `false` to disable Drizzle schema push |

Powered by the MSC Media Engine.
