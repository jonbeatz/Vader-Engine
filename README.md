# Boilerplate-v2.3.0

[![Grade](https://img.shields.io/badge/grade-52%2F52-brightgreen)](https://github.com/jonbeatz/Boilerplate-v2)
[![CI](https://github.com/jonbeatz/Boilerplate-v2/actions/workflows/ci.yml/badge.svg)](https://github.com/jonbeatz/Boilerplate-v2/actions/workflows/ci.yml)
[![Node](https://img.shields.io/badge/node-20%7C24-339933)](https://nodejs.org/)
[![Cursor](https://img.shields.io/badge/Cursor-optimized-blueviolet)](https://cursor.sh/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**v2.3.0 — VaderLabz Template** — Production-ready, self-validating, Cursor-native development foundation with Vader Protocol site template and Hostinger deploy path.

| Link | Destination |
| --- | --- |
| **Quick start** | [#quick-start](#quick-start) |
| **Documentation** | [#documentation-map](#documentation-map) · [DOCS.md](DOCS.md) · [START-HERE.md](START-HERE.md) |

| Field | Value |
| --- | --- |
| **Version** | v2.3.0 |
| **Release date** | May 24, 2026 (VaderLabz Template) |
| **Ecosystem grade** | 52/52 (100%) — verified baseline |
| **Repository** | [github.com/jonbeatz/Boilerplate-v2](https://github.com/jonbeatz/Boilerplate-v2) |
| **Node** | 20.x LTS (pinned) · 24.x supported via runtime guard |
| **Package manager** | npm ≥ 10 |

---

## Overview

**Boilerplate-v2** is a highly disciplined, self-governing starter kit for rapid, production-grade development with [Cursor](https://cursor.sh/). Clone it, run one bootstrap command, and be fully operational in minutes — not hours.

Designed as an **empty-folder replacement engine**, it combines deep AI integration (rules, skills, MCP), automated validation, security guardrails, and isolated sandboxes so frameworks never pollute the root workspace.

### Core principles

| Principle | What it means |
| --- | --- |
| **Lean Boundary Rule** | Root orchestrates scripts only. Frameworks and data live in isolated `examples/*` sandboxes. Blueprints scaffold to sibling `--target` paths via `msc:template`. |
| **Self-validating** | 52-point automated integrity grader (`npm run grade`) with hard non-zero exits on failure. |
| **Vader Protocol Shield** | Strict `msc-` namespace + Studio Dark design tokens for total CSS isolation from themes and Divi. |
| **Cursor-first** | Modular `.mdc` rules, agent skills, portable MCP config, and operator/agent documentation paths. |
| **Zero-leak security** | Credentials in untracked `.env.local` only; committed templates use `YOUR_*` / `CHANGE_ME` placeholders. |

---

## Stack support

| Target | Technology | Entry | Port |
| --- | --- | --- | --- |
| **Minimal frontend** | Next.js 15.5.7 + TypeScript + Vitest | `examples/nextjs-minimal/` | **3000** |
| **Full-stack CMS** | Next.js 15.4.11 + Payload CMS v3 + SQLite | `examples/nextjs-payload/` | **3001** |
| **WordPress Shield** | PHP + Divi isolation layer | `core/msc-bootstrap.php` | — |

PHP never installs via npm. The WordPress layer enforces CSS namespace isolation (`msc-` prefix) to prevent theme and plugin conflicts on Divi-based sites.

Token single source of truth: `ui/msc-shield.css`. The v2 isolation contract is documented in `ui/studio-dark-shield.css`.

---

## What's new in v2.3.0

### VaderLabz Template

- **`templates/full-stack/vader-site`** — production Next.js 15 site with optional Payload CMS, static-first by default
- **`vader.css` architecture** — single component stylesheet; zero CSS modules and zero inline styles in TSX
- **Vader Protocol skills** — `.cursor/skills/vader_protocol_skill.md` and `vader_animations_skill.md` for on-brand AI builds
- **Hostinger deploy path** — `DEPLOY_TO_HOSTINGER.md`, `prep-hostinger-deploy.sh`, and `vader-site-deploy/` artifact workflow
- **Live proof** — https://vaderlabz.com

```bash
npm run msc:template -- apply full-stack/vader-site --name="My Site"
# default output: ../Dev-Projectz/my-site — dev on port 3003
```

Full operator guide: [HOW-TO.md — Template & Scaffolding System](.cursor/docs/HOW-TO.md#-the-template--scaffolding-system-v230) · [DEPLOY_TO_HOSTINGER.md](DEPLOY_TO_HOSTINGER.md)

---

## Vader Protocol Design System

All VaderLabz UI is governed by two Cursor-native skill files in `.cursor/skills/`:

| Skill | Purpose |
| --- | --- |
| `vader_protocol_skill.md` | Colors, typography, layout, components |
| `vader_animations_skill.md` | Keyframes, hover effects, entrance animations, atmospheric effects |

Reference these in any Cursor prompt with: *"follow vader_protocol_skill and vader_animations_skill"*

---

## Deploy to Hostinger

Static-first VaderLabz sites deploy to Hostinger Node.js via a dedicated GitHub repo and PM2 profile. Full click-by-click workflow:

**[DEPLOY_TO_HOSTINGER.md](DEPLOY_TO_HOSTINGER.md)**

Prep script: `scripts/prep-hostinger-deploy.sh` (copies scaffold output to `vader-site-deploy/`, gitignored here).

---

## Template blueprints

| Template | Description | Port |
| --- | --- | --- |
| `frontend/portfolio` | Vader Shield portfolio scaffold (Path A) | dynamic |
| `cms/divi-bridge` | WordPress/Divi 4 bridge | — |
| `full-stack/task-manager` | Payload CRM collection stubs | dynamic |
| `full-stack/vader-site` | Vader Protocol Next.js 15 site with optional Payload CMS | **3003** |

---

## What's new in v2.1.0 Gold Master

### Major upgrades (v2.0 → v2.1)

- **52-point self-grader** — expanded from 38 checks; strict CI and pre-push enforcement
- **Biome** — unified linter and formatter (replaces Prettier)
- **Interactive onboarding** — `npm run msc:onboard` guided first-run wizard
- **Advanced Shield System** — `msc:shield:audit`, `msc:new:component`, and `msc:ingest` asset parser
- **Enhanced Payload sandbox** — production secret guards, SQLite isolation, mock media pipeline
- **Node 20 & 24 support** — runtime guard in `scripts/lib/msc-node-version-guard.mjs`
- **Docker Compose** — opt-in Postgres/Redis service mirroring for production-like local dev
- **Documentation suite** — `ARCHITECTURE.md`, `TROUBLESHOOTING.md`, `CONTRIBUTING.md`, modular Cursor rules
- **Full CI pipeline** — validate-env → verify MCP → lint → grade → root tests → sandbox builds → Playwright E2E

### Foundation (carried forward from v2.0)

- **Portable MCP layer** — `.cursor/mcp.json` uses `${workspaceFolder}` tokens, not hardcoded paths
- **Defensive environment scan** — `scripts/validate-env.mjs` blocks credential commits
- **Health dashboard** — `npm run msc:health` probes ports 3000, 3001, 8080; supports `--json`
- **Safe re-branding** — `npm run msc:forge` with protected namespace regex and `--dry-run`
- **Git commit gates** — Husky + lint-staged + validate-env on every commit
- **Codespaces ready** — `.devcontainer/devcontainer.json` auto-bootstraps in cloud shells
- **Cross-platform scripts** — Windows-safe path handling throughout `scripts/`

Full release notes: [CHANGELOG.md](CHANGELOG.md)

---

## Quick start

**Recommended — interactive onboarding:**

```bash
git clone https://github.com/jonbeatz/Boilerplate-v2.git my-project
cd my-project
npm run msc:onboard
```

**Manual bootstrap:**

```bash
npm run bootstrap
```

**Start a sandbox:**

```bash
npm run msc:dev:example    # Minimal Next.js frontend → :3000
npm run msc:dev:payload    # Full-stack Payload CMS   → :3001
```

**Payload sandbox — first-time env setup:**

```bash
cp examples/nextjs-payload/.env.example examples/nextjs-payload/.env.local
# Set PAYLOAD_SECRET in examples/nextjs-payload/.env.local
npm run msc:dev:payload
```

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) if bootstrap or ports fail.

### What happens on first run

- Hydrates root and sandbox `node_modules`
- Generates `.env.local` files from structural blueprints
- Runs credential scan to verify zero secret leaks
- Executes Vitest suites and self-validation frameworks
- Clears conflicting dev-server ports (3000, 3001, 8080)

---

## Commands reference

### Lifecycle & setup

| Command | Purpose |
| --- | --- |
| `npm run msc:onboard` | Interactive guided first-time setup |
| `npm run bootstrap` | Full workspace bootstrap + port cleanup |
| `npm run msc:quickstart` | Asset copies, credential checks, hydration |
| `npm run msc:validate-env` | Secret leak and placeholder audit |
| `npm run msc:kill-dev-port` | Purges ports 3000, 3001, and 8080 |

### Development

| Command | Purpose |
| --- | --- |
| `npm run msc:dev:example` | Start minimal frontend (port **3000**) |
| `npm run msc:dev:payload` | Start full-stack CMS sandbox (port **3001**) |
| `npm run msc:health` | System diagnostics dashboard |
| `npm run msc:health -- --json` | Machine-readable health output |
| `npm run dev:recover` | Recover stuck dev server state |

### Quality & validation

| Command | Purpose |
| --- | --- |
| `npm run grade` | **52-point** structural integrity check (must score 100%) |
| `npm run msc:lint` | Biome lint + format validation |
| `npm run msc:lint:fix` | Biome auto-fix |
| `npm run msc:test:all` | Root Vitest + minimal sandbox tests |
| `npm run msc:test:grader` | Grader unit test suite |
| `npm run verify:mcp` | MCP config structure validation |
| `npm run msc:shield:audit` | Verify `msc-` namespace compliance |

### Shield & scaffolding

| Command | Purpose |
| --- | --- |
| `npm run msc:template -- list` | List registered blueprints under `templates/` |
| `npm run msc:template -- apply` | Clone blueprint to `--target` with token substitution |
| `npm run msc:template -- seed` | Write mock JSON payload (`--template`, optional `--target`, `--fresh`) |
| `npm run msc:template -- doctor` | CLI structural health check |
| `npm run msc:new:component` | Generate a Vader-compliant UI component |
| `npm run msc:ingest` | Parse and ingest HTML assets into shield-compliant markup |
| `npm run msc:forge -- <from> <to> <root>` | Safe string replacement with namespace guards |
| `npm run msc:forge -- ... --dry-run` | Simulate renames with zero disk writes |

### Maintenance

| Command | Purpose |
| --- | --- |
| `npm run msc:update` | Scan and bump package versions across workspaces |
| `npm run msc:ensure-lockfiles` | Verify lockfile hygiene in root + sandboxes |
| `npm run msc:e2e` | Playwright multi-sandbox smoke (ports 3000 + 3001) |
| `npm run msc:e2e:install` | Install Playwright chromium + firefox browsers |
| `npm run msc:mock:media` | Seed mock media in Payload sandbox |
| `npm run repair:sqlite` | SQLite repair utilities |
| `npm run clean:next` | Clear Next.js build cache |

---

## Documentation map

| Audience | Start here | Then |
| --- | --- | --- |
| First-time operator | [START-HERE.md](START-HERE.md) | [DOCS.md](DOCS.md) |
| AI agent / Cursor | [Code-Jedi.md](.cursor/docs/Code-Jedi.md) | [TRUTH.md](TRUTH.md) |
| Contributors | [CONTRIBUTING.md](CONTRIBUTING.md) | [ARCHITECTURE.md](ARCHITECTURE.md) |
| System debugging | [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | [HOW-TO.md](.cursor/docs/HOW-TO.md) |
| MCP setup | [mcp-setup.md](.cursor/docs/mcp-setup.md) | `.cursor/mcp.json` |

Architecture diagrams and dependency flow: [ARCHITECTURE.md](ARCHITECTURE.md)

---

## Security & compliance

**Zero-leak environment rules**

- Live credentials live only in untracked `.env.local` files (gitignored).
- Committed templates use hard placeholders (`YOUR_*`, `CHANGE_ME`).
- Pre-commit hooks run `validate-env` and MCP structure checks before every commit.

**Vader Protocol namespaces (protected — never rename via forge)**

| Prefix | Purpose |
| --- | --- |
| `msc-` | Custom layout CSS classes |
| `msc:` | Core script execution tasks |
| `msc_` | Internal backend programming functions |

**Additional guardrails**

- ABSPATH guards pinned to the top of all PHP core modules
- `msc:forge` regex blocklist prevents breaking shield isolation layers
- Lean Boundary Rule enforced by grader and CI

---

## Grade verification

Run the self-grader anytime:

```bash
npm run grade
```

Expected output when healthy:

```
>>> MSC BOILERPLATE INTEGRITY SELF-GRADER <<<

[PASS] Root Level Configuration Artifacts (.nvmrc, package.json, Husky Hooks)
[PASS] Portable Extension Workspace Validation (.cursor/mcp.json Workspace Tokens)
[PASS] UI Guardrail Namespace Validation (ui/studio-dark-shield.css Prefix Rules)
[PASS] Frontend Sandbox Architecture Sweep (Next.js 15.5.7 + Vitest Passing)
[PASS] Diagnostic Engine Integration Check (scripts/health.mjs Core Dash)
[PASS] Workspace Maintenance Assembly Check (scripts/msc-update.mjs Multi-Updater)
[PASS] String Shield Re-Branding Blocklist Verification (scripts/msc-forge.mjs Safety)
[PASS] Isolated Full-Stack Configuration Mapping (payload.config.ts Sandbox Boundaries)
[PASS] Data Sandbox Media Vault Verification (src/collections/MediaVault.ts Specs)
…

--- Final Grade: 52/52 (100%) ---

All checks passed seamlessly. Workspace configuration is certified stable.
```

---

## Network port registry

| Port | Target |
| --- | --- |
| **3000** | `examples/nextjs-minimal` — core frontend baseline |
| **3001** | `examples/nextjs-payload` — full-stack CMS sandbox |
| **8080** | Reserved — microservices or Local WordPress Core Shield bridges |

---

## Peer-dependency note

To maintain the Lean Boundary Rule while satisfying strict package restrictions, sandboxes use a split Next.js layout:

| Workspace | Next.js version | Rationale |
| --- | --- | --- |
| `examples/nextjs-minimal` | `^15.5.7` | Cutting-edge frontend baseline |
| `examples/nextjs-payload` | `15.4.11` (locked) | Satisfies Payload v3.x peer-dependency range |

Workspaces are fully sandboxed — backend version shifts do not affect the core frontend layer.

---

## Roadmap (v2.x)

| Priority | Milestone | Status |
| --- | --- | --- |
| **P2** | VaderLabz site template (`full-stack/vader-site`) | ✅ Shipped in v2.3.0 |
| **P2** | Template scaffolding CLI (`msc:template`) | ✅ Shipped in v2.2.0 |
| **P2** | Component generation (`msc:new:component`) | ✅ Shipped in v2.1.0 |
| **P2** | Docker Compose Postgres/Redis mirroring | ✅ Shipped in v2.1.0 |
| **P2** | Opt-in Tailwind/shadcn sandboxing | Planned |
| **P3** | Playwright E2E multi-sandbox harness | ✅ Shipped in v2.1.0 |
| **P3** | VS Code / Cursor settings sync | ✅ Shipped (`.cursor/settings.json` + `.vscode/`) |
| **P3** | Repo rename (`Boilerplate-v2`) | ✅ Shipped |

---

## Credits

- **Powered by** MSC Media Engine · Vader Protocol — strict namespace isolation certified
- **Cursor-native** — calibrated for Cursor Agent and Composer execution paths
- **Release certified:** v2.3.0 · 52/52 grade · 100% pass rate · production ready

**Operator docs:** [HOW-TO.md](.cursor/docs/HOW-TO.md) · [START-HERE.md](START-HERE.md) · [DOCS.md](DOCS.md) · [Code-Jedi.md](.cursor/docs/Code-Jedi.md)

---

*Made with discipline. Built for velocity.*
