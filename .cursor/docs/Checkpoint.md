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

## Branch: `main` (2026-05-28)

- **Current status:** v2.6.1 documentation polish **complete** · gate **61/61** · **8/8** tests
- **Recent commits:** README finalization · Windows `.env` hint · version bump sync

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

*Last updated: 2026-05-28*
