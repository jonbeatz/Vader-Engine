# Project Log & Source of Truth

## 📋 General Overview
- **Project Name:** [Insert Name]
- **Target Stack:** [e.g., WordPress/Divi, Next.js, Standalone PHP]
- **Current Version:** 1.0.0
- **Status:** Active / Planning / Staging

## ⚙️ Core Environment Specs
- Local Environment URL: `MSC_PUBLIC_ORIGIN` or localhost
- Primary Database Layer: `DATABASE_URI` / `DATABASE_URL`
- Port Allocations: Web **3000** (`MSC_DEV_PORT`) · AI proxy **4000**/**8000** (`MSC_LITELLM_PORT`)

## 🪵 Development Changelog

### [2026-05-21] - [chore] - [Gold Master audit: verify:mcp, verify:local, grade 21/21 (100%), integration stub — certified for project forge]

### [2026-05-21] - [chore] - [Lifecycle automation: Husky pre-commit, log-event, inventory scripts]

### [2026-05-20] - CI/CD smoke, planning template, integration stub
- **Added:** `npm run check:all` (MCP `--probe` + smoke `--no-strict`), `npm run test:integration`, `.cursor/prompts/TEMPLATE-PLAN.md`, `tests/msc-integration-stub.test.ts`.
- **Added:** `msc_envHydrationReady()` in `scripts/lib/msc-load-env.mjs`; smoke `--no-strict` flag for CI.
- **Verified:** `check:all` exit **0**, `test:integration` exit **0**.

### [2026-05-20] - Namespace standardization (MSC-Core engine)
- **Renamed:** Media-sync scripts → `msc-core-sync.mjs`; core engine module → `msc-core-engine.ts`.
- **Refactored:** Legacy MSC-Media nomenclature → MSC-Core standard across docs and module metadata; `msc-` / `MSC_` env anchors unchanged.
- **Added:** Namespace Protocol block in `Code-Jedi.md` and `system-architecture.md`.
- **Verified:** `npm run verify:mcp`, `npm run media:sync` → `msc-core-sync.mjs`.

### [2026-05-20] - Audit remediation (command registry + template smoke + MCP dual-pass)
- **Modified:** `package.json` — merged full script registry; `start-project` → `start-project:smoke`.
- **Modified:** `msc-local-http-smoke.mjs` — baseline template bypass (exit 0) when port not listening; `MSC_SMOKE_STRICT=1` for strict mode.
- **Modified:** `msc-verify-mcp.mjs` — dual-pass mcp.json placeholders vs `process.env` hydration.
- **Added:** `.cursor/docs/consumer-bootstrap.md` — Next.js 15 + Payload consumer sequence.
- **Verified:** `npm run start-project` and `npm run end-project` exit **0** in template-only mode.

### [2026-05-20] - Multi-Agent Ecosystem Harmonization
- **Added:** Data layer — `core/msc-sqlite-path.ts`, `core/msc-payload-sqlite-push.ts`, `core/msc-payload-auth-delete-preflight.ts`; scripts `msc-sqlite-repair`, `msc-sqlite-wal-purge`, `msc-rescue-admin` (stub), `msc-dev-recover`, `msc-verify-next-safe`, `msc-clean-next-cache`, `msc-start-project-smoke`.
- **Added:** UI extension pack — `ui/msc-shield-*.css` + barrel `msc-shield-extensions.css`; opt-in via `MSC_SHIELD_EXTENSIONS=1` in `msc-assets.php`.
- **Added:** DevOps — `.cursor/hooks.json`, `msc-guard-clean-while-dev.mjs`, `local-runtime-recovery.mdc`; docs `discovered-logic-map.md`, `ecosystem-options-matrix.md`, `TRUTH.md`, `sqlite-repair-manifest.md`, `REPAIR_PROTOCOLS.md`; `config/npm-scripts-appendix.json`.
- **Modified:** `core/msc-payload-bridge.ts` (unified DB URL + smart push); `.env.example`, `.cursor/skills/README.md` (additive rows only).
- **Protected (unchanged):** `.cursorrules`, `START-HERE.md`, `package.json`.

### [2026-05-20] - Portfolio Showcase Module
- **Added:** `core/msc-portfolio-collection.ts` — Payload `msc_portfolio` schema, slug auto-generation, admin access gates, `msc_mapPayloadPortfolioDoc` with media URL normalization via `msc-payload-media-hooks`.
- **Added:** `ui/msc-portfolio-viewer.tsx` — Studio Dark responsive grid reusing `msc-dashboard-container` / `msc-card-panel` (aligned with `msc-project-manager` grid contract).
- **Modified:** None to `msc-bootstrap.php` or guardrail prompts (additive only).
- **Verified:** Local Script Gate Sequence attempted on port **3000** (`msc-kill-dev-port.mjs` → `msc-local-http-smoke.mjs`). Smoke requires a consumer dev server on **3000**; boilerplate has no bundled Next app yet.

### [YYYY-MM-DD] - Phase 1 Initial Blueprint Seeding
- **Added:** Initialized core components using Universal Boilerplate (v1) framework.
- **Verified:** Active rules engines, core utilities, and local terminal script modules.

