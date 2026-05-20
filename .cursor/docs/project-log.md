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

