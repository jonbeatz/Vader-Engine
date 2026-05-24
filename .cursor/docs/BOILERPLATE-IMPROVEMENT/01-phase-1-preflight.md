---
SESSION: Provide this file + 00-MASTER-INDEX.md to Cursor.
Expected output: Grade baseline recorded, all Phase 1 audits pass.
---

# 📌 Phase 1: Pre-Flight Architecture Validation & Namespace Audits

Phase 1 establishes structural truth before any mutation. Do not edit application code until every audit in this phase passes or has an explicit remediation ticket recorded in `.cursor/docs/project-log.md`.

My global system Node version is v24.14.0 and NVM is not installed. When configuring the engines field in package.json and updating the .devcontainer / environment configurations during Phase 1, ensure the engine range allows Node 24 (e.g., "node": ">=20.19.1 <25" or "node": "^20.19.1 || ^24.0.0") so the setup doesn't fail compilation checks.

**Phase 1 completion criteria:** `npm run msc:validate-env`, `npm run verify:mcp`, and `npm run grade` all exit `0`. No TODO comments introduced. Log: `Phase 1 complete — grade X/X`.

---

### 1.1 — Baseline integrity snapshot (P0)

**Pre-flight version pin verification (run before any mutations):**

```powershell
node -e 'import fs from "node:fs"; const m=JSON.parse(fs.readFileSync("examples/nextjs-minimal/package.json","utf8")); const p=JSON.parse(fs.readFileSync("examples/nextjs-payload/package.json","utf8")); if(!String(m.dependencies?.next||"").includes("15.5.7")){console.error("HALT: nextjs-minimal must pin Next 15.5.7");process.exit(1)} if(!String(p.dependencies?.next||"").includes("15.4.11")){console.error("HALT: nextjs-payload must pin Next 15.4.11");process.exit(1)} console.log("Next.js pins verified")'
```

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

```powershell
node -e "import fs from 'node:fs'; const bad=['node_modules/next','node_modules/payload'].filter(p=>fs.existsSync(p)); if(bad.length){console.error('HALT:',bad);process.exit(1)} console.log('Root lean OK')"
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

```powershell
node -e "import fs from 'node:fs'; console.log(fs.existsSync('core/core-Divi-Scriptz.js')?'Canonical path OK':'MISSING: core/core-Divi-Scriptz.js'); if(fs.existsSync('core/coreDiviScriptz.js'))console.error('HALT: rename coreDiviScriptz.js')"
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

```powershell
$result = node scripts/msc-forge.mjs ui/msc-shield.css msc-accent msc-danger --dry-run 2>&1
if ($result -match "blocked|protected|shield") { "Forge shield active" } else { "HALT: forge shield not blocking" }
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
if (major < 20 || (major !== 20 && major !== 24)) {
  console.error(`[msc:node-guard] Node 20.x or 24.x required; found ${process.versions.node}`)
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

All three must exit `0`. Log result: `Phase 1 complete — grade X/X`. Tag: `git tag phase-1-pass`.

### ⛔ PHASE 1 COMPLETE — STOP AND REPORT

Before proceeding to Phase 2, **stop and output this checklist to the human operator:**

```
✅ PHASE 1 COMPLETE
- Grade: X/X (100%)
- Tag created: git tag phase-1-pass
- Files modified: [list]
- Files created: [list]
- Any STOP_AND_ASK events: [none / describe]

⏳ Awaiting human confirmation to begin Phase 2.
Type "CONTINUE" to proceed or "ABORT" to stop here.
```

---
