# Vader Engine v2.5.0

> **In one line:** Bootstrap a production-hardened, Cursor-native ecosystem in minutes: The v2.5.0 Vader Protocol foundation features an autonomous 61-point integrity grader, triple-sandbox modularity (Payload CMS + Tailwind/shadcn + WordPress shield), and zero-leak security — engineered for absolute environmental consistency.

[![Grade](https://img.shields.io/badge/grade-61%2F61-brightgreen)](https://github.com/jonbeatz/Vader-Engine)
[![CI](https://github.com/jonbeatz/Vader-Engine/actions/workflows/ci.yml/badge.svg)](https://github.com/jonbeatz/Vader-Engine/actions/workflows/ci.yml)
[![Version](https://img.shields.io/badge/version-2.5.0-red)](https://github.com/jonbeatz/Vader-Engine/releases)
[![Live demo](https://img.shields.io/badge/demo-vaderlabz.com-c0392b)](https://vaderlabz.com)
[![Node](https://img.shields.io/badge/node-20%7C24-339933)](https://nodejs.org/)
[![Cursor](https://img.shields.io/badge/Cursor-optimized-blueviolet)](https://cursor.sh/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**v2.5.0 — Vader Protocol Locked.** Production-hardened, self-validating, Cursor-native foundation: 61-point Automated Integrity Assurance, triple-sandbox architecture (Payload/Tailwind/WordPress), Dependabot, and zero-leak security.

| Link | Destination |
| --- | --- |
| **Quick start** | [#quick-start](#quick-start) |
| **Documentation** | [#documentation-map](#documentation-map) · [DOCS.md](DOCS.md) · [START-HERE.md](START-HERE.md) |
| **Live site** | [vaderlabz.com](https://vaderlabz.com) |

| Field | Value |
| --- | --- |
| **Version** | v2.5.0 |
| **Release date** | May 25, 2026 (Tailwind/shadcn Path B sandbox) |
| **Ecosystem grade** | 61/61 (100%) — verified baseline |
| **Repository** | [github.com/jonbeatz/Vader-Engine](https://github.com/jonbeatz/Vader-Engine) |
| **Node** | 20.x–24.x (`.nvmrc` pins 20.19.1 · CI uses 20) |
| **Package manager** | npm ≥ 10 |

---

## Overview

**Vader Engine** is a highly disciplined, self-governing starter kit for rapid, production-grade development with [Cursor](https://cursor.sh/). Clone it, run one bootstrap command, and be fully operational in minutes — not hours.

Designed as an **empty-folder replacement engine**, it combines deep AI integration (rules, skills, MCP), automated validation, security guardrails, and isolated sandboxes so frameworks never pollute the root workspace.

### Core principles

| Principle | What it means |
| --- | --- |
| **Lean Boundary Rule** | Root orchestrates scripts only. Frameworks and data live in isolated `examples/*` sandboxes. Blueprints scaffold to sibling `--target` paths via `msc:template`. |
| **Self-validating** | 61-point automated integrity grader (`npm run grade`) with hard non-zero exits on failure. |
| **Vader Protocol Shield** | Strict `msc-` namespace + Studio Dark design tokens for total CSS isolation from themes and Divi. |
| **Cursor-first** | Modular `.mdc` rules, agent skills, portable MCP config, and operator/agent documentation paths. |
| **Zero-leak security** | Credentials in untracked `.env.local` only; committed templates use `YOUR_*` / `CHANGE_ME` placeholders. |

### Governance & Methodology

| Layer | Authority | Enforcement |
| --- | --- | --- |
| **Constitution** | [TRUTH.md](TRUTH.md) | Technical precedence over all operator docs when conflicts arise |
| **Command truth** | Root `package.json` scripts | Agents never invent npm commands; `scripts/` entry points hydrate via `msc-load-env.mjs` |
| **Integrity gate** | 61-point grader (`npm run grade`) | Hard exit **1** on failure; pre-push runs grade + `msc:test:root` |
| **Session open** | [.cursor/prompts/task-planner.md](.cursor/prompts/task-planner.md) | Phase 1–3 matrix + explicit operator confirmation before code edits |
| **Session close** | [.cursor/prompts/End-Project.md](.cursor/prompts/End-Project.md) | Gates, `project-log.md` check-in, git audit, Handoff Block |
| **Cold start** | [.cursor/prompts/Start-Project.md](.cursor/prompts/Start-Project.md) | `start-project:gate` → context ingest → operational readiness |
| **Recovery** | Fix-local-first ([HOW-TO.md](.cursor/docs/HOW-TO.md), [TROUBLESHOOTING.md](TROUBLESHOOTING.md)) | Port kill → HTTP smoke; no secret paste in chat |

## Live proof

[![Vader Protocol hero](media/readme/vaderlabz-hero-reference.jpg)](https://vaderlabz.com)

**Live site:** [vaderlabz.com](https://vaderlabz.com) — built from `templates/full-stack/vader-site`.

---

## Stack support

Sandboxes and template blueprints: [examples/README.md](examples/README.md) · `templates/` (apply via `npm run msc:template`).

| Target | Technology | Entry | Port |
| --- | --- | --- | --- |
| **Minimal frontend** | Next.js 15.5.7 + TypeScript + Vitest | `examples/nextjs-minimal/` | **3000** |
| **Full-stack CMS** | Next.js 15.4.11 + Payload CMS v3 + SQLite | `examples/nextjs-payload/` | **3001** |
| **Tailwind / shadcn (Path B)** | Next.js 15.5.7 + Tailwind 3 + MSC token bridge | `examples/nextjs-tailwind/` | **3002** |
| **Vader Construct dashboard** | Next.js 16.2.6 + Tailwind 3 + MSC Shield bridge | `ui/dashboard/` | **3010** |
| **WordPress Shield** | PHP + Divi isolation layer | `core/msc-bootstrap.php` | — |

PHP never installs via npm. The WordPress layer enforces CSS namespace isolation (`msc-` prefix) to prevent theme and plugin conflicts on Divi-based sites.

Token single source of truth: `ui/msc-shield.css`. The v2 isolation contract is documented in `ui/studio-dark-shield.css`.

### Triple-Sandbox Architecture

Isolated workspaces under `examples/` — dependencies never pollute the root orchestration layer. Blueprints scaffold to sibling `--target` paths via `msc:template`.

| Sandbox | Role | Stack | Port | Dev command | UI path |
| --- | --- | --- | --- | --- | --- |
| **Minimal** | Frontend baseline + smoke reference | Next.js 15.5.7 · TypeScript · Vitest | **3000** | `npm run msc:dev:example` | Shield Path A |
| **Payload** | Full-stack CMS + MediaVault | Next.js 15.4.11 · Payload v3 · SQLite | **3001** | `npm run msc:dev:payload` | Shield Path A (admin) |
| **Tailwind** | Hybrid Path B (shadcn-style primitives) | Next.js 15.5.7 · Tailwind 3 · `--msc-*` bridge | **3002** | `npm run msc:dev:tailwind` | Path B → `msc-shield.css` tokens |
| **Dashboard** | Vader Construct control plane | Next.js 16.2.6 · Tailwind 3 · `--msc-*` bridge | **3010** | `npm run msc:dev:dashboard` | Path B → `msc-shield.css` tokens |
| **WordPress Shield** | PHP/Divi isolation bridge | `core/msc-bootstrap.php` · `msc-` namespace | **8080** (reserved) | Host integration | Path A satellites |

Health probes: `npm run msc:health` (ports 3000, 3001, 3002, 3010, 8080). Full matrix: [system-architecture.md](.cursor/docs/system-architecture.md).

---

## What's new in v2.5.0

### Tailwind / shadcn Path B sandbox

- **`examples/nextjs-tailwind/`** — isolated hybrid sandbox on port **3002** (Lean Boundary Rule)
- **`npm run msc:dev:tailwind`** — dev command; tokens from `ui/msc-shield.css` via `tailwind.config.ts`
- **`/sandbox-test`** — `MscButton` + `MscCard` stress-test route with full Vader color utilities
- **[SECURITY.md](SECURITY.md)** — private advisory reporting · automated `v*` releases via GitHub Actions

Full notes: [docs/releases/RELEASE_v2.5.0.md](docs/releases/RELEASE_v2.5.0.md) · [CHANGELOG.md](CHANGELOG.md)

---

## What's new in v2.4.0

### 61-point grader and ecosystem hardening

- **61/61 structural grader** — Vader template checks, `docs/releases/` alignment, Hostinger doc gate
- **Dependabot** — weekly npm updates (root + both sandboxes)
- **Contributor workflow** — GitHub issue/PR templates; standardized `examples/` and `templates/` READMEs
- **Zero-noise hygiene** — `docs/assets/` index; sandbox `.env.example` coverage; release notes under `docs/releases/`
- **Start Project** — `npm run msc:check-node`, `start-project`, `start-project:gate`

Full notes: [docs/releases/RELEASE_v2.4.0.md](docs/releases/RELEASE_v2.4.0.md) · [CHANGELOG.md](CHANGELOG.md)

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

Full operator guide: [HOW-TO.md — Template & Scaffolding System](.cursor/docs/HOW-TO.md#-the-template--scaffolding-system-v240) · [DEPLOY_TO_HOSTINGER.md](DEPLOY_TO_HOSTINGER.md)

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

For earlier release notes (v2.1.0 and below), see [CHANGELOG.md](CHANGELOG.md) and [docs/releases/](docs/releases/).

---

## Quick start

**Recommended — interactive onboarding:**

```bash
git clone https://github.com/jonbeatz/Vader-Engine.git my-project
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
npm run msc:dev:tailwind   # Tailwind/shadcn Path B   → :3002
npm run msc:dev:dashboard  # Vader Construct dashboard  → :3010
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
- Clears conflicting dev-server ports (3000, 3001, 3002, 8080)

---

## Operator Controls (AI Agent Handoff)

Canonical rituals for Cursor agents — binding per [global.mdc](.cursor/rules/global.mdc) and [agent-workflow.mdc](.cursor/rules/agent-workflow.mdc).

| Ritual | Prompt / command | When |
| --- | --- | --- |
| **Cold start** | `@Start-Project.md` or `npm run start-project:gate` | Beginning a session — verify **61/61**, lint, tests |
| **Plan gate** | `.cursor/prompts/task-planner.md` | Before any write/delete — Phase 1–3 + operator approval |
| **Session close** | `@End-Project.md` or `npm run end-project` + closeout steps | Pause, handoff, or branch cut — log + Handoff Block |
| **Agent routing** | [Code-Jedi.md](.cursor/docs/Code-Jedi.md) | Command → script map for autonomous execution |
| **Incident path** | [incident-response.md](.cursor/prompts/incident-response.md) | Runtime failure — then `End-Project.md` when stabilized |

```bash
npm run start-project:gate   # validate-env · lint · grade 61/61 · test:root 8/8
npm run msc:kill-dev-port    # clear 3000, 3001, 3002, 8080
npm run end-project          # kill :3000 + smoke (then run End-Project closeout)
```

---

## Commands reference

> **Daily use:** `msc:onboard`, `msc:dev:example`, `msc:dev:payload`, `msc:dev:tailwind`, `grade`, `msc:lint`

### Lifecycle & setup

| Command | Purpose |
| --- | --- |
| `npm run msc:onboard` | Interactive guided first-time setup |
| `npm run bootstrap` | Full workspace bootstrap + port cleanup |
| `npm run msc:quickstart` | Asset copies, credential checks, hydration |
| `npm run msc:validate-env` | Secret leak and placeholder audit |
| `npm run msc:kill-dev-port` | Purges ports 3000, 3001, 3002, and 8080 |

### Development

| Command | Purpose |
| --- | --- |
| `npm run msc:dev:example` | Start minimal frontend (port **3000**) |
| `npm run msc:dev:payload` | Start full-stack CMS sandbox (port **3001**) |
| `npm run msc:dev:tailwind` | Start Tailwind/shadcn Path B sandbox (port **3002**) |
| `npm run msc:health` | System diagnostics dashboard |
| `npm run msc:health -- --json` | Machine-readable health output |
| `npm run dev:recover` | Recover stuck dev server state |

### Quality & validation

| Command | Purpose |
| --- | --- |
| `npm run grade` | **61-point** structural integrity check (must score 100%) |
| `npm run msc:lint` | Biome lint + format validation |
| `npm run msc:lint:fix` | Biome auto-fix |
| `npm run msc:test:root` | `npm audit --production` + root Vitest (**pre-push**) |
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
| `npm run msc:github:sync` | Sync GitHub About + auto-delete merged PR branches (`gh` CLI) |
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
| Live site | [vaderlabz.com](https://vaderlabz.com) | `templates/full-stack/vader-site` deploy proof |
| Release notes | [docs/releases/](docs/releases/) | `RELEASE_v*.md` per tagged version |

Architecture diagrams and dependency flow: [ARCHITECTURE.md](ARCHITECTURE.md)

---

## Security & compliance

Vulnerability reporting: [SECURITY.md](SECURITY.md) (private GitHub advisories only).

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

--- Final Grade: 61/61 (100%) ---

All checks passed seamlessly. Workspace configuration is certified stable.
```

---

## Network port registry

| Port | Target |
| --- | --- |
| **3000** | `examples/nextjs-minimal` — core frontend baseline |
| **3001** | `examples/nextjs-payload` — full-stack CMS sandbox |
| **3002** | `examples/nextjs-tailwind` — Tailwind/shadcn Path B sandbox |
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

| Milestone | Status |
| --- | --- |
| VaderLabz site template (`full-stack/vader-site`) | ✅ Shipped in v2.3.0 |
| Template scaffolding CLI (`msc:template`) | ✅ Shipped in v2.2.0 |
| Component generation (`msc:new:component`) | ✅ Shipped in v2.1.0 |
| Docker Compose Postgres/Redis mirroring | ✅ Shipped in v2.1.0 |
| Opt-in Tailwind/shadcn sandboxing (`examples/nextjs-tailwind/`) | ✅ Shipped in **v2.5.0** — port **3002**, `npm run msc:dev:tailwind`. Path B bridge to `ui/msc-shield.css`; see [consumer-bootstrap.md](.cursor/docs/consumer-bootstrap.md) §6 |
| Playwright E2E multi-sandbox harness | ✅ Shipped in v2.1.0 |
| VS Code / Cursor settings sync | ✅ Shipped (`.cursor/settings.json` + `.vscode/`) |
| Repo rename (`Vader Engine`) | ✅ Shipped |

---

## Credits

- **Powered by** MSC Media Engine · Vader Protocol — strict namespace isolation certified
- **Cursor-native** — calibrated for Cursor Agent and Composer execution paths
- **Release certified:** v2.5.0 · 61/61 grade · 100% pass rate · production ready ([jonbeatz/Vader-Engine](https://github.com/jonbeatz/Vader-Engine))

**Operator docs:** [HOW-TO.md](.cursor/docs/HOW-TO.md) · [START-HERE.md](START-HERE.md) · [DOCS.md](DOCS.md) · [Code-Jedi.md](.cursor/docs/Code-Jedi.md)

---

*Made with discipline. Built for velocity.*
