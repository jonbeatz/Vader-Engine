---
SESSION: Provide this file + 00-MASTER-INDEX.md to Cursor.
CHUNK B — Steps 21–40. Requires human confirmation that Chunk A 
completed successfully before starting. After Step 40, STOP and 
report to human operator. Do not begin Chunk C without explicit 
human confirmation.
Expected output: Steps 21–40 committed, grade ≥ 45/52.
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
| 21 | Migrate `.cursorrules` → `.cursor/rules/global.mdc` (globs: `"*"`, alwaysApply: true, blank line after `---`) | `Select-String "alwaysApply" .cursor/rules/global.mdc` |
| 22 | Replace root `.cursorrules` with deprecation notice | deprecation header present |
| 23 | Update TRUTH.md doc hierarchy | `Select-String "global.mdc" TRUTH.md` |
| 24 | Create `scripts/msc-onboarding.mjs` | `npm run msc:onboard -- --help` or dry run |
| 25 | Add doc map + TROUBLESHOOTING + ARCHITECTURE | files exist |
| 26 | Create CHANGELOG, CONTRIBUTING, config/README | files exist |
| 27 | Create `scripts/msc-shield-audit.mjs` | `npm run msc:shield:audit` PASS |
| 28 | Create `tests/fixtures/sample-input.html` + `scripts/msc-ingest.mjs` | ingest fixture produces `msc-import-*` |
| 29 | Harden `core/msc-assets.php` ABSPATH + msc_* names | PHP guard present |
| 30 | Audit all `core/*.php` for ABSPATH guard | all core PHP guarded |
| 31 | **Update nextjs-minimal layout shield wrapper** — see §6.1 below | layout.tsx grep passes |
| 32 | Create `.cursor/blueprints/` + README + smtp stub | directory exists |
| 33 | Create `scripts/msc-new-component.mjs` | scaffolds msc-button |
| 34 | Payload README pin + package.json _comment | 15.4.11 documented |
| 35 | Tighten `payload.config.ts` secret guard — see §6.2 below | production build fails without secret |
| 36 | Create payload `database/.gitkeep` | dir tracked |
| 37 | **`npm ci --prefix examples/nextjs-payload`** | node_modules installed |
| 38 | Create `scripts/msc-mock-media.mjs` | mock files created |
| 39 | Create docker-compose + msc-docker scripts (opt-in) | `docker compose config` valid if Docker installed |
| 40 | Add commented Postgres keys to `.env.example` | commented keys present |

**Step 37 lockfile fallback:** If `npm ci` fails with `ENOENT package-lock.json` or missing lockfile error, run Step 46 (`npm run msc:ensure-lockfiles`) immediately, commit the generated lockfiles, then retry Step 37. Do not proceed to Step 38 until `npm ci` succeeds.
