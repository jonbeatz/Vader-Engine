# Boilerplate-v1 → v2 Improvement Guide
**Audit Date:** May 2026 | **Current Version:** v2.0.0-JEDI | **Score:** 78/100

This document outlines every recommended fix, improvement, and addition identified in the comprehensive review of `jonbeatz/Boilerplate-v1`. Each item includes a clear description of the problem, the exact fix, and implementation guidance.

---

## Table of Contents

1. [Critical Bugs](#1-critical-bugs)
2. [Naming & Identity Cleanup](#2-naming--identity-cleanup)
3. [Cursor Rules Migration](#3-cursor-rules-migration)
4. [Missing Infrastructure](#4-missing-infrastructure)
5. [Documentation Gaps](#5-documentation-gaps)
6. [Testing Improvements](#6-testing-improvements)
7. [Quick Wins (Low Effort, High Value)](#7-quick-wins-low-effort-high-value)
8. [Roadmap Execution Plan](#8-roadmap-execution-plan)
9. [Implementation Priority Order](#9-implementation-priority-order)

---

## 1. Critical Bugs

### 1.1 — `"main"` field in `package.json` points to a PHP file

**Problem:** `package.json` has `"type": "module"` (ES module project) but the `main` field is set to `core/msc-bootstrap.php`. This is invalid — the `main` field is for JavaScript entry points only. Any tooling that tries to resolve the package entry point (bundlers, Node.js requires, etc.) will fail or throw unexpected errors.

**Fix:**

Option A — Remove it entirely (recommended if the root package is just a script runner):
```json
// package.json — remove this line:
"main": "core/msc-bootstrap.php",
```

Option B — Point to a real JS entry if one is needed:
```json
"main": "core/index.mjs",
```
Then create `core/index.mjs` as a minimal barrel export or stub:
```js
// core/index.mjs
// MSC Boilerplate core entry — extend as needed
export const MSC_VERSION = '2.0.0-JEDI';
```

---

### 1.2 — Self-grading badge presents as external verification

**Problem:** The README badge `grade: 38/38` uses `shields.io` static badge syntax and appears at the top of the README alongside official badges like Node version and MIT license. Any reader unfamiliar with the project will assume it's a third-party CI/quality score, which misrepresents the project.

**Fix:**

Update the badge label to make it explicit:
```markdown
<!-- Before -->
[![Grade](https://img.shields.io/badge/grade-38%2F38-brightgreen)](https://github.com/jonbeatz/Boilerplate-v1)

<!-- After -->
[![Self-Grade](https://img.shields.io/badge/self--grade-38%2F38-brightgreen)](https://github.com/jonbeatz/Boilerplate-v1)
```

Or replace the static badge with a real CI badge once the `npm run grade` command runs in your GitHub Actions workflow:
```yaml
# In .github/workflows/ci.yml — add this step:
- name: Run self-grade
  run: npm run grade
```
Then use the GitHub Actions status badge in the README:
```markdown
[![CI](https://github.com/jonbeatz/Boilerplate-v1/actions/workflows/ci.yml/badge.svg)](https://github.com/jonbeatz/Boilerplate-v1/actions/workflows/ci.yml)
```

---

## 2. Naming & Identity Cleanup

### 2.1 — Repo name, README title, and package name are all different

**Problem:** Three different names are used across the project:
- GitHub repo: `Boilerplate-v1`
- README title: `Boilerplate-v2 — Jedi-Master Edition`
- `package.json` name: `msc-universal-boilerplate`

This creates immediate confusion for anyone cloning or referencing the project.

**Fix — Option A (Recommended): Rename the GitHub repo**

Go to GitHub → Settings → Repository name → rename to `Boilerplate-v2` or `msc-boilerplate`. Then update all internal references:

```bash
# Files to update after rename:
# - README.md (repo URL references)
# - TRUTH.md (repo URL references)
# - .cursor/docs/*.md (any hardcoded repo links)
# - package.json description field
```

**Fix — Option B: Keep repo name, align everything else**

If you prefer keeping the v1 repo name for historical reasons, update the README heading:
```markdown
<!-- Before -->
# Boilerplate-v2 — Jedi-Master Edition

<!-- After -->
# Boilerplate-v1 — Jedi-Master Edition (v2.0.0-JEDI)
```

And align the package.json version:
```json
{
  "name": "msc-boilerplate-v1",
  "version": "2.0.0-jedi",
  "description": "MSC Universal Boilerplate — Cursor-native production baseline"
}
```

---

### 2.2 — WordPress/PHP presence is undocumented at the top level

**Problem:** The repo contains PHP files, `core/msc-bootstrap.php`, references to Divi conflict isolation, and a WordPress Shield bridge — but nothing in the README or START-HERE.md acknowledges this. A developer cloning the project has no idea 5.6% of the codebase is PHP or what it's for.

**Fix — If WordPress is a core use case, document it:**

Add a section to README.md under the Overview:
```markdown
## Stack Support

This boilerplate supports two primary deployment targets:

| Target | Stack | Entry |
|--------|-------|-------|
| **Web App** | Next.js 15 + TypeScript | `examples/nextjs-minimal/` |
| **Full-Stack** | Next.js + Payload CMS | `examples/nextjs-payload/` |
| **WordPress** | PHP + Divi Shield | `core/msc-bootstrap.php` |

The WordPress layer provides CSS namespace isolation (`msc-` prefix) to prevent theme and plugin conflicts on Divi-based sites.
```

**Fix — If WordPress is legacy, quarantine it:**

Move PHP files into a dedicated sandbox:
```
examples/
  nextjs-minimal/
  nextjs-payload/
  wordpress-shield/       ← move core PHP here
    msc-bootstrap.php
    README.md             ← explain what this is
```

Then remove the `"main"` field from root `package.json` (addressed in 1.1).

---

## 3. Cursor Rules Migration

### 3.1 — `.cursorrules` is a deprecated location

**Problem:** Cursor is deprecating the root `.cursorrules` file in favor of `.cursor/rules/*.mdc` files with scoped applicability. You already have `.cursor/rules/` referenced internally, but the primary ruleset still lives in the old location. This creates a split authority that will break as Cursor updates.

**Fix — Migrate to `.cursor/rules/`:**

Step 1: Create a new file `.cursor/rules/global.mdc`:
```
---
description: Global rules — applies to all files in this workspace
alwaysApply: true
---

[paste full content of current .cursorrules here]
```

Step 2: Update the doc hierarchy in TRUTH.md to reflect the new location:
```markdown
<!-- Before -->
2. `.cursorrules` (session bindings)

<!-- After -->
2. `.cursor/rules/global.mdc` (session bindings — alwaysApply)
```

Step 3: Keep `.cursorrules` temporarily with a redirect notice:
```
# DEPRECATED — migrated to .cursor/rules/global.mdc
# This file is kept for backwards compatibility only.
# Remove after confirming Cursor loads from .cursor/rules/.
```

Step 4: Update `.cursor/rules/README.md` to list `global.mdc` as the primary entry.

---

### 3.2 — Split your `.cursorrules` into focused rule files

**Problem:** The current `.cursorrules` is 127 lines covering 8+ distinct concerns (security, UI, terminal discipline, error handling, agent workflow, session management, etc.). As a single file, Cursor injects all of it into every context window whether relevant or not, burning tokens and reducing precision.

**Fix — Modular rule structure:**

```
.cursor/rules/
  README.md               ← index of all rules (you have this)
  global.mdc              ← universal rules (env, security, naming)
  agent-workflow.mdc      ← session open/close, task planner, handoff
  terminal-discipline.mdc ← port management, process hygiene, shell use
  studio-dark-ui.mdc      ← UI tokens, CSS prefix rules (you reference this)
  error-handling.mdc      ← boundary discipline, logging, user feedback
  design-system-rules.mdc ← design tokens, component patterns
  tailwind-shadcn-bridge.mdc ← hybrid UI rules
```

Each file gets a frontmatter scope so Cursor only loads it when relevant:
```
---
description: Studio Dark UI rules — applies when editing CSS, JSX, or TSX files
globs: ["**/*.css", "**/*.jsx", "**/*.tsx"]
alwaysApply: false
---
```

---

## 4. Missing Infrastructure

### 4.1 — No linting or formatting baseline

**Problem:** Husky pre-commit hooks exist for credential scanning, but there's no code quality gate — no ESLint, Prettier, or Biome config at the root. Every new project spun from this boilerplate needs to set up formatting from scratch, which wastes time and leads to inconsistent codebases.

**Fix — Add Biome (recommended: fast, single config, zero-config for most cases):**

```bash
npm install --save-dev --workspace=. @biomejs/biome
npx @biomejs/biome init
```

This creates `biome.json` at root. Configure it:
```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.0/schema.json",
  "organizeImports": { "enabled": true },
  "linter": {
    "enabled": true,
    "rules": { "recommended": true }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "files": {
    "ignore": ["node_modules", ".next", "dist", "examples/*/node_modules"]
  }
}
```

Add npm scripts:
```json
"msc:lint": "biome check .",
"msc:lint:fix": "biome check --write .",
"msc:format": "biome format --write ."
```

Update Husky pre-commit hook (`.husky/pre-commit`) to include lint:
```bash
#!/bin/sh
npm run msc:validate-env
npm run msc:lint
```

**Alternative: Prettier + ESLint if you prefer the classic setup:**
```bash
npm install --save-dev prettier eslint eslint-config-next
```
Add `.prettierrc`:
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 100,
  "trailingComma": "es5"
}
```

---

### 4.2 — No `CHANGELOG.md`

**Problem:** This is a versioned, iterated boilerplate. Without a changelog, when you move from `v2.0.0-JEDI` to `v2.1.0`, you'll have no record of what changed, what was fixed, or what broke. Over multiple projects this becomes a real maintenance burden.

**Fix — Create `CHANGELOG.md` at repo root using Keep a Changelog format:**

```markdown
# Changelog

All notable changes to this project will be documented in this file.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)

## [Unreleased]

### Added
- (document future additions here)

### Fixed
- (document future fixes here)

---

## [2.0.0-JEDI] — May 2026

### Added
- Portable MCP layer with `${workspaceFolder}` tokens in `.cursor/mcp.json`
- Vader Protocol UI shield: `ui/studio-dark-shield.css` with `msc-` CSS prefix isolation
- `examples/nextjs-minimal/` — Next.js 15.5.7 + TypeScript + Vitest (3/3 passing)
- `examples/nextjs-payload/` — Payload CMS v3.x + SQLite sandbox
- `scripts/validate-env.mjs` — regex-driven secret leak detection
- `scripts/health.mjs` — port diagnostic dashboard with `--json` flag
- `scripts/msc-update.mjs` — multi-workspace package updater
- `scripts/msc-forge.mjs` — defensive project re-brander with `--dry-run`
- `.github/workflows/ci.yml` — automated CI with credential scan and self-grader
- `.nvmrc` — Node 20 LTS lock
- 38-point self-grade suite (`npm run grade`)
- Husky + lint-staged pre-commit credential gate
- `.devcontainer/devcontainer.json` — Codespaces bootstrap

### Changed
- Migrated from v1 flat structure to layered architecture (human/agent/automation/examples/ui)
- MCP paths changed from hardcoded machine paths to `${workspaceFolder}` tokens

---

## [1.0.0] — 2025

### Added
- Initial boilerplate structure
- Core `.cursorrules` baseline
- Basic script scaffolding
```

---

### 4.3 — Roadmap items should be GitHub Issues, not just a README table

**Problem:** The P2/P3 roadmap in README.md is a static table. When you fork this into a new project, the roadmap disappears into context. Items will be forgotten or re-invented.

**Fix — Convert roadmap to GitHub Issues with labels:**

Create the following issues on the repo:

| Issue Title | Label | Milestone |
|-------------|-------|-----------|
| `feat: component generation script (msc:new:component)` | `enhancement`, `P2` | v2.1.0 |
| `feat: opt-in Tailwind/shadcn sandboxing` | `enhancement`, `P2` | v2.1.0 |
| `feat: Docker Compose database overrides for local Postgres` | `enhancement`, `P2` | v2.1.0 |
| `chore: VS Code / Cursor settings sync (.vscode/)` | `dx`, `P3` | v2.2.0 |
| `feat: Playwright E2E multi-sandbox harness` | `testing`, `P3` | v2.2.0 |

Then update the README roadmap section to link to the milestone:
```markdown
## Roadmap

Active issues tracked on [GitHub Issues](https://github.com/jonbeatz/Boilerplate-v1/issues).
See [Milestone v2.1.0](https://github.com/jonbeatz/Boilerplate-v1/milestone/1) for next planned release.
```

---

## 5. Documentation Gaps

### 5.1 — No `CONTRIBUTING.md` or customization guide

**Problem:** When you share this with a collaborator, or when you fork it yourself 6 months later, there's no document explaining how to customize it for a new project — what to rename, what to delete, what to configure first.

**Fix — Create `CONTRIBUTING.md`:**

```markdown
# Contributing & Customization Guide

## Forking for a new project

When using this boilerplate as the foundation for a new project:

### Step 1: Clone and rename
```bash
git clone https://github.com/jonbeatz/Boilerplate-v1.git my-new-project
cd my-new-project
```

### Step 2: Update identity
Edit the following files with your project name:
- `package.json` → `name`, `description`
- `README.md` → title and description
- `TRUTH.md` → version target line

Or use the forge script:
```bash
npm run msc:forge -- . msc-universal-boilerplate my-project-name
```

### Step 3: Configure environment
```bash
cp .env.example .env.local
# Edit .env.local with real values — never commit this file
```

### Step 4: Install and verify
```bash
npm run bootstrap
npm run grade
```

## Adding new scripts

All scripts must:
1. Live in `scripts/` with the `msc-` filename prefix
2. Import `scripts/lib/msc-load-env.mjs` as the first line
3. Be registered in `package.json` with the `msc:` prefix
4. Be documented in `.cursor/docs/HOW-TO.md`

## CSS / UI changes

All custom styles must:
1. Use the `msc-` class prefix
2. Use tokens from `ui/msc-shield.css` only (no hardcoded hex values in components)
3. Follow the isolation contract in `ui/studio-dark-shield.css`

## Committing

Pre-commit hooks will:
- Scan for credential leaks (`validate-env.mjs`)
- Run linting (Biome/ESLint)

Commits that leak secrets or fail lint will be blocked.
```

---

### 5.2 — `config/` directory has no README

**Problem:** The `config/` folder contains `litellm_config.yaml` and `npm-scripts-appendix.json`, but there's no explanation of what these files do or when to use them. A developer unfamiliar with LiteLLM won't know this is an AI proxy config.

**Fix — Add `config/README.md`:**

```markdown
# Config Directory

This directory contains configuration templates for optional services.

## `litellm_config.yaml`

Configuration for [LiteLLM](https://docs.litellm.ai/), an AI proxy that provides
a unified OpenAI-compatible API layer over multiple providers (Anthropic, OpenAI, etc.).

Used with the local AI proxy setup. See `.cursor/docs/local-ai-proxy-setup.md` for setup.

Default ports:
- LiteLLM proxy: `4000` (or `8000` as fallback)
- Ngrok inspector: `4040`

## `npm-scripts-appendix.json`

A list of additional npm script aliases that consumer projects can merge into their
own `package.json` to get access to boilerplate utilities without fully inheriting
the root workspace.

Usage:
```bash
# Merge aliases into your project's package.json
node scripts/msc-merge-scripts.mjs
```

These are additive-only — they will not overwrite existing scripts.
```

---

### 5.3 — `examples/nextjs-payload` dependency pin is undocumented

**Problem:** `examples/nextjs-payload` is pinned to `Next.js 15.4.11` (instead of `15.5.7` like the minimal example) to satisfy Payload CMS v3.x peer dependencies. This is the right call, but future maintainers (including future-you) will see the version discrepancy and be tempted to bump it without understanding why it's pinned.

**Fix — Add a comment to `examples/nextjs-payload/package.json`:**

Since JSON doesn't support comments, use a `_comment` key (common convention):
```json
{
  "_comment": "Next.js is pinned to 15.4.11 (not latest) to satisfy Payload CMS v3.x peer-dependency range. Do not bump without checking Payload compatibility first. See: https://github.com/payloadcms/payload/releases",
  "name": "nextjs-payload-sandbox",
  "version": "1.0.0",
  ...
}
```

Or add a note in `examples/nextjs-payload/README.md`:
```markdown
> **Note:** Next.js is intentionally pinned to `15.4.11` here.
> Payload CMS v3.x has a strict peer-dependency range that doesn't yet support 15.5.x.
> Check [Payload release notes](https://github.com/payloadcms/payload/releases) before upgrading.
```

---

## 6. Testing Improvements

### 6.1 — Root-level tests don't validate boilerplate structure

**Problem:** The `tests/` folder at root contains only `msc-integration-stub.test.ts` (a stub). The real tests live in `examples/nextjs-minimal/`. The root test suite should validate the boilerplate's own structural integrity — things the grade script can't easily express as unit tests.

**Fix — Add structural validation tests to `tests/`:**

Create `tests/boilerplate-structure.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const root = process.cwd();
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf-8'));

describe('Package.json integrity', () => {
  it('should not have a PHP main entry', () => {
    expect(pkg.main).not.toMatch(/\.php$/);
  });

  it('should have all documented scripts pointing to real files', () => {
    const scriptEntries = Object.values(pkg.scripts) as string[];
    const nodeScripts = scriptEntries
      .filter(s => s.startsWith('node scripts/'))
      .map(s => s.replace('node ', '').split(' ')[0]);

    for (const scriptPath of nodeScripts) {
      expect(existsSync(join(root, scriptPath)), `Missing: ${scriptPath}`).toBe(true);
    }
  });
});

describe('Required files exist', () => {
  const required = [
    'TRUTH.md',
    'README.md',
    'START-HERE.md',
    'DOCS.md',
    '.env.example',
    '.nvmrc',
    '.gitignore',
    'scripts/quickstart.mjs',
    'scripts/validate-env.mjs',
    'scripts/health.mjs',
    'scripts/kill-ports.mjs',
    'ui/msc-shield.css',
  ];

  for (const file of required) {
    it(`should have ${file}`, () => {
      expect(existsSync(join(root, file))).toBe(true);
    });
  }
});

describe('.env.example integrity', () => {
  it('should contain no real-looking secret values', () => {
    const envContent = readFileSync(join(root, '.env.example'), 'utf-8');
    // Should only have placeholder values like YOUR_* or CHANGE_ME
    const lines = envContent.split('\n').filter(l => l.includes('=') && !l.startsWith('#'));
    for (const line of lines) {
      const value = line.split('=')[1]?.trim() ?? '';
      // Flag anything that looks like a real key (long alphanumeric strings)
      const looksReal = /^[a-zA-Z0-9+/]{32,}$/.test(value);
      expect(looksReal, `Suspicious value in .env.example: ${line}`).toBe(false);
    }
  });
});
```

Add a root-level `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
  },
});
```

Update `package.json`:
```json
"msc:test:root": "vitest run --config vitest.config.ts",
"msc:test:all": "npm run msc:test:root && npm run msc:test"
```

---

## 7. Quick Wins (Low Effort, High Value)

### 7.1 — Add `.vscode/` settings now (not P3 later)

This is on your P3 roadmap but takes 10 minutes and saves setup time on every project.

Create `.vscode/extensions.json`:
```json
{
  "recommendations": [
    "biomejs.biome",
    "bradlc.vscode-tailwindcss",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "ms-azuretools.vscode-docker"
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
  "files.exclude": {
    "**/.next": true,
    "**/node_modules": true
  }
}
```

---

### 7.2 — Pin exact Node version in `.nvmrc`

Your `.nvmrc` says `20`. This is ambiguous — it resolves to whatever the latest `20.x` release is at the time someone runs `nvm use`. For a production baseline, pin to a specific patch:

```
# .nvmrc
20.19.1
```

Check the current Node 20 LTS release: `node --version` or [nodejs.org/en/about/previous-releases](https://nodejs.org/en/about/previous-releases).

---

### 7.3 — Add a `lint-staged` config for targeted pre-commit checks

Currently Husky runs the full credential scan on every commit. With lint-staged, you can also run format checks only on changed files (fast):

```bash
npm install --save-dev lint-staged
```

Add to `package.json`:
```json
"lint-staged": {
  "*.{js,mjs,ts,tsx,jsx}": [
    "biome check --write",
    "node scripts/validate-env.mjs"
  ],
  "*.{json,css,md}": [
    "biome format --write"
  ]
}
```

Update `.husky/pre-commit`:
```bash
#!/bin/sh
npx lint-staged
```

---

### 7.4 — Add GitHub Issue templates

Create `.github/ISSUE_TEMPLATE/bug_report.md` and `feature_request.md` so that when you or a collaborator opens an issue, there's a structured format:

```markdown
<!-- .github/ISSUE_TEMPLATE/bug_report.md -->
---
name: Bug report
about: Something broke in the boilerplate
labels: bug
---

**Describe the bug**
A clear description of what went wrong.

**To reproduce**
Steps to reproduce:
1. Run `npm run ...`
2. See error

**Environment**
- OS:
- Node version (`node --version`):
- npm version (`npm --version`):

**Expected behavior**

**Actual output / error message**
```

---

### 7.5 — Verify `msc:kill` alias points to correct script

In `package.json` there are two kill-port scripts:
```json
"msc:kill-dev-port": "node scripts/kill-ports.mjs",
"msc:kill": "node scripts/msc-kill-dev-port.mjs",
```

These appear to be two different scripts (`kill-ports.mjs` vs `msc-kill-dev-port.mjs`). If both exist and do similar things, consolidate them. If one is the canonical version, remove the alias for the other and update all references. Check `START-HERE.md` which references `npm run msc:kill -- 3000` as the canonical gate.

**Recommended fix:**
```json
// Pick one canonical script and point both aliases to it:
"msc:kill-dev-port": "node scripts/msc-kill-dev-port.mjs",
"msc:kill": "node scripts/msc-kill-dev-port.mjs"
```

Then delete `scripts/kill-ports.mjs` if it's a duplicate, or keep it and rename one alias to clarify the distinction.

---

## 8. Roadmap Execution Plan

Below is the recommended execution order for the P2 roadmap items already in your README, with implementation guidance:

### P2-A: Component generation script (`msc:new:component`)

Create `scripts/msc-new-component.mjs`:
```js
#!/usr/bin/env node
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const [,, name, target = 'examples/nextjs-minimal/src/components'] = process.argv;
if (!name) { console.error('Usage: npm run msc:new:component -- MyComponent'); process.exit(1); }

const dir = join(process.cwd(), target, name);
mkdirSync(dir, { recursive: true });

writeFileSync(join(dir, `${name}.tsx`), `
export interface ${name}Props {
  className?: string;
}

export function ${name}({ className }: ${name}Props) {
  return (
    <div className={['msc-${name.toLowerCase()}', className].filter(Boolean).join(' ')}>
      {/* ${name} */}
    </div>
  );
}
`.trimStart());

writeFileSync(join(dir, `${name}.test.tsx`), `
import { render } from '@testing-library/react';
import { ${name} } from './${name}';

describe('${name}', () => {
  it('renders without errors', () => {
    const { container } = render(<${name} />);
    expect(container).toBeTruthy();
  });
});
`.trimStart());

writeFileSync(join(dir, 'index.ts'), `export { ${name} } from './${name}';\n`);
console.log(\`✅ Created component: \${dir}\`);
```

Add to `package.json`:
```json
"msc:new:component": "node scripts/msc-new-component.mjs"
```

### P2-B: Docker Compose for local Postgres

Create `docker-compose.yml` at repo root:
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16-alpine
    restart: unless-stopped
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-msc_user}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-msc_password}
      POSTGRES_DB: ${POSTGRES_DB:-msc_dev}
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Add to `.env.example`:
```
# Docker Postgres (optional — alternative to SQLite in examples/nextjs-payload)
POSTGRES_USER=YOUR_POSTGRES_USER
POSTGRES_PASSWORD=YOUR_POSTGRES_PASSWORD
POSTGRES_DB=YOUR_DB_NAME
DATABASE_URL=postgresql://YOUR_POSTGRES_USER:YOUR_POSTGRES_PASSWORD@localhost:5432/YOUR_DB_NAME
```

Add npm scripts:
```json
"db:up": "docker-compose up -d postgres",
"db:down": "docker-compose down",
"db:logs": "docker-compose logs -f postgres"
```

---

## 9. Implementation Priority Order

Work through this list top-to-bottom for the highest-impact improvements first:

| Priority | Item | Effort | Impact |
|----------|------|--------|--------|
| 🔴 **P0** | Fix `"main"` PHP field in package.json | 2 min | Blocks tooling |
| 🔴 **P0** | Fix self-grade badge label | 2 min | Trust / clarity |
| 🔴 **P0** | Verify `msc:kill` vs `msc:kill-dev-port` script duplication | 10 min | Reliability |
| 🟠 **P1** | Align repo name / README title / package name | 15 min | Identity clarity |
| 🟠 **P1** | Migrate `.cursorrules` → `.cursor/rules/global.mdc` | 20 min | Future-proofing |
| 🟠 **P1** | Split `.cursorrules` into modular rule files | 45 min | AI context efficiency |
| 🟠 **P1** | Add Biome config + linting npm scripts | 20 min | Code quality gate |
| 🟠 **P1** | Update Husky hook to include lint | 5 min | Commit gate |
| 🟡 **P2** | Create `CHANGELOG.md` | 20 min | Maintenance |
| 🟡 **P2** | Create `CONTRIBUTING.md` | 30 min | Collaboration |
| 🟡 **P2** | Add `config/README.md` | 15 min | Documentation |
| 🟡 **P2** | Document or quarantine WordPress/PHP layer | 20 min | Clarity |
| 🟡 **P2** | Add `.vscode/settings.json` and `extensions.json` | 10 min | DX |
| 🟡 **P2** | Pin exact Node version in `.nvmrc` | 2 min | Reproducibility |
| 🟡 **P2** | Add `examples/nextjs-payload` pin comment | 5 min | Future-proofing |
| 🟡 **P2** | Convert README roadmap to GitHub Issues | 20 min | Tracking |
| 🟢 **P3** | Add root-level structural test suite | 60 min | CI reliability |
| 🟢 **P3** | Add `lint-staged` for targeted pre-commit | 15 min | DX |
| 🟢 **P3** | Add GitHub Issue templates | 10 min | Collaboration |
| 🟢 **P3** | Implement `msc:new:component` script | 45 min | Productivity |
| 🟢 **P3** | Add Docker Compose for Postgres | 30 min | Full-stack dev |

---

## Estimated Score After All Fixes

| Category | Current | After Fixes |
|----------|---------|-------------|
| Architecture & Structure | 17/20 | 19/20 |
| AI/Cursor Integration | 18/20 | 20/20 |
| Security & Environment | 16/20 | 19/20 |
| Documentation | 12/20 | 18/20 |
| Testing & CI | 8/20 | 15/20 |
| DX & Tooling | 7/20 | 17/20 |
| **Total** | **78/120** | **108/120** |
| **Percentage** | **65%** | **90%** |

Completing all P0 and P1 items alone will push you from **78 → ~87**. Full completion lands at **90+**, which is a genuinely elite personal Cursor boilerplate setup.

---

