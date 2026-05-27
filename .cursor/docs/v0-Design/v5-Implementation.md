# Vader Protocol — Implementation Workflow

**Module:** `v5-Implementation.md`  
**Goal:** Define exact post-v0 steps to integrate generated UI into the repo.  
**Master roadmap:** [ENGINE_ROADMAP.md](../../plans/ENGINE_ROADMAP.md)

## Integration sequence

1. Generate UI in v0 using `Prompt-v0.md` and `v6-Master-Prompt.md`
2. Export code from v0
3. Import into `ui/dashboard/` (isolated package)
4. Normalize structure and naming
5. Replace mock data with repo-backed API contracts
6. Add missing test ids and dialog guards
7. Run project gates from repo root

## Guardrails

- Keep `MSC_VERSION` unchanged
- Keep `msc-*` script naming unchanged
- No root dependency pollution
- Keep dashboard isolated under `ui/dashboard/`
- Maintain port contract (`3010` control plane, `3000/3001/3002` sandboxes)

## Post-import checklist

- [ ] command palette works via keyboard and command bar
- [ ] all required routes exist
- [ ] all required `data-testid` values exist
- [ ] destructive actions use `AlertDialog`
- [ ] skeleton states present on async widgets
- [ ] footer and command bar fixed positions preserved
- [ ] no CRM artifacts exist in layout or copy
- [ ] UI passes visual sanity against prompt constraints

## Validation checklist

Run from repo root:

- `npm run grade`
- `npm run msc:lint`
- `npm run msc:test:root`

Target result:
- grade `61/61`
- lint clean
- test suite pass
