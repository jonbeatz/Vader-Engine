# Boilerplate-v2 — Jedi-Master Edition
[![Grade](https://img.shields.io/badge/grade-38%2F38-brightgreen)](https://github.com/jonbeatz/Boilerplate-v1)
[![CI](https://github.com/jonbeatz/Boilerplate-v1/actions/workflows/ci.yml/badge.svg)](https://github.com/jonbeatz/Boilerplate-v1/actions/workflows/ci.yml)
[![Node Version](https://img.shields.io/badge/node-20-339933)](https://nodejs.org/)
[![Cursor](https://img.shields.io/badge/Cursor-optimized-blueviolet)](https://cursor.sh/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**v2.0.0-JEDI** production baseline · [github.com/jonbeatz/Boilerplate-v1](https://github.com/jonbeatz/Boilerplate-v1)

| Field | Value |
| --- | --- |
| **Version** | v2.0.0-JEDI |
| **Release date** | May 2026 |
| **Ecosystem grade** | 38/38 (100%) — Gold Master verified baseline |
| **Repository** | https://github.com/jonbeatz/Boilerplate-v1 |

---

## Overview

`Boilerplate-v2` is the ultimate Cursor-native, production-grade starting point for rapid development environments. Designed as an empty-folder-replacement engine, it allows you to clone it, run a single bootstrap command, and be fully operational within 10 minutes.

This **v2.0.0-JEDI** release represents a complete structural evolution from v1—introducing environment portability, automated local platform versioning, self-validation suites, multi-sandbox CI/CD automation pipelines, diagnostic dashboards, and defensive re-branding code utilities. This document is the canonical README for the production baseline hosted at [jonbeatz/Boilerplate-v1](https://github.com/jonbeatz/Boilerplate-v1).

## Stack Support

| Target | Stack | Entry |
|--------|-------|-------|
| **Web App** | Next.js 15 + TypeScript | `examples/nextjs-minimal/` |
| **Full-Stack CMS** | Next.js + Payload CMS v3 | `examples/nextjs-payload/` |
| **WordPress Shield** | PHP + Divi isolation | `core/msc-bootstrap.php` |

PHP never installs via npm. The WordPress layer provides CSS namespace isolation (`msc-` prefix) to prevent theme and plugin conflicts on Divi-based sites. The Divi consumer bridge is `core/core-Divi-Scriptz.js` (registered as `MSC_DIVI_SCRIPT` in `core/index.mjs`).

### Documentation Navigation

| Audience | Start here | Then |
|----------|------------|------|
| First-time operator | [START-HERE.md](START-HERE.md) | [DOCS.md](DOCS.md) |
| AI agent | [Code-Jedi.md](.cursor/docs/Code-Jedi.md) | [TRUTH.md](TRUTH.md) |

---

## What's new

### P0 — Core foundation (architecture and security baseline)

- **Portable MCP layer:** `.cursor/mcp.json` uses dynamically resolved `${workspaceFolder}` tokens, removing brittle hardcoded system paths.
- **Vader Protocol UI shield:** `ui/studio-dark-shield.css` with Studio Dark tokens (`#121212` background, `#1c1c1c` surface) and total `msc-` CSS class prefix isolation to prevent external theme or Divi layout collisions.
- **Core frontend workspace:** `examples/nextjs-minimal/` on Next.js `15.5.7` + TypeScript + Vitest (3/3 integration tests passing).
- **Defensive environment scan:** `scripts/validate-env.mjs` enforces regex-driven secret leak detection, blocking credential commits while tracking required `YOUR_*` and `CHANGE_ME` placeholders.
- **Idempotent quickstart routine:** `scripts/quickstart.mjs` handles cross-platform multi-workspace setup with Windows-safe `path.posix` conversions.
- **Socket network neutralizer:** `scripts/kill-ports.mjs` clears ports `3000`, `3001`, and `8080` cross-platform to eliminate hanging dev server processes.
- **Codespaces optimization:** `.devcontainer/devcontainer.json` configured to auto-run core workspace bootstrap in cloud shells.
- **Git commit gate:** Husky + lint-staged intercepts local saves to run credential validation before tree history writes.

### P1 — Jedi-Master tooling (full-stack expansion)

- **Isolated full-stack data sandbox (`examples/nextjs-payload`):** Decoupled Payload CMS v3.x sandbox with `@payloadcms/db-sqlite` mapping to `database/payload.db`.
- **Lean Boundary Rule enforcement:** No Payload databases, config modules, or runtime scripts pollute the root workspace—the data layer lives entirely in the sub-sandbox.
- **System diagnostics dashboard (`npm run msc:health`):** `scripts/health.mjs` probes ports `3000`, `3001`, and `8080`, handles `TIME_WAIT` gracefully, and supports `--json` for automation.
- **Central workspace multi-updater (`npm run msc:update`):** `scripts/msc-update.mjs` iterates root and sandbox manifests via `npx npm-check-updates -u`, including unhydrated directories.
- **Defensive project re-brander (`npm run msc:forge`):** `scripts/msc-forge.mjs` with regex guard `/(?:\.msc-|^msc:|^msc_)/i` and `--dry-run` simulation.
- **Automated bitrot CI workflow:** `.github/workflows/ci.yml` on push/PR—Node 20, credential scan, self-grader, and nested sandbox builds.
- **Platform runtime lock:** `.nvmrc` enforces Node `20` LTS globally.
- **Self-grade suite expansion:** `npm run grade` is a **38-point checker** with hard non-zero exits when core, script, dashboard, or data sandbox artifacts drift out of spec.

---

## Quick start (10 minutes or less)

Interactive onboarding (recommended):

```bash
git clone https://github.com/jonbeatz/Boilerplate-v1.git my-project
cd my-project
npm run msc:onboard
```

Or bootstrap directly:

```bash
npm run bootstrap
```

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) if bootstrap or ports fail.

**Minimal frontend example:**

```bash
npm run msc:dev:example
```

**Full-stack Payload sandbox:**

```bash
cp examples/nextjs-payload/.env.example examples/nextjs-payload/.env.local
# Configure PAYLOAD_SECRET inside examples/nextjs-payload/.env.local
npm run msc:dev:payload
```

### What happens on the first run

- Hydrates core root and sub-sandbox package matrices
- Generates local `.env.local` files from structural blueprints
- Runs credential scan to verify zero local data leaks
- Executes Vitest suites and self-validation frameworks
- Clears conflicting system network sockets dynamically

---

## Commands reference

| Command | Target | Purpose |
| --- | --- | --- |
| `npm run bootstrap` | Root lifecycle | One-command ecosystem setup and port validation |
| `npm run msc:quickstart` | `scripts/quickstart.mjs` | Asset copies, credential checks, workspace hydration |
| `npm run msc:validate-env` | `scripts/validate-env.mjs` | Secret leak and placeholder audit |
| `npm run msc:kill-dev-port` | `scripts/kill-ports.mjs` | Purges ports 3000, 3001, and 8080 |
| `npm run msc:test` | Root test orchestrator | Unit test sweeps across workspaces (Vitest) |
| `npm run msc:test:watch` | Root test orchestrator | Vitest watcher mode |
| `npm run msc:dev:example` | `examples/nextjs-minimal` | Core frontend on port **3000** |
| `npm run msc:dev:payload` | `examples/nextjs-payload` | Full-stack sandbox on port **3001** |
| `npm run msc:health` | `scripts/health.mjs` | Console dashboard for ports, engines, and locks |
| `npm run msc:health -- --json` | `scripts/health.mjs` | Machine-readable JSON for pipeline hooks |
| `npm run msc:update` | `scripts/msc-update.mjs` | Scans and bumps package configurations |
| `npm run msc:forge -- <f> <s> <r>` | `scripts/msc-forge.mjs` | String rename with regex prefix blocks |
| `npm run msc:forge -- <f> <s> <r> --dry-run` | `scripts/msc-forge.mjs` | Simulated renames with zero disk writes |
| `npm run grade` | `scripts/msc-grade-boilerplate.mjs` | Full 38-point structural check (must score 100%) |

---

## Security, compliance, and naming guardrails

**Zero-leak environment rules**

- Credentials live only in untracked `.env.local` files.
- Distribution templates use hard placeholders (`YOUR_*`, `CHANGE_ME`).

**Vader Protocol integration**

- `msc-` — custom layout CSS classes
- `msc:` — core script execution tasks
- `msc_` — internal backend programming functions

**The string shield**

The re-branding asset uses an unassailable regex checker so downstream automation cannot break WordPress/Divi conflict isolation layers.

---

## Grade verification report

Run `npm run grade` in your terminal:

```
>>> MSC BOILERPLATE INTEGRITY SELF-GRADER <<<

[PASS] Root Level Configuration Artifacts (.nvmrc, package.json, Husky Hooks)
[PASS] Portable Extension Workspace Validation (.cursor/mcp.json Workspace Tokens)
[PASS] UI Guardrail Namespace Validation (ui/studio-dark-shield.css Prefix Rules)
[PASS] Frontend Sandbox Architecture Sweep (Next.js 15.5.7 + Vitest 3/3 Passing)
[PASS] Diagnostic Engine Integration Check (scripts/health.mjs Core Dash)
[PASS] Workspace Maintenance Assembly Check (scripts/msc-update.mjs Multi-Updater)
[PASS] String Shield Re-Branding Blocklist Verification (scripts/msc-forge.mjs Safety)
[PASS] Isolated Full-Stack Configuration Mapping (payload.config.ts Sandbox Boundaries)
[PASS] Data Sandbox Media Vault Verification (src/collections/MediaVault.ts Specs)

--- Final Grade: 38/38 (100%) ---

All checks passed seamlessly. Workspace configuration is certified stable.
```

---

## Network port reservation registry

| Port | Target |
| --- | --- |
| **3000** | `examples/nextjs-minimal` — core frontend baseline layer |
| **3001** | `examples/nextjs-payload` — full-stack data storage sandbox |
| **8080** | Reserved — multi-tenant microservices or Local WordPress Core Shield bridges |

---

## Architectural peer-dependency handling note

To maintain the Lean Boundary Rule while satisfying strict package restrictions, the workspace uses a split framework dependency layout:

| Workspace | Next.js version | Rationale |
| --- | --- | --- |
| `examples/nextjs-minimal` | `^15.5.7` | Cutting-edge frontend performance testing |
| `examples/nextjs-payload` | `15.4.11` (locked) | Satisfies Payload v3.x peer-dependency range |

**Result:** Workspaces are perfectly sandboxed; backend data engine version shifts have zero impact on core frontend layouts.

---

## What's next (v2.x continuous optimization roadmap)

| Priority | Milestone | Effort | Checkpoint |
| --- | --- | --- | --- |
| **P2** (medium-term) | Component generation scripts | 1 hr | Automated `msc:new:component` UI primitives |
| **P2** (medium-term) | Opt-in Tailwind/shadcn sandboxing | 2 hr | Hybrid CSS model; avoids specificity drift |
| **P2** (medium-term) | Docker Compose database overrides | 1 hr | Local production-mirror Postgres persistence |
| **P3** (long-term) | VS Code / Cursor settings sync | 10 min | Formatting parameters and extension configs |
| **P3** (long-term) | Playwright E2E multi-sandbox harness | 2 hr | Automated integration testing in CI |

---

## Credits and compliance

- **Powered by** the MSC Media Engine · Vader Protocol — strict namespace isolation certified
- **Cursor-native** — calibrated for Cursor 3 Agent and Composer execution paths
- **Release certified:** v2.0.0-JEDI · 38/38 grade — 100% pass rate. Production ready.

**Operator docs:** [HOW-TO.md](.cursor/docs/HOW-TO.md) · [START-HERE.md](START-HERE.md) · [DOCS.md](DOCS.md) · [Code-Jedi.md](.cursor/docs/Code-Jedi.md)
