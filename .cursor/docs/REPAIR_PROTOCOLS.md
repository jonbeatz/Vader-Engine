# Repair Protocols (Generic)

## Runtime (Next.js)

1. `node scripts/msc-kill-dev-port.mjs`
2. Optional: `MSC_DEV_RECOVER_CLEAN=1 node scripts/msc-dev-recover.mjs`
3. `node scripts/msc-verify-next-safe.mjs` before production build
4. Restart dev; run `node scripts/msc-local-http-smoke.mjs`

Do not run `clean:next` while dev listens on `MSC_DEV_PORT` — use safe verify or stop dev first.

## SQLite

1. Stop Payload/dev processes holding the DB.
2. Backup file manually or let `msc-sqlite-repair.mjs` create `*.bak.*`.
3. `MSC_SQLITE_WAL_PURGE=1 node scripts/msc-sqlite-wal-purge.mjs` before deploy copy.
4. Manifest repair: see `sqlite-repair-manifest.md`.

## AST (optional)

Set `MSC_REPAIR_AST=1` and fork `scripts/repair/msc-fix-suspense.mjs` in the consumer repo with real glob targets.

## Auth delete failures

Wire `preflightDeleteAuthUserRows` from `core/msc-payload-auth-delete-preflight.ts` on auth collections' `beforeDelete` hook.
