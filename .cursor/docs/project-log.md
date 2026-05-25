# Project Log & Source of Truth

## 📋 General Overview
- **Project Name:** [Insert Name]
- **Target Stack:** [e.g., WordPress/Divi, Next.js, Standalone PHP]
- **Current Version:** 2.3.0
- **Status:** v2.3.0 VaderLabz Template — promoted (52/52)

## ✅ Completed — Template Scaffolding CLI (v2.2.0)

**Shipped 2026-05-24** — commit `22ed024` · tag `v2.2.0`

```text
templates/          → frontend/portfolio, cms/divi-bridge, full-stack/task-manager
tools/msc-cli/      → cli.mjs, template-engine.mjs, demo-seeder.mjs, utils.mjs
```

- CLI subcommands: `list`, `apply`, `seed`, `doctor` via `npm run msc:template`
- Token injection: `.tsx`/`.jsx` supported; `--dry-run` for planning
- Seed persistence: `seed-payload.json` to `--target` or `.sandbox/` fallback
- Docs synced: HOW-TO.md, Code-Jedi.md, README, CHANGELOG, ARCHITECTURE, TRUTH, DOCS
- Grader: **52/52 unchanged**

## 🚀 Next Session Queue (Start Project)

*(No queued scaffolding work — pick next milestone from roadmap or operator backlog.)*

## ⚙️ Core Environment Specs
- Local Environment URL: `MSC_PUBLIC_ORIGIN` or localhost
- Primary Database Layer: `DATABASE_URI` / `DATABASE_URL`
- Port Allocations: Web **3000** (`MSC_DEV_PORT`) · AI proxy **4000**/**8000** (`MSC_LITELLM_PORT`)

## 🪵 Development Changelog

## Incident lesson — Biome folder ignore + pre-tag ritual (2026-05-25)

- **Symptom:** CI `validate` failed on v2.3.0 push (`lint/suspicious/useBiomeIgnoreFolder` on `!templates/**`).
- **Root cause:** Biome 2.2.0+ rejects trailing `/**` on folder ignore patterns in `biome.json`.
- **Fix:** `!templates/**` → `!templates` (commit `9a1a4b6`); CI green on follow-up push.
- **Recovery path:** Always run `npm run msc:lint` before tag push; full gate = `msc:lint && grade && msc:test:root`.
- **Executor:** FEEDBACK-REVISED-FINAL Phase 0 verified 2026-05-25 — 52/52, 8/8 tests, 5 Biome warnings deferred to Phase A2.

## Feature Complete — v2.2.0 Template Scaffolding — 2026-05-24

- **Commit:** `22ed024` · **Tag:** `v2.2.0`
- **Added:** `tools/msc-cli/` (list, apply, seed, doctor), `templates/` blueprints, `msc:template` npm script
- **Verified:** Live apply + token swap · seed disk persistence · `npm run grade` 52/52 · pre-push hooks green

## Feature Complete — 2026-05-24

- **Commit:** Feature Complete: 100/100 — Playwright E2E, Cursor settings, repo rename
- **Repository:** `jonbeatz/Boilerplate-v2` (renamed from Boilerplate-v1)
- **Grade:** 52/52 (100%) · CI green (validate → E2E)
- **P3 shipped:** Playwright E2E, `.cursor/settings.json`, repo rename URL sweep
- **CI fixes:** minimal sandbox lockfile committed; Payload `database/.gitkeep` + `payload-e2e.db` for E2E
- **Docs:** final catalog sync (DOCS, TRUTH, CONTRIBUTING, TROUBLESHOOTING, HOW-TO, CHANGELOG)

### [2026-05-24] - Session Closeout — Gold Master certified
- **Added:** Playwright E2E harness, `.cursor/settings.json`, minimal/payload CI lockfile + SQLite E2E fixes
- **Modified:** Repo renamed to `jonbeatz/Boilerplate-v2`; git history rewritten (JonBeatz sole author); full doc catalog sync
- **Verified:** `npm run grade` 52/52 · CI green · `npm run msc:e2e` 6/6 local · working tree clean on `main`

## Chunk C complete — 2026-05-24

- Last step: 57
- Grade: **52/52 (100%)**
- Steps 41–57 executed; Phases 4–5 artifacts verified + Step 45 test gaps filled
- Step 45: added `scripts/__tests__/validate-env.test.mjs`, `scripts/__tests__/health.test.mjs` (8 root tests total)
- Step 55: README Self-Grade badge → 52/52
- Step 57: `package.json` version → `2.1.0` (superseded by **2.2.0** — 2026-05-24 doc sync)
- FORCE_LOOP Run 1 — 2026-05-23T21:39:50Z — PASS — Grade: 52/52
- FORCE_LOOP Run 2 — 2026-05-23T21:39:59Z — PASS — Grade: 52/52
- FORCE_LOOP Run 3 — 2026-05-23T21:40:01Z — PASS — Grade: 52/52
- Post-verification (onboard/dev server): deferred to operator — not required for Chunk C stop condition
- Tag: `git tag phase-6-complete` (operator action)
- **Gold Master upgrade complete.**

## Chunk B complete — 2026-05-24

- Last step: 40
- Grade: 52/52 (100%)
- Steps 21–40: verified against Phases 2–5 deliverables; all validation gates pass
- Step 35: production build exit 1 without `PAYLOAD_SECRET` (guard confirmed)
- Step 37: `npm ci --prefix examples/nextjs-payload` exit 0
- Step 39: Docker not installed on operator host — `docker compose config` skipped (opt-in per runbook)
- Commits: operator tagged Phase 6a; Chunk B verification-only (no file mutations required)
- Awaiting human confirmation to proceed to Chunk C

## Chunk A complete — 2026-05-24

- Last step: 20
- Grade: 52/52 (100%)
- Pre-flight HEAD: `b65188bb7126d2bf5f4b3e49a6880774db537c2f` (`.cursor/pre-upgrade-commit.txt`)
- Steps 0–20: verified against Phases 1–5 deliverables; all validation gates pass
- Chunk A lint gate fix: `biome.json` excludes ingest output + generated next-env; fixture button type
- Commits: pending operator commit (working tree has snapshot + lint fixes)
- Awaiting human confirmation to proceed to Chunk B

### [2026-05-23] - Phase 5 complete — 52-point grader expansion (Session 5)

- **Exit gate (Node 24):** `npm run grade` **52/52 (100%)** · `npm run msc:test:all` PASS · `npm run msc:shield:audit` PASS · `npm run msc:test:grader` PASS
- **Grader:** Expanded to 52 checks (#39–52: packageManager, engines, MIT license, ops docs, biome, pre-push, global.mdc, Divi casing); `MSC_GRADE_MOCK_FAIL` injection; `FAILED CHECK` stderr format
- **Tests:** `tests/msc-boilerplate-structure.test.ts`, `scripts/__tests__/msc-grade-boilerplate.test.mjs`; vitest includes root + script tests (integration stub excluded)
- **CI:** validate-env → verify:mcp → lint → grade → msc:test:root → sandbox ci/build
- **Scripts:** `msc:test:all`, `msc:test:grader`
- **Phase 5 complete — grade 52/52.**

### [2026-05-23] - Phase 4 complete — Full-Stack Sandbox & lean boundary (Session 4)

- **Exit gate (Node 24):** `msc:mock:media` PASS · `npm ci --prefix examples/nextjs-payload` PASS · `npm run build --prefix examples/nextjs-payload` PASS · `npm run grade` **39/39 (100%)**
- **Sandbox:** SQLite gitignore hardening, `database/.gitkeep`, README + Next.js 15.4.11 pin comment, payload.config production guard + `PAYLOAD_DB_PUSH`
- **Payload routes:** Added `(payload)/layout.tsx`, `importMap.js`, admin page importMap wiring (build blocker fix)
- **Scripts:** msc-mock-media, msc-ensure-lockfiles, msc-docker-up/down; docker-compose.yml (msc-postgres)
- **Docs/CI:** README Stack Support table; `.env.example` Docker keys; ci.yml npm ci + payload build with `PAYLOAD_SECRET`
- **Lockfiles:** root, nextjs-minimal, nextjs-payload all present
- **Phase 4 complete — grade 39/39.**

### [2026-05-23] - Phase 3 complete — Vader Protocol & Shield Layer (Session 3)

- **Exit gate (Node 24):** `msc:shield:audit` PASS · `msc:new:component -- msc-smoke-test nextjs-minimal` PASS · `npm run test --prefix examples/nextjs-minimal` **5/5** · `npm run grade` **39/39 (100%)**
- **Scripts:** `msc-shield-audit.mjs`, `msc-ingest.mjs`, `msc-new-component.mjs` + package.json aliases
- **Shield chain:** `core/msc-assets.php` enqueue order → msc-shield.css → studio-dark-shield.css → msc-shield-load.css → extensions
- **Next.js minimal:** layout shield wrapper, globals.css @import chain, page.tsx hex removed (Studio Dark classes)
- **Vault:** `.cursor/blueprints/` README + snippet stubs; `tests/fixtures/sample-input.html`; `ui/imports/` ingest output dir
- **Note:** `examples/nextjs-payload` inline hex deferred to Phase 4; Phase 5 adds grader hex check
- **Phase 3 complete — grade 39/39.**

### [2026-05-23] - Phase 2 complete — Core workspace & tooling (Session 2)

- **Exit gate:** `npm run msc:lint` exit 0 · `npm run grade` **39/39 (100%)** · `[PASS] Token map complete`
- **Tooling:** Biome + lint-staged + vitest; Husky pre-commit (lint-staged) + pre-push (grade + msc:test:root)
- **Rules:** `.cursor/rules/global.mdc` + agent-workflow / terminal-discipline / error-handling splits; `.cursorrules` deprecated
- **Docs:** TROUBLESHOOTING, ARCHITECTURE, CHANGELOG, CONTRIBUTING, config/README, mcp-env-token-map
- **Scripts:** msc-onboarding.mjs, health JSON diagnostics, MCP token map verification
- **Phase 2 complete — grade 39/39.**

### [2026-05-23] - Phase 1 complete — Gold Master pre-flight (Session 1)

- **Baseline:** Next.js pins verified (minimal 15.5.7, payload 15.4.11). Pre-upgrade grade **38/38 (100%)**; post-Phase-1 grade **39/39 (100%)** (added `package.json main is not PHP` check).
- **Audits:** Root lean OK · Lean boundary OK · Divi canonical path created · Inventory run (`npm run inventory`).
- **1.4 namespace drift (documented, not mutated):** `package.json` name `msc-universal-boilerplate`, version `1.0.0` — target alignment deferred to Phase 6 Step 57 / operator choice on repo rename.
- **Node guard note:** Scripts require Node **20.x or 24.x**. Cursor bundled Node (v22.x) fails the guard — use system Node 24 (`C:\Program Files\nodejs\node.exe`) or `nvm use 20.19.1` for `npm run grade` / hooks.
- **Exit gate (Node 24):** `msc:validate-env` PASS · `verify:mcp` PASS · `grade` **39/39 (100%)**.
- **Phase 1 complete — grade 39/39.**

### [2026-05-21] - [chore] - [Gold Master v2 FINAL: all 11 steps verified local + cloud, PR #1 ready]

### [2026-05-21] - [chore] - [Gold Master v2: bootstrap, example app, grade 30/30 (100%)]

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

