# Vader Protocol — Master v0 Workflow (v1-v6)

**Module:** `v6-Master-Prompt.md`  
**Priority:** This file is the canonical runbook for v0 generation.

## Branding hierarchy

- Product: **Vader Protocol**
- Workspace/UI: **Vader Construct**
- Engine/backend: **Vader Engine**
- Version baseline: **v2.5.0-Engine**

## Stage model

1. **Stage 1 (structure-first):** prompt only, no images
2. **Stage 2 (style pass):** attach reference images, preserve structure
3. **Stage 3 (hardening):** consistency and implementation-readiness

---

## 9. Actionable v0 prompt section (authoritative)

Use `Prompt-v0.md` as the default source for Stage 1.

### Stage 1 goals

- Generate full route shell
- Enforce canonical IA
- Implement strict dashboard grid
- Include required `data-testid` values
- Avoid CRM artifacts entirely

### Stage 2 goals

- Apply visual style only from references
- Keep all positions and hierarchy unchanged
- Maintain footer + command bar placements

### Stage 3 goals

- Refactor consistency without changing IA
- Preserve test IDs and interaction contracts
- Prepare handoff-ready component structure

### Hard fail conditions

Reject generation and rerun prompt if any of the following occur:

- Kanban, “client steps,” or task-board UI appears
- required routes are missing
- command bar/footer copy differs from spec
- destructive actions lack `AlertDialog`
- required `data-testid` values missing

---

## Acceptance checklist (must pass before export)

- [ ] Shell persistence across all routes
- [ ] Dashboard rows match strict schema
- [ ] Sidebar IA matches canonical order
- [ ] Footer text exact: `Powered by Vader Engine`
- [ ] Command bar text exact: `Type / for commands`
- [ ] Command palette opens by click and keyboard
- [ ] Required `data-testid` set complete
- [ ] No CRM elements present

---

## Recommended attachments to v0

### Stage 1
- No image attachments
- Attach prompt text only

### Stage 2
- Attach visual references from `.cursor/design_references/v0-Design-Refrences/`
- Keep prompt focused on style-only refinement

### Stage 3
- No additional images required
- Use hardening prompt only
