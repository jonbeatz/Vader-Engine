# Checkpoint (Vader Engine v2.6.1)

Authoritative build and branch history for Vader Engine releases.

---

## Active release: v2.6.1

- **Status:** SHIPPED on `main`
- **Integrity:** **61/61** grade · root Vitest **8/8**
- **Tags:** `v2.1.0`, `v2.2.0`, `v2.3.0`, `v2.4.0`, `v2.5.0`, `v2.6.0`, `v2.6.1`
- **Release doc:** `docs/releases/RELEASE_v2.6.1.md`
- **GitHub release:** [v2.6.1 — Documentation Polish](https://github.com/jonbeatz/Vader-Engine/releases/tag/v2.6.1)

---

## Branch: `Vader-Engine-Dev-v2` (2026-05-29) — **active**

- **Current status:** Portable `custom-scriptz` modules (google-api-proxy + backup-system) with production `install.ps1` · restore checklist docs · local `ngrok.exe` in module pack
- **Restore point:** `Vader-Engine-Dev-v1` @ `c993472` (unchanged on remote)
- **Recent:** `c993472` restore docs · `c8a422f` initial custom-scriptz scaffold (prior push)
- **LiteLLM:** `npm run msc:google-api:start` · module install: `.cursor/custom-scriptz/google-api-proxy/install.ps1`

## Branch: `Vader-Engine-Dev-v1` (2026-05-29) — **frozen**

- **Status:** Restore point only — do not delete; use `git checkout Vader-Engine-Dev-v1` to return
- **Tip:** `c993472` + G: backup `Vader-Engine-v1-s`

---

## Branch: `main` (2026-05-28)

- **Current status:** Session closeout complete · v2.6.1 on `main` · gate **61/61** · **8/8** tests · LiteLLM **offline**
- **Recent commits:** `a23dfdb` doc sync · `5992502` version bump · README polish chain

### [2026-05-28] — v2.6.1 documentation polish

- **Status:** SHIPPED
- **Changes:** README production polish, Windows `.env` copy hint, version bump to **2.6.1**
- **Verified:** `start-project:gate` PASS · GitHub release `v2.6.1`

### [2026-05-28] — PR #14 merged (workflow + doc cleanup)

- **Status:** MERGED → `main` (`563d2f0`) · feature branch deleted
- **Adds:** Nova-pattern agent docs, `Update-Project.md`, `_archive/` consolidation
- **Verified:** `start-project:gate` PASS

### [2026-05-28] — LiteLLM + ngrok (PR #13)

- **Status:** MERGED → `main` (`1f5c9a7`)
- **Verified:** `msc:litellm:test:ngrok` PASS · gate PASS

### [2026-05-27] — v2.6.0 docs alignment

- **Status:** COMMITTED
- **Summary:** Global doc sweep to v2.6.0 baseline
- **Release doc:** `docs/releases/RELEASE_v2.6.0.md`

---

## Milestone timeline

| Version | Focus |
|---------|--------|
| **v2.6.1** | Documentation polish, README production release, version sync |
| **v2.6.0** | Lean multi-runtime boilerplate, triple Next sandboxes, 61-point grader, MCP portability |
| **v2.5.x** | Shield UI, scaffolding CLI, template layer |
| **v2.1–2.4** | Payload example, WordPress bridge, grade expansion |

---

## Release strategy

- **Verify before tag:** `npm run start-project:gate`
- **E2E (optional):** `npm run msc:e2e`
- **Changelog:** `CHANGELOG.md` + `docs/releases/RELEASE_vX.Y.Z.md`
- **Session handoff:** `.cursor/docs/project-log.md`

---

*Last updated: 2026-05-29 (update project)*
