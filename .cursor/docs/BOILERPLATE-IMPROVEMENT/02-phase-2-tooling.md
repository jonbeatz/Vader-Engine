---
SESSION: Provide this file + 00-MASTER-INDEX.md to Cursor.
Expected output: Biome installed, Husky updated, .mdc migration 
complete, lint exits 0.
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
    "node": ">=20.0.0 <25.0.0",
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

**Before Biome init — remove Prettier configs if present (root and sandboxes):**

```powershell
Get-ChildItem -Recurse -Include .prettierrc,.prettierrc.json,.prettierrc.js,.prettierignore -File | Remove-Item -Force -ErrorAction SilentlyContinue
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

**Post-creation verification (mandatory after Step 21 in Phase 6):**

```powershell
$lines = Get-Content .cursor/rules/global.mdc -TotalCount 6; if ($lines[5] -match '^\s*$') { 'OK: blank line present' } else { 'FIX: add blank line after ---' }
```

If missing, insert a blank line between the closing `---` and the first markdown heading. Without this blank line, Cursor ignores the rule body.

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

Grade must remain 100%. New checks added in Phase 5 increase the denominator — target 100% of expanded total. Tag: `git tag phase-2-pass`.

### ⛔ PHASE 2 COMPLETE — STOP AND REPORT

Before proceeding to Phase 3, **stop and output this checklist to the human operator:**

```
✅ PHASE 2 COMPLETE
- Grade: X/X (100%)
- Tag created: git tag phase-2-pass
- Files modified: [list]
- Files created: [list]
- Any STOP_AND_ASK events: [none / describe]

⏳ Awaiting human confirmation to begin Phase 3.
Type "CONTINUE" to proceed or "ABORT" to stop here.
```

---
