# Vader Construct — Default v0 Prompt (Stage 1)

**Prefer the single-page checklist:** [v0-Run-Sheet.md](v0-Run-Sheet.md)

Use this as the **first prompt** in a new [v0.dev](https://v0.dev) chat.

Do **not** attach images in Stage 1.

---

## Stage 1 Prompt (copy-paste)

````markdown
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
````

---

## Stage 2 Prompt (after Stage 1, with images attached)

Attach your 6 reference images, then paste:

````markdown
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
````

---

## Stage 3 Prompt (post-generation hardening)

````markdown
Now refactor the generated UI for implementation readiness:
- normalize component naming
- enforce consistent spacing scale
- ensure shadcn component usage is idiomatic
- validate all required `data-testid` attributes remain present
- keep route and layout unchanged
````