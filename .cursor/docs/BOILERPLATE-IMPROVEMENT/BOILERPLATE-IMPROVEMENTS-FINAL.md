# 🪐 Gold Master Blueprint: Boilerplate-v2 Technical Optimization Runbook (Final)

**Target:** `Boilerplate-v1` → v2.1.0+ (Jedi-Master baseline)  
**Baseline score:** 38/38 (`npm run grade`) · structural audit at 100%  
**Expanded target:** 52/52 after Phase 5 completion  
**Execution model:** An AI agent runs phases sequentially; each step ends with an explicit validation gate before advancing.  
**Document status:** Gold Master — merged from `BOILERPLATE-IMPROVEMENTS.md` + `BOILERPLATE-IMPROVEMENTS-Feedback.md`

---

## ⚠️ MASTER UPGRADE RUNBOOK — EXECUTION PROTOCOL

### Backup First (mandatory before Phase 6)

Run from the parent directory of the repository:

```bash
cp -r Boilerplate-v1 "../Boilerplate-v1-backup-$(date +%Y%m%d-%H%M)"
```

On Windows PowerShell:

```powershell
Copy-Item -Recurse -Force "Boilerplate-v1" "..\Boilerplate-v1-backup-$(Get-Date -Format 'yyyyMMdd-HHmm')"
```

### Run Order Recommendation

| Phase | Scope | Estimated time | Execution mode |
|-------|-------|----------------|----------------|
| Phase 1 | Pre-flight architecture validation | 30 min | Single batch |
| Phase 2 | Core workspace & tooling | 2 hrs | Single batch |
| Phase 3 | Vader Protocol & shield isolation | 1.5 hrs | Single batch |
| Phase 4 | Full-stack sandbox hardening | 1 hr | Single batch |
| Phase 5 | 52-point grader expansion | 1 hr | Single batch |
| Phase 6 | Sequential agent action runbook | 4–6 hrs | **Three chunks (A/B/C)** — never parallelize steps |

Execute Phase 1 → 2 → 3 → 4 → 5 in order. Phase 6 must run on an isolated branch (`upgrade/v2.1.0`) with a clean working tree.

### Emergency Recovery

```bash
npm run msc:recovery
```

If `msc:recovery` is unavailable, run:

```bash
git stash
git checkout upgrade/v2.1.0
npm run bootstrap
npm run grade
```

### Human Pre-Execution Checklist (before Phase 6 Step 0)

```bash
git status --porcelain          # Must be empty
git checkout -b upgrade/v2.1.0  # Branch isolation
node -v                         # Must print v20.x.x
npm -v                          # Must print 10.x.x
npm run grade                   # Capture baseline — record X/Y
```

---

## Immutable Guardrails & Violation Behavior

| Guardrail | Violation behavior |
|-----------|-------------------|
| `msc_` / `msc-` / `msc:` naming on all MSC-owned assets | **HALT** — log to `.cursor/docs/project-log.md`, do not proceed |
| Studio Dark tokens (`#121212` bg, `#1c1c1c` surface, `var(--msc-*)` only) | **REVERT** change, flag for manual review |
| Lean Boundary Rule (no `next`/`payload`/`@payloadcms` at root) | **HALT** — no framework deps at root `package.json` |
| PHP `defined('ABSPATH') \|\| exit;` on every PHP entry | **ADD** guard if missing; do not delete PHP files |
| `core/core-Divi-Scriptz.js` exact casing (reject `coreDiviScriptz.js`) | **HALT** — rename to canonical path or restore from backup |
| ESM-native scripts only (`"type": "module"`) | **HALT** — no bare `require()` in root scripts or inline `-e` checks |

---

## Protected Zones — DO NOT MODIFY

Unless a Phase 6 step explicitly instructs mutation of that exact file:

| Zone | Reason |
|------|--------|
| `ui/msc-shield.css` | Token SSoT — add variables only when step requires |
| `TRUTH.md` constitutional sections (§1–§3) | Constitutional SSoT |
| `scripts/lib/msc-load-env.mjs` | Env hydration contract |
| `core/msc-bootstrap.php` | WordPress entry — guard-only edits permitted |
| `.cursor/mcp.json` committed token values | Placeholders only — never live secrets |

---

## NO REFACTORING Clause (mandatory for all agents)

- Do not refactor unrelated files.
- Do not rename files unless explicitly instructed in a Phase 6 step.
- Do not optimize architecture outside requested scope.
- Do not modernize dependencies unless a step specifies an exact version pin.
- Prefer minimal surgical changes over broad rewrites.
- Preserve existing architecture whenever possible.

---

## STOP_AND_ASK Triggers

**STOP_AND_ASK** the human operator when:

- Any required file path does not exist after **3 retries** with documented commands in `.cursor/docs/project-log.md`
- `npm run grade` drops below 100% for an unknown reason after applying the Grade Failure Decision Tree
- The operator must choose between conflicting approaches (e.g., repo rename `Boilerplate-v1` → `Boilerplate-v2`)
- Implementation exceeds **3 consecutive failures** on the same step
- More than **20 files** modified in a single step without explicit step authorization
- Any step attempts an architectural rewrite not listed in this runbook

When stopping, write a structured entry to `.cursor/docs/project-log.md`:

```markdown
## STOP_AND_ASK — [ISO timestamp]
- Step: N
- Failure: [description]
- Attempts: 3
- Grade: X/Y
- Question for operator: [specific choice needed]
```

---

## Rollback Protocol

Before Phase 6 Step 1, create a backup branch:

```bash
git checkout -b upgrade/phase6-backup
git add .
git commit -m "PRE-UPGRADE: step 0 baseline"
git checkout upgrade/v2.1.0
```

**After each successful Phase 6 step**, commit:

```bash
git add .
git commit -m "Phase 6 step N: [short description]"
```

**On validation failure at step N:**

```bash
git reset --hard HEAD~1
```

Fix the named issue, then **re-run from step N** — not from Step 1 unless the Grade Failure Decision Tree directs a full restart.

**Recovery rule:** If any step fails, fix the named issue, then re-run from that step number. Do **not** restart from Step 1 unless grade exits non-zero on a check that was passing at Step 0 baseline.

---

## Grade Failure Decision Tree

When `npm run grade` exits non-zero:

1. Read stderr — each failure line is `❌ [FAIL] <check name>`. Print: `FAILED CHECK: [name]`
2. If failing check number **≤ 38** (baseline regression): `git stash`, fix root cause, restart from Phase 6 Step 1
3. If failing check number **> 38** (new check): fix the specific artifact, restart from the matching Phase 6 step (see step table)
4. **Never commit** with grade below 100%
5. If the same check fails **3 times**: invoke **STOP_AND_ASK**

---

## Priority Labels

| Priority | Meaning |
|----------|---------|
| P0 | Critical infrastructure — halt upgrade if blocked |
| P1 | Strongly recommended — complete before Phase 6 Chunk C |
| P2 | Nice-to-have — complete if time permits within phase |
| P3 | Experimental — document only, do not execute in Phase 6 |

---

## Lean Boundary Reference (immutable)

| Sandbox | Next.js pin | Port | Framework ownership |
|---------|-------------|------|---------------------|
| `examples/nextjs-minimal/` | **15.5.7** | 3000 | Minimal App Router frontend |
| `examples/nextjs-payload/` | **15.4.11** | 3001 | Payload CMS v3.x + SQLite |

Root `package.json` orchestrates scripts only. Sandboxes own all framework dependencies.

**ESM-native lean boundary check (run from repository root):**

```bash
node -e "import fs from 'node:fs'; const p=JSON.parse(fs.readFileSync('./package.json','utf8')); const bad=[...Object.keys(p.dependencies||{}),...Object.keys(p.devDependencies||{})].filter(k=>/^(next|payload|@payloadcms)/.test(k)); if(bad.length){console.error('LEAN BOUNDARY VIOLATION:',bad);process.exit(1)} console.log('Lean boundary OK')"
```

---

## Vader Protocol Reference (Studio Dark)

| Token | Value | Usage |
|-------|-------|-------|
| `--msc-bg-main` | `#121212` | Page background |
| `--msc-bg-surface` | `#1c1c1c` | Cards, panels, elevated surfaces |
| `--msc-text-primary` | `#ffffff` | Primary text |
| `--msc-text-secondary` | `#b3b3b3` | Secondary text |

All layout and component classes use unique **`msc-`** prefixes. TSX root wrappers: `className="msc-viewport-shield msc-shield-root"`.

---

# 📌 Phase 1: Pre-Flight Architecture Validation & Namespace Audits

Phase 1 establishes structural truth before any mutation. Do not edit application code until every audit in this phase passes or has an explicit remediation ticket recorded in `.cursor/docs/project-log.md`.

**Phase 1 completion criteria:** `npm run msc:validate-env`, `npm run verify:mcp`, and `npm run grade` all exit `0`. No TODO comments introduced. Log: `Phase 1 complete — grade X/X`.

---

### 1.1 — Baseline integrity snapshot (P0)

Run from repository root:

```bash
node -v
npm -v
npm run grade
npm run msc:validate-env
npm run verify:mcp
npm run msc:health -- --json
```

Record the output line `Final Grade: X/Y` in `.cursor/docs/project-log.md`. If `grade` exits non-zero, halt and resolve failures before Phase 2.

**Note for Phase 6:** If `npm run msc:kill-dev-port` fails during early steps, this is expected until Step 8 (port script rename) resolves it.

**Expected baseline artifacts (must exist):**

| Path | Role |
|------|------|
| `TRUTH.md` | Constitutional SSoT |
| `.env.example` | Root environment contract |
| `.cursor/mcp.json` | 13-server MCP registry |
| `scripts/msc-grade-boilerplate.mjs` | Structural grader (38 → 52 after Phase 5) |
| `scripts/lib/msc-load-env.mjs` | Env hydration (`.env.local` → `.env.example`) |
| `ui/msc-shield.css` | Token SSoT |
| `ui/studio-dark-shield.css` | v2 isolation contract |
| `examples/nextjs-minimal/` | Next.js **15.5.7** frontend sandbox (port **3000**) |
| `examples/nextjs-payload/` | Payload CMS v3.x sandbox (Next.js **15.4.11**, port **3001**) |
| `core/core-Divi-Scriptz.js` | Divi consumer bridge (exact casing — see §1.2b) |

**Root `node_modules` audit (P0):**

```bash
test ! -d node_modules/next && test ! -d node_modules/payload && echo "Root lean OK" || echo "HALT: framework deps in root node_modules"
```

---

### 1.2 — Lean Boundary Rule audit (P0)

Verify zero Payload/Next.js runtime dependencies exist in root `package.json` `dependencies` or `devDependencies`. Root may only orchestrate scripts; sandboxes own framework deps.

Run the ESM-native command from the Lean Boundary Reference section above. Expected output: `Lean boundary OK`.

Confirm `examples/nextjs-payload/src/payload.config.ts` resolves SQLite exclusively inside the sandbox:

- Database file path: `examples/nextjs-payload/database/payload.db`
- No imports from `examples/nextjs-payload/` appear in root `scripts/` except path references in docs and grade checks

---

### 1.2b — `core/core-Divi-Scriptz.js` casing audit (P0)

The foundational Divi consumer script **must** exist at exactly:

```
core/core-Divi-Scriptz.js
```

**Reject** legacy camelCase variants:

- `core/coreDiviScriptz.js` — INVALID
- `core/core_divi_scriptz.js` — INVALID
- `core-Divi-Scriptz.js` at repo root — INVALID

Verification:

```bash
test -f core/core-Divi-Scriptz.js && echo "Canonical path OK" || echo "MISSING: core/core-Divi-Scriptz.js"
test ! -f core/coreDiviScriptz.js && echo "No camelCase drift" || echo "HALT: rename coreDiviScriptz.js to core-Divi-Scriptz.js"
```

If missing, create `core/core-Divi-Scriptz.js` with:

```javascript
/**
 * MSC Divi Consumer Bridge — Powered by the MSC Media Engine
 * Canonical path: core/core-Divi-Scriptz.js (exact casing required)
 */
(function () {
  'use strict';
  if (typeof window === 'undefined') return;
  window.MSC_DIVI_BRIDGE_VERSION = '2.1.0';
})();
```

---

### 1.3 — `package.json` main-field remediation (P0)

**Problem:** Root `package.json` may declare `"main": "core/msc-bootstrap.php"` while `"type": "module"`. Node tooling expects a JS entry.

**Fix:**

1. Remove `"main": "core/msc-bootstrap.php"` from root `package.json`.
2. Create `core/index.mjs`:

```javascript
/**
 * MSC Boilerplate core JS barrel — Powered by the MSC Media Engine
 */
export const MSC_VERSION = '2.1.0';
export const MSC_LEAN_BOUNDARY = 'examples-isolated';
export const MSC_DIVI_SCRIPT = 'core/core-Divi-Scriptz.js';
```

3. Add `"main": "core/index.mjs"` to root `package.json`.
4. Add grade check: `report('package.json main is not PHP', !/\.php$/.test(pkg.main ?? ''))`.

WordPress/PHP remains reachable only via `core/msc-bootstrap.php` inside WordPress contexts — never as the npm package entry.

---

### 1.4 — Namespace & identity alignment audit (P1)

Run a read-only inventory:

```bash
npm run inventory
```

Resolve naming drift across these surfaces:

| Surface | Current | Target alignment |
|---------|---------|------------------|
| GitHub repo | `Boilerplate-v1` | Keep or rename to `Boilerplate-v2`; update all URLs consistently |
| README H1 | `Boilerplate-v2 — Jedi-Master Edition` | Match repo name + semver in subtitle |
| `package.json` name | `msc-universal-boilerplate` | `msc-boilerplate-v2` |
| `package.json` version | `1.0.0` | `2.1.0` (post-upgrade tag) |

Use `npm run msc:forge -- README.md "Boilerplate-v1" "Boilerplate-v2" --dry-run` before live mutations. The forge shield blocks mutations when `searchStr` matches `/(?:\.msc-|^msc:|^msc_)/i`.

---

### 1.5 — `msc-forge` regex validation hardening (P0)

Extend `scripts/msc-forge.mjs` protected namespace gate to also block:

```javascript
const protectedNamespaceRegex = /(?:\.msc-|^msc:|^msc_|^MSC[-_]|studio-dark-shield|msc-shield)/i
const protectedPathRegex = /(?:^|\/)(core|ui|scripts)\/msc-/i
```

Before any file mutation, reject when `protectedPathRegex.test(filePath)`.

Add pre-mutation verification command (run before Phase 6 mutations):

```bash
node scripts/msc-forge.mjs ui/msc-shield.css msc-accent msc-danger --dry-run 2>&1 | grep -q "blocked\|protected\|shield" && echo "Forge shield active" || echo "HALT: forge shield not blocking"
```

Add unit coverage in `scripts/__tests__/msc-forge.test.mjs`:

```javascript
import { execSync } from 'node:child_process'
import { describe, it, expect } from 'vitest'

describe('msc-forge.mjs shield', () => {
  it('blocks protected msc- namespace targets', () => {
    expect(() =>
      execSync('node scripts/msc-forge.mjs ui/msc-shield.css msc-accent msc-danger --dry-run', { encoding: 'utf8' })
    ).toThrow()
  })
})
```

---

### 1.6 — Environment contract strictness (P0)

Root `.env.example` already exists. Extend validation in `scripts/validate-env.mjs`:

1. Add required key list:

```javascript
const REQUIRED_ENV_KEYS = [
  'MSC_DEV_PORT', 'PAYLOAD_SECRET', 'DATABASE_URI', 'GITHUB_PERSONAL_ACCESS_TOKEN',
  'PORT', 'NODE_ENV', 'MSC_PUBLIC_ORIGIN'
]
```

2. After scanning, verify each key appears in `.env.example` (line starts with `KEY=`).

3. Reject committed values matching real-secret patterns (not generic length checks):

```javascript
const looksLikeRealSecret = /^(sk-|ghp_|pk_live_|eyJ|AIza|xoxb-)[A-Za-z0-9\-_.]+$/;

function scanEnvFile(filePath) {
  const lines = readFileSync(filePath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    if (looksLikeRealSecret.test(value)) {
      throw new Error(`Real secret detected in ${filePath}: use YOUR_* placeholders only`);
    }
  }
}
```

Extend `scripts/quickstart.mjs` — `copyEnvTemplate()` already creates `.env.local`; add parallel copy for payload sandbox:

```javascript
function copyPayloadEnvTemplate() {
  const local = path.join(MSC_PROJECT_ROOT, 'examples/nextjs-payload/.env.local')
  const example = path.join(MSC_PROJECT_ROOT, 'examples/nextjs-payload/.env.example')
  if (!fs.existsSync(local) && fs.existsSync(example)) {
    fs.copyFileSync(example, local)
    log('created examples/nextjs-payload/.env.local from template')
  }
}
```

Call `copyPayloadEnvTemplate()` at end of `quickstart.mjs` main flow.

---

### 1.7 — MCP portable token audit (P0)

`.cursor/mcp.json` must use `${workspaceFolder}` for filesystem paths (already configured). Extend `scripts/msc-verify-mcp.mjs`:

1. Fail when any `args` string matches `/^[A-Za-z]:\\\\/` (Windows absolute) or `^/` (Unix absolute) except `${workspaceFolder}`.
2. Fail when committed `env` values do not match `/YOUR_|your_|CHANGE_ME|REPLACE_WITH/i` for token-bearing keys listed in `MCP_ENV_KEYS`.
3. Emit JSON summary when `--json` flag passed (mirror `health.mjs` pattern).

---

### 1.8 — Node version harmonization (P0)

**Current drift:** `.nvmrc` = `20`, `.devcontainer/devcontainer.json` image may use `javascript-node:22`.

**Fix `.devcontainer/devcontainer.json`:**

```json
{
  "name": "Boilerplate-v2 Gold Master",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:20",
  "postCreateCommand": "npm run bootstrap",
  "forwardPorts": [3000, 3001, 8080]
}
```

**Pin `.nvmrc`:**

```
20.19.1
```

Add `scripts/lib/msc-node-version-guard.mjs`:

```javascript
import process from 'node:process'
const major = Number(process.versions.node.split('.')[0])
if (major !== 20) {
  console.error(`[msc:node-guard] Node 20.x required; found ${process.versions.node}`)
  process.exit(1)
}
```

Import this guard as the second line (after `msc-load-env.mjs`) in: `quickstart.mjs`, `msc-grade-boilerplate.mjs`, `health.mjs`.

**Phase 6 note:** Create the node guard **before** devcontainer and `.nvmrc` edits.

---

### 1.9 — Port-kill script consolidation audit (P0)

**Current state:**

- `msc:kill-dev-port` → `scripts/kill-ports.mjs` (clears 3000, 3001, 8080 via `kill-port`)
- `msc:kill` → `scripts/msc-kill-dev-port.mjs` (single port, cross-platform netstat/lsof)

**Canonical strategy:**

| Script | Purpose |
|--------|---------|
| `scripts/msc-kill-dev-port.mjs` | Single-port precision kill (canonical) |
| `scripts/msc-kill-all-dev-ports.mjs` | Wrapper calling `msc-kill-dev-port.mjs` for 3000, 3001, 8080 |

Rename `kill-ports.mjs` → `scripts/msc-kill-all-dev-ports.mjs` and update `package.json`:

```json
"msc:kill-dev-port": "node scripts/msc-kill-all-dev-ports.mjs",
"msc:kill": "node scripts/msc-kill-dev-port.mjs"
```

Update grade check path from `kill-ports.mjs` to `msc-kill-all-dev-ports.mjs`.

**Port-kill validation behavior:** If ports are already free, script exits `0`. If `kill-port` package is missing, script must log `no ports to kill` and exit `0` — never fail the upgrade for idle ports.

---

### 1.10 — PHP defensive security block audit (P0)

Every PHP file under `core/` must begin with:

```php
<?php
defined('ABSPATH') || exit;
```

For standalone CLI/bootstrap contexts, `core/msc-bootstrap.php` may retain:

```php
defined('ABSPATH') || defined('MSC_STANDALONE_RUN') || define('MSC_STANDALONE_RUN', true);
if (defined('ABSPATH')) {
    defined('WPINC') || exit;
}
```

All other PHP files (`core/msc-assets.php`, `core/msc-utilities.php`, `core/msc-communications.php`) must use the strict two-line guard as their first executable statements after the file docblock.

---

### 1.11 — Phase 1 exit gate

```bash
npm run msc:validate-env
npm run verify:mcp
npm run grade
```

All three must exit `0`. Log result: `Phase 1 complete — grade X/X`.

---

# 📌 Phase 2: Core Workspace & Tooling Enhancements

**Phase 2 completion criteria:** `npm run msc:lint` and `npm run grade` exit `0`. Lint exits clean. No TODO comments remain.

---

### 2.1 — Package manager lock (P0)

Add to root `package.json`:

```json
{
  "packageManager": "npm@10.9.2",
  "engines": {
    "node": ">=20.0.0 <21.0.0",
    "npm": ">=10.0.0"
  },
  "license": "MIT"
}
```

After adding `packageManager`, run:

```bash
npm install
```

Create root `LICENSE` with MIT full text.

**Badge policy:** Do **not** update README Self-Grade badge until Phase 6 Step 48 achieves `52/52 (100%)`. CI badge may be added now:

```markdown
[![CI](https://github.com/jonbeatz/Boilerplate-v1/actions/workflows/ci.yml/badge.svg)](https://github.com/jonbeatz/Boilerplate-v1/actions/workflows/ci.yml)
```

---

### 2.2 — `.cursor/mcp.json` portable environment token map (P0)

Create `.cursor/docs/mcp-env-token-map.md` documenting the binding:

| MCP env key | `.env.example` key | Hydration |
|-------------|-------------------|-----------|
| `GITHUB_PERSONAL_ACCESS_TOKEN` | `GITHUB_PERSONAL_ACCESS_TOKEN` | `msc-load-env.mjs` |
| `TAVILY_API_KEY` | `TAVILY_API_KEY` | same |
| `FIRECRAWL_API_KEY` | `FIRECRAWL_API_KEY` | same |
| `RESEND_API_KEY` | `RESEND_API_KEY` | same |
| `WP_API_USERNAME` | `WP_API_USERNAME` | same |
| `WP_API_PASSWORD` | `WP_API_PASSWORD` | same |

Extend `scripts/msc-verify-mcp.mjs` to print `[PASS] Token map complete` when every `MCP_ENV_KEYS` entry exists in `.env.example`.

No live tokens in committed `.cursor/mcp.json` — only `YOUR_*` placeholders.

---

### 2.3 — Health check deep probe expansion (P1)

Replace `scripts/health.mjs` JSON output shape with structured diagnostics:

```javascript
const diagnostics = {
  timestamp: new Date().toISOString(),
  nodeVersion: process.versions.node,
  ports: await Promise.all(targetPorts.map(async (port) => ({
    port,
    status: await probeSocket(port),
  }))),
  envLocal: fs.existsSync(path.join(MSC_PROJECT_ROOT, '.env.local')) ? 'CONFIGURED' : 'MISSING',
  nvmrc: fs.existsSync(path.join(MSC_PROJECT_ROOT, '.nvmrc')) ? fs.readFileSync(path.join(MSC_PROJECT_ROOT, '.nvmrc'), 'utf8').trim() : 'MISSING',
  sandboxes: {
    nextjsMinimal: fs.existsSync(path.join(MSC_PROJECT_ROOT, 'examples/nextjs-minimal/node_modules')) ? 'INSTALLED' : 'NOT_INSTALLED',
    nextjsPayload: fs.existsSync(path.join(MSC_PROJECT_ROOT, 'examples/nextjs-payload/node_modules')) ? 'INSTALLED' : 'NOT_INSTALLED',
  },
  sqlitePayloadDb: fs.existsSync(path.join(MSC_PROJECT_ROOT, 'examples/nextjs-payload/database/payload.db')) ? 'PRESENT' : 'ABSENT',
}
```

Add npm script alias `"msc:health:json": "node scripts/health.mjs --json"`.

---

### 2.4 — Biome lint/format baseline (P0)

**Before Biome init — remove Prettier configs if present:**

```bash
rm -f .prettierrc .prettierrc.json .prettierrc.js .prettierignore
```

Install at root:

```bash
npm install --save-dev @biomejs/biome lint-staged vitest
npx @biomejs/biome init
```

Configure `biome.json`:

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "organizeImports": { "enabled": true },
  "linter": { "enabled": true, "rules": { "recommended": true } },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "javascript": {
    "formatter": { "quoteStyle": "single" }
  },
  "files": {
    "ignore": ["node_modules", ".next", "dist", "examples/*/node_modules", "examples/*/.next"]
  }
}
```

Add scripts:

```json
"msc:lint": "biome check .",
"msc:lint:fix": "biome check --write .",
"msc:format": "biome format --write ."
```

Add `lint-staged` to `package.json`:

```json
"lint-staged": {
  "*.{js,mjs,ts,tsx,jsx}": ["biome check --write"],
  "*.{json,css,md}": ["biome format --write"]
}
```

Verify lint works before configuring lint-staged hooks:

```bash
npm run msc:lint
```

---

### 2.5 — Husky hook strategy (fast commit, strict push) (P0)

**`.husky/pre-commit`:**

```bash
#!/usr/bin/env sh
. "$(dirname "$0")/_/husky.sh"
npx lint-staged
npm run msc:validate-env
npm run verify:mcp
```

**`.husky/pre-push` (create):**

```bash
#!/usr/bin/env sh
. "$(dirname "$0")/_/husky.sh"
npm run grade
npm run msc:test:root
```

Keep grade off pre-commit to preserve WIP commit velocity; enforce full structural audit before push.

---

### 2.6 — `.vscode/` and `.cursor/settings.json` (P1)

Create `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "biomejs.biome",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "github.vscode-github-actions"
  ]
}
```

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "biomejs.biome",
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "files.exclude": { "**/.next": true, "**/node_modules": true },
  "search.exclude": {
    "**/node_modules": true,
    "**/.next": true,
    "examples/nextjs-payload/database": true
  }
}
```

---

### 2.7 — Cursor rules migration (`.cursorrules` → modular `.mdc`) (P0)

1. Create `.cursor/rules/global.mdc` with **double linebreak** after frontmatter closing `---`:

```yaml
---
description: Global MSC rules — env, security, naming, lean boundary
globs: "*"
alwaysApply: true
---


## Core Naming Protocol

```

Paste full content from root `.cursorrules` immediately after the blank line following the closing `---`.

**Critical:** `.mdc` files require a clean break (blank line) between YAML frontmatter and markdown body. Without it, Cursor may not parse rules correctly.

2. Split focused rules (extract from `.cursorrules` content):

| File | globs | Purpose |
|------|-------|---------|
| `.cursor/rules/agent-workflow.mdc` | `["**/*"]` | Session open/close, handoff |
| `.cursor/rules/terminal-discipline.mdc` | `["scripts/**"]` | Port/process hygiene |
| `.cursor/rules/error-handling.mdc` | `["**/*.{ts,tsx,mjs}"]` | Boundary discipline |

Each split file uses the same frontmatter pattern with blank line after `---`.

3. Replace root `.cursorrules` with deprecation notice:

```markdown
# .cursorrules (DEPRECATED)

# This file is preserved for backward compatibility.
# Active rules have migrated to .cursor/rules/global.mdc
# Do not edit this file — edit .cursor/rules/ instead
```

4. Update `TRUTH.md` §3 doc hierarchy line 2 to: `.cursor/rules/global.mdc (session bindings — alwaysApply)`.

---

### 2.8 — Interactive onboarding script (P1)

Create `scripts/msc-onboarding.mjs` with first-line `import './lib/msc-load-env.mjs'`. The script must:

1. Verify Node 20 via `msc-node-version-guard.mjs`.
2. Copy `.env.example` → `.env.local` when missing.
3. Copy `examples/nextjs-payload/.env.example` → `examples/nextjs-payload/.env.local` when missing.
4. Prompt for sandbox choice: `1` = minimal (3000), `2` = payload (3000/3001), `3` = manual.
5. Write `PORT=`, `MSC_DEV_PORT=`, and `PORT_PAYLOAD=` into `.env.local`.
6. When choice `2`, set `PAYLOAD_SECRET=` to user input or `randomUUID()`.
7. Run `npm run bootstrap` via `execSync(..., { stdio: 'inherit' })`.
8. Print start commands: `npm run msc:dev:example` and optionally `npm run msc:dev:payload`.

Register: `"msc:onboard": "node scripts/msc-onboarding.mjs"`.

Update `README.md` Quick Start to lead with `npm run msc:onboard`.

---

### 2.9 — Documentation map and operational runbooks (P1)

Insert into `README.md` after Overview the Documentation Navigation table (first-time user → START-HERE → DOCS; AI agent → Code-Jedi → TRUTH).

Create `TROUBLESHOOTING.md` at repo root with sections: Bootstrap Failures, Port Conflicts (`npm run msc:kill -- 3000`), Payload Sandbox, Credential Scan, MCP Failures, Grade/CI Drift. Link from README Quick Start.

Create `ARCHITECTURE.md` with Mermaid diagram showing Root → `.cursor/` → `scripts/` → `ui/` → `examples/nextjs-minimal` (15.5.7:3000) and `examples/nextjs-payload` (15.4.11:3001) → `core/` PHP bridge.

Create `CHANGELOG.md` (Keep a Changelog format) with `[2.0.0-JEDI]` and `[Unreleased]` sections.

Create `CONTRIBUTING.md` covering fork/rename via `msc:forge`, script conventions, CSS `msc-` prefix rule, pre-commit gates.

Create `config/README.md` explaining `litellm_config.yaml` and `npm-scripts-appendix.json`.

---

### 2.10 — Phase 2 exit gate

```bash
npm run msc:lint
npm run grade
```

Grade must remain 100%. New checks added in Phase 5 increase the denominator — target 100% of expanded total.

---

# 📌 Phase 3: Vader Protocol & Shield Layer Isolation Upgrades

Studio Dark contract: Background `#121212`, Surface `#1c1c1c`, text high-contrast light gray. All layout classes use unique `msc-` prefixes to prevent Divi collisions.

**Phase 3 completion criteria:** `npm run msc:shield:audit` passes. `npm run grade` at 100%. No hardcoded hex in `examples/**/*.tsx`.

---

### 3.1 — CSS class namespace enforcement script (P0)

Create `scripts/msc-shield-audit.mjs` that scans every `ui/*.css` file, extracts class selectors, and exits non-zero when any class does not start with `msc-` (excluding pseudo-states). Register `"msc:shield:audit": "node scripts/msc-shield-audit.mjs"`.

---

### 3.2 — Design asset ingestion parser (`msc-ingest`) (P1)

Create `tests/fixtures/sample-input.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head><title>MSC Ingest Fixture</title></head>
<body>
  <motion.div class="flex p-4 bg-gray-900 text-white" style="color: red;">
    <script>console.log('strip me')</script>
    <h1 class="text-2xl font-bold">Sample Hero</h1>
    <button class="btn-primary px-4 py-2">Click</button>
  </motion.div>
</body>
</html>
```

Create `scripts/msc-ingest.mjs`:

1. Usage: `npm run msc:ingest -- <input.html> <output-dir>`.
2. Strip `<script>`, inline `style=""`, Tailwind utility classes.
3. Rewrite class tokens to `msc-import-*` prefix.
4. Wrap output in `<motion.div class="msc-viewport-shield msc-shield-root">`.
5. Write to `ui/imports/msc-import-<timestamp>.html` + companion CSS using only `var(--msc-*)` tokens.

Validation command:

```bash
npm run msc:ingest -- tests/fixtures/sample-input.html ui/imports
grep -q 'msc-import-' ui/imports/msc-import-*.html && echo "Ingest OK"
grep -q 'msc-viewport-shield' ui/imports/msc-import-*.html && echo "Shield wrapper OK"
```

---

### 3.3 — PHP shield enqueue chain hardening (P0)

In `core/msc-assets.php`, ensure `msc_enqueue_shield_satellite_chain()` loads: `msc-shield.css` → `studio-dark-shield.css` → `msc-shield-load.css` → extensions when `MSC_SHIELD_EXTENSIONS=1`. Add `defined('ABSPATH') || exit;` as first executable line. All PHP functions use `msc_*` naming.

---

### 3.4 — TSX component guardrails (P0)

Update `examples/nextjs-minimal/app/layout.tsx` — see Phase 6 Step 28 for exact replacement instructions.

Import shield chain in `app/globals.css` via `@import` of `../../../ui/msc-shield.css`, `studio-dark-shield.css`, `msc-shield-load.css`. Grade check rejects hardcoded hex in `examples/**/*.tsx`.

---

### 3.5 — Snippet vault (`.cursor/blueprints/`) (P1)

Create `.cursor/blueprints/README.md` indexing: `msc-smtp-verification.php`, `msc-sqlite-collection.ts`, `msc-dashboard-shell.tsx`. Each uses `msc-` prefixes and Studio Dark wrappers.

Generate initial blueprint stub:

```bash
mkdir -p .cursor/blueprints
echo "# msc-smtp-verification.php — MSC SMTP verification snippet stub" > .cursor/blueprints/msc-smtp-verification.php
```

---

### 3.6 — Component generator (Vader-compliant) (P1)

Create `scripts/msc-new-component.mjs` — usage `npm run msc:new:component -- msc-button [nextjs-minimal]`. Reject names not matching `/^msc-[a-z0-9-]+$/`. Scaffold `index.tsx`, `styles.css`, Vitest test file, README with Studio Dark token comments.

---

### 3.7 — Phase 3 exit gate

```bash
npm run msc:shield:audit
npm run msc:new:component -- msc-smoke-test nextjs-minimal
cd examples/nextjs-minimal && npm run test
npm run grade
```

---

# 📌 Phase 4: Full-Stack Sandbox & Lean Boundary Hardening

**Phase 4 completion criteria:** Payload sandbox builds after `npm ci`. All three lockfiles committed. Grade at 100%.

---

### 4.1 — SQLite data isolation (P0)

Ensure `examples/nextjs-payload/.gitignore` contains `database/`, `*.db`, `*.db-wal`, `*.db-shm`, `.env.local`. Create `examples/nextjs-payload/database/.gitkeep`. Document Next.js 15.4.11 pin in sandbox README and `_comment` in `package.json`.

---

### 4.2 — Payload config tightening (P0)

In `examples/nextjs-payload/src/payload.config.ts`: throw when `!process.env.PAYLOAD_SECRET` in production; honor `PAYLOAD_DB_PUSH=false` from env; keep `serverURL` from `MSC_PUBLIC_ORIGIN` defaulting to `http://127.0.0.1:3001`. Maintain sandbox-local `.env.example` with `PAYLOAD_SECRET`, `DATABASE_URI=file:./database/payload.db`.

Exact production guard (Phase 6 Step 32):

```typescript
if (process.env.NODE_ENV === 'production' && !process.env.PAYLOAD_SECRET) {
  throw new Error('PAYLOAD_SECRET is required in production')
}
```

Test failure mode:

```bash
cd examples/nextjs-payload
NODE_ENV=production PAYLOAD_SECRET= npm run build
# Must exit non-zero with PAYLOAD_SECRET error
NODE_ENV=development npm run build
# Must succeed with dev defaults
```

---

### 4.3 — Mock media asset pipeline (P1)

Create `scripts/msc-mock-media.mjs` generating placeholders in `examples/nextjs-payload/media/mock/` only. Register `"msc:mock:media": "node scripts/msc-mock-media.mjs"`.

---

### 4.4 — Docker Compose (optional Postgres mirror) (P2)

Create root `docker-compose.yml` with `msc-postgres` service (postgres:16-alpine, port 5432, healthcheck). Create `scripts/msc-docker-up.mjs` and `scripts/msc-docker-down.mjs` (first line: `import './lib/msc-load-env.mjs'`).

Docker is **opt-in** — default dev remains SQLite in payload sandbox. Grade check verifies `docker-compose.yml` exists, not that containers are running.

Add commented keys to root `.env.example`:

```bash
# --- Docker Services (optional — uncomment if using docker-compose.yml) ---
# DOCKER_POSTGRES_URL=postgresql://msc_user:msc_password@localhost:5432/msc_db
# DOCKER_REDIS_URL=redis://localhost:6379
```

If skipping Docker entirely, leave keys commented. Step 36 is satisfied when commented keys exist in `.env.example`.

---

### 4.5 — WordPress shield quarantine documentation (P1)

Add Stack Support table to README: Web App (nextjs-minimal), Full-Stack CMS (nextjs-payload), WordPress Shield (`core/msc-bootstrap.php`). PHP never installs via npm. Reference `core/core-Divi-Scriptz.js` as Divi consumer bridge.

---

### 4.6 — Lockfile hygiene (P0)

Require committed: `package-lock.json`, `examples/nextjs-minimal/package-lock.json`, `examples/nextjs-payload/package-lock.json`. CI uses `npm ci`.

Create `scripts/msc-ensure-lockfiles.mjs`:

```javascript
import './lib/msc-load-env.mjs'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { execSync } from 'node:child_process'
import { MSC_PROJECT_ROOT } from './lib/msc-load-env.mjs'

const targets = [
  '.',
  'examples/nextjs-minimal',
  'examples/nextjs-payload',
]

for (const rel of targets) {
  const dir = join(MSC_PROJECT_ROOT, rel)
  const lock = join(dir, 'package-lock.json')
  if (!existsSync(lock)) {
    console.log(`[msc:ensure-lockfiles] Generating ${rel}/package-lock.json`)
    execSync('npm install --package-lock-only', { cwd: dir, stdio: 'inherit' })
  } else {
    console.log(`[msc:ensure-lockfiles] OK ${rel}/package-lock.json`)
  }
}
console.log('[msc:ensure-lockfiles] All lockfiles present')
```

Register: `"msc:ensure-lockfiles": "node scripts/msc-ensure-lockfiles.mjs"`.

Update `.github/workflows/ci.yml` to run payload `npm ci && npm run build`.

**Build order (mandatory):** Always run `npm ci` before `npm run build` in payload sandbox.

---

### 4.7 — Phase 4 exit gate

```bash
npm run msc:mock:media
cd examples/nextjs-payload && npm ci && npm run build
npm run grade
```

---

# 📌 Phase 5: 52-Point Integrity Self-Grader Expansion Suite

Expand `scripts/msc-grade-boilerplate.mjs` from 38 to **52 checks**. Preserve non-zero exit on any failure. Every failure must print `❌ [FAIL] <name>` and aggregate to stderr list.

**Phase 5 completion criteria:** `Final Grade: 52/52 (100%)`. `npm run msc:test:all` green. `npm run msc:shield:audit` PASS.

---

### 5.1 — Complete 52-point check registry

| # | Check name | Condition |
|---|------------|-----------|
| 1 | HOW-TO.md exists | `pathExists('.cursor/docs/HOW-TO.md')` |
| 2 | Code-Jedi.md exists | `pathExists('.cursor/docs/Code-Jedi.md')` |
| 3 | TRUTH.md exists | `pathExists('TRUTH.md')` |
| 4 | DOCS.md exists (v2 index) | `pathExists('DOCS.md')` |
| 5 | system-architecture.md exists | `pathExists('.cursor/docs/system-architecture.md')` |
| 6 | consumer-bootstrap.md exists | `pathExists('.cursor/docs/consumer-bootstrap.md')` |
| 7 | studio-dark-ui.mdc exists | `pathExists('.cursor/rules/studio-dark-ui.mdc')` |
| 8 | tailwind-shadcn-bridge.mdc exists | `pathExists('.cursor/rules/tailwind-shadcn-bridge.mdc')` |
| 9 | design-system-rules.mdc exists | `pathExists('.cursor/rules/design-system-rules.mdc')` |
| 10 | Skills README exists | `pathExists('.cursor/skills/README.md')` |
| 11 | studio-dark-shield skill exists | `pathExists('.cursor/skills/studio-dark-shield.md')` |
| 12 | MCP registry has 13 servers | `servers.length === 13` |
| 13 | All expected MCP server IDs registered | no missing IDs |
| 14 | msc-shield.css exists | file exists |
| 15 | ui/studio-dark-shield.css exists (v2) | file exists |
| 16 | msc-shield-load.css exists | file exists |
| 17 | msc-layout.css exists | file exists |
| 18 | msc-components.css exists | file exists |
| 19 | examples/nextjs-minimal/package.json exists | file exists |
| 20 | examples/nextjs-payload/package.json exists | file exists |
| 21 | examples/nextjs-payload payload.config exists | file exists |
| 22 | examples/nextjs-payload MediaVault exists | file exists |
| 23 | .devcontainer/devcontainer.json exists | file exists |
| 24 | .nvmrc exists (Node 20 lock) | file exists |
| 25 | .github/workflows/ci.yml exists | file exists |
| 26 | health.mjs exists | file exists |
| 27 | msc-update.mjs exists | file exists |
| 28 | msc-forge.mjs exists | file exists |
| 29 | Husky pre-commit exists | file exists |
| 30 | pre-commit runs verify:mcp | regex in hook |
| 31 | pre-commit runs msc:validate-env | regex in hook |
| 32 | quickstart.mjs exists | file exists |
| 33 | validate-env.mjs exists | file exists |
| 34 | msc-kill-all-dev-ports.mjs exists | replaces kill-ports.mjs |
| 35 | msc-log-event.mjs exists | file exists |
| 36 | msc-generate-inventory.mjs exists | file exists |
| 37 | msc-verify-mcp.mjs exists | file exists |
| 38 | package.json lifecycle scripts present | required scripts array |
| 39 | package.json main is not PHP | `!pkg.main.endsWith('.php')` |
| 40 | packageManager field present | `Boolean(pkg.packageManager)` |
| 41 | engines.node locks to 20.x | `/20/.test(pkg.engines.node)` |
| 42 | license is MIT | `pkg.license === 'MIT'` |
| 43 | .env.example exists at root | file exists |
| 44 | LICENSE exists | file exists |
| 45 | TROUBLESHOOTING.md exists | file exists |
| 46 | ARCHITECTURE.md exists | file exists |
| 47 | CHANGELOG.md exists | file exists |
| 48 | CONTRIBUTING.md exists | file exists |
| 49 | biome.json exists | file exists |
| 50 | .husky/pre-push exists | file exists |
| 51 | global.mdc rules migrated | `.cursor/rules/global.mdc` exists |
| 52 | core/core-Divi-Scriptz.js exact casing | see snippet below |

---

### 5.2 — Grader code snippets for `scripts/msc-grade-boilerplate.mjs`

Insert after existing automation block. Replace check #34 path. Add checks #39–52:

```javascript
// Replace kill-ports check with:
report('msc-kill-all-dev-ports.mjs exists', pathExists('scripts/msc-kill-all-dev-ports.mjs'))

// After package.json lifecycle scripts block:
try {
  const pkg = JSON.parse(readFileSync(join(MSC_PROJECT_ROOT, 'package.json'), 'utf8'))
  report('package.json main is not PHP', !/\.php$/.test(pkg.main ?? ''))
  report('packageManager field present', Boolean(pkg.packageManager))
  report('engines.node locks to 20.x', /20/.test(pkg.engines?.node ?? ''))
  report('license is MIT', pkg.license === 'MIT')
} catch {
  report('package.json expanded checks readable', false)
}

report('.env.example exists at root', pathExists('.env.example'))
report('LICENSE exists', pathExists('LICENSE'))
report('TROUBLESHOOTING.md exists', pathExists('TROUBLESHOOTING.md'))
report('ARCHITECTURE.md exists', pathExists('ARCHITECTURE.md'))
report('CHANGELOG.md exists', pathExists('CHANGELOG.md'))
report('CONTRIBUTING.md exists', pathExists('CONTRIBUTING.md'))
report('biome.json exists', pathExists('biome.json'))
report('.husky/pre-push exists', pathExists('.husky/pre-push'))
report('global.mdc rules migrated', pathExists('.cursor/rules/global.mdc'))

// core-Divi-Scriptz.js exact casing — reject legacy camelCase
const diviCanonical = 'core/core-Divi-Scriptz.js'
const diviLegacy = 'core/coreDiviScriptz.js'
report(
  'core/core-Divi-Scriptz.js exact casing',
  pathExists(diviCanonical) && !pathExists(diviLegacy),
)

// Lean boundary ESM inline (optional CI helper — root must stay clean)
try {
  const pkg = JSON.parse(readFileSync(join(MSC_PROJECT_ROOT, 'package.json'), 'utf8'))
  const bad = [
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.devDependencies ?? {}),
  ].filter((k) => /^(next|payload|@payloadcms)/.test(k))
  report('lean boundary — no framework deps at root', bad.length === 0)
} catch {
  report('lean boundary package.json readable', false)
}

// Lockfile trinity
report('root package-lock.json committed', pathExists('package-lock.json'))
report('nextjs-minimal lockfile committed', pathExists('examples/nextjs-minimal/package-lock.json'))
report('nextjs-payload lockfile committed', pathExists('examples/nextjs-payload/package-lock.json'))

// New script existence (fold into 52 — replace lower-priority doc checks if count exceeds 52)
report('msc-onboarding.mjs exists', pathExists('scripts/msc-onboarding.mjs'))
report('msc-shield-audit.mjs exists', pathExists('scripts/msc-shield-audit.mjs'))
report('msc-new-component.mjs exists', pathExists('scripts/msc-new-component.mjs'))
report('msc-ensure-lockfiles.mjs exists', pathExists('scripts/msc-ensure-lockfiles.mjs'))
report('ingest fixture exists', pathExists('tests/fixtures/sample-input.html'))
report('.cursor/blueprints/README.md exists', pathExists('.cursor/blueprints/README.md'))

// Devcontainer Node 20
if (pathExists('.devcontainer/devcontainer.json')) {
  const dc = readFileSync(join(MSC_PROJECT_ROOT, '.devcontainer/devcontainer.json'), 'utf8')
  report('devcontainer uses Node 20 image', /javascript-node:20/.test(dc))
}

// Final stderr capture enhancement
if (score.failures.length > 0) {
  console.error('\nFailures:')
  for (const f of score.failures) {
    console.error(`  - FAILED CHECK: ${f}`)
  }
}
```

**Note:** If total checks exceed 52 after folding lockfile and script checks, consolidate doc existence checks (45–48) into a single `operational docs exist` composite check to maintain exactly **52** total. The grader must always print `Final Grade: 52/52 (100%)` at completion.

---

### 5.3 — CI pipeline targets (P0)

Update `.github/workflows/ci.yml` step order:

1. `npm ci`
2. `npm run msc:validate-env`
3. `npm run verify:mcp`
4. `npm run msc:lint`
5. `npm run grade` (100%)
6. `npm run msc:test:root`
7. Sandbox `npm ci` + test/build for both examples

---

### 5.4 — Root structural test suite (P0)

Create `vitest.config.ts` including `tests/**/*.test.ts` and `scripts/__tests__/**/*.test.mjs`. Create `tests/msc-boilerplate-structure.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

describe('MSC boilerplate structure', () => {
  it('package.json main is not PHP', () => {
    const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
    expect(pkg.main ?? '').not.toMatch(/\.php$/)
  })

  it('core-Divi-Scriptz.js uses exact casing', () => {
    expect(existsSync(join(root, 'core/core-Divi-Scriptz.js'))).toBe(true)
    expect(existsSync(join(root, 'core/coreDiviScriptz.js'))).toBe(false)
  })

  it('.env.example has no real secrets', () => {
    const content = readFileSync(join(root, '.env.example'), 'utf8')
    expect(content).not.toMatch(/^(sk-|ghp_|pk_live_|eyJ|AIza|xoxb-)/m)
  })
})
```

Add scripts:

```json
"msc:test:root": "vitest run",
"msc:test:all": "vitest run && cd examples/nextjs-minimal && npm test"
```

---

### 5.5 — Zero-drift enforcement (P0)

After every Phase 6 step: `npm run grade || exit 1`. Output must show `(100%)`. Update README Self-Grade badge to `self-grade-52/52` **only after** Step 48 passes — never earlier.

---

### 5.6 — Phase 5 exit gate

```bash
npm run grade
npm run msc:test:all
npm run msc:shield:audit
```

Expected: `Final Grade: 52/52 (100%)`.

---

# 📌 Phase 6: Sequential Step-by-Step AI Agent Action Runbook

> **# EXECUTION ORDER IS MANDATORY**
>
> Do not reorder steps for efficiency. Do not parallelize Phase 6 steps. Execute one step, validate, commit, then advance.

### Chunk Execution Plan

| Chunk | Steps | Scope | Stop condition |
|-------|-------|-------|----------------|
| **A** | 0–20 | Foundation + tooling + rules migration | Grade ≥ baseline; commit after each step |
| **B** | 21–40 | Shield + sandbox + grader expansion | Grade ≥ 45/52 minimum before Chunk C |
| **C** | 41–52 + FORCE_LOOP | Tests + polish + triple verification | `52/52 (100%)` three consecutive runs |

After each chunk, write to `.cursor/docs/project-log.md`:

```markdown
## Chunk [A|B|C] complete — [ISO timestamp]
- Last step: N
- Grade: X/Y
- Commits: [hash list]
```

---

### Phase 6 Step Table (reordered — node guard before devcontainer)

| Step | Action | Validation gate |
|------|--------|-----------------|
| **0** | **Pre-flight snapshot:** `git rev-parse HEAD > .cursor/pre-upgrade-commit.txt`, `npm run grade > .cursor/pre-grade-baseline.txt`, verify working tree clean (`git status --porcelain`) | working tree clean, baseline captured |
| 1 | Baseline: `node -v`, `npm run grade`, `npm run msc:validate-env` | Record grade in `project-log.md` |
| 2 | Create `scripts/lib/msc-node-version-guard.mjs`; import in `quickstart.mjs`, `msc-grade-boilerplate.mjs`, `health.mjs` | `node scripts/lib/msc-node-version-guard.mjs` exits 0 |
| 3 | **4a — Verify guard in isolation:** `node scripts/lib/msc-node-version-guard.mjs` | Must exit 0 before proceeding |
| 4 | Fix `.devcontainer/devcontainer.json` to Node 20 image | `grep node:20 .devcontainer/devcontainer.json` |
| 5 | Pin `.nvmrc` to `20.19.1` | `cat .nvmrc` prints `20.19.1` |
| 6 | Replace PHP main with `core/index.mjs`; set `"main": "core/index.mjs"` | `node -e "import('./core/index.mjs').then(m=>console.log(m.MSC_VERSION))"` |
| 7 | Ensure `core/core-Divi-Scriptz.js` exists at canonical path; remove camelCase variants | `test -f core/core-Divi-Scriptz.js` |
| 8 | Rename `kill-ports.mjs` → `msc-kill-all-dev-ports.mjs`; update `package.json` | `npm run msc:kill-dev-port` exits 0 (ports free OK) |
| 9 | Harden `msc-forge.mjs` regex guards | protected path mutation blocked |
| 10 | Extend `validate-env.mjs` with `REQUIRED_ENV_KEYS` + `looksLikeRealSecret` regex | `npm run msc:validate-env` exits 0 |
| 11 | Add `copyPayloadEnvTemplate()` to `quickstart.mjs` | payload `.env.local` created on quickstart |
| 12 | Extend `msc-verify-mcp.mjs` path + JSON output | `npm run verify:mcp` exits 0 |
| 13 | Expand `health.mjs` JSON diagnostics | `npm run msc:health -- --json` returns ports array |
| 14 | Add packageManager, engines, MIT license + LICENSE file; run `npm install` | `npm pkg get license` prints `"MIT"` |
| 15 | Remove `.prettierrc*` / `.prettierignore` if present | `test ! -f .prettierrc && test ! -f .prettierignore` |
| 16 | Install Biome; add `msc:lint` scripts; verify `npm run msc:lint` | lint exits 0 |
| 17 | Configure lint-staged (after Biome verified) | `npx lint-staged --help` available |
| 18 | Update `.husky/pre-commit` | contains lint-staged + validate-env + verify:mcp |
| 19 | Create `.husky/pre-push` | file exists with grade + msc:test:root |
| 20 | Create `.vscode/settings.json` + extensions.json | files exist |
| 21 | Migrate `.cursorrules` → `.cursor/rules/global.mdc` (globs: `"*"`, alwaysApply: true, blank line after `---`) | `grep alwaysApply .cursor/rules/global.mdc` |
| 22 | Replace root `.cursorrules` with deprecation notice | deprecation header present |
| 23 | Update TRUTH.md doc hierarchy | grep `global.mdc` |
| 24 | Create `scripts/msc-onboarding.mjs` | `npm run msc:onboard -- --help` or dry run |
| 25 | Add doc map + TROUBLESHOOTING + ARCHITECTURE | files exist |
| 26 | Create CHANGELOG, CONTRIBUTING, config/README | files exist |
| 27 | Create `scripts/msc-shield-audit.mjs` | `npm run msc:shield:audit` PASS |
| 28 | Create `tests/fixtures/sample-input.html` + `scripts/msc-ingest.mjs` | ingest fixture produces `msc-import-*` |
| 29 | Harden `core/msc-assets.php` ABSPATH + msc_* names | PHP guard present |
| 30 | Audit all `core/*.php` for ABSPATH guard | all core PHP guarded |
| 31 | **Update nextjs-minimal layout shield wrapper** — see §6.1 below | layout.tsx grep passes |
| 32 | Create `.cursor/blueprints/` + README + smtp stub | directory exists |
| 33 | Create `scripts/msc-new-component.mjs` | scaffolds msc-button |
| 34 | Payload README pin + package.json _comment | 15.4.11 documented |
| 35 | Tighten `payload.config.ts` secret guard — see §6.2 below | production build fails without secret |
| 36 | Create payload `database/.gitkeep` | dir tracked |
| 37 | **`cd examples/nextjs-payload && npm ci`** | node_modules installed |
| 38 | Create `scripts/msc-mock-media.mjs` | mock files created |
| 39 | Create docker-compose + msc-docker scripts (opt-in) | `docker compose config` valid if Docker installed |
| 40 | Add commented Postgres keys to `.env.example` | commented keys present |
| 41 | Update ci.yml with npm ci, lint, payload build | YAML valid |
| 42 | Expand grader to 52 checks — insert §5.2 snippets | grade shows 52 total |
| 43 | Create vitest.config + structure tests | `npm run msc:test:root` passes |
| 44 | **39a:** `npm run msc:test:root -- --passWithNoTests` then full run | tests pass |
| 45 | Create `scripts/__tests__` for forge, validate-env, health | tests pass |
| 46 | Run `npm run msc:ensure-lockfiles` | all three lockfiles present |
| 47 | Run `npm run bootstrap` | exits 0 |
| 48 | Run dev smoke: `verify:local` | smoke passes |
| 49 | Payload sandbox: `cd examples/nextjs-payload && npm ci && npm run build` | exits 0 |
| 50 | `npm run msc:shield:audit` | PASS |
| 51 | `npm run msc:lint` | PASS |
| 52 | `npm run msc:test:all` | all green |
| 53 | **`npm run grade`** | **52/52 (100%), exit 0** — capture stderr on failure |
| 54 | `npm run msc:validate-env` + `npm run verify:mcp` | both exit 0 |
| 55 | **Update README Self-Grade badge to 52/52** (only now — not Step 14) | README badge matches grade |
| 56 | Log final score in `project-log.md` | entry written |
| 57 | Bump `package.json` version to `2.1.0` | version confirmed |

---

### §6.1 — Step 31 (layout.tsx) exact replacement instructions

Current `examples/nextjs-minimal/app/layout.tsx` body tag lacks shield wrapper. Execute:

```bash
grep -n 'className=' examples/nextjs-minimal/app/layout.tsx || echo "No className yet — expected"
```

Replace the entire file with:

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Boilerplate v2 Example',
  description: 'Minimal Next.js example for Boilerplate-v2',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="msc-viewport-shield msc-shield-root">{children}</body>
    </html>
  )
}
```

Validation:

```bash
grep 'className="msc-viewport-shield msc-shield-root"' examples/nextjs-minimal/app/layout.tsx
```

Must return exactly one match. Also verify `app/globals.css` contains:

```css
@import '../../../ui/msc-shield.css';
@import '../../../ui/studio-dark-shield.css';
@import '../../../ui/msc-shield-load.css';
```

---

### §6.2 — Step 35 (payload.config.ts) exact secret guard

Open `examples/nextjs-payload/src/payload.config.ts`. Insert immediately after imports, before `buildConfig`:

```typescript
if (process.env.NODE_ENV === 'production' && !process.env.PAYLOAD_SECRET) {
  throw new Error('PAYLOAD_SECRET is required in production')
}
```

Validation sequence:

```bash
cd examples/nextjs-payload
NODE_ENV=production PAYLOAD_SECRET= npm run build
# Expected: non-zero exit, error message contains PAYLOAD_SECRET

NODE_ENV=development npm run build
# Expected: exit 0
```

---

### FORCE_LOOP — Final verification (three consecutive runs)

Three consecutive identical runs confirm there are no side-effect mutations between runs — flaky passes indicate non-deterministic state.

**FORCE_LOOP protocol:** Execute each command, capture exit code. If any fails, reset counter to 0. Only pass when **3 consecutive successes** recorded in `.cursor/docs/project-log.md` with timestamps.

```bash
LOOP_CMD='npm run msc:validate-env && npm run verify:mcp && npm run msc:lint && npm run msc:test:all && npm run grade && npm run msc:shield:audit'
```

Run manually three times, logging each run:

```markdown
## FORCE_LOOP Run 1 — [timestamp] — PASS/FAIL — Grade: 52/52
## FORCE_LOOP Run 2 — [timestamp] — PASS/FAIL — Grade: 52/52
## FORCE_LOOP Run 3 — [timestamp] — PASS/FAIL — Grade: 52/52
```

All commands must exit `0` three times with identical `52/52 (100%)` grade. On failure, fix the named check from grader stderr (`FAILED CHECK: [name]`) and restart from the matching step.

---

### Post-Execution Verification (after Step 57 + FORCE_LOOP)

```bash
npm run msc:onboard
# Select option 1 (minimal)

npm run msc:dev:example
# Must start on :3000

# In new terminal:
npm run msc:health
# Must show 3000 as ACTIVE

# Ctrl+C, then:
npm run msc:kill -- 3000
# Must free port

npm run grade
# Must show 52/52
```

---

## Appendix A: Expected File Diffs by Phase

### Phase 2 expected modified files

- `package.json`
- `.husky/pre-commit`
- `README.md` (doc map only — badge deferred)

### Phase 2 expected new files

- `biome.json`
- `LICENSE`
- `CONTRIBUTING.md`
- `TROUBLESHOOTING.md`
- `ARCHITECTURE.md`
- `CHANGELOG.md`
- `.cursor/rules/global.mdc`

### Phase 5 expected modified files

- `scripts/msc-grade-boilerplate.mjs`
- `.github/workflows/ci.yml`

### Phase 5 expected new files

- `vitest.config.ts`
- `tests/msc-boilerplate-structure.test.ts`
- `scripts/msc-ensure-lockfiles.mjs`
- `tests/fixtures/sample-input.html`

---

## Appendix B: Source Guide Consolidation Map

| Source guide | Primary contributions absorbed |
|--------------|-------------------------------|
| GUIDE-a | P0 bugs (main field, badge timing, kill scripts), Biome lint, CHANGELOG, CONTRIBUTING, cursor rules migration, structural tests |
| GUIDE-b | Architecture diagrams, generator system, dependency enforcement, observability stubs, 90-day phasing |
| GUIDE-c | Documentation map, onboarding script, env contract, packageManager lock, Docker, lockfile hygiene, Playwright path |
| GUIDE-d | ARCHITECTURE.md, ESLint/Biome baseline, neutral aliases, sandbox expansion roadmap |
| GUIDE-e | TRUTH.md, Husky hooks, Node 20 harmonization, LICENSE, FAQ, script consolidation |
| GUIDE-f | MCP portability, shield audit, msc-ingest parser, snippet vault, grade-as-arbiter workflow |
| Feedback | ESM lean boundary, STOP_AND_ASK, rollback, FORCE_LOOP, protected zones, NO REFACTORING, secret regex, chunk execution |

---

## Appendix C: Future Enhancements (P3 — not Phase 6)

These items are **not mandatory** for v2.1.0 Gold Master completion:

- Split runbook into `/upgrade-runs/phase-{1-6}.md` for token-density management
- Playwright E2E suite for both sandboxes
- Redis sidecar in docker-compose
- Repo rename automation (`Boilerplate-v1` → `Boilerplate-v2`)
- Payload Postgres migration path (replace SQLite for production deployments)

---

**Architectural verdict:** Completing Phase 6 with FORCE_LOOP elevates the boilerplate from 38-point to **52-point** self-auditing infrastructure with zero lean-boundary drift, full Studio Dark namespace enforcement, ESM-native tooling, canonical `core/core-Divi-Scriptz.js` casing, and CI-gated non-zero exit validation on every push.
