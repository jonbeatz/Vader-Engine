# Ecosystem Options & Skills Matrix

Selectable strategies — enable via `.env.local` (live) + `.env.example` (contract) at repo root. Scripts auto-hydrate via `scripts/lib/msc-load-env.mjs`. Template repo scripts run in dry-run unless force flags are set.

## Environment toggles

| Variable | Values / type | Strategy | Module / script |
|----------|---------------|----------|-----------------|
| `DATABASE_URI` | `file:...` | SQLite path (primary) | `core/msc-sqlite-path.ts` |
| `DATABASE_URL` | same as URI | Alias for Payload | bridge + scripts |
| `PAYLOAD_SQLITE_PUSH` | `true` / `false` | Force allow/deny Drizzle push | `core/msc-payload-sqlite-push.ts` |
| `PAYLOAD_DB_PUSH` | `true` | Legacy force push | bridge |
| `PAYLOAD_MIGRATING` | `true` | Disable push during migrations | push resolver |
| `MSC_SQLITE_REPAIR_MANIFEST` | path to JSON | Additive column/index repair | `scripts/msc-sqlite-repair.mjs` |
| `MSC_SQLITE_REPAIR_DRY_RUN` | `1` | Repair dry-run | repair script |
| `MSC_SQLITE_WAL_PURGE` | `1` | Delete `-wal` / `-shm` | `scripts/msc-sqlite-wal-purge.mjs` |
| `MSC_RESCUE_EMAIL` / `MSC_RESCUE_PASSWORD` | strings | Admin lockout recovery | `scripts/msc-rescue-admin.mjs` (stub) |
| `MSC_MEDIA_STRATEGY` | `local` / `multi-tenant` / `stream-cdn` | Media pipeline | `core/msc-payload-media-hooks.ts` |
| `MSC_SHIELD_EXTENSIONS` | `1` | Load UI extension CSS | `core/msc-assets.php`, Next import |
| `MSC_CLEAN_NEXT` | `1` | Wipe `.next` caches | `scripts/msc-clean-next-cache.mjs` |
| `MSC_DEV_RECOVER_CLEAN` | `1` | Recover + clean | `scripts/msc-dev-recover.mjs` |
| `MSC_VERIFY_NEXT_RUN_BUILD` | `1` | Run `next build` after safe prep | `scripts/msc-verify-next-safe.mjs` |
| `MSC_SMOKE_RUN_TYPECHECK` | `1` | Start smoke runs `tsc` | `scripts/msc-start-project-smoke.mjs` |
| `MSC_SMOKE_RUN_MIGRATIONS` | path to script | Optional migration check | start-project-smoke |
| `MSC_REPAIR_AST` | `1` | Enable AST repair stub | `scripts/repair/msc-fix-suspense.mjs` |
| `MSC_SMOKE_STRICT` | `1` | Fail smoke when dev port not listening | `msc-local-http-smoke.mjs` |
| `MSC_DEV_PORT` | port | Kill/smoke/hook guard | all gate scripts |

## npm script aliases (consumer `package.json`)

Canonical registry: root `package.json`. Mirror copy: `config/npm-scripts-appendix.json` for consumer merges.

| Alias | Command |
|-------|---------|
| `repair:sqlite` | `node scripts/msc-sqlite-repair.mjs` |
| `db:wal-purge` | `MSC_SQLITE_WAL_PURGE=1 node scripts/msc-sqlite-wal-purge.mjs` |
| `db:rescue-admin` | `node scripts/msc-rescue-admin.mjs` |
| `dev:recover` | `node scripts/msc-dev-recover.mjs` |
| `clean:next` | `MSC_CLEAN_NEXT=1 node scripts/msc-clean-next-cache.mjs` |
| `verify:next:safe` | `node scripts/msc-verify-next-safe.mjs` |
| `verify:local` | `node scripts/msc-local-http-smoke.mjs` |
| `start-project:smoke` | `node scripts/msc-start-project-smoke.mjs` |
| `repair:ast` | `MSC_REPAIR_AST=1 node scripts/repair/msc-fix-suspense.mjs` |
| `media:sync` | `node scripts/msc-core-sync.mjs` |
| `verify:mcp` | `node scripts/msc-verify-mcp.mjs` |

## Skills & rules routing

| Task | Invoke |
|------|--------|
| SQLite backup / repair | `local-data-operations.md` + `sqlite-repair-manifest.md` |
| Port / cache recovery | `node-runtime-mastery.md` + `local-runtime-recovery.mdc` |
| Media strategy | `media-strategy-specs.md` |
| MCP setup | `mcp-setup.md` |
| Constitution / precedence | `TRUTH.md` |
| Incident | `incident-response.md` prompt |
| Refactor | `refactor-protocol.md` prompt |
| UI Path A (Shield) | `studio-dark-shield.md` + `msc-shield-load.css` + satellites |
| UI Path B (hybrid) | `tailwind-shadcn-bridge.mdc` + MCP `shadcn` / `context7` |
| UI extensions | `MSC_SHIELD_EXTENSIONS=1` + `msc-shield-extensions.css` |
| Design tokens | `design-system-rules.mdc` — hex only in `msc-shield.css` |

## Hooks (optional)

Enable `.cursor/hooks.json` in the consumer repo copy. Blocks `clean:next` while `MSC_DEV_PORT` is listening.
