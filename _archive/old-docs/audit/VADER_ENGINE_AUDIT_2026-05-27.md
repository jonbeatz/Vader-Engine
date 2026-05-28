# Vader Engine Audit Report

## Date: 2026-05-27

**Mode:** Option C — audit + documentation only. **No files were moved, deleted, or archived** in this pass.

**Branch:** `feat/vader-construct-dashboard-v2`  
**Auditor scope:** Full repo per [.cursor/docs/Cleanup-Prompt.md](../Cleanup-Prompt.md)

---

## Executive Summary

Vader Engine v2.5.0 is in **strong operational health**: structural grader **61/61 (100%)**, root Vitest **8/8**, and `start-project:gate` passes with **11 Biome warnings** only (intentional `!important` overrides in `ui/dashboard/app/globals.css` for command-palette centering).

The repository is a **lean orchestration root** plus isolated sandboxes (`examples/*`), a production-style control plane (`ui/dashboard/` on port **3010**), read-only templates, Shield CSS in `ui/`, and extensive agent documentation under `.cursor/`. There is **no urgent cleanup** required to maintain integrity.

Recommended hygiene is **documentation-first** (this report + [PROJECT_CONTEXT.md](../../PROJECT_CONTEXT.md)), then **operator-reviewed** archive moves when you approve the checklist below. **Do not archive `examples/`** — the 61-point grader and CI E2E depend on all three sandboxes.

---

## Integrity Score

| Gate | Result |
|------|--------|
| `npm run grade` | **61/61 (100%)** |
| `npm run msc:test:root` | **8/8** tests · 0 production audit vulnerabilities |
| `npm run start-project:gate` | **PASS** |
| `npm run msc:lint` | **0 errors**, **11 warnings** (`noImportantStyles` in dashboard globals) |

**Failing grader checks:** None.

---

## Project Structure (Summary)

| Layer | Path | Status |
|-------|------|--------|
| Constitution | `TRUTH.md`, `DOCS.md`, `START-HERE.md` | Active |
| Automation | `scripts/` (44+ entries), `scripts/lib/` | Active |
| CLI | `tools/msc-cli/` | Active |
| UI Shield | `ui/msc-shield.css`, satellites | Active |
| Vader Construct | `ui/dashboard/` | Active · port **3010** |
| Sandboxes | `examples/nextjs-minimal`, `payload`, `tailwind` | Active · **3000–3002** |
| Templates | `templates/frontend/portfolio`, `cms/divi-bridge`, `full-stack/*` | Active (read-only) |
| Core bridge | `core/` (TS + PHP) | Active |
| E2E | `e2e/` | Active |
| Design refs | `.cursor/design_references/` | Active (v0 assets) |
| Deploy artifact | `vader-site-deploy/` | Gitignored · regenerate locally |

### package.json map

| Path | Package name |
|------|----------------|
| `package.json` | `vader-engine` |
| `examples/nextjs-minimal/package.json` | (minimal sandbox) |
| `examples/nextjs-payload/package.json` | (Payload sandbox) |
| `examples/nextjs-tailwind/package.json` | (Tailwind Path B) |
| `ui/dashboard/package.json` | `vader-construct-dashboard` |
| `templates/full-stack/vader-site/package.json` | `{{PROJECT_SLUG}}` (template placeholders) |
| `templates/full-stack/task-manager/package.json` | (template) |
| `templates/frontend/portfolio/package.json` | (template) |

Full npm inventory: `npm run inventory` · [.cursor/docs/Code-Jedi.md](../Code-Jedi.md).

---

## Redundancy Report

### Files to archive (operator review — NOT executed)

- [ ] `.cursor/design_references/VaderLabz/` — Mini Next app superseded by `ui/dashboard/`; skill content exists under `.cursor/skills/`
- [ ] `.cursor/design_references/deprecated/` — Single deprecated `page.module.css`
- [ ] `ui/imports/msc-import-1779594898730.{html,css}` — Timestamped ingest artifacts; not used at runtime
- [ ] `.cursor/plans/boilerplate_v240_suggestions.md` — Pre-rebrand plan; superseded by ENGINE_ROADMAP + v2.5 docs

### Deferred / do not archive without explicit approval

- [ ] **`examples/`** — **KEEP** (grader checks all three; E2E uses sandboxes)
- [ ] **`vader-site-deploy/`** — Gitignored; delete locally only if you want disk space; regenerate via `scripts/prep-hostinger-deploy.sh`
- [ ] **v0 mock extras** (`MSC-CRM_Mock_v8–v11.jpg`, duplicate PDFs) — Keep Stage 2 set per [v0-Run-Sheet.md](../v0-Design/v0-Run-Sheet.md) until v0 workflow complete
- [ ] **`ui/dashboard/components/ui/*` (disk-only)** — Gitignored v0 shadcn dump; purge locally or move to `_archive/` when ready; not in Git history

### Unused / optional dependencies

Run manually when ready:

```bash
# Per sandbox (after npm install in each)
npx depcheck --prefix examples/nextjs-minimal
npx depcheck --prefix ui/dashboard
```

Root `package.json` only lists `dotenv` + dev tooling (Biome, Vitest, Playwright, Husky) — intentionally lean.

### Orphan scripts (on disk, not in root package.json)

| Script | Recommendation |
|--------|----------------|
| `scripts/msc-docker-up.mjs` / `msc-docker-down.mjs` | Document as optional Docker helpers |
| `scripts/msc-strip-commit-coauthor.mjs` | Document or archive if unused |
| `scripts/msc-dashboard-route-smoke.mjs` | Wire as `msc:dashboard:smoke` (hygiene) |
| `scripts/prep-hostinger-deploy.sh` | Keep · document in deployment section |

### Duplicate code / protocol notes

| Item | Location | Verdict |
|------|----------|---------|
| Path B Tailwind + shadcn in dashboard | `ui/dashboard/` | **Intentional** per `tailwind-shadcn-bridge.mdc` |
| `:root` hex bridge in dashboard globals | `ui/dashboard/app/globals.css` | **Bridge layer** mapping to `--msc-*` from Shield |
| Overlapping docs | TRUTH, DOCS, Code-Jedi, ENGINE_ROADMAP | **By design** — PROJECT_CONTEXT consolidates onboarding |

---

## Protocol Compliance

| Rule | Status |
|------|--------|
| `msc_` / `msc-` naming in automation | Pass — `scripts/lib/msc-*.mjs`, dashboard `lib/msc-*` |
| Token SSoT `ui/msc-shield.css` | Pass |
| PHP `defined('ABSPATH') \|\| exit` | Pass — sampled `core/msc-assets.php` |
| Hydration (relative time) | Pass — `activity-feed.tsx`, `support-tickets.tsx` use mounted pattern |
| Zero-leak env | Pass — `msc:validate-env` in gate |
| No invented npm scripts in UI | Pass — allowlist in `msc-script-allowlist.mjs` |

**Violations requiring code change:** None blocking integrity score.

---

## Performance & Workflow Notes

- Root `npm run build` compiles **only** `examples/nextjs-minimal` (Lean Boundary).
- `ui/dashboard/next.config.mjs` sets `turbopack.root` to repo root for Shield CSS imports.
- Env hydration: `scripts/lib/msc-load-env.mjs` — `.env.local` then `.env.example` (no override on second pass).
- ENGINE_ROADMAP backlog (not cleanup blockers): SSE activity feed wiring, dashboard Playwright E2E, env CRUD, grade history.

---

## Archive Workflow (for operator — run only after approval)

```bash
# From repo root — example tier-1 moves (review checklist first)
mkdir -p _archive/design-references _archive/plans _archive/ui-imports
git mv .cursor/design_references/VaderLabz _archive/design-references/VaderLabz
git mv .cursor/design_references/deprecated _archive/design-references/deprecated
git mv ui/imports/msc-import-1779594898730.html _archive/ui-imports/
git mv ui/imports/msc-import-1779594898730.css _archive/ui-imports/
git mv .cursor/plans/boilerplate_v240_suggestions.md _archive/plans/
# Re-run: npm run start-project:gate
```

Add `_archive/README.md` explaining restore via `git mv` back to original paths.

---

## Deliverable 3: Action Plan

### Immediate (completed in Option C pass)

- [x] Audit report (this file)
- [x] [PROJECT_CONTEXT.md](../../PROJECT_CONTEXT.md)
- [x] [DOCS.md](../../DOCS.md) index row
- [x] Track [Cleanup-Prompt.md](../Cleanup-Prompt.md) in Git

### Pending operator decision (no auto-execution)

- [x] **2026-05-27 Phase 3A:** Operator deferred **all** Tier 1 and Tier 2 archive items — no `git mv` executed
- [ ] Re-run approval when ready to archive specific rows
- [ ] Optional: local `rm -rf vader-site-deploy/` or disk purge of gitignored dashboard shadcn dump

### Short-term (this week)

- [ ] `npm run msc:dashboard:smoke` after `msc:dev:dashboard` (wired in package.json)
- [ ] Optional grader check #62 for `ui/dashboard/README.md`
- [ ] Depcheck per sandbox

### Long-term (next sprint)

- [ ] ENGINE_ROADMAP Phase 3 — dashboard E2E, SSE logs UI, env manager
- [ ] Trim v0 design asset duplicates after Stage 2 complete
