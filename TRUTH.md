# Project Truth (Constitution)

If any document conflicts with this file for **technical precedence**, this file wins for boilerplate consumers.

**Version target:** Boilerplate-v2.1.0 Gold Master — lean multi-runtime Node.js ecosystem (20.x LTS + 24.x supported) with dual Next.js sandboxes, 52-point self-grader, and WordPress Shield bridge.

## 0. v2 guiding principles

- **Human root layer:** `TRUTH.md`, `README.md`, `START-HERE.md`, `DOCS.md` — operator control panel; no heavy app frameworks at repo root.
- **Agent layer:** `.cursor/` — portable MCP via `${workspaceFolder}` in `.cursor/mcp.json`; rules, skills, and docs under `.cursor/docs/`.
- **Automation layer:** `scripts/` — all entry points import `scripts/lib/msc-load-env.mjs` first; uniform `msc:` npm script prefix.
- **Examples layer:** `examples/` — living sandboxes: `nextjs-minimal/` on port **3000**, `nextjs-payload/` on port **3001**; dependencies stay scoped to example folders.
- **UI layer:** `ui/` — Studio Dark Shield; token SSoT in `msc-shield.css`; v2 isolation contract in `studio-dark-shield.css`; strict `msc-` CSS prefix.
- **Zero-leak:** `.env.example` = structural contract only; live keys in `.env.local` (gitignored); pre-commit runs lint-staged, `validate-env`, and `verify:mcp`.
- **Clone-to-productive:** `npm run msc:onboard` or `npm run bootstrap` → `npm run msc:dev:example` within **≤ 10 minutes** on a fresh clone.
- **Self-validating:** `npm run grade` — **52 checks**, hard non-zero exit; pre-push runs grade + root Vitest.
- **Naming:** `msc-`, `msc:`, `msc_` on all custom code; signature *Powered by the MSC Media Engine* where appropriate.

## 1. Command authority

- **All default dev ports:** `scripts/msc-kill-all-dev-ports.mjs` via `npm run msc:kill-dev-port` (3000, 3001, 8080).
- **Single port kill:** `scripts/msc-kill-dev-port.mjs` via `npm run msc:kill -- <port>` (never ad-hoc `taskkill` without listing listeners).
- HTTP smoke: `scripts/msc-local-http-smoke.mjs` on `MSC_DEV_PORT` (default **3000**).
- AI proxy ports: **4000** / **8000** per [local-ai-proxy-setup.md](.cursor/docs/local-ai-proxy-setup.md) — separate from web dev.

## 2. Fix local first

Reproduce on the operator machine before cloud deploy. Backup SQLite before schema repair. Never commit secrets or live MCP tokens.

## 3. Doc hierarchy

1. This file (`TRUTH.md` at repository root)
2. `.cursor/rules/global.mdc` (session bindings — alwaysApply)
3. `.cursor/docs/ecosystem-options-matrix.md` (env strategies)
4. Skill runbooks under `.cursor/skills/`
5. `.cursor/docs/project-log.md` / `.cursor/docs/incident-log.md` (session history)

## 4. UI constants (Studio Dark baseline)

- Background: `#121212`
- Surface: `#1c1c1c`
- Accent default: `#e02b20` (override via `msc-theme-accent-*` in extensions CSS)
- Border: `#2d2d2d`

**Token SSoT:** `ui/msc-shield.css` only. **v2 isolation contract:** `ui/studio-dark-shield.css`. Satellites: `ui/msc-layout.css`, `ui/msc-components.css`, `ui/msc-[feature].css`. Barrel: `ui/msc-shield-load.css`. Extensions opt-in (`MSC_SHIELD_EXTENSIONS=1`).

**Consumer paths:** Path A Shield-only (dashboards/WordPress) · Path B hybrid Tailwind/shadcn — [consumer-bootstrap.md](.cursor/docs/consumer-bootstrap.md) §6 · skill [studio-dark-shield.md](.cursor/skills/studio-dark-shield.md).

**Shield tooling:** `npm run msc:shield:audit`, `msc:new:component`, `msc:ingest`.

**Rules:** [studio-dark-ui.mdc](.cursor/rules/studio-dark-ui.mdc), [design-system-rules.mdc](.cursor/rules/design-system-rules.mdc), [tailwind-shadcn-bridge.mdc](.cursor/rules/tailwind-shadcn-bridge.mdc) — index [rules/README.md](.cursor/rules/README.md).

## 5. Data safety

- `DATABASE_URI` and `DATABASE_URL` must reference the same SQLite file in dev.
- Drizzle push: use `msc_resolveSqlitePush()` — do not force push on existing DBs without intent.
- WAL sidecars: purge before FTP/deploy copy (`scripts/msc-sqlite-wal-purge.mjs`).

## 6. Agent tooling

MCP project layer: `.cursor/mcp.json` (13 servers including `shadcn`, `context7` — no keys in committed JSON for those two). **Portability:** filesystem and path-scoped servers must use `"${workspaceFolder}"`, never machine-specific paths. Extended catalog: [mcp-setup.md](.cursor/docs/mcp-setup.md), `mcp-blueprint.json`. Verify: `npm run verify:mcp`.

**Zero-leak:** Placeholders (`YOUR_*`) in committed `mcp.json` are intentional. Live values only in `.env.local` / Cursor MCP UI — never commit or paste into chat.

## 7. Additive-only boilerplate

New capabilities ship as **stubs or env-gated scripts**, not forced defaults. Consumer apps merge `config/npm-scripts-appendix.json` aliases locally.
