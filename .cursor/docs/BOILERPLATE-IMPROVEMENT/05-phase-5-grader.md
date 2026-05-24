---
SESSION: Provide this file + 00-MASTER-INDEX.md to Cursor.
Expected output: Final Grade: 52/52 (100%).
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
| 41 | engines.node locks to 20.x or 24.x | `/20|24/.test(pkg.engines.node)` |
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
  report('engines.node locks to 20.x or 24.x', /20|24/.test(pkg.engines?.node ?? ''))
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
"msc:test:all": "vitest run && npm test --prefix examples/nextjs-minimal"
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

Expected: `Final Grade: 52/52 (100%)`. Tag: `git tag phase-5-pass`.

### ⛔ PHASE 5 COMPLETE — STOP AND REPORT

Before proceeding to Phase 6, **stop and output this checklist to the human operator:**

```
✅ PHASE 5 COMPLETE
- Grade: X/X (100%)
- Tag created: git tag phase-5-pass
- Files modified: [list]
- Files created: [list]
- Any STOP_AND_ASK events: [none / describe]

⏳ Awaiting human confirmation to begin Phase 6.
Type "CONTINUE" to proceed or "ABORT" to stop here.
```

---

### 5.7 — Grader self-tests (constitutional dependency protection) (P1)

`scripts/msc-grade-boilerplate.mjs` is a constitutional dependency for the entire upgrade. Bugs in grader logic become systemic blockers. Add grader regression tests in `scripts/__tests__/msc-grade-boilerplate.test.mjs`:

```javascript
import { describe, it, expect } from 'vitest'
import { execSync } from 'node:child_process'

describe('msc-grade-boilerplate.mjs self-tests', () => {
  it('exits 0 when repo is compliant', () => {
    const out = execSync('node scripts/msc-grade-boilerplate.mjs', { encoding: 'utf8' })
    expect(out).toMatch(/Final Grade: \d+\/\d+/)
  })

  it('prints FAILED CHECK on failure paths', () => {
    // Snapshot: verify stderr format includes failure names
    try {
      execSync('node scripts/msc-grade-boilerplate.mjs', { encoding: 'utf8', env: { ...process.env, MSC_GRADE_MOCK_FAIL: '1' } })
    } catch (e) {
      expect(String(e.stderr ?? e.stdout)).toMatch(/FAIL|FAILED CHECK/)
    }
  })
})
```

Optional mock-failure mode for CI (add to grader when `MSC_GRADE_MOCK_FAIL=1`):

```javascript
if (process.env.MSC_GRADE_MOCK_FAIL === '1') {
  report('mock failure injection test', false)
}
```

Register in `package.json`: `"msc:test:grader": "vitest run scripts/__tests__/msc-grade-boilerplate.test.mjs"`.

Run after every edit to `msc-grade-boilerplate.mjs`: `npm run msc:test:grader && npm run grade`.

---
