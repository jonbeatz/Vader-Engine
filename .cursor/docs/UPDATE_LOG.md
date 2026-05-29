# Project Update & Fix Log (Vader Engine)

Running record of significant fixes, root causes, and verification. Session summaries also live in **[project-log.md](./project-log.md)**.

---

## [2026-05-29] — LiteLLM reliable start + docs commit prep

### Changed

- **`msc-litellm-start.mjs`** — LiteLLM health wait → ngrok → local/ngrok **200** verification; prints **READY**
- **`msc-litellm-env.mjs`** — `msc_syncLitellmMasterKey()`, `msc_probeLitellmModels()`, ngrok skip header
- **`package.json`** — `msc:google-api:start` script alias
- **Docs** — Cheat Sheet, REPAIR_PROTOCOLS (401 fix), CHANGELOG, DOCS index, `.cursor/README.md`

---

## [2026-05-29] — `.cursor` folder hygiene (env path + design refs)

### Changed

- **`ENV-Files/` → `env/`** — master contracts, vault output, README; optional snapshots under `env/backups/1–6`
- **Vault script** — writes only `.cursor/env/Personal-Secrets-Vault.md` (dropped Credentials duplicate)
- **v0 mocks** — `.cursor/design_references/` → `media/design-references/` (gitignored binaries)
- **`.cursor/README.md`** — folder index for operators
- **Docs / gitignore / biome / lint-staged** — paths synced to `env/` and `media/design-references/`

---

## [2026-05-29] — ENV-Files personal secrets vault & doc sync

### Added

- **`.cursor/ENV-Files/README.md`** — index for master env contracts and generated vault files
- **`scripts/msc-build-personal-secrets-vault.mjs`** — builds `Personal-Secrets-Vault.md` + `Personal-Secrets-Vault-Credentials.md` from `.env.local`, project/global MCP JSON, LiteLLM/GCP, and numbered backup folders
- **Master references:** `master.env.example`, `master.env.local.example`, paired `.md` views

### Changed

- **Vault layout:** collapsible `<details>` sections; ENV-Files folders nested under scan manifest; MCP section includes project `mcp.json`, `mcp-blueprint.json`, `~/.cursor/mcp.json`, and runtime `.env.local` keys
- **Docs:** `START-HERE.md`, `DOCS.md`, `Vader-Credentials.md` cross-links
- **`.gitignore`:** generated vault markdown files

### Security

- Vault outputs remain **gitignored** — store on encrypted backup drive only; never commit or paste into chat.

---

## [2026-05-29] — LiteLLM start hardening & gemini-3.5-flash alias

### Problem
- `start google-api` would sometimes fail if stale ngrok processes or port 4000 processes remained listening, causing conflicts.
- Vertex Gemini 3.5 Flash alias `vader-3.5-flash` was missing from the configuration.

### Solution
- Updated `scripts/msc-litellm-stop.mjs` and added helper `msc_killNgrokProcesses()` to terminate orphaned/stale ngrok instances.
- Modified `scripts/msc-litellm-start.mjs` to auto-clean port 4000 and stop old tunnels before Starting.
- Registered `vader-3.5-flash` (`vertex_ai/gemini-3.5-flash`) on `config/litellm_config.yaml` and `google-api/litellm_config.yaml`.
- Synced shortcuts (`test 3.5 flash`) in `.cursor/rules/global.mdc` and aligned `.env.local` keys.

### Verification
- Tested start command, local model inspection, and POST completions through ngrok.
- Passed: `msc:litellm:test:ngrok` successfully resolved all four models.

---

## [2026-05-28] — Full documentation sync to v2.6.1

### Changes

- **Version headers:** HOW-TO, Code-Jedi, MCPs, Project-Bible, REPAIR_PROTOCOLS, system-architecture, ARCHITECTURE, SECURITY, TROUBLESHOOTING
- **Rules & prompts:** `.cursor/rules/README.md`, Start/End-Project, Update-Docs templates
- **Operator docs:** Cheat Sheet branch table, ENGINE_ROADMAP → `main`, START-HERE checklist (four templates)
- **Deprecated:** `.cursorrules` pointer updated to v2.6.1

### Verification

- `npm run start-project:gate` — 61/61 · 8/8 · lint clean

---

## [2026-05-28] — v2.6.1 version bump & documentation polish

### Changes

- **Version:** `package.json` → **2.6.1** · README badge and status table synced
- **Docs:** `CHANGELOG.md`, `PROJECT_CONTEXT.md`, `Checkpoint.md`, `RELEASE_v2.6.1.md`
- **README:** Windows `.env` copy hint · agent ritual pointer · production polish
- **GitHub release:** [v2.6.1](https://github.com/jonbeatz/Vader-Engine/releases/tag/v2.6.1)

### Verification

- `npm run start-project:gate` — 61/61 · 8/8 · lint clean

---

## [2026-05-28] — LiteLLM + ngrok integration (Phase 4)

### Changes

- **Scripts:** `scripts/msc-litellm-{preflight,start,stop,status,verify,test-ngrok,install-deps}.mjs`
- **Libs:** `scripts/lib/msc-litellm-env.mjs` (strips Payload `DATABASE_URL`), `scripts/lib/msc-ngrok-utils.mjs`
- **Config:** `config/litellm_config.yaml` — `vader-3-flash` alias, database-less `general_settings`
- **Docs:** `local-ai-proxy-setup.md`, Cheat Sheet, Operator Card, `Start-Project.md`, `global.mdc` shortcuts
- **PR:** #13 merged to `main`

### Root issues

| Issue | Fix |
|-------|-----|
| Cursor Provider Error / resource not found | Start proxy + correct model alias + ngrok HTTPS |
| Missing `google-api/*.ps1` | Node scripts replace PS1 wrappers |
| Prisma / PostgreSQL URL from Payload env | Strip `DATABASE_URL` unless `MSC_LITELLM_DATABASE_URL` |
| Windows background spawn failures | Foreground LiteLLM with `stdio: inherit` |
| Biome gate on gitignored GCP JSON | Exclude `config/gcp-service-account.json` in `biome.json` |

### Verification

- `npm run msc:litellm:test:ngrok` — PASS (local + remote `/v1/models`)
- `npm run start-project:gate` — 61/61, lint, tests

---

## [2026-05-28] — Session workflow polish

### Changes

- **Start/End prompts:** Clean acknowledgment blocks; LiteLLM teardown in End Project
- **Backup:** Conversational `npm run msc:backup` (standard/full, one question at a time)
- **Natural language:** `start project`, `end project`, `start google-api`, `backup project`, `update docs`

### Verification

- Gate PASS · ports cleared on closeout

---

## [2026-05-27] — v2.6.0 global docs alignment

### Changes

- Root + `.cursor` docs synced to **v2.6.0** baseline
- Release note: `docs/releases/RELEASE_v2.6.0.md`
- Tags: `v2.1.0` … `v2.6.0`

### Verification

- `npm run grade` — 61/61

---

## [2026-05] — Phase 4 polish branch (`feat/phase-4-polish`)

### Highlights

- Operator Card + Cheat Sheet
- LiteLLM runbook consolidation
- Workflow docs upgrade (this Nova-pattern doc set)

### Verification

- 61/61 integrity gate maintained
- 8/8 root tests

---

## [2026-05-28] — Documentation cleanup + `update project` workflow

### Problem

- Doc sprawl across root, `.cursor/docs/`, archived Nova reference, v0-Design, and duplicate rules
- No single command to sync tracking files (UPDATE_LOG, project-log, Checkpoint)

### Solution

- Archived obsolete content to `_archive/` (v0-Design, BOILERPLATE-IMPROVEMENT, old plans, audit, duplicate rules)
- Created Nova-pattern workflow docs: `TRUTH.md`, `Project-Bible.md`, `REPAIR_PROTOCOLS.md`, `MCPs.md`, `Checkpoint.md`, `UPDATE_LOG.md`
- Added `.cursor/prompts/Update-Project.md` + `update project` shortcut in `global.mdc`
- Wired `end project` §2.5 to auto-run tracking sync
- Refreshed Cheat Sheet + Operator Card with **What You Have Now** summary table
- Rewrote `DOCS.md` as lean index

### Prevention

- One active doc tree under `.cursor/docs/`; archive never delete
- Use `update project` after milestones; `update docs` for version/README sweeps

### Verification

- `npm run start-project:gate` — 61/61, 8/8, LiteLLM online
- Standard backup `Vader-Engine-v1-n` on G: drive

---

```markdown
## [YYYY-MM-DD] — Short title

### Changes
- …

### Root cause
- …

### Verification
- …
```

**Signature:** Vader Engine v2.6.1
