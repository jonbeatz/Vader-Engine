---
SESSION: Provide this file + 00-MASTER-INDEX.md to Cursor.
CHUNK A — Steps 0–20. After completing Step 20, STOP and report 
to human operator before proceeding. Do not begin Chunk B without 
explicit human confirmation.
Expected output: Steps 0–20 committed, grade at baseline or above.
---

**Important:** Respect all guardrails from 00-MASTER-INDEX.md (Protected Zones, NO REFACTORING, Mutation Budget, Lean Boundary Rule).

# 📌 Phase 6: Sequential Step-by-Step AI Agent Action Runbook

> **# EXECUTION ORDER IS MANDATORY**
>
> Do not reorder steps for efficiency. Do not parallelize Phase 6 steps. Execute one step, validate, commit, then advance.

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
| **0** | **Pre-flight snapshot:** `git rev-parse HEAD > .cursor/pre-upgrade-commit.txt`, `npm run grade > .cursor/pre-grade-baseline.txt`, verify working tree clean (`git status --porcelain`) | working tree clean, baseline captured |
| 1 | Baseline: `node -v`, `npm run grade`, `npm run msc:validate-env` | Record grade in `project-log.md` |
| 2 | Create `scripts/lib/msc-node-version-guard.mjs`; import in `quickstart.mjs`, `msc-grade-boilerplate.mjs`, `health.mjs` | `node scripts/lib/msc-node-version-guard.mjs` exits 0 |
| 3 | **4a — Verify guard in isolation:** `node scripts/lib/msc-node-version-guard.mjs` | Must exit 0 before proceeding |
| 4 | Fix `.devcontainer/devcontainer.json` to Node 20 image | `Select-String "node:20" .devcontainer/devcontainer.json` |
| 5 | Pin `.nvmrc` to `20.19.1` | `Get-Content .nvmrc` prints `20.19.1` |
| 6 | Replace PHP main with `core/index.mjs`; set `"main": "core/index.mjs"` | `node -e "import('./core/index.mjs').then(m=>console.log(m.MSC_VERSION))"` |
| 7 | Ensure `core/core-Divi-Scriptz.js` exists at canonical path; remove camelCase variants | `if (Test-Path "core/core-Divi-Scriptz.js") { "OK" } else { exit 1 }` |
| 8 | Rename `kill-ports.mjs` → `msc-kill-all-dev-ports.mjs`; update `package.json` | `npm run msc:kill-dev-port` exits 0 (ports free OK) |
| 9 | Harden `msc-forge.mjs` regex guards | protected path mutation blocked |
| 10 | Extend `validate-env.mjs` with `REQUIRED_ENV_KEYS` + `looksLikeRealSecret` regex | `npm run msc:validate-env` exits 0 |
| 11 | Add `copyPayloadEnvTemplate()` to `quickstart.mjs` | payload `.env.local` created on quickstart |
| 12 | Extend `msc-verify-mcp.mjs` path + JSON output | `npm run verify:mcp` exits 0 |
| 13 | Expand `health.mjs` JSON diagnostics | `npm run msc:health -- --json` returns ports array |
| 14 | Add packageManager, engines, MIT license + LICENSE file; run `npm install` | `npm pkg get license` prints `"MIT"` |
| 15 | Remove `.prettierrc*` / `.prettierignore` if present | `if (-not (Test-Path ".prettierrc") -and -not (Test-Path ".prettierignore")) { "OK: Prettier removed" } else { "HALT: Prettier files still present" }` |
| 16 | Install Biome; add `msc:lint` scripts; verify `npm run msc:lint` | lint exits 0 |
| 17 | Configure lint-staged (after Biome verified) | `npx lint-staged --help` available |
| 18 | Update `.husky/pre-commit` | contains lint-staged + validate-env + verify:mcp |
| 19 | Create `.husky/pre-push` | file exists with grade + msc:test:root |
| 20 | Create `.vscode/settings.json` + extensions.json | files exist |
