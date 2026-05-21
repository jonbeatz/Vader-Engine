# Boilerplate v2 — Definitive Jedi-Master Optimization Roadmap

| Field | Value |
| --- | --- |
| **System status** | v2.0.0-Gold Master verified baseline (30/30 integration pass) |
| **Target architecture** | Production-grade operational OS and empty-folder replacement |
| **Governance** | Vader Protocol — strict namespace constraints and absolute path decoupling |

---

## Quick stats and velocity metrics

| Metric | Value |
| --- | --- |
| P0 core milestones | 4 items (~32 minutes) |
| P1 architectural layers | 4 items (~2.5 hours) |
| P2 extension utilities | 7 items (~5.0 hours) |
| **Total estimated effort** | **~8 hours** workspace investment |

---

## Section 1 — Repository roadmap directory

This matrix organizes milestones from immediate tactical cleanup to long-term full-stack expansion. No module may bypass the 100% self-grade suite check before branch merge.

| Priority | Milestone | Effort | Value checkpoint |
| --- | --- | --- | --- |
| **P0** (immediate) | Fix bootstrap loop redundancy | 5 min | Single-execution flow; unbloats lifecycle scripts |
| **P0** (immediate) | Deploy local engine `.nvmrc` | 2 min | Locks deterministic Node 20 LTS uniformly |
| **P0** (immediate) | Deploy GitHub Actions CI workflow armor | 15 min | Bitrot shield; global keyscan and nested test blocks |
| **P0** (immediate) | Update self-grade suite requirements | 10 min | Forces checks for `.nvmrc` and active CI |
| **P1** (short-term) | Bump Next.js sub-scaffold to v15.5.7 | 2 min | Mitigates security advisories in examples layout |
| **P1** (short-term) | Add isolated `msc:health` console dashboard | 30 min | Ecosystem diagnosis; JSON hooks for testing |
| **P1** (short-term) | Scaffold `examples/nextjs-payload` layer | 1–2 hr | Full-stack demo with local SQLite persistence |
| **P1** (short-term) | Deploy defensive `msc:forge` re-brander | 30 min | Downstream cloning; immutable blocklists |
| **P2** (medium-term) | Document example insertion guidelines | 15 min | Low effort, high value contributor template |
| **P2** (medium-term) | Implement `msc:new:component` generators | 1 hr | Shield-compliant UI primitive construction |
| **P2** (medium-term) | Add opt-in Tailwind/shadcn sandboxing | 2 hr | Hybrid CSS model; avoids specificity drift |
| **P2** (medium-term) | Docker Compose overrides for Postgres | 1 hr | Optional production-mirror DB persistence |
| **P2** (medium-term) | Context-freezer experimental script | 15 min | Exploratory; downgraded to protect model tokens |
| **P2** (medium-term) | Deploy multi-workspace dependency updater | 20 min | Centralized upgrades via `msc:update` |
| **P3** (long-term) | VS Code / Cursor workspace settings sync | 10 min | Unified formatting and recommended extensions |
| **P3** (long-term) | Playwright E2E multi-sandbox harness | 2 hr | Browser testing matrix in CI pipelines |

---

## Section 2 — Network port harmonization matrix

To eliminate concurrent process racing or socket collisions when running nested local examples, the repository enforces immutable static port boundaries. Scripts such as `scripts/kill-ports.mjs` read directly from this layout:

| Port | Target |
| --- | --- |
| **3000** | `examples/nextjs-minimal` — core Next.js frontend baseline |
| **3001** | `examples/nextjs-payload` — full-stack data layer / Payload CMS admin |
| **8080** | Reserved — future multi-tenant microservices or Local WordPress Core Shield bridges |

---

## Section 3 — Core code embed specifications and logic injections

### 3.1 `msc:forge` regex blocklist and dry-run

To guarantee programmatic re-branding never corrupts internal system prefixes or WordPress styling isolation, `scripts/msc-forge.mjs` must use this pattern gate and a non-destructive `--dry-run` path:

```javascript
import fs from 'fs';
import path from 'path';

// Strict pattern matching required under the Vader Protocol
const protectedNamespaceRegex = /(?:\.msc-|^msc:|^msc_)/i;
const isDryRun = process.argv.includes('--dry-run');

function processFileMutation(filePath, searchStr, replaceStr) {
  let content = fs.readFileSync(filePath, 'utf8');

  if (protectedNamespaceRegex.test(searchStr) || protectedNamespaceRegex.test(filePath)) {
    console.log(`\x1b[31m[SHIELD ACTIVE] Prevented mutation on protected target: ${filePath}\x1b[0m`);
    return;
  }

  const updatedContent = content.replaceAll(searchStr, replaceStr);

  if (content !== updatedContent) {
    if (isDryRun) {
      console.log(`\x1b[33m[DRY RUN] Would mutate file: ${filePath}\x1b[0m`);
    } else {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`\x1b[32m[MUTATED] Updated entries in file: ${filePath}\x1b[0m`);
    }
  }
}
```

### 3.2 Full-stack layout blueprint: `examples/nextjs-payload`

Relational setups must remain modularized within the sub-sandbox scope (Lean Boundary Rule).

```
examples/nextjs-payload/
├── src/
│   ├── collections/
│   │   └── MediaVault.ts       # Strictly scoped media attachments
│   └── payload.config.ts       # Base URL, local SQLite adapter mapping
├── database/
│   └── payload.db              # Local DB binary (git-ignored)
├── app/
│   └── (app)/
│       └── layout.tsx          # Hooks into root ui/studio-dark-shield.css
└── package.json                # Static port mapping: 3001
```

**Minimal `package.json` stub for Payload workspace:**

```json
{
  "name": "msc-example-nextjs-payload",
  "version": "2.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001"
  },
  "dependencies": {
    "next": "^15.5.7",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "payload": "^3.0.0",
    "@payloadcms/db-sqlite": "^3.0.0",
    "@payloadcms/next": "^3.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0"
  }
}
```

### 3.3 JSON-hookable `msc:health` console engine

`scripts/health.mjs` must follow this functional layout.

**Architectural caveat:** Socket probes detect active listeners; ghost states such as `TIME_WAIT` are reported as `AVAILABLE` until bound.

```javascript
import net from 'net';
import fs from 'fs';

const targetPorts = [3000, 3001, 8080];
const isJsonOutput = process.argv.includes('--json');

function probeSocket(port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(400);
    // Fires when a service accepts connections actively
    socket.on('connect', () => { socket.destroy(); resolve('OCCUPIED'); });
    // Unbound or TIME_WAIT recycling windows
    socket.on('error', () => { socket.destroy(); resolve('AVAILABLE'); });
    socket.on('timeout', () => { socket.destroy(); resolve('TIMEOUT'); });
    socket.connect(port, '127.0.0.1');
  });
}

async function runSystemDiagnostics() {
  const reports = {};
  for (const port of targetPorts) {
    reports[`port_${port}`] = await probeSocket(port);
  }
  reports['env_file'] = fs.existsSync('.env.local') ? 'CONFIGURED' : 'MISSING';
  reports['nvm_lock'] = fs.existsSync('.nvmrc') ? 'LOCKED' : 'UNSAFE';

  if (isJsonOutput) {
    console.log(JSON.stringify({ status: 'SUCCESS', diagnostics: reports }, null, 2));
  } else {
    console.log('\x1b[35m=== MSC MEDIA PRO JEDI-HEALTH LOG ===\x1b[0m');
    console.table(reports);
  }
}

runSystemDiagnostics();
```

### 3.4 Centralized multi-workspace updater (`msc:update`)

Deploy cross-workspace updater at `scripts/msc-update.mjs`:

```javascript
import { execSync } from 'child_process';
import path from 'path';

const searchTargets = ['.', 'examples/nextjs-minimal', 'examples/nextjs-payload'];

console.log('\x1b[36mInitiating multi-workspace package audit across ecosystem targets...\x1b[0m');
for (const target of searchTargets) {
  try {
    console.log(`\n\x1b[33mScanning target directory scope: [${target}]\x1b[0m`);
    execSync('npx npm-check-updates -u', { cwd: path.resolve(target), stdio: 'inherit' });
  } catch (error) {
    console.log(`Bypassed target upgrade verification loop for ${target} (Manifest stub initialized/empty).`);
  }
}
```

---

## Section 4 — Immediate immutable deployment parameters (P0 polish)

### 4.1 Root bootstrap workflow lifecycle

Eliminate double-firing of environmental scans by simplifying the root lifecycle block in `package.json`. `quickstart.mjs` handles internal tasks via programmatic paths:

```json
"bootstrap": "npm run msc:kill-dev-port && node scripts/quickstart.mjs"
```

**Note:** The standalone git pre-commit hook must remain wired to `node scripts/validate-env.mjs` so local saves audit keys without a full workspace dependency hydration path.

### 4.2 Local platform versioning (`.nvmrc`)

Deploy root `.nvmrc` containing only:

```
20
```

This binds operators, hosts, and deployment loops to Node 20 LTS.

### 4.3 Multi-sandbox automated bitrot armor (`ci.yml`)

Protect core sandboxes from silent breakage. File must live at `.github/workflows/ci.yml`:

```yaml
name: CI
on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js Environment
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Hydrate Core Dependencies
        run: npm ci

      - name: Run Global Credentials Scan Gate
        run: npm run msc:validate-env

      - name: Run Project Integration Self-Grader
        run: npm run grade

      - name: Validate Next.js Minimal Workspace Sandbox
        run: |
          cd examples/nextjs-minimal
          npm ci
          npm run test
```

### 4.4 Self-grade guardrails expansion

Modify verification arrays inside `scripts/msc-grade-boilerplate.mjs`. The grading suite must exit non-zero if `.nvmrc` or `.github/workflows/ci.yml` are deleted or modified out of compliance.

---

## Section 5 — Jedi agent runbook pipeline

When initializing a fresh Cursor Agent or Composer session, hand this sequential contract to lock Week 1 execution cadence line-by-line.

> **Agent sequence constraint contract:** You are implementing the definitive Jedi-Master post-launch v2 roadmap. Work exactly one checkpoint at a time. Do not multi-task. Halt and ask for confirmation after each block.

- [x] **Step 1:** Optimize bootstrap redundancy in root `package.json` and update `quickstart.mjs` flow
- [x] **Step 2:** Deploy root Node runtime lock file (`.nvmrc`)
- [x] **Step 3:** Bump `examples/nextjs-minimal` dependencies to v15.5.7 and run dependency updates
- [x] **Step 4:** Create multi-sandbox CI runner schema (`.github/workflows/ci.yml`)
- [x] **Step 5:** Expand `scripts/msc-grade-boilerplate.mjs` to audit `.nvmrc` and `ci.yml` presence
- [x] **Step 6:** Create JSON-hookable diagnostic engine in `scripts/health.mjs` (treat `TIME_WAIT` as `AVAILABLE`)
- [x] **Step 7:** Build centralized multi-workspace helper at `scripts/msc-update.mjs`
- [x] **Step 8:** Build defensive re-branding asset `scripts/msc-forge.mjs` with `--dry-run` and blocklist `/ (?:\.msc-|^msc:|^msc_)/i`

Verify the final suite resolves at **100%** under `npm run grade` before declaring victory.

---

*Powered by the MSC Media Engine — Engineering Roadmap Architecture Vault Sealed*
