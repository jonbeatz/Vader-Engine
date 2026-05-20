# Project Truth (Constitution)

If any document conflicts with this file for **technical precedence**, this file wins for boilerplate consumers.

## 1. Command authority

- Local port clearance: `scripts/msc-kill-dev-port.mjs` (never ad-hoc `taskkill` without listing listeners).
- HTTP smoke: `scripts/msc-local-http-smoke.mjs` on `MSC_DEV_PORT` (default **3000**).
- AI proxy ports: **4000** / **8000** per `local-ai-proxy-setup.md` — separate from web dev.

## 2. Fix local first

Reproduce on the operator machine before cloud deploy. Backup SQLite before schema repair. Never commit secrets or live MCP tokens.

## 3. Doc hierarchy

1. This file (`TRUTH.md`)
2. `.cursorrules` (session bindings)
3. `.cursor/docs/ecosystem-options-matrix.md` (env strategies)
4. Skill runbooks under `.cursor/skills/`
5. `project-log.md` / `incident-log.md` (session history)

## 4. UI constants (Studio Dark baseline)

- Background: `#121212`
- Surface: `#1c1c1c`
- Accent default: `#e02b20` (override via `msc-theme-accent-*` in extensions CSS)
- Border: `#2d2d2d`

Canonical tokens live in `ui/msc-shield.css`. Extensions are opt-in (`MSC_SHIELD_EXTENSIONS=1`).

## 5. Data safety

- `DATABASE_URI` and `DATABASE_URL` must reference the same SQLite file in dev.
- Drizzle push: use `msc_resolveSqlitePush()` — do not force push on existing DBs without intent.
- WAL sidecars: purge before FTP/deploy copy (`scripts/msc-sqlite-wal-purge.mjs`).

## 6. Agent tooling

MCP project layer: `.cursor/mcp.json`. Extended catalog: `mcp-setup.md`, `mcp-blueprint.json`. Verify structure with `scripts/msc-verify-mcp.mjs`.

## 7. Additive-only boilerplate

New capabilities ship as **stubs or env-gated scripts**, not forced defaults. Consumer apps merge `config/npm-scripts-appendix.json` aliases locally.
