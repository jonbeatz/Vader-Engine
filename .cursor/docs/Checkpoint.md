# Checkpoint (Vader Engine v2.7.0)

Authoritative build and branch history for Vader Engine releases.

---

## Active release: v2.7.0 (branch milestone)

- **Status:** **READY on `Vader-Engine-Dev-v2`** — merge to `main` pending operator
- **Integrity:** **61/61** grade · root Vitest **8/8**
- **Tags (shipped):** `v2.1.0`, `v2.2.0`, `v2.3.0`, `v2.4.0`, `v2.5.0`, `v2.6.0`, `v2.6.1`
- **Next tag:** `v2.7.0` (portable modules + backup system)
- **Release doc:** `docs/releases/RELEASE_v2.7.0.md`
- **Head:** `96c10a6` — BackUp-Notez local timestamp + footer · README v2.7.0 polish

---

## Branch: `Vader-Engine-Dev-v2` (2026-05-29) — **active · v2.7.0**

- **Current status:** Portable `custom-scriptz` modules (google-api-proxy + backup-system v1.2.0) · interactive backup + `BackUp-Notez.md` · 8-step agent backup ritual · `Prompt-Module.md` canonical
- **Restore point:** `Vader-Engine-Dev-v1` @ `c993472` (frozen on remote)
- **G: backup:** `Vader-Engine-v1-w` @ `96c10a6` (latest; includes BackUp-Notez + `.env.local`) · prior `v1-v` @ `5f505b9`
- **Recent:** `96c10a6` BackUp-Notez fix · `6db44f7` README polish · `ca13250` v2.7.0 bump · `c4ceac7` backup ritual

## Branch: `Vader-Engine-Dev-v1` (2026-05-29) — **frozen**

- **Status:** Restore point only — do not delete; use `git checkout Vader-Engine-Dev-v1` to return
- **Tip:** `c993472` + G: backup `Vader-Engine-v1-s`

---

## Branch: `main` (2026-05-28)

- **Current status:** v2.6.1 shipped · gate **61/61** · **8/8** tests
- **Pending:** Merge `Vader-Engine-Dev-v2` for v2.7.0 baseline

### [2026-05-28] — v2.6.1 documentation polish

- **Status:** SHIPPED on `main`
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
| **v2.7.0** | Portable modules, interactive backup, BackUp-Notez, backup-system v1.2.0 |
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

*Last updated: 2026-05-29 (update project · v2.7.0 milestone)*
