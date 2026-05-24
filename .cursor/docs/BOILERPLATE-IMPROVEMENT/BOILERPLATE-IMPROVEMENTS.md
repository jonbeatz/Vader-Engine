# 🎯 Master Blueprint: Boilerplate-v2 Technical Optimization Runbook

**Target:** `Boilerplate-v1` → v2.1.0+ (Jedi-Master baseline)  
**Baseline score:** 38/38 (`npm run grade`) · structural audit at 100%  
**Execution model:** An AI agent runs Phase 6 sequentially; each step ends with an explicit validation gate before advancing.  
**Immutable guardrails:** `msc_` / `msc-` / `msc:` naming · Studio Dark tokens · Lean Boundary Rule · PHP `defined('ABSPATH') || exit;` on every PHP entry.

---

## 📌 Phase 1: Pre-Flight Architecture Validation & Namespace Audits

Phase 1 establishes structural truth before any mutation. Do not edit application code until every audit in this phase passes or has an explicit remediation ticket recorded in `.cursor/docs/project-log.md`.

### 1.1 — Baseline integrity snapshot

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

**Expected baseline artifacts (must exist):**

| Path | Role |
|------|------|
| `TRUTH.md` | Constitutional SSoT |
| `.env.example` | Root environment contract |
| `.cursor/mcp.json` | 13-server MCP registry |
| `scripts/msc-grade-boilerplate.mjs` | 38-point grader |
| `scripts/lib/msc-load-env.mjs` | Env hydration (`.env.local` → `.env.example`) |
| `ui/msc-shield.css` | Token SSoT |
| `ui/studio-dark-shield.css` | v2 isolation contract |
| `examples/nextjs-minimal/` | Next.js **15.5.7** frontend sandbox (port **3000**) |
| `examples/nextjs-payload/` | Payload CMS v3.x sandbox (Next.js **15.4.11**, port **3001**) |

### 1.2 — Lean Boundary Rule audit

Verify zero Payload/Next.js runtime dependencies exist in root `package.json` `dependencies` or `devDependencies`. Root may only orchestrate scripts; sandboxes own framework deps.

```bash
node -e "const p=require('./package.json'); const bad=[...Object.keys(p.dependencies||{}),...Object.keys(p.devDependencies||{})].filter(k=>/^(next|payload|@payloadcms)/.test(k)); if(bad.length){console.error('LEAN BOUNDARY VIOLATION:',bad);process.exit(1)} console.log('Lean boundary OK')"
```

Confirm `examples/nextjs-payload/src/payload.config.ts` resolves SQLite exclusively inside the sandbox:

- Database file path: `examples/nextjs-payload/database/payload.db`
- No imports from `examples/nextjs-payload/` appear in root `scripts/` except path references in docs and grade checks

### 1.3 — `package.json` main-field remediation

**Problem:** Root `package.json` currently declares `"main": "core/msc-bootstrap.php"` while `"type": "module"`. Node tooling expects a JS entry.

**Fix:**

1. Remove `"main": "core/msc-bootstrap.php"` from root `package.json`.
2. Create `core/index.mjs`:

```javascript
/**
 * MSC Boilerplate core JS barrel — Powered by the MSC Media Engine
 */
export const MSC_VERSION = '2.1.0';
export const MSC_LEAN_BOUNDARY = 'examples-isolated';
```

3. Add `"main": "core/index.mjs"` to root `package.json`.
4. Add grade check: `report('package.json main is not PHP', !/\.php$/.test(pkg.main ?? ''))`.

WordPress/PHP remains reachable only via `core/msc-bootstrap.php` inside WordPress contexts — never as the npm package entry.

### 1.4 — Namespace & identity alignment audit

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

### 1.5 — `msc-forge` regex validation hardening

Extend `scripts/msc-forge.mjs` protected namespace gate to also block:

```javascript
const protectedNamespaceRegex = /(?:\.msc-|^msc:|^msc_|^MSC[-_]|studio-dark-shield|msc-shield)/i
const protectedPathRegex = /(?:^|\/)(core|ui|scripts)\/msc-/i
```

Before any file mutation, reject when `protectedPathRegex.test(filePath)`.

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

### 1.6 — Environment contract strictness

Root `.env.example` already exists. Extend validation in `scripts/validate-env.mjs`:

1. Add required key list:

```javascript
const REQUIRED_ENV_KEYS = [
  'MSC_DEV_PORT', 'PAYLOAD_SECRET', 'DATABASE_URI', 'GITHUB_PERSONAL_ACCESS_TOKEN',
  'PORT', 'NODE_ENV', 'MSC_PUBLIC_ORIGIN'
]
```

2. After scanning, verify each key appears in `.env.example` (line starts with `KEY=`).
3. Reject committed values matching `/^[a-zA-Z0-9+/=]{40,}$/` unless whitelisted as placeholder.

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

### 1.7 — MCP portable token audit

`.cursor/mcp.json` must use `${workspaceFolder}` for filesystem paths (already configured). Extend `scripts/msc-verify-mcp.mjs`:

1. Fail when any `args` string matches `/^[A-Za-z]:\\\\/` (Windows absolute) or `^/` (Unix absolute) except `${workspaceFolder}`.
2. Fail when committed `env` values do not match `/YOUR_|your_|CHANGE_ME|REPLACE_WITH/i` for token-bearing keys listed in `MCP_ENV_KEYS`.
3. Emit JSON summary when `--json` flag passed (mirror `health.mjs` pattern).

### 1.8 — Node version harmonization

**Current drift:** `.nvmrc` = `20`, `.devcontainer/devcontainer.json` image = `javascript-node:22`.

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

### 1.9 — Port-kill script consolidation audit

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

### 1.10 — PHP defensive security block audit

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

### 1.11 — Phase 1 exit gate

```bash
npm run msc:validate-env
npm run verify:mcp
npm run grade
```

All three must exit `0`. Log result: `Phase 1 complete — grade X/X`.

---

## 📌 Phase 2: Core Workspace & Tooling Enhancements

### 2.1 — Package manager lock

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

Create root `LICENSE` with MIT full text. Update README badge from static `grade-38/38` to:

```markdown
[![Self-Grade](https://img.shields.io/badge/self--grade-38%2F38-brightgreen)](https://github.com/jonbeatz/Boilerplate-v1/actions/workflows/ci.yml)
[![CI](https://github.com/jonbeatz/Boilerplate-v1/actions/workflows/ci.yml/badge.svg)](https://github.com/jonbeatz/Boilerplate-v1/actions/workflows/ci.yml)
```

### 2.2 — `.cursor/mcp.json` portable environment token map

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

### 2.3 — Health check deep probe expansion

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

### 2.4 — Biome lint/format baseline

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

### 2.5 — Husky hook strategy (fast commit, strict push)

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

### 2.6 — `.vscode/` and `.cursor/settings.json`

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

### 2.7 — Cursor rules migration (`.cursorrules` → modular `.mdc`)

1. Create `.cursor/rules/global.mdc`:

```yaml
---
description: Global MSC rules — env, security, naming, lean boundary
alwaysApply: true
---
```

Paste full content from root `.cursorrules`.

2. Split focused rules (extract from `.cursorrules` content):

| File | globs | Purpose |
|------|-------|---------|
| `.cursor/rules/agent-workflow.mdc` | `["**/*"]` | Session open/close, handoff |
| `.cursor/rules/terminal-discipline.mdc` | `["scripts/**"]` | Port/process hygiene |
| `.cursor/rules/error-handling.mdc` | `["**/*.{ts,tsx,mjs}"]` | Boundary discipline |

3. Replace root `.cursorrules` with deprecation notice pointing to `.cursor/rules/global.mdc`.

4. Update `TRUTH.md` §3 doc hierarchy line 2 to: `.cursor/rules/global.mdc (session bindings — alwaysApply)`.

### 2.8 — Interactive onboarding script

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

### 2.9 — Documentation map and operational runbooks

Insert into `README.md` after Overview the Documentation Navigation table (first-time user → START-HERE → DOCS; AI agent → Code-Jedi → TRUTH).

Create `TROUBLESHOOTING.md` at repo root with sections: Bootstrap Failures, Port Conflicts (`npm run msc:kill -- 3000`), Payload Sandbox, Credential Scan, MCP Failures, Grade/CI Drift. Link from README Quick Start.

Create `ARCHITECTURE.md` with Mermaid diagram showing Root → `.cursor/` → `scripts/` → `ui/` → `examples/nextjs-minimal` (15.5.7:3000) and `examples/nextjs-payload` (15.4.11:3001) → `core/` PHP bridge.

Create `CHANGELOG.md` (Keep a Changelog format) with `[2.0.0-JEDI]` and `[Unreleased]` sections.

Create `CONTRIBUTING.md` covering fork/rename via `msc:forge`, script conventions, CSS `msc-` prefix rule, pre-commit gates.

Create `config/README.md` explaining `litellm_config.yaml` and `npm-scripts-appendix.json`.

### 2.10 — Phase 2 exit gate

```bash
npm run msc:lint
npm run grade
```

Grade must remain 100%. New checks added in Phase 5 increase the denominator — target 100% of expanded total.

---

## 📌 Phase 3: Vader Protocol & Shield Layer Isolation Upgrades

Studio Dark contract: Background `#121212`, Surface `#1c1c1c`, text high-contrast light gray. All layout classes use unique `msc-` prefixes to prevent Divi collisions.

### 3.1 — CSS class namespace enforcement script

Create `scripts/msc-shield-audit.mjs` that scans every `ui/*.css` file, extracts class selectors, and exits non-zero when any class does not start with `msc-` (excluding pseudo-states). Register `"msc:shield:audit": "node scripts/msc-shield-audit.mjs"`.

### 3.2 — Design asset ingestion parser (`msc-ingest`)

Create `scripts/msc-ingest.mjs`:

1. Usage: `npm run msc:ingest -- <input.html> <output-dir>`.
2. Strip `<script>`, inline `style=""`, Tailwind utility classes.
3. Rewrite class tokens to `msc-import-*` prefix.
4. Wrap output in `<motion.div class="msc-viewport-shield msc-shield-root">`.
5. Write to `ui/imports/msc-import-<timestamp>.html` + companion CSS using only `var(--msc-*)` tokens.

### 3.3 — PHP shield enqueue chain hardening

In `core/msc-assets.php`, ensure `msc_enqueue_shield_satellite_chain()` loads: `msc-shield.css` → `studio-dark-shield.css` → `msc-shield-load.css` → extensions when `MSC_SHIELD_EXTENSIONS=1`. Add `defined('ABSPATH') || exit;` as first executable line. All PHP functions use `msc_*` naming.

### 3.4 — TSX component guardrails

Update `examples/nextjs-minimal/app/layout.tsx` body to `className="msc-viewport-shield msc-shield-root"`. Import shield chain in `app/globals.css` via `@import` of `../../../ui/msc-shield.css`, `studio-dark-shield.css`, `msc-shield-load.css`. Grade check rejects hardcoded hex in `examples/**/*.tsx`.

### 3.5 — Snippet vault (`.cursor/blueprints/`)

Create `.cursor/blueprints/README.md` indexing: `msc-smtp-verification.php`, `msc-sqlite-collection.ts`, `msc-dashboard-shell.tsx`. Each uses `msc-` prefixes and Studio Dark wrappers.

### 3.6 — Component generator (Vader-compliant)

Create `scripts/msc-new-component.mjs` — usage `npm run msc:new:component -- msc-button [nextjs-minimal]`. Reject names not matching `/^msc-[a-z0-9-]+$/`. Scaffold `index.tsx`, `styles.css`, test file, README with Studio Dark token comments.

### 3.7 — Phase 3 exit gate

```bash
npm run msc:shield:audit
npm run msc:new:component -- msc-smoke-test nextjs-minimal
cd examples/nextjs-minimal && npm run test
npm run grade
```

---

## 📌 Phase 4: Full-Stack Sandbox & Lean Boundary Hardening

### 4.1 — SQLite data isolation

Ensure `examples/nextjs-payload/.gitignore` contains `database/`, `*.db`, `*.db-wal`, `*.db-shm`, `.env.local`. Create `examples/nextjs-payload/database/.gitkeep`. Document Next.js 15.4.11 pin in sandbox README and `_comment` in `package.json`.

### 4.2 — Payload config tightening

In `examples/nextjs-payload/src/payload.config.ts`: throw when `!process.env.PAYLOAD_SECRET` in production; honor `PAYLOAD_DB_PUSH=false` from env; keep `serverURL` from `MSC_PUBLIC_ORIGIN` defaulting to `http://127.0.0.1:3001`. Maintain sandbox-local `.env.example` with `PAYLOAD_SECRET`, `DATABASE_URI=file:./database/payload.db`.

### 4.3 — Mock media asset pipeline

Create `scripts/msc-mock-media.mjs` generating placeholders in `examples/nextjs-payload/media/mock/` only. Register `"msc:mock:media": "node scripts/msc-mock-media.mjs"`.

### 4.4 — Docker Compose (optional Postgres mirror)

Create root `docker-compose.yml` with `msc-postgres` service (postgres:16-alpine, port 5432, healthcheck). Create `scripts/msc-docker-up.mjs` and `scripts/msc-docker-down.mjs` (first line: `import './lib/msc-load-env.mjs'`). Add Postgres keys to `.env.example`. Docker is opt-in — default dev remains SQLite in payload sandbox.

### 4.5 — WordPress shield quarantine documentation

Add Stack Support table to README: Web App (nextjs-minimal), Full-Stack CMS (nextjs-payload), WordPress Shield (`core/msc-bootstrap.php`). PHP never installs via npm.

### 4.6 — Lockfile hygiene

Require committed: `package-lock.json`, `examples/nextjs-minimal/package-lock.json`, `examples/nextjs-payload/package-lock.json`. CI uses `npm ci`. Update `.github/workflows/ci.yml` to run payload `npm ci && npm run build`.

### 4.7 — Phase 4 exit gate

```bash
npm run msc:mock:media
cd examples/nextjs-payload && npm run build
npm run grade
```

---

## 📌 Phase 5: 38-Point Integrity Self-Grader Expansion Suite

Expand `scripts/msc-grade-boilerplate.mjs` from 38 to **52 checks**. Preserve non-zero exit on any failure.

### 5.1 — New grade checks (insert after existing automation block)

| # | Check name | Condition |
|---|------------|-----------|
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
| 52 | msc-kill-all-dev-ports.mjs exists | file exists |

Additional recommended checks (increment total accordingly): `msc-new-component.mjs`, `msc-shield-audit.mjs`, `msc-onboarding.mjs`, root + sandbox lockfiles, devcontainer Node 20 image, `.cursor/blueprints/README.md`.

### 5.2 — CI pipeline targets

Update `.github/workflows/ci.yml` step order: `npm ci` → `msc:validate-env` → `verify:mcp` → `msc:lint` → `grade` (100%) → `msc:test:root` → sandbox `npm ci` + test/build.

### 5.3 — Root structural test suite

Create `vitest.config.ts` including `tests/**/*.test.ts` and `scripts/__tests__/**/*.test.mjs`. Create `tests/msc-boilerplate-structure.test.ts` (no PHP main, script paths exist, `.env.example` placeholders only). Add `"msc:test:root"` and `"msc:test:all"` scripts.

### 5.4 — Zero-drift enforcement

After every Phase 6 step: `npm run grade || exit 1`. Output must show `(100%)`. Update README badge to `self-grade-52/52` after expansion.

### 5.5 — Phase 5 exit gate

```bash
npm run grade
npm run msc:test:all
npm run msc:shield:audit
```

Expected: `Final Grade: 52/52 (100%)`.

---

## 📌 Phase 6: Sequential Step-by-Step AI Agent Action Runbook

Execute in order. Do not skip validation gates.

| Step | Action | Validation gate |
|------|--------|-----------------|
| 1 | Baseline: `node -v`, `npm run grade`, `npm run msc:validate-env` | Record grade in `project-log.md` |
| 2 | Fix `.devcontainer/devcontainer.json` to Node 20 image | grep `node:20` |
| 3 | Pin `.nvmrc` to `20.19.1` | `cat .nvmrc` |
| 4 | Create `scripts/lib/msc-node-version-guard.mjs`; import in critical scripts | quickstart passes |
| 5 | Replace PHP main with `core/index.mjs` | `import('./core/index.mjs')` prints version |
| 6 | Rename `kill-ports.mjs` → `msc-kill-all-dev-ports.mjs`; update package.json | `npm run msc:kill-dev-port` exits 0 |
| 7 | Harden `msc-forge.mjs` regex guards | protected path mutation blocked |
| 8 | Extend `validate-env.mjs` with `REQUIRED_ENV_KEYS` | validate-env exits 0 |
| 9 | Add `copyPayloadEnvTemplate()` to `quickstart.mjs` | payload `.env.local` created |
| 10 | Extend `msc-verify-mcp.mjs` path + JSON output | verify:mcp exits 0 |
| 11 | Expand `health.mjs` JSON diagnostics | `--json` returns ports array |
| 12 | Add packageManager, engines, MIT license + LICENSE file | `npm pkg get license` |
| 13 | Update README Self-Grade + CI badges | README line 2 |
| 14 | Install Biome; add `msc:lint` scripts | lint exits 0 |
| 15 | Configure lint-staged | lint-staged available |
| 16 | Update `.husky/pre-commit` | contains lint-staged |
| 17 | Create `.husky/pre-push` | file exists |
| 18 | Create `.vscode/settings.json` + extensions.json | files exist |
| 19 | Migrate `.cursorrules` → `.cursor/rules/global.mdc` | alwaysApply true |
| 20 | Update TRUTH.md doc hierarchy | grep global.mdc |
| 21 | Create `scripts/msc-onboarding.mjs` | msc:onboard runs |
| 22 | Add doc map + TROUBLESHOOTING + ARCHITECTURE | files exist |
| 23 | Create CHANGELOG, CONTRIBUTING, config/README | files exist |
| 24 | Create `scripts/msc-shield-audit.mjs` | shield audit PASS |
| 25 | Create `scripts/msc-ingest.mjs` | ingest sample HTML |
| 26 | Harden `core/msc-assets.php` ABSPATH + msc_* names | PHP guard present |
| 27 | Audit all `core/*.php` for ABSPATH guard | grep clean |
| 28 | Update nextjs-minimal layout shield wrapper | layout.tsx grep |
| 29 | Create `.cursor/blueprints/` stubs | directory exists |
| 30 | Create `scripts/msc-new-component.mjs` | scaffolds msc-button |
| 31 | Payload README pin + package.json _comment | 15.4.11 documented |
| 32 | Tighten payload.config.ts secret guard | build with env |
| 33 | Create payload database/.gitkeep | dir tracked |
| 34 | Create `scripts/msc-mock-media.mjs` | mock files created |
| 35 | Create docker-compose + msc-docker scripts | compose config valid |
| 36 | Add Postgres keys to `.env.example` | keys present |
| 37 | Update ci.yml with npm ci, lint, payload build | YAML valid |
| 38 | Expand grader to 52 checks | grade shows 52 total |
| 39 | Create vitest.config + structure tests | msc:test:root passes |
| 40 | Create scripts/__tests__ for forge, validate-env, health | tests pass |
| 41 | Generate nextjs-minimal lockfile if missing | lockfile committed |
| 42 | Run `npm run bootstrap` | exits 0 |
| 43 | Run dev smoke: `verify:local` | smoke passes |
| 44 | Payload sandbox `npm run build` | exits 0 |
| 45 | `npm run msc:shield:audit` | PASS |
| 46 | `npm run msc:lint` | PASS |
| 47 | `npm run msc:test:all` | all green |
| 48 | **`npm run grade`** | **52/52 (100%), exit 0** |
| 49 | validate-env + verify:mcp | both exit 0 |
| 50 | Update README to 52/52 grade | docs match |
| 51 | Log final score in project-log.md | entry written |
| 52 | Bump package.json version to `2.1.0` | version confirmed |

### Final verification loop (run three times consecutively)

```bash
npm run msc:validate-env && \
npm run verify:mcp && \
npm run msc:lint && \
npm run msc:test:all && \
npm run grade && \
npm run msc:shield:audit
```

All commands must exit `0` three times with identical `52/52 (100%)` grade. On failure, fix the named check from grader stderr and restart from the matching step.

---

## Appendix: Source Guide Consolidation Map

| Source guide | Primary contributions absorbed |
|--------------|-------------------------------|
| GUIDE-a | P0 bugs (main field, badge, kill scripts), Biome lint, CHANGELOG, CONTRIBUTING, cursor rules migration, structural tests |
| GUIDE-b | Architecture diagrams, generator system, dependency enforcement, observability stubs, 90-day phasing |
| GUIDE-c | Documentation map, onboarding script, env contract, packageManager lock, Docker, lockfile hygiene, Playwright path |
| GUIDE-d | ARCHITECTURE.md, ESLint/Biome baseline, neutral aliases, sandbox expansion roadmap |
| GUIDE-e | TRUTH.md, Husky hooks, Node 20 harmonization, LICENSE, FAQ, script consolidation |
| GUIDE-f | MCP portability, shield audit, msc-ingest parser, snippet vault, grade-as-arbiter workflow |

**Architectural verdict:** Completing Phase 6 elevates the boilerplate from 38-point to **52-point** self-auditing infrastructure with zero lean-boundary drift, full Studio Dark namespace enforcement, and CI-gated non-zero exit validation on every push.
