---
USAGE: Provide 00-MASTER-INDEX.md + one phase file per Cursor session.
Never provide the full set at once. See Recommended Session Strategy 
table for the correct pairing.
---

# 🪐 Gold Master Blueprint: Boilerplate-v2 Technical Optimization Runbook (Final Update)

**Target:** `Boilerplate-v1` → v2.1.0+ (Jedi-Master baseline)  
**Baseline score:** 38/38 (`npm run grade`) · structural audit at 100%  
**Expanded target:** 52/52 after Phase 5 completion  
**Execution model:** An AI agent runs phases sequentially; each step ends with an explicit validation gate before advancing.  
**Document status:** Gold Master — merged from `BOILERPLATE-IMPROVEMENTS-FINAL.md` + `BOILERPLATE-IMPROVEMENTS-Feedback-2.md`

---

## 🚀 EXECUTION INSTRUCTIONS FOR CURSOR / AI AGENT

1. Read this entire document first before modifying any file.
2. Follow **exactly** the phases in order: Phase 1 → 2 → 3 → 4 → 5 → Phase 6 (Chunks A → B → C).
3. Execute Phase 6 **one chunk at a time**. After each chunk completes, **STOP and ask the human operator for confirmation** before proceeding to the next chunk.
4. Never skip validation gates. Every step ends with `npm run grade || exit 1` or the step-specific gate listed in the Phase 6 table.
5. If in doubt → invoke **STOP_AND_ASK** (see below).
6. Begin with: `git checkout -b upgrade/v2.1.0` on a clean working tree.
7. **Do not paste this entire document into one Cursor session.** Provide only the relevant phase section + repo context + expected outputs per session.
8. **This is AI-assisted infrastructure migration — not autonomous fire-and-forget automation.** A human must validate each chunk and approve continuation. Do not run unattended.

### Execution Order Summary

| Order | Action |
|-------|--------|
| 1 | Backup (human operator) |
| 2 | Branch: `upgrade/v2.1.0` |
| 3 | Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 (sequential, tag on completion) |
| 4 | Phase 6 Chunk A (Steps 0–20) → commit → **human confirmation** |
| 5 | Phase 6 Chunk B (Steps 21–40) → commit → **human confirmation** |
| 6 | Phase 6 Chunk C (Steps 41–57) → commit → **human confirmation** |
| 7 | FORCE_LOOP three times (fresh shell each run) |
| 8 | Post-verification (`msc:onboard` + dev servers) |

### Recommended Session Strategy (Fresh Context Per Phase)

| Session | Provide to Cursor | Expected output |
|---------|-------------------|-----------------|
| Session 1 | Phase 1 section only | Grade baseline recorded, audits pass |
| Session 2 | Phase 2 section only | Biome, Husky, `.mdc` migration complete |
| Session 3 | Phase 3 section only | Shield audit passes |
| Session 4 | Phase 4 section only | Payload sandbox builds |
| Session 5 | Phase 5 section only | Grader at 52/52 |
| Session 6 | Phase 6 Chunk A | Steps 0–20 committed |
| Session 7 | Phase 6 Chunk B | Steps 21–40 committed |
| Session 8 | Phase 6 Chunk C + FORCE_LOOP | 52/52 three consecutive runs |

Optional modular split (P2 — for extreme token density): extract each phase into `.cursor/docs/BOILERPLATE-IMPROVEMENT/upgrade-runs/phase-{1-6}.md` and execute one file per session. The content in this document remains the authoritative SSoT.

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
node -v                         # Must print v20.x.x or v24.x.x
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
- Mutation budget exceeded for a single step (see **Mutation Budget** below)
- Any step attempts an architectural rewrite not listed in this runbook
- Payload build (Step 49) exceeds agent timeout — escalate to human for manual execution
- `core/core-Divi-Scriptz.js` missing after Step 7 remediation attempts

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

### Phase Freeze Tags (mandatory after each phase)

After each phase passes its exit gate, tag the repository:

```bash
git tag phase-1-pass   # After Phase 1 exit gate
git tag phase-2-pass   # After Phase 2 exit gate
git tag phase-3-pass   # After Phase 3 exit gate
git tag phase-4-pass   # After Phase 4 exit gate
git tag phase-5-pass   # After Phase 5 exit gate (52/52)
git tag phase-6-chunk-a-pass
git tag phase-6-chunk-b-pass
git tag phase-6-complete   # After FORCE_LOOP passes
```

Rollback to last known-good phase: `git checkout phase-N-pass`.

---

## Mutation Budget (per Phase 6 step)

Unless a step explicitly authorizes broader changes, halt and invoke **STOP_AND_ASK** when any single step exceeds:

| Limit | Threshold |
|-------|-----------|
| Modified files | 20 |
| New directories | 3 |
| Lines changed (LOC) | 500 |

Log budget usage in `.cursor/docs/project-log.md` after each step commit.

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

```powershell
node -e 'import fs from "node:fs"; const p=JSON.parse(fs.readFileSync("./package.json","utf8")); const bad=[...Object.keys(p.dependencies||{}),...Object.keys(p.devDependencies||{})].filter(k=>/^(next|payload|@payloadcms)/.test(k)); if(bad.length){console.error("LEAN BOUNDARY VIOLATION:",bad);process.exit(1)} console.log("Lean boundary OK")'
```

---

### Windows PowerShell Command Translation (Cursor terminal)

| Bash pattern | PowerShell equivalent |
|-------------|----------------------|
| `test -f <path>` | `Test-Path "<path>"` |
| `test ! -f <path>` | `-not (Test-Path "<path>")` |
| `test ! -d <path>` | `-not (Test-Path "<path>")` |
| `rm -f <file>` | `Remove-Item "<file>" -Force -ErrorAction SilentlyContinue` |
| `mkdir -p <dir>` | `New-Item -ItemType Directory -Force -Path "<dir>"` |
| `grep -q "pattern" <file>` | `Select-String "pattern" <file>` |
| `cat <file>` | `Get-Content <file>` |
| `KEY=value command` | `$env:KEY = "value"; command` |
| `cmd1 \| grep -q "x" && echo "OK"` | `if (cmd1 \| Select-String "x") { "OK" }` |
| `echo "text" > file` | `"text" \| Set-Content "file"` |
| `cd dir && npm run x` | `npm run x --prefix dir` |

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
| Feedback-2 | Execution instructions, phase freeze tags, mutation budget, grader self-tests, fresh-shell FORCE_LOOP, Step 37/49 mitigations, sandbox Prettier cleanup, session strategy |

---

## Appendix D: Operational Cautions (from Feedback-2)

| Caution | Mitigation |
|---------|------------|
| Document density causes context loss | Execute one phase/chunk per Cursor session; never paste full doc |
| Grader is constitutional dependency | Run `msc:test:grader` after every grader edit (§5.7) |
| Large mutation surface in Phase 6 | Human confirmation between chunks; mutation budget per step |
| Not fire-and-forget automation | Human validates each chunk; STOP_AND_ASK on ambiguity |
| `core/core-Divi-Scriptz.js` must exist before Step 7 | Phase 1 §1.2b creates stub if missing |
| Script implementations are non-trivial | Each script section includes validation command — do not leave stubs |

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

**Document lineage:** `BOILERPLATE-IMPROVEMENTS.md` → `BOILERPLATE-IMPROVEMENTS-FINAL.md` → **`BOILERPLATE-FINAL-Update.md`** (this file, incorporating `BOILERPLATE-IMPROVEMENTS-Feedback-2.md`).

