# Project Update & Fix Log (Vader Engine)

Running record of significant fixes, root causes, and verification. Session summaries also live in **[project-log.md](./project-log.md)**.

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
