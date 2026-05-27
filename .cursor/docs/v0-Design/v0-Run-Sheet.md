# Vader Construct — v0 operator run sheet (one page)

**Use this file** for copy-paste prompts and stage gates. Deep spec: [Prompt-v0.md](Prompt-v0.md) · workflow index: [README.md](README.md) · acceptance rules: [v6-Master-Prompt.md](v6-Master-Prompt.md).

---

## Pre-flight (30 seconds)

- [ ] New **v0** chat (clean context)
- [ ] **Stage 1:** no reference images attached
- [ ] Reference images on disk: `.cursor/design_references/v0-Design-Refrences/` (6 files)
- [ ] Target: **developer ops dashboard** — not CRM

---

## Attachments by stage

| Stage | Attach to v0 | Notes |
| ----- | -------------- | ----- |
| **1** | Nothing (prompt only) | Structure + routes + test IDs |
| **2** | 6 reference JPGs | Style pass only — layout locked |
| **3** | Nothing (prompt only) | Hardening — no IA changes |

---

## Stage 1 — copy-paste (no images)

```text
You are a Lead UI Engineer building **Vader Construct** for **Vader Engine v2.5.0-Engine**.

Build a production-grade **developer operations dashboard** using:
- Next.js App Router
- TypeScript
- Tailwind CSS 3
- shadcn/ui

### Non-negotiable guardrails

1. This is a **developer dashboard**, not a CRM.
2. Do not generate: Kanban board, client pipelines, "My Tasks", sales CRM cards.
3. No inline styles. No CSS modules. Use Tailwind + shadcn only.
4. Use only this palette:
   - Background: `#121212`
   - Surface/card: `#1c1c1c`
   - Border: `#2d2d2d`
   - Accent: `#e02b20`
   - Success: `#1D9E75`
   - Warning: `#BA7517`
5. Keep layout sharp/clean (no playful SaaS styling).
6. All destructive actions must use `AlertDialog`.

### Required App Shell

- Left sidebar: fixed 220px
- Top header: fixed 48px
- Main content area: responsive bento layout
- Footer fixed to viewport bottom with exact text: `Powered by Vader Engine`
- Command bar fixed 16px above footer with exact text: `Type / for commands`
- Command bar opens command palette
- Cmd/Ctrl + K also opens command palette

### Required routes

- `/` (Dashboard)
- `/projects`
- `/templates`
- `/sandboxes`
- `/integrity`
- `/operations`
- `/operations/scripts`
- `/operations/ports`
- `/operations/env`
- `/protocols`
- `/settings`

Each non-dashboard route must render a **Protocol Readiness** card (not "Coming Soon").

### Dashboard layout (strict)

#### Row 1 (3 cards)
1. Vader Velocity (+trend)
2. Engine Capacity (2/3 active)
3. Integrity Score (61/61)

#### Row 2 (3 cards)
Sandbox cards for:
- Minimal `:3000`
- Payload `:3001`
- Tailwind/shadcn `:3002`

Each sandbox card includes:
- status dot
- START button
- STOP button (AlertDialog confirm)
- OPEN button

#### Row 3
- Left 2/3: activity feed with relative timestamps (`2m ago`, `15m ago`, `45m ago`, `2h ago`)
- Right 1/3: support tickets (`Open`, `Pending`)

### Accessibility and testability

Include these exact `data-testid` values:
- `command-palette-trigger`
- `command-palette`
- `footer-brand`
- `run-grader-button`
- `kill-port-confirm`
- `stop-sandbox-confirm`
- `sandbox-card-3000`
- `sandbox-card-3001`
- `sandbox-card-3002`
- `activity-feed`
- `protocol-readiness-card`
- `nav-dashboard`
- `nav-projects`
- `nav-templates`
- `nav-sandboxes`
- `nav-integrity`
- `nav-operations`
- `nav-protocols`
- `nav-settings`

Also include a reduced-motion fallback for animated elements.

### Output requirements

Generate a cohesive multi-page UI prototype with:
- persistent app shell
- complete route structure
- clean component hierarchy
- command palette wired to mock actions
- realistic operational copy (developer-focused)

Do not include backend implementation details in this step. Focus on a polished, production-style UI shell.
```

### Gate before Stage 2

- [ ] No Kanban / client steps / task board
- [ ] Footer text exactly `Powered by Vader Engine`
- [ ] Command bar exactly `Type / for commands`
- [ ] All routes above exist
- [ ] STOP / kill flows use `AlertDialog`
- [ ] Every `data-testid` listed is present on the right elements

If any fail → **regenerate Stage 1** (do not add images yet).

---

## Stage 2 — attach 6 images, then paste

1. Attach: `MSC-CRM_Mock_v1.jpg` … `MSC-Media-Pro-VideoTutorialz-Main.jpg` from `.cursor/design_references/v0-Design-Refrences/`
2. Paste:

```text
Keep the exact layout and route hierarchy from the previous generation.

Apply only visual refinements from the attached images:
- card texture/tone
- spacing density
- subtle status indicators
- typography balance
- footer and command-bar visual polish

Do not alter information architecture.
Do not introduce CRM-specific components.
Do not move sidebar/header/footer/command bar positions.
```

### Gate after Stage 2

- [ ] Layout grid unchanged from Stage 1
- [ ] No new CRM widgets appeared
- [ ] Footer copy still `Powered by Vader Engine`
- [ ] `data-testid` set still complete

---

## Stage 3 — copy-paste (no images)

```text
Now refactor the generated UI for implementation readiness:
- normalize component naming
- enforce consistent spacing scale
- ensure shadcn component usage is idiomatic
- validate all required `data-testid` attributes remain present
- keep route and layout unchanged
```

### Gate before export / zip

- [ ] Routes and shell unchanged vs Stage 1 structure
- [ ] Ready for handoff → [v5-Implementation.md](v5-Implementation.md)

---

## After v0 — Cursor only (do not paste into v0)

Use after download:

- `.cursor/skills/studio-dark-shield.md` — Path B token bridge + shadcn discipline
- `.cursor/skills/vader_protocol_skill.md` — VaderLabz marketing site aesthetic (not dashboard Path B)
- `.cursor/skills/vader_animations_skill.md` — motion reference for post-integration polish

---

## Quick reference: optional doc attachments for v0 (if the product supports files)

| When | File |
| ---- | ---- |
| Extra context (Stage 1) | [v2-Layout-Components.md](v2-Layout-Components.md) |
| Extra context (Stage 1) | [v1-Overview.md](v1-Overview.md) |

Default path: **prompt-only Stage 1** — fewer attachments = less CRM drift.
