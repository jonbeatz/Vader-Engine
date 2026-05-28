# Vader Engine Implementation Guide
## Comprehensive Review — Recommendations, Fixes & Roadmap

**Version:** 1.0.0  
**Target Repository:** `jonbeatz/Vader-Engine-v1` (v2.0.0-JEDI)  
**Generated:** 2026-05-22  
**Status:** Actionable implementation document for 88 → 95+ score progression

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Critical Fixes (Immediate — This Week)](#2-critical-fixes-immediate--this-week)
3. [High-Impact Improvements (Short-Term — 2-4 Weeks)](#3-high-impact-improvements-short-term--2-4-weeks)
4. [Medium-Term Enhancements (1-3 Months)](#4-medium-term-enhancements-1-3-months)
5. [Long-Term Strategic Additions (3-6 Months)](#5-long-term-strategic-additions-3-6-months)
6. [Implementation Priority Matrix](#6-implementation-priority-matrix)
7. [File-by-File Change Specifications](#7-file-by-file-change-specifications)
8. [Appendix: Scoring Breakdown & Target State](#8-appendix-scoring-breakdown--target-state)

---

## 1. Executive Summary

### Current State Assessment
Your Vader Engine (Jedi-Master Edition) scores **88/100** and represents a top-5% public boilerplate. It excels in security architecture, workspace isolation, and operational automation. The gap to excellence (95+) is not architectural—it is **completeness and developer ergonomics**.

### The Three Gaps
1. **Onboarding Friction**: Documentation is comprehensive but not navigable for first-time users
2. **Missing Table Stakes**: Docker, component generation, and deeper testing are expected at this maturity level
3. **Operational Gaps**: No troubleshooting runbook, no interactive setup, no package manager strategy

### Target State
| Dimension | Current | Target | Delta |
|-----------|---------|--------|-------|
| Architecture & Security | 18/20 | 19/20 | +1 |
| Automation & Tooling | 17/20 | 19/20 | +2 |
| Documentation | 15/20 | 18/20 | +3 |
| Developer Experience | 17/20 | 19/20 | +2 |
| Future-Proofing | 13/20 | 18/20 | +5 |
| Polish & Completeness | 8/20 | 17/20 | +9 |
| **TOTAL** | **88/100** | **92/100** | **+4** |

*Note: 92/100 reflects achievable gains with documented changes. 95+ requires E2E testing and full Docker integration (see Long-Term section).*

---

## 2. Critical Fixes (Immediate — This Week)

These are bugs, gaps, or inconsistencies that should be resolved before the next release.

### 2.1 Documentation Discoverability Crisis

**Problem:** Four documentation files (`HOW-TO.md`, `START-HERE.md`, `DOCS.md`, `Code-Jedi.md`) exist but the README does not explain when to use each. New users open all four before finding what they need. This violates the 10-minute quickstart promise.

**Root Cause:** The documentation hierarchy is implicit, not explicit. The README assumes users know the MSC documentation convention.

**Fix — Add a Documentation Map to README.md:**

Insert the following section immediately after the "Overview" section and before "What's new":

```markdown
## Documentation Navigation

| I am a... | Start here | Then read | For reference |
|-----------|-----------|-----------|---------------|
| **First-time user** | `README.md` (this file) → Quick Start | `START-HERE.md` | `DOCS.md` |
| **Returning developer** | `START-HERE.md` | `HOW-TO.md` | `Code-Jedi.md` |
| **AI agent / Cursor** | `Code-Jedi.md` | `.cursor/skills/README.md` | `TRUTH.md` |
| **DevOps / CI engineer** | `HOW-TO.md` | `.github/workflows/ci.yml` | `scripts/*.mjs` |
| **Project manager** | `DOCS.md` | `TRUTH.md` | `README.md` |

**Reading Order for New Team Members:**
1. README.md (5 min) — Understand what this is
2. START-HERE.md (10 min) — Cold-start your environment
3. HOW-TO.md (15 min) — Learn the command runbook
4. Code-Jedi.md (as needed) — AI routing and module compass
```

**Also add to START-HERE.md header:**
```markdown
> **New here?** Read `README.md` first, then return to this file for the cold-start protocol.
```

---

### 2.2 Missing Root-Level `.env.example` Contract

**Problem:** The README mentions copying `.env.example` to `.env.local` for Payload, but there is no documented root-level `.env.example`. Users must discover environment variables by reading scripts or failing at runtime.

**Root Cause:** Environment variables are scattered across sandboxes. The root workspace lacks a centralized environment contract.

**Fix — Create `/env.example` (root level):**

```bash
# ============================================
# Vader Engine Environment Contract
# Copy this file to .env.local and fill in real values
# NEVER commit .env.local — it is gitignored by default
# ============================================

# --- Core Ports (modify if 3000/3001/8080 are occupied) ---
PORT_EXAMPLE=3000
PORT_PAYLOAD=3001
PORT_RESERVED=8080

# --- Payload CMS (required for nextjs-payload sandbox) ---
PAYLOAD_SECRET=YOUR_PAYLOAD_SECRET_HERE_CHANGE_ME
DATABASE_URI=YOUR_DATABASE_URI_HERE_CHANGE_ME

# --- MCP / AI Proxy (optional) ---
OPENAI_API_KEY=YOUR_OPENAI_KEY_HERE
ANTHROPIC_API_KEY=YOUR_ANTHROPIC_KEY_HERE
LITELLM_PROXY_URL=YOUR_LITELLM_URL_HERE

# --- Deployment (optional) ---
SPACESHIP_NODE_USER=YOUR_CPANEL_USER_HERE
SPACESHIP_NODE_HOST=YOUR_CPANEL_HOST_HERE

# --- Feature Flags ---
ENABLE_MCP=true
ENABLE_LOCAL_AI_PROXY=false
```

**Then update `scripts/quickstart.mjs`:**

Add a step that copies `.env.example` to `.env.local` at the root if `.env.local` does not exist:

```javascript
// Add to quickstart.mjs, after package installation
import { copyFile, access } from 'fs/promises';
import { constants } from 'fs';

async function ensureEnvLocal() {
  try {
    await access('.env.local', constants.F_OK);
    console.log('✓ .env.local exists');
  } catch {
    console.log('⚠ .env.local not found — generating from template');
    await copyFile('.env.example', '.env.local');
    console.log('✓ Created .env.local — fill in YOUR_* values before first run');
  }
}
```

**Update the self-grader** to verify `.env.example` exists at root and contains all required keys.

---

### 2.3 Package Manager Ambiguity

**Problem:** You enforce Node 20 via `.nvmrc` (excellent) but do not specify npm, yarn, or pnpm. Given the workspace complexity, different package managers handle monorepo structures differently. This creates lockfile drift and install inconsistencies.

**Root Cause:** No `packageManager` field in root `package.json`.

**Fix — Lock the Package Manager:**

Add to root `package.json`:
```json
{
  "packageManager": "npm@10.5.0",
  "engines": {
    "node": ">=20.0.0 <21.0.0",
    "npm": ">=10.0.0"
  }
}
```

**Rationale:** npm is the conservative choice for maximum compatibility. If you prefer pnpm (better for workspace isolation), use:
```json
{
  "packageManager": "pnpm@9.0.0"
}
```

**Then add to the self-grader:**
- Verify `packageManager` field exists
- Verify the specified package manager version matches the lockfile format

---

### 2.4 Pre-commit Hook Granularity

**Problem:** The Husky hook likely runs the full 38-point grade suite on every commit. This slows down rapid local iteration (WIP commits, experimental branches).

**Root Cause:** Single-stage pre-commit without branch-aware logic.

**Fix — Split Hook Strategy:**

Update `.husky/pre-commit` (or `lint-staged` config):

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Stage 1: Fast checks (always run)
npm run msc:validate-env

# Stage 2: Full grade (only on main/develop or before push)
BRANCH=$(git branch --show-current)
if [ "$BRANCH" = "main" ] || [ "$BRANCH" = "develop" ]; then
  echo "On protected branch — running full grade suite"
  npm run grade
fi
```

**Alternative (recommended):** Move full grade to `pre-push` hook:

Create `.husky/pre-push`:
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run grade
```

Keep `.husky/pre-commit` lightweight:
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
npm run msc:validate-env
```

---

### 2.5 Missing `TROUBLESHOOTING.md`

**Problem:** With ports, sandboxes, Payload, credential scanning, and MCP configuration, there are dozens of failure modes. Users currently debug by reading scripts or asking for help.

**Root Cause:** No operational runbook for failure recovery.

**Fix — Create `/TROUBLESHOOTING.md`:**

```markdown
# Troubleshooting Runbook

## Bootstrap Failures

### "Port 3000 is already in use"
```bash
npm run msc:kill-dev-port
# Or target specific port:
npm run msc:kill -- 3000
```

### "npm run bootstrap hangs on package install"
- Check Node version: `node -v` (must be 20.x.x)
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and lockfile: `rm -rf node_modules package-lock.json`
- Re-run: `npm run bootstrap`

### "grade fails with missing .env.local"
```bash
cp .env.example .env.local
# Fill in YOUR_* values, then re-run grade
```

## Payload Sandbox Failures

### "PAYLOAD_SECRET is required"
```bash
cp examples/nextjs-payload/.env.example examples/nextjs-payload/.env.local
# Edit examples/nextjs-payload/.env.local and set PAYLOAD_SECRET
```

### "Payload fails to start on port 3001"
```bash
npm run msc:health
# Check if port 3001 is in TIME_WAIT
npm run msc:kill -- 3001
npm run msc:dev:payload
```

## Credential Scan Failures

### "validate-env found potential secrets"
1. Check the reported file and line
2. If it's a false positive (e.g., a placeholder in a comment), add to `.validate-env-ignore`
3. If it's a real secret, rotate the credential immediately and purge from git history:
   ```bash
   git filter-repo --path <file> --invert-paths
   ```

## MCP / Cursor Failures

### "MCP server not found"
- Verify `.cursor/mcp.json` uses `${workspaceFolder}` not hardcoded paths
- Check `.cursor/docs/mcp-setup.md` for server-specific setup

### "Cursor agent asks for API keys in chat"
- The agent should read from `.env.local` via `msc-load-env.mjs`
- If it asks for plaintext, redirect it to `scripts/lib/msc-load-env.mjs`

## Grade Suite Failures

### "Grade fails on CI but passes locally"
- Check `.nvmrc` alignment between local and CI (GitHub Actions uses `actions/setup-node` with `.nvmrc`)
- Verify `package-lock.json` is committed (CI runs `npm ci`, not `npm install`)

### "Grade fails on sandbox build"
- Each sandbox must have its own lockfile committed
- Check `examples/*/package-lock.json` exists
```

**Link this file from README.md** in the Quick Start section:
```markdown
> **Stuck?** See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common failures.
```

---

## 3. High-Impact Improvements (Short-Term — 2-4 Weeks)

These changes significantly improve daily developer velocity and project completeness.

### 3.1 Interactive Onboarding Script (`scripts/onboarding.mjs`)

**Problem:** The 10-minute quickstart requires users to read documentation and make decisions. An interactive script would reduce this to 5 minutes and prevent configuration errors.

**Implementation:**

Create `scripts/onboarding.mjs`:

```javascript
#!/usr/bin/env node
/**
 * Interactive project onboarding
 * Guides users through sandbox selection, port configuration, and first run
 */

import { createInterface } from 'readline';
import { execSync } from 'child_process';
import { writeFile, copyFile, access } from 'fs/promises';
import { constants } from 'fs';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (q) => new Promise(resolve => rl.question(q, resolve));

async function main() {
  console.log('\n🚀 Vader Engine Interactive Onboarding\n');

  // Step 1: Check prerequisites
  console.log('📋 Checking prerequisites...');
  try {
    const nodeVersion = execSync('node -v', { encoding: 'utf8' }).trim();
    console.log(`  ✓ Node.js ${nodeVersion}`);
  } catch {
    console.error('  ✗ Node.js not found. Install Node 20 from https://nodejs.org/');
    process.exit(1);
  }

  // Step 2: Select sandbox
  console.log('\n📦 Available project templates:');
  console.log('  1. Minimal Frontend (Next.js 15 + Vitest) — port 3000');
  console.log('  2. Full-Stack (Next.js + Payload CMS) — ports 3000/3001');
  console.log('  3. Custom (configure manually)');

  const choice = await question('\nSelect template (1-3): ');

  // Step 3: Port configuration
  console.log('\n🔌 Port configuration:');
  const defaultPorts = { example: '3000', payload: '3001', reserved: '8080' };

  const examplePort = await question(`Frontend port [${defaultPorts.example}]: `) || defaultPorts.example;
  const payloadPort = choice === '2' 
    ? (await question(`Payload port [${defaultPorts.payload}]: `) || defaultPorts.payload)
    : defaultPorts.payload;

  // Step 4: Environment setup
  console.log('\n🔐 Environment setup:');
  try {
    await access('.env.local', constants.F_OK);
    console.log('  ✓ .env.local exists');
  } catch {
    await copyFile('.env.example', '.env.local');
    console.log('  ✓ Created .env.local from template');
  }

  // Update .env.local with selected ports
  const envContent = await readFile('.env.local', 'utf8');
  const updatedEnv = envContent
    .replace(/PORT_EXAMPLE=.*/, `PORT_EXAMPLE=${examplePort}`)
    .replace(/PORT_PAYLOAD=.*/, `PORT_PAYLOAD=${payloadPort}`);
  await writeFile('.env.local', updatedEnv);
  console.log('  ✓ Updated port configuration');

  // Step 5: Payload secret (if applicable)
  if (choice === '2') {
    const payloadSecret = await question('\nSet PAYLOAD_SECRET (or press Enter for random): ');
    const secret = payloadSecret || crypto.randomUUID();
    const envWithSecret = updatedEnv.replace(/PAYLOAD_SECRET=.*/, `PAYLOAD_SECRET=${secret}`);
    await writeFile('.env.local', envWithSecret);
    console.log('  ✓ Payload secret configured');
  }

  // Step 6: Bootstrap
  console.log('\n⚙️  Running bootstrap...');
  execSync('npm run bootstrap', { stdio: 'inherit' });

  // Step 7: First run
  console.log('\n✅ Setup complete!');
  console.log(`\nStart development:`);
  if (choice === '1') {
    console.log(`  npm run msc:dev:example    → http://localhost:${examplePort}`);
  } else if (choice === '2') {
    console.log(`  npm run msc:dev:example    → http://localhost:${examplePort}`);
    console.log(`  npm run msc:dev:payload    → http://localhost:${payloadPort}`);
  }

  rl.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
```

**Add to `package.json`:**
```json
{
  "scripts": {
    "msc:onboard": "node scripts/onboarding.mjs"
  }
}
```

**Update README Quick Start:**
```markdown
## Quick Start (5 minutes)

```bash
git clone https://github.com/jonbeatz/Vader-Engine-v1.git my-project
cd my-project
npm run msc:onboard  # Interactive setup
```
```

---

### 3.2 Component Generation Script (`msc:new:component`)

**Problem:** Your roadmap lists this as P2 with 1 hour effort, but it's actually one of the highest-impact daily-velocity tools. Currently, developers manually create `.tsx`, `.css`, `.test.tsx`, and Storybook files.

**Implementation:**

Create `scripts/msc-new-component.mjs`:

```javascript
#!/usr/bin/env node
/**
 * Scaffold a new MSC-namespaced component
 * Usage: npm run msc:new:component -- <ComponentName> [sandbox]
 */

import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { resolve } from 'path';

const [,, componentName, sandbox = 'nextjs-minimal'] = process.argv;

if (!componentName) {
  console.error('Usage: npm run msc:new:component -- <ComponentName> [sandbox]');
  process.exit(1);
}

if (!/^msc-[a-z-]+$/.test(componentName)) {
  console.error('Component name must match msc-[a-z-]+ (e.g., msc-button, msc-card-grid)');
  process.exit(1);
}

const sandboxPath = `examples/${sandbox}`;
if (!existsSync(sandboxPath)) {
  console.error(`Sandbox ${sandbox} not found at ${sandboxPath}`);
  process.exit(1);
}

const componentDir = `${sandboxPath}/src/components/${componentName}`;

const files = {
  [`${componentDir}/index.tsx`]: `import React from 'react';
import './styles.css';

export interface ${pascalCase(componentName)}Props {
  children?: React.ReactNode;
  className?: string;
}

export function ${pascalCase(componentName)}({ children, className = '' }: ${pascalCase(componentName)}Props) {
  return (
    <div className="${componentName} ${componentName}--root ${className}">
      {children}
    </div>
  );
}
`,
  [`${componentDir}/styles.css`]: `/* ${componentName} — Vader Protocol Shield */
.${componentName} {
  /* Studio Dark tokens */
  --bg-primary: #121212;
  --surface-elevated: #1c1c1c;

  /* Component-specific tokens */
  --${componentName}-padding: 1rem;
}

.${componentName}--root {
  background: var(--bg-primary);
  padding: var(--${componentName}-padding);
}
`,
  [`${componentDir}/${componentName}.test.tsx`]: `import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ${pascalCase(componentName)} } from './index';

describe('${componentName}', () => {
  it('renders with default props', () => {
    render(<${pascalCase(componentName)}>Test content</${pascalCase(componentName)}>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<${pascalCase(componentName)} className="custom-class">Content</${pascalCase(componentName)}>);
    const element = screen.getByText('Content').parentElement;
    expect(element).toHaveClass('custom-class');
  });
});
`,
  [`${componentDir}/README.md`]: `# ${componentName}

## Usage
\`\`\`tsx
import { ${pascalCase(componentName)} } from './components/${componentName}';

<${pascalCase(componentName)}>Content</${pascalCase(componentName)}>
\`\`\`

## CSS API
| Class | Purpose |
|-------|---------|
| \`.${componentName}\` | Base namespace |
| \`.${componentName}--root\` | Root element styles |

## Studio Dark Tokens
- \`--bg-primary\`: #121212
- \`--surface-elevated\`: #1c1c1c
`
};

async function scaffold() {
  await mkdir(componentDir, { recursive: true });

  for (const [filePath, content] of Object.entries(files)) {
    await writeFile(filePath, content);
    console.log(`✓ Created ${filePath}`);
  }

  console.log(`\n✅ Component ${componentName} scaffolded in ${sandbox}`);
  console.log(`\nNext steps:`);
  console.log(`  1. Implement component logic in ${componentDir}/index.tsx`);
  console.log(`  2. Style with Studio Dark tokens in ${componentDir}/styles.css`);
  console.log(`  3. Run tests: npm run msc:test`);
}

function pascalCase(str) {
  return str.replace(/(^|-)([a-z])/g, (_, __, letter) => letter.toUpperCase());
}

scaffold().catch(console.error);
```

**Add to `package.json`:**
```json
{
  "scripts": {
    "msc:new:component": "node scripts/msc-new-component.mjs"
  }
}
```

**Update self-grader** to verify the component generator exists and produces valid output.

---

### 3.3 Expand Test Coverage

**Problem:** 3/3 Vitest integration tests is minimal for a boilerplate this complex. The scripts themselves (validate-env, health, forge) are untested, which means regressions in operational tooling go undetected.

**Implementation:**

Create `scripts/__tests__/validate-env.test.mjs`:

```javascript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { writeFile, unlink, mkdir } from 'fs/promises';
import { execSync } from 'child_process';
import { existsSync } from 'fs';

const TEST_ENV_FILE = '.env.test.local';

describe('validate-env.mjs', () => {
  beforeEach(async () => {
    // Create a clean test environment
    if (existsSync(TEST_ENV_FILE)) await unlink(TEST_ENV_FILE);
  });

  afterEach(async () => {
    if (existsSync(TEST_ENV_FILE)) await unlink(TEST_ENV_FILE);
  });

  it('passes when no secrets are present', () => {
    const result = execSync('node scripts/validate-env.mjs', { encoding: 'utf8' });
    expect(result).toContain('PASS');
  });

  it('fails when a real secret pattern is detected', async () => {
    await writeFile(TEST_ENV_FILE, 'API_KEY=sk-live-1234567890abcdef');
    expect(() => {
      execSync('node scripts/validate-env.mjs', { encoding: 'utf8' });
    }).toThrow();
  });

  it('allows YOUR_* placeholders', async () => {
    await writeFile(TEST_ENV_FILE, 'API_KEY=YOUR_API_KEY_HERE');
    const result = execSync('node scripts/validate-env.mjs', { encoding: 'utf8' });
    expect(result).toContain('PASS');
  });

  it('blocks CHANGE_ME values in committed files', async () => {
    // This tests that .env.example can contain CHANGE_ME but .env.local cannot
    // Implementation depends on your validate-env logic
  });
});
```

Create `scripts/__tests__/health.test.mjs`:

```javascript
import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';

describe('health.mjs', () => {
  it('returns JSON when --json flag is passed', () => {
    const result = execSync('node scripts/health.mjs --json', { encoding: 'utf8' });
    const parsed = JSON.parse(result);
    expect(parsed).toHaveProperty('ports');
    expect(parsed).toHaveProperty('nodeVersion');
    expect(parsed).toHaveProperty('timestamp');
  });

  it('probes all registered ports', () => {
    const result = execSync('node scripts/health.mjs --json', { encoding: 'utf8' });
    const parsed = JSON.parse(result);
    expect(parsed.ports).toContainEqual(
      expect.objectContaining({ port: 3000 })
    );
    expect(parsed.ports).toContainEqual(
      expect.objectContaining({ port: 3001 })
    );
    expect(parsed.ports).toContainEqual(
      expect.objectContaining({ port: 8080 })
    );
  });
});
```

Create `scripts/__tests__/forge.test.mjs`:

```javascript
import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';

describe('msc-forge.mjs', () => {
  it('respects the msc- prefix guard', () => {
    // Attempt to rename something that starts with msc- — should be blocked
    const result = execSync(
      'node scripts/msc-forge.mjs msc-old-name new-name --dry-run',
      { encoding: 'utf8' }
    );
    expect(result).toContain('blocked');
    expect(result).toContain('msc-');
  });

  it('allows renaming non-msc assets', () => {
    const result = execSync(
      'node scripts/msc-forge.mjs old-component new-component --dry-run',
      { encoding: 'utf8' }
    );
    expect(result).toContain('dry-run');
  });
});
```

**Update `package.json`:**
```json
{
  "scripts": {
    "msc:test": "vitest run scripts/__tests__ examples/*/src/**/*.test.tsx",
    "msc:test:watch": "vitest scripts/__tests__ examples/*/src/**/*.test.tsx"
  }
}
```

**Update self-grader** to verify test count is ≥ 10 (or your target threshold).

---

### 3.4 TypeScript Strictness Documentation

**Problem:** With Next.js 15 + TypeScript, the `tsconfig.json` strictness settings significantly affect downstream project quality. Currently, users must inspect the config file to know your standards.

**Implementation:**

Document your TypeScript configuration explicitly. Add to `HOW-TO.md` or create `.cursor/docs/typescript-contract.md`:

```markdown
# TypeScript Strictness Contract

All sandboxes in this boilerplate enforce the following TypeScript configuration:

## Required Settings (tsconfig.json)

| Setting | Value | Rationale |
|---------|-------|-----------|
| `strict` | `true` | Maximum type safety |
| `noImplicitAny` | `true` | Prevents untyped parameters |
| `strictNullChecks` | `true` | Eliminates null/undefined errors |
| `noUnusedLocals` | `true` | Clean code, no dead variables |
| `noUnusedParameters` | `false` | Allow intentional unused params (callbacks) |
| `exactOptionalPropertyTypes` | `true` | Distinguish `undefined` from missing |
| `noImplicitReturns` | `true` | All code paths must return |
| `noFallthroughCasesInSwitch` | `true` | Prevent switch case fallthrough bugs |

## Prohibited Patterns

The following will fail `npm run grade`:

- `any` type usage without `// @ts-expect-error` annotation
- Implicit `any` in function parameters
- Missing return type annotations on exported functions
- Non-null assertions (`!`) without justification comment

## Recommended Patterns

```typescript
// ✅ Explicit return types
export function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ✅ Discriminated unions over optional fields
interface SuccessResult {
  status: 'success';
  data: User;
}
interface ErrorResult {
  status: 'error';
  error: string;
}
type Result = SuccessResult | ErrorResult;

// ✅ Type guards
function isSuccess(result: Result): result is SuccessResult {
  return result.status === 'success';
}
```
```

**Add to self-grader:**
- Verify `tsconfig.json` contains `strict: true`
- Verify no `// @ts-ignore` comments exist (use `// @ts-expect-error` with explanation)

---

## 4. Medium-Term Enhancements (1-3 Months)

### 4.1 Docker Compose Integration

**Problem:** Your roadmap mentions Docker Compose for Postgres, but currently there's no containerization. For a "production-grade" baseline, local database installations are a barrier to adoption.

**Implementation:**

Create `docker-compose.yml` (root level):

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: msc-postgres
    environment:
      POSTGRES_USER: msc_user
      POSTGRES_PASSWORD: msc_password
      POSTGRES_DB: msc_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init:/docker-entrypoint-initdb.d
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U msc_user -d msc_db"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: msc-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5

  # Optional: Local SMTP for testing
  mailhog:
    image: mailhog/mailhog:latest
    container_name: msc-mailhog
    ports:
      - "1025:1025"  # SMTP
      - "8025:8025"  # Web UI

volumes:
  postgres_data:
  redis_data:
```

Create `scripts/docker-up.mjs`:

```javascript
#!/usr/bin/env node
/**
 * Start local Docker services
 * Usage: npm run msc:docker:up
 */

import { execSync } from 'child_process';

console.log('🐳 Starting MSC local services...');

try {
  execSync('docker-compose up -d', { stdio: 'inherit' });
  console.log('\n✅ Services started:');
  console.log('  Postgres: localhost:5432');
  console.log('  Redis:    localhost:6379');
  console.log('  MailHog:  localhost:8025 (SMTP UI)');
} catch (err) {
  console.error('\n❌ Failed to start Docker services');
  console.error('Ensure Docker Desktop is running');
  process.exit(1);
}
```

Create `scripts/docker-down.mjs`:

```javascript
#!/usr/bin/env node
import { execSync } from 'child_process';

console.log('🛑 Stopping MSC local services...');
execSync('docker-compose down', { stdio: 'inherit' });
console.log('✅ Services stopped');
```

**Add to `package.json`:**
```json
{
  "scripts": {
    "msc:docker:up": "node scripts/docker-up.mjs",
    "msc:docker:down": "node scripts/docker-down.mjs",
    "msc:docker:logs": "docker-compose logs -f"
  }
}
```

**Update `.env.example`:**
```bash
# --- Docker Services ---
DOCKER_POSTGRES_URL=postgresql://msc_user:msc_password@localhost:5432/msc_db
DOCKER_REDIS_URL=redis://localhost:6379
```

**Update self-grader** to verify `docker-compose.yml` exists and is valid YAML.

---

### 4.2 Lockfile Hygiene Enforcement

**Problem:** Each sandbox must have its own lockfile committed, but this is not enforced. Sub-project dependencies can get hoisted unexpectedly, causing CI/production drift.

**Implementation:**

Add to `scripts/msc-grade-boilerplate.mjs` (or create a new check):

```javascript
// Lockfile verification
const requiredLockfiles = [
  'package-lock.json',           // Root
  'examples/nextjs-minimal/package-lock.json',
  'examples/nextjs-payload/package-lock.json'
];

for (const lockfile of requiredLockfiles) {
  try {
    await access(lockfile, constants.F_OK);
    console.log(`[PASS] Lockfile present: ${lockfile}`);
  } catch {
    console.error(`[FAIL] Missing lockfile: ${lockfile}`);
    console.error('  Run npm install in this workspace and commit the lockfile');
    process.exit(1);
  }
}

// Verify lockfile freshness (not older than package.json)
const rootPackageStat = await stat('package.json');
const rootLockStat = await stat('package-lock.json');

if (rootLockStat.mtime < rootPackageStat.mtime) {
  console.error('[FAIL] package-lock.json is older than package.json');
  console.error('  Run npm install to update the lockfile');
  process.exit(1);
}
```

**Add to `.gitignore` (ensure these are NOT ignored):**
```gitignore
# DO NOT ignore lockfiles — they are required for reproducible builds
# !package-lock.json
# !examples/*/package-lock.json
```

**Document in `HOW-TO.md`:**
```markdown
## Lockfile Policy

Every workspace (root + each sandbox) MUST commit its `package-lock.json`.
This ensures CI builds are identical to local builds.

**Never** run `npm install` in CI — use `npm ci` which requires a lockfile.

If you modify a sandbox's `package.json`, re-run `npm install` in that 
sandbox and commit the updated lockfile.
```

---

### 4.3 VS Code / Cursor Settings Sync

**Problem:** Your roadmap lists this as P3 (10 min effort), but it's actually critical for team consistency. Without shared settings, formatting and extension configs drift between developers.

**Implementation:**

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "files.exclude": {
    "**/node_modules": true,
    "**/.next": true,
    "**/dist": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/.next": true,
    "**/dist": true,
    "**/package-lock.json": true
  },
  "eslint.workingDirectories": [
    "./examples/nextjs-minimal",
    "./examples/nextjs-payload"
  ]
}
```

Create `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "eamodio.gitlens",
    "github.vscode-github-actions"
  ]
}
```

Create `.cursor/settings.json` (Cursor-specific):

```json
{
  "cursor.aiRules": [
    ".cursor/rules/README.md"
  ],
  "cursor.composer.defaultModel": "claude-sonnet-4-20250514",
  "cursor.terminal.defaultProfile": "zsh"
}
```

**Document in `HOW-TO.md`:**
```markdown
## Editor Configuration

This repository includes shared settings for VS Code and Cursor.

**First-time setup:**
1. Open the project in VS Code/Cursor
2. When prompted, install recommended extensions
3. Format on save is enabled — press Save and code auto-formats

**Customizing:**
- Personal overrides go in your user settings (not committed)
- Team-wide changes go in `.vscode/settings.json` (committed)
```

---

## 5. Long-Term Strategic Additions (3-6 Months)

### 5.1 Playwright E2E Multi-Sandbox Harness

**Problem:** Your CI runs builds, but does not verify that the built applications actually work in a browser. E2E testing is the gap between "it compiles" and "it works."

**Implementation:**

Create `e2e/playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
  webServer: [
    {
      command: 'npm run msc:dev:example',
      url: 'http://localhost:3000',
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
    },
    {
      command: 'npm run msc:dev:payload',
      url: 'http://localhost:3001',
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
    },
  ],
});
```

Create `e2e/tests/smoke.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Frontend Sandbox', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Vader Engine/);
  });

  test('Studio Dark theme is applied', async ({ page }) => {
    await page.goto('/');
    const body = page.locator('body');
    await expect(body).toHaveCSS('background-color', 'rgb(18, 18, 18)');
  });
});

test.describe('Payload Sandbox', () => {
  test('admin panel loads', async ({ page }) => {
    await page.goto('http://localhost:3001/admin');
    await expect(page.locator('text=Payload')).toBeVisible();
  });
});
```

**Add to `package.json`:**
```json
{
  "scripts": {
    "msc:e2e": "playwright test",
    "msc:e2e:ui": "playwright test --ui",
    "msc:e2e:report": "playwright show-report"
  }
}
```

**Update CI workflow** (`.github/workflows/ci.yml`):

```yaml
- name: Install Playwright
  run: npx playwright install --with-deps

- name: Run E2E tests
  run: npm run msc:e2e
```

---

### 5.2 shadcn/ui Integration Path

**Problem:** Your roadmap mentions "opt-in Tailwind/shadcn sandboxing" as P2. This is important because many teams want shadcn/ui components but your Vader Protocol uses custom CSS.

**Implementation Strategy:**

Create `.cursor/docs/ui-strategy.md`:

```markdown
# UI Strategy: Path A vs Path B

## Path A: Vader Protocol (Studio Dark Shield)
**Use when:** You need total style isolation, custom design system, or WordPress/Divi integration.

- Custom `msc-*` CSS classes
- No Tailwind dependency
- Maximum specificity control
- Zero external CSS conflicts

## Path B: Tailwind + shadcn/ui
**Use when:** You need rapid UI development, standard components, or team familiarity with Tailwind.

- Install: `npx shadcn-ui@latest init`
- Components: `npx shadcn-ui@latest add button`
- Override: Use `ui/studio-dark-shield.css` variables for theming

## Hybrid Mode (Advanced)
Use Path A for layout shell, Path B for content components.

```css
/* Example: shadcn Button with Studio Dark tokens */
.msc-layout .shadcn-button {
  background: var(--bg-primary);
  border-color: var(--surface-elevated);
}
```
```

**Create `examples/nextjs-shadcn/` sandbox** (optional, if you want a third example):

```bash
# Bootstrap command for new sandbox
npm run msc:new:sandbox -- nextjs-shadcn
# This would run: npx shadcn-ui@latest init in the new directory
```

---

### 5.3 Automated Release & Changelog Pipeline

**Problem:** Manual versioning and changelog maintenance is error-prone. Your `github-automation-rules.md` exists but could be automated.

**Implementation:**

Add to `.github/workflows/release.yml`:

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'

      - name: Generate Changelog
        id: changelog
        uses: conventional-changelog/conventional-changelog-action@v3
        with:
          preset: 'angular'

      - name: Create Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          body: ${{ steps.changelog.outputs.clean_changelog }}
```

**Add commit convention enforcement:**

Install `commitlint`:
```bash
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

Create `.commitlintrc.json`:
```json
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "scope-enum": [2, "always", ["core", "scripts", "ui", "docs", "ci"]]
  }
}
```

Update `.husky/commit-msg`:
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no -- commitlint --edit ${1}
```

---

## 6. Implementation Priority Matrix

| Priority | Task | Effort | Impact | Score Delta | Section |
|----------|------|--------|--------|-------------|---------|
| **P0** | Documentation Map in README | 15 min | High | +0.5 | 2.1 |
| **P0** | Root `.env.example` | 20 min | High | +0.5 | 2.2 |
| **P0** | `TROUBLESHOOTING.md` | 30 min | High | +0.5 | 2.5 |
| **P0** | Package Manager Lock | 10 min | Medium | +0.3 | 2.3 |
| **P1** | Pre-commit Hook Split | 20 min | Medium | +0.3 | 2.4 |
| **P1** | Interactive Onboarding | 2 hrs | Very High | +1.5 | 3.1 |
| **P1** | Component Generator | 1.5 hrs | Very High | +1.5 | 3.2 |
| **P1** | Test Coverage Expansion | 3 hrs | High | +1.0 | 3.3 |
| **P1** | TS Strictness Docs | 30 min | Medium | +0.5 | 3.4 |
| **P2** | Docker Compose | 2 hrs | High | +1.5 | 4.1 |
| **P2** | Lockfile Hygiene | 45 min | Medium | +0.5 | 4.2 |
| **P2** | VS Code/Cursor Settings | 30 min | Medium | +0.5 | 4.3 |
| **P3** | Playwright E2E | 4 hrs | Very High | +2.0 | 5.1 |
| **P3** | shadcn/ui Path | 3 hrs | Medium | +1.0 | 5.2 |
| **P3** | Release Automation | 2 hrs | Low | +0.5 | 5.3 |

**Recommended Sprint Order:**
1. **Week 1:** P0 items (documentation, env, troubleshooting, package manager)
2. **Week 2-3:** P1 items (onboarding, component gen, tests, TS docs)
3. **Month 2:** P2 items (Docker, lockfiles, editor settings)
4. **Month 3:** P3 items (E2E, shadcn, releases)

---

## 7. File-by-File Change Specifications

### New Files to Create

| File | Purpose | Section |
|------|---------|---------|
| `/TROUBLESHOOTING.md` | Operational failure recovery | 2.5 |
| `/scripts/onboarding.mjs` | Interactive project setup | 3.1 |
| `/scripts/msc-new-component.mjs` | Component scaffolding | 3.2 |
| `/scripts/docker-up.mjs` | Docker service startup | 4.1 |
| `/scripts/docker-down.mjs` | Docker service shutdown | 4.1 |
| `/scripts/__tests__/validate-env.test.mjs` | Credential scanner tests | 3.3 |
| `/scripts/__tests__/health.test.mjs` | Health dashboard tests | 3.3 |
| `/scripts/__tests__/forge.test.mjs` | Re-branding tool tests | 3.3 |
| `/e2e/playwright.config.ts` | E2E test configuration | 5.1 |
| `/e2e/tests/smoke.spec.ts` | Critical path E2E tests | 5.1 |
| `.vscode/settings.json` | Shared editor settings | 4.3 |
| `.vscode/extensions.json` | Recommended extensions | 4.3 |
| `.cursor/settings.json` | Cursor-specific settings | 4.3 |
| `.commitlintrc.json` | Commit message linting | 5.3 |
| `.cursor/docs/typescript-contract.md` | TS strictness documentation | 3.4 |
| `.cursor/docs/ui-strategy.md` | Path A vs Path B guidance | 5.2 |

### Files to Modify

| File | Changes | Section |
|------|---------|---------|
| `README.md` | Add Documentation Map, link TROUBLESHOOTING.md | 2.1, 2.5 |
| `START-HERE.md` | Add "New here?" header redirect | 2.1 |
| `package.json` (root) | Add `packageManager`, new scripts | 2.3, 3.1, 3.2, 4.1, 5.1 |
| `.env.example` (root) | Create comprehensive template | 2.2 |
| `scripts/quickstart.mjs` | Add `.env.local` auto-generation | 2.2 |
| `.husky/pre-commit` | Split to lightweight checks only | 2.4 |
| `.husky/pre-push` | Create for full grade suite | 2.4 |
| `.husky/commit-msg` | Add commitlint | 5.3 |
| `scripts/msc-grade-boilerplate.mjs` | Add lockfile, TS strictness checks | 3.3, 3.4, 4.2 |
| `.github/workflows/ci.yml` | Add Playwright, release steps | 5.1, 5.3 |
| `docker-compose.yml` | Create service definitions | 4.1 |
| `HOW-TO.md` | Add lockfile policy, editor config section | 4.2, 4.3 |

---

## 8. Appendix: Scoring Breakdown & Target State

### Current vs Target Scorecard

| Dimension | Weight | Current | Target | Changes Needed |
|-----------|--------|---------|--------|----------------|
| **Architecture & Security** | 20% | 18/20 | 19/20 | Lock package manager, strengthen env contract |
| **Automation & Tooling** | 20% | 17/20 | 19/20 | Component gen, onboarding script |
| **Documentation** | 20% | 15/20 | 18/20 | Doc map, troubleshooting, TS contract |
| **Developer Experience** | 20% | 17/20 | 19/20 | Interactive setup, editor sync |
| **Future-Proofing** | 15% | 13/20 | 18/20 | Docker, E2E, shadcn path |
| **Polish & Completeness** | 5% | 8/20 | 17/20 | All P0 items, lockfile hygiene |
| **TOTAL** | **100%** | **88/100** | **92/100** | **See Priority Matrix** |

### Path to 95+ (Post-Implementation)

To reach 95+ after implementing this guide:

1. **E2E Test Depth:** Expand Playwright tests to cover user flows (login, CRUD, navigation)
2. **Performance Budgets:** Add Lighthouse CI to prevent performance regressions
3. **Multi-Package Manager Support:** Support pnpm and yarn with workspace-aware scripts
4. **Cloud Deployment Templates:** Add Terraform or Pulumi for AWS/Vercel deployment
5. **Observability:** Integrate Sentry or LogRocket error tracking configuration
6. **Accessibility:** Add axe-core testing and WCAG 2.1 AA compliance checks

---

## Document Metadata

| Field | Value |
|-------|-------|
| **Generated by** | Kimi K2.6 Comprehensive Review |
| **Review Date** | 2026-05-22 |
| **Target Repository** | `jonbeatz/Vader-Engine-v1` (v2.0.0-JEDI) |
| **Current Score** | 88/100 |
| **Target Score** | 92/100 (achievable with this guide) |
| **Total Recommendations** | 15 items across 5 priority tiers |
| **Estimated Implementation** | 6-8 weeks (part-time) |

---

*This document is a living specification. As your boilerplate evolves, update the Priority Matrix and check off completed items. Re-run the scoring assessment after each major release.*
