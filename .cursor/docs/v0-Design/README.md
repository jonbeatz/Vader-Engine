# Vader Protocol — Design Blueprint (Modular)

**Product:** Vader Protocol · **Baseline:** Boilerplate v2.5.0-SOVEREIGN  
**Interface:** `ui/dashboard/` · Port **3010**  
**Last updated:** 2026-05-26

## Developer Portal

This directory contains the engineering specification for the Vader Protocol. Read `v1-Overview.md` first to understand the architecture, then consult specific modules for implementation tasks.

## Reading Order (for agents and humans)

Read in this sequence for full context:

| Order | Module | Focus |
|-------|--------|-------|
| 1 | `v1-Overview.md` | Synthesis, tokens, look/feel |
| 2 | `v2-Layout-Components.md` | Bento grid, shadcn components, port conflict |
| 3 | `v3-State-Data.md` | TanStack Query, Zustand, SSE logs |
| 4 | `v4-Operations.md` | Scope, navigation, script surface |
| 5 | `v5-Implementation.md` | Lean Boundary, roadmap, checklist |
| 6 | `v6-Master-Prompt.md` | v0 generation prompt + follow-ups |

**Quick reference:** For v0 generation, jump to `v6-Master-Prompt.md`. For engineering checklist, jump to `v5-Implementation.md` §10.

**Nav (canonical):** Dashboard → Projects → Templates → Sandboxes → Integrity → Operations → Protocols → Settings
