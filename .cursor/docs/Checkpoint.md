# Checkpoint (Vader Engine v2.6.0)

Authoritative build and branch history for Vader Engine releases.

---

## Active release: v2.6.0

- **Status:** SHIPPED on `main`
- **Integrity:** **61/61** grade · root Vitest **8/8**
- **Tags:** `v2.1.0`, `v2.2.0`, `v2.3.0`, `v2.4.0`, `v2.5.0`, `v2.6.0`
- **Release doc:** `docs/releases/RELEASE_v2.6.0.md`

---

## Branch: `feat/phase-4-polish`

- **Current status (2026-05-28):** Doc cleanup + workflow upgrade **complete** (uncommitted); gate **61/61** · LiteLLM **online**
- **Ahead of main:** `cf2a0c1` (biome GCP-key exclude) + working-tree doc reorg

### [2026-05-28] — Documentation cleanup + `update project` (checkpoint)

- **Status:** COMPLETE (pending commit)
- **Adds:** `Update-Project.md`, `update project` shortcut, End-Project §2.5 auto-sync
- **Archives:** v0-Design → `_archive/v0-design-docs/`; BOILERPLATE → `_archive/boilerplate-improvement/`; Nova docs → `_archive/old-workflow-reference/`
- **Operator docs:** Cheat Sheet + Operator Card — **What You Have Now** table
- **Verified:** `start-project:gate` PASS

### [2026-05-28] — Workflow doc upgrade (Nova pattern)

- **Status:** COMPLETE (merged into cleanup checkpoint above)
- **Adds:** `.cursor/docs/{TRUTH,Project-Bible,REPAIR_PROTOCOLS,UPDATE_LOG,MCPs,Checkpoint}.md`
- **Rules:** `start-project-ritual.mdc`, `vader-repair-ast.mdc`

### [2026-05-28] — LiteLLM + ngrok (PR #13)

- **Status:** MERGED → `main` (`1f5c9a7`)
- **Branch follow-up:** biome GCP-key exclude (`cf2a0c1` on feature branch)
- **Files (high level):**
  - `scripts/msc-litellm-*.mjs`, `scripts/lib/msc-litellm-env.mjs`, `scripts/lib/msc-ngrok-utils.mjs`
  - `config/litellm_config.yaml`, `.env.example`, `package.json` scripts
  - `.cursor/docs/local-ai-proxy-setup.md`, operator docs, prompts
- **Verified:** `msc:litellm:test:ngrok` PASS · gate PASS

### [2026-05-27] — v2.6.0 docs alignment

- **Status:** COMMITTED
- **Summary:** Global doc sweep to v2.6.0 baseline
- **Verified:** `npm run grade` 61/61

---

## Milestone timeline

| Version | Focus |
|---------|--------|
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

*Last updated: 2026-05-28 15:00*
