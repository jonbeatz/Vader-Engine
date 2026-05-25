# Changelog

## [Unreleased]

### Repository (post–v2.4.0)

- **GitHub canonical slug:** [jonbeatz/Boilerplate](https://github.com/jonbeatz/Boilerplate) (renamed from `Boilerplate-v2`; version titles such as **Boilerplate-v2.4.0** unchanged)
- **Clone:** `git clone https://github.com/jonbeatz/Boilerplate.git my-project`
- **Internal URL sweep:** README badges, `package.json` `repository.url`, HOW-TO clone block, templates, and operator docs — historical `CHANGELOG` / `docs/releases/` / `.github/RELEASE-v2.*` entries preserved
- **Remote hygiene (Phase E):** removed 10 stale Dependabot branches; deleted obsolete `phase-*` tags (`phase-2-pass` … `phase-6b-pass`); retained release tags `v2.1.0`–`v2.4.0` only
- **Operator checklist:** enable GitHub **Automatically delete head branches** (Settings → General → Pull Requests); About description per [CONTRIBUTING.md](CONTRIBUTING.md#github-repository-about-manual)

### Tooling (maintainer automation)

- **`npm run msc:github:sync`** — `gh repo edit` + `delete_branch_on_merge` via GitHub CLI (slug from `package.json`)
- **`msc:test:root`** — now runs `npm audit --production` before Vitest (pre-push gate)

### Verified

- `npm run msc:lint` · `npm run grade` **60/60** · `msc:test:root` **8/8** (audit + tests)

---

## [2.4.0] - 2026-05-24 (60-Point Grader & Ecosystem Hardening)

### Grader

- Expanded structural audit from **52** to **60** checks — Vader template assets, release doc alignment, Hostinger deploy doc, static-first env default, CSS module ban, Biome folder-ignore contract
- README, DOCS, HOW-TO, TRUTH, and CONTRIBUTING reference **60/60** gate

### Documentation

- [examples/README.md](examples/README.md) — living sandboxes index; standardized README headers across `examples/*` and `templates/*`
- Root README Stack section links to examples index

### Security & contributor workflow

- [.github/dependabot.yml](.github/dependabot.yml) — weekly npm monitoring (root + both Next.js sandboxes)
- GitHub issue templates (bug, feature) and pull request template (Vader Protocol checklist)
- CONTRIBUTING: template factory guide, Dependabot review steps, issue/PR template table

### Repository hygiene (Phases C–D)

- Release notes relocated to `docs/releases/`; grader path updated
- `docs/assets/` index; example `.env.example` coverage; `validate-env` scans sandbox templates
- Local design captures gitignored under `.cursor/design_references/*.jpg` (etc.)

### Grade

- **60/60 (100%)**

---

## [2.3.1] - 2026-05-25 (Polish & Zero Warnings)

### Documentation and UX

- README **Live proof** hero image (`media/readme/vaderlabz-hero-reference.jpg`), **Version** and **Live demo** badges, documentation map links to [vaderlabz.com](https://vaderlabz.com)
- **Pre-tag ritual** in [HOW-TO.md](.cursor/docs/HOW-TO.md) and [CONTRIBUTING.md](CONTRIBUTING.md) — `msc:lint` → `grade` → `msc:test:root` before tags
- Root `.env.example` PORT nudge and pointer to `templates/full-stack/vader-site` default port **3003**
- GitHub About: website `https://vaderlabz.com`, docs link in description

### Quality

- **Biome:** zero warnings across repo (reviewed `--unsafe` fixes in scripts + UI)
- **CI lesson:** Biome 2.2.0+ folder ignores must not use trailing `/**` (`!templates` not `!templates/**`)

### Grade

- **Maintained:** **52/52 (100%)**

---

## [2.3.0] - 2026-05-24 (VaderLabz Template)

### New Features
- **Template Factory**: Added `templates/full-stack/vader-site/` — a production-ready Next.js 15 site template with optional Payload CMS integration, seeded with VaderLabz baseline data (3 projects + 16 stack items)
- **Vader Protocol CSS Architecture**: Introduced `vader.css` as the single source of truth for all component styles — replaces `page.module.css`, eliminates all inline styles, zero CSS module imports in TSX
- **Animation System**: Implemented full `vader_animations_skill.md` — staggered hero entrance (fadeInUp with 0.15s delays), flicker on hero title (6s), pulse-red on CTAs (3s), card top-border scaleX reveal on hover, nav underline slide-in via ::after, pulse-green status dot
- **BackToTop Component**: New `'use client'` component with scroll-triggered visibility at 400px, Vader Protocol styling, smooth scroll, positioned above footer
- **Boot Screen**: Optional `BootScreen.tsx` component for dramatic page load sequence with progress bar
- **useInView Hook**: Scroll-triggered section entrance animations via Intersection Observer
- **Cursor Skills**: Two new Cursor-native skill files added to `.cursor/skills/` for permanent design system memory

### Architecture
- Decoupled Payload/CMS via `ENABLE_PAYLOAD` environment flag — static-first by default, full CMS on demand
- `scripts/prebuild-static.mjs` — stashes Payload modules for static builds, restores for CMS builds
- `scripts/deploy-prep.sh` — strips dev artifacts, writes `.env.production`, prepares GitHub-ready deploy package
- `scripts/dev-fresh.mjs` — fixed ENABLE_PAYLOAD environment mismatch that caused webpack runtime error `a[d] is not a function`
- `scripts/prep-hostinger-deploy.sh` — copies `vader-site` into `vader-site-deploy/`, validates `next` in dependencies, produces clean GitHub-ready output
- `scripts/postinstall.mjs` — no-op in static mode, seeds DB in CMS mode
- `pm2.config.js` — Hostinger PM2 profile (ENABLE_PAYLOAD=false, port 3003, 0.0.0.0 binding)

### Deployment
- `DEPLOY_TO_HOSTINGER.md` — step-by-step Hostinger Node.js GitHub repo deployment workflow
- `vader-site-deploy/` artifact strategy — clean deployable folder separate from source, gitignored from Boilerplate
- Verified end-to-end deployment on Hostinger with GitHub auto-deploy connected to `jonbeatz/VaderLabz`
- Live proof: https://vaderlabz.com

### Skills & Documentation
- Added `.cursor/skills/vader_protocol_skill.md` — Vader Protocol design system reference (color tokens, typography, layout rules, component patterns, do's and don'ts)
- Added `.cursor/skills/vader_animations_skill.md` — full animation system reference (all keyframes, applied animations per element, atmospheric effects, performance rules, quick reference table)
- Both skills are Cursor-native and auto-referenced in agent workflows via `.cursorrules`

### Fixes
- Removed scanline legacy code entirely from all templates and live site
- Fixed `dev-fresh.mjs` ENABLE_PAYLOAD environment mismatch causing webpack runtime errors
- Fixed footer `> VADERLABZ` color — resolved CSS specificity war between `vader.css` and `layout.css` using `footer.vader-footer span.vader-footer-brand` full selector with `!important`
- Fixed stale `.next` cache causing ghost CSS to persist in dev — `npm run dev` now always runs `dev-fresh.mjs` first
- Removed all inline `style={{}}` props across all TSX — zero inline styles policy enforced
- Fixed `{{PORT}}` template token not being replaced in scaffolded `package.json`
- Fixed hero layout — `vader-hero-content` uses `max-width: 800px; margin: 0 auto; text-align: left` matching vaderlabz.com exactly

### Grade
- **Maintained:** **52/52 (100%)**

---

## [2.2.0] - 2026-05-24 (Template Scaffolding CLI)

### Major Features

**Template & Scaffolding CLI (`tools/msc-cli/`)**
- New `npm run msc:template` entry with subcommands: `list`, `apply`, `seed`, `doctor`
- Cross-platform blueprint copy via native `node:fs` (`cpSync`) with regex-safe `{{TOKEN}}` injection
- Extension coverage: `.ts`, `.js`, `.mjs`, `.tsx`, `.jsx`, `.json`, `.md`, `.css`, `.env`, `.php`
- Dynamic port assignment (`msc_findFreePort`) starting at **3002** for scaffolded projects
- `--dry-run` mode for zero-disk planning passes

**Read-only blueprint registry (`templates/`)**
- `frontend/portfolio` — Vader Protocol Shield UI (Path A), Next.js-ready scaffold
- `cms/divi-bridge` — WordPress/Divi 4 bridge with `ABSPATH` guard + `core-Divi-Scriptz.js`
- `full-stack/task-manager` — Payload v3 collection stubs (clients + tasks CRM baseline)

**Demo seeding & disk persistence**
- `seed --template=<blueprint>` with optional `--target` and `--fresh` flags
- Writes schema-aligned `seed-payload.json` to explicit `--target` or `.sandbox/` fallback
- Path normalization supports short names (`task-manager`) and full paths (`full-stack/task-manager`)

### Documentation & Tooling
- HOW-TO.md and Code-Jedi.md — Scaffolding Engine Routines (v2.2.0) sections
- `biome.json` — exclude `templates/**` from formatter (mustache tokens in blueprints)
- `.gitignore` — `.sandbox/` runtime seed output quarantined

### Compatibility
- **Zero API breakages** to v2.1.0 Gold Master scripts, sandboxes, MCP, Shield chain, or PHP bootstrap
- **Grader unchanged** — still **52 checks** at **100%** (no new grade rows)

### Grade
- **Maintained:** **52/52 (100%)**

---

## [2.1.0] - 2026-05-23 (Gold Master)

### Major Features & Improvements

**Self-Validating Infrastructure**
- Expanded self-grader from 38 to **52 checks** with strict non-zero exit enforcement
- Added comprehensive structural tests (`vitest.config.ts` + dedicated test suite)
- Integrated Biome as unified linter/formatter (replaced Prettier)
- Enhanced Husky hooks with lint-staged, validate-env, and pre-push grade gate

**Shield & Design System**
- Full Vader Protocol implementation with `msc-` namespace enforcement
- Created `msc-shield-audit`, component generator (`msc:new:component`), and asset ingest parser (`msc:ingest`)
- Studio Dark design tokens + complete CSS isolation layer
- Updated minimal frontend with shield wrapper and clean imports

**Tooling & DX**
- Interactive onboarding script (`npm run msc:onboard`)
- Improved health dashboard with JSON output support
- Hardened `msc:forge` with stronger protected namespace rules
- Node version harmonization (20.x + 24.x support with runtime guard)

**Sandbox & Full-Stack Enhancements**
- Payload CMS sandbox hardening (production secret guard, better SQLite isolation, mock media pipeline)
- Docker Compose opt-in support for Postgres/Redis mirroring
- Lockfile hygiene enforcement across root + all sandboxes
- Improved CI workflow with full sandbox testing

**Documentation & Maintainability**
- Added `ARCHITECTURE.md`, `TROUBLESHOOTING.md`, `CONTRIBUTING.md`, and expanded docs
- Cursor rules migration to modular `.mdc` files (global + focused rules)
- `.vscode/` settings and recommended extensions
- Comprehensive PowerShell + cross-platform command support

**Security & Defensive Programming**
- Strengthened environment validation with real-secret pattern detection
- ABSPATH guards on all PHP files
- MCP portability improvements with `${workspaceFolder}` tokens
- Lean Boundary Rule strictly enforced

### Technical Changes
- Migrated all Node.js built-in imports to `node:` protocol
- Updated `.nvmrc`, devcontainer, and engines field
- Multiple script consolidations and hardening (kill-ports, validate-env, etc.)
- Full FORCE_LOOP verification during upgrade

### Grade
- **Before**: 38/38
- **After**: **52/52 (100%)**

### Documentation (post-release sync)
- Synchronized TRUTH, DOCS, START-HERE, ARCHITECTURE, TROUBLESHOOTING, CONTRIBUTING, Code-Jedi, HOW-TO to v2.1.0 Gold Master
- Full command catalog, CI/pre-push workflow, and 52-point grader references
- Git-README deprecated in favor of root README.md

### P3 polish (100/100 product layer)
- Playwright E2E: `e2e/playwright.config.ts`, `e2e/tests/smoke.spec.ts`, `npm run msc:e2e` in CI
- Deep Cursor settings: `.cursor/settings.json` with AI model bindings
- Repository renamed to `jonbeatz/Boilerplate-v2` with internal URL sweep

### Post-release fixes (2026-05-24)
- CI: committed `examples/nextjs-minimal/package-lock.json` for sandbox `npm ci`
- CI: Payload E2E SQLite — `database/.gitkeep`, dedicated `payload-e2e.db`, mkdir before E2E step
- lint-staged: exclude `package-lock.json` from Biome format pass
- Documentation sweep: E2E, CI pipeline, lockfile, and repo rename parity across catalog

---

## [2.0.0-JEDI] - Previous Baseline
*(Initial Jedi-Master release — see previous changelog entries)*

---

**All notable changes to this project will be documented in this file.**

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
