# Vader Protocol — v0 Workflow Index

**Product:** Vader Protocol  
**Engine:** Vader Engine v2.5.0-Engine  
**Target app:** `ui/dashboard/` on port `3010`

## Purpose

This folder is the canonical workflow for generating, validating, and integrating the v0 UI/UX prototype into the repository with minimal drift.

## Source files to use first

1. **[v0-Run-Sheet.md](v0-Run-Sheet.md)** — one-page operator checklist (Stages 1–3 + gates)
2. [Prompt-v0.md](Prompt-v0.md) — same prompts in fenced blocks (alternate copy source)
3. [v6-Master-Prompt.md](v6-Master-Prompt.md) — workflow rules + acceptance gates
4. [v5-Implementation.md](v5-Implementation.md) — post-v0 integration and hardening
5. [ENGINE_ROADMAP.md](../../plans/ENGINE_ROADMAP.md) — master wiring roadmap (Phases 1–3)

## Reference model (v1–v6)

| Module | Purpose |
| --- | --- |
| [v1-Overview.md](v1-Overview.md) | Product definition, quality bar, design guardrails |
| [v2-Layout-Components.md](v2-Layout-Components.md) | App shell, IA, component contract |
| [v3-State-Data.md](v3-State-Data.md) | Data model, API contracts, state boundaries |
| [v4-Operations.md](v4-Operations.md) | Script mappings, route responsibilities, operations UX |
| [v5-Implementation.md](v5-Implementation.md) | Integration sequence + validation checklist |
| [v6-Master-Prompt.md](v6-Master-Prompt.md) | Master v0 prompts (Stage 1/2/3) |

## Inputs from new notes

`Updated-Notes/v0-UI-Fix-v1.md` and `Updated-Notes/v0-UI-Fix-v2.md` are now folded into this workflow:

- stricter anti-CRM constraints
- staged generation (structure first, style second)
- mandatory test id contract
- explicit acceptance checklist
- improved handoff readiness

## Canonical navigation IA

Dashboard → Projects → Templates → Sandboxes → Integrity → Operations → Protocols → Settings

## Attachments policy for v0

- **Stage 1:** no images, prompt-only generation
- **Stage 2:** attach reference images and enforce style-only pass
- **Stage 3:** polish/refactor without structural changes
