# Changelog

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

---

## [2.0.0-JEDI] - Previous Baseline
*(Initial Jedi-Master release — see previous changelog entries)*

---

**All notable changes to this project will be documented in this file.**

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).