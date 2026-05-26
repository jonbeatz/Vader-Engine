# Vader Protocol — Design Blueprint (Modular)

**Product:** Vader Protocol · **Baseline:** Boilerplate v2.5.0-SOVEREIGN  
**Interface:** `ui/dashboard/` · Port **3010**  
**Last updated:** 2026-05-26

## Developer Portal

This directory contains the engineering specification for the Vader Protocol. Read `v1-Overview.md` first to understand the architecture, then consult specific modules for implementation tasks.

## Supplemental & visual assets

| Folder | Role |
| --- | --- |
| [Updated-Notes/](Updated-Notes/) | Supplemental brainstorming — post-v0 workflow, tooling tables, integration prompts (`v0-Notez1.md`, `v0-Notez2.md`). Not required for first read; synthesize into v5/v6 when stable. |
| `.cursor/design_references/v0-Design-Refrences/` | Visual style inspiration for v0 prompts — attach images from this folder (filenames may change; do not hardcode paths). See [v6-Master-Prompt.md](v6-Master-Prompt.md). |

## Reading Order (for agents and humans)

Read in this sequence for full context:

| Order | Module | Focus |
|-------|--------|-------|
| 1 | [v1-Overview.md](v1-Overview.md) | Synthesis, tokens, look/feel |
| 2 | [v2-Layout-Components.md](v2-Layout-Components.md) | Bento grid, shadcn components, port conflict |
| 3 | [v3-State-Data.md](v3-State-Data.md) | TanStack Query, Zustand, SSE logs |
| 4 | [v4-Operations.md](v4-Operations.md) | Scope, navigation, script surface |
| 5 | [v5-Implementation.md](v5-Implementation.md) | Lean Boundary, roadmap, checklist, §12–§15 handoff |
| 6 | [v6-Master-Prompt.md](v6-Master-Prompt.md) | v0 generation prompt + follow-ups |

**Quick reference:** For v0 generation, jump to [v6-Master-Prompt.md](v6-Master-Prompt.md). For engineering checklist, jump to [v5-Implementation.md](v5-Implementation.md) §10. For post-v0 Cursor integration, jump to §12–§14 in v5.

**Nav (canonical):** Dashboard → Projects → Templates → Sandboxes → Integrity → Operations → Protocols → Settings
