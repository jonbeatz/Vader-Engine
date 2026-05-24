# Changelog

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
