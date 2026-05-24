---
SESSION: Provide this file + 00-MASTER-INDEX.md to Cursor.
CHUNK C — Steps 41–57 + FORCE_LOOP. Requires human confirmation 
that Chunk B completed successfully before starting. Human must 
approve FORCE_LOOP start explicitly after Step 57.
Expected output: 52/52 (100%) three consecutive FORCE_LOOP runs.
---

**Important:** Respect all guardrails from 00-MASTER-INDEX.md (Protected Zones, NO REFACTORING, Mutation Budget, Lean Boundary Rule).

### Chunk Execution Plan

| Chunk | Steps | Scope | Stop condition |
|-------|-------|-------|----------------|
| **A** | 0–20 | Foundation + tooling + rules migration | Grade ≥ baseline; commit after each step |
| **B** | 21–40 | Shield + sandbox + grader expansion | Grade ≥ 45/52 minimum before Chunk C |
| **C** | 41–57 + FORCE_LOOP | Tests + polish + triple verification | `52/52 (100%)` three consecutive runs; **human confirmation required before FORCE_LOOP** |

After each chunk, write to `.cursor/docs/project-log.md` and **STOP — request human confirmation** before starting the next chunk:

```markdown
## Chunk [A|B|C] complete — [ISO timestamp]
- Last step: N
- Grade: X/Y
- Commits: [hash list]
- Awaiting human confirmation to proceed
```

---

### Phase 6 Step Table (reordered — node guard before devcontainer)

| Step | Action | Validation gate |
|------|--------|-----------------|
| 41 | Update ci.yml with npm ci, lint, payload build | YAML valid |
| 42 | Expand grader to 52 checks — insert §5.2 snippets | grade shows 52 total |
| 43 | Create vitest.config + structure tests | `npm run msc:test:root` passes |
| 44 | **39a:** `npm run msc:test:root -- --passWithNoTests` then full run | tests pass |
| 45 | Create `scripts/__tests__` for forge, validate-env, health | tests pass |
| 46 | Run `npm run msc:ensure-lockfiles` | all three lockfiles present |
| 47 | Run `npm run bootstrap` | exits 0 |
| 48 | Run dev smoke: `verify:local` | smoke passes |
| 49 | Payload sandbox: `npm ci --prefix examples/nextjs-payload` then `npm run build --prefix examples/nextjs-payload` | exits 0 |
| 50 | `npm run msc:shield:audit` | PASS |
| 51 | `npm run msc:lint` | PASS |
| 52 | `npm run msc:test:all` | all green |
| 53 | **`npm run grade`** | **52/52 (100%), exit 0** — capture stderr on failure |
| 54 | `npm run msc:validate-env` + `npm run verify:mcp` | both exit 0 |
| 55 | **Update README Self-Grade badge to 52/52** (only now — not Step 14) | README badge matches grade |
| 56 | Log final score in `project-log.md` | entry written |
| 57 | Bump `package.json` version to `2.1.0` | version confirmed |

**Step 49 timing note:** Payload CMS full build may take **3–5 minutes** on first run after `npm ci`. If the Cursor agent session times out, run this step **manually** in a terminal, capture the exit code, log the result in `project-log.md`, and continue at Step 50 only after build exits `0`.

---

### §6.1 — Step 31 (layout.tsx) exact replacement instructions

Current `examples/nextjs-minimal/app/layout.tsx` body tag lacks shield wrapper. Execute:

```powershell
Select-String -Pattern 'className=' examples/nextjs-minimal/app/layout.tsx; if (-not $?) { "No className yet — expected" }
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

```powershell
Select-String 'className="msc-viewport-shield msc-shield-root"' examples/nextjs-minimal/app/layout.tsx
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

```powershell
$env:NODE_ENV = "production"; $env:PAYLOAD_SECRET = ""; npm run build --prefix examples/nextjs-payload
Remove-Item Env:NODE_ENV -ErrorAction SilentlyContinue
Remove-Item Env:PAYLOAD_SECRET -ErrorAction SilentlyContinue
# Expected: non-zero exit, error message contains PAYLOAD_SECRET

$env:NODE_ENV = "development"; npm run build --prefix examples/nextjs-payload
Remove-Item Env:NODE_ENV -ErrorAction SilentlyContinue
# Expected: exit 0
```

---

### FORCE_LOOP — Final verification (three consecutive runs)

Three consecutive identical runs confirm there are no side-effect mutations between runs — flaky passes indicate non-deterministic state.

**FORCE_LOOP protocol:**

1. Execute each command block in a **fresh shell context** — do not chain runs with `&&` across FORCE_LOOP iterations.
2. Capture exit code for each command independently.
3. If any command fails, reset the consecutive-success counter to `0`.
4. Only pass when **3 consecutive successes** are recorded in `.cursor/docs/project-log.md` with ISO timestamps.

**Commands to run independently (one fresh shell per FORCE_LOOP run):**

```bash
npm run msc:validate-env
npm run verify:mcp
npm run msc:lint
npm run msc:test:all
npm run grade
npm run msc:shield:audit
```

Each FORCE_LOOP run must execute all six commands above in sequence within one fresh shell. Then start a **new shell** for Run 2. Do not reuse environment state from Run 1 (no cached `NODE_ENV`, no background dev servers).

Log each run manually:

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
