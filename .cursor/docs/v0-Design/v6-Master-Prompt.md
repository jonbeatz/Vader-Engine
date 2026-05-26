# Vader Protocol — Master v0.dev Prompt

**Module:** `v6-Master-Prompt.md`  
**Product:** Vader Protocol v2.5.0-SOVEREIGN · Copy-paste into [v0.dev](https://v0.dev)

**Blueprint modules:** [v1-Overview.md](v1-Overview.md) · [v2-Layout-Components.md](v2-Layout-Components.md) · [v3-State-Data.md](v3-State-Data.md) · [v4-Operations.md](v4-Operations.md) · [v5-Implementation.md](v5-Implementation.md) · [v6-Master-Prompt.md](v6-Master-Prompt.md)

**Role:** Actionable v0 generation prompt and post-generation follow-ups.

**Branding hierarchy (v0 prompt):**

| Layer | Name | Scope |
| --- | --- | --- |
| Product | **Vader Protocol** | System, rules, aesthetic baseline |
| UI / design workspace | **Vader Construct** | Dashboard shell, Bento UI, v0 generation |
| Core / backend engine | **Vader Engine** | `msc:*` scripts, API routes, `child_process` wiring |
| Version | **v2.5.0-SOVEREIGN** | Locked baseline tag (product line; naming under review) |

**Visual references (repo):** `.cursor/design_references/v0-Design-Refrences/` — attach images from this folder when prompting v0 (folder-only reference; individual filenames may change).

---

## 9. Actionable v0.dev Prompt (copy-paste)

Copy the block below into [v0.dev](https://v0.dev). Attach reference images from `.cursor/design_references/v0-Design-Refrences/` when available.

````markdown
Build **Vader Protocol v2.5.0-SOVEREIGN** — production visual command center for MSC Boilerplate (Next.js 15 App Router, TypeScript, Tailwind CSS 3, shadcn/ui).

**Brand:** Product **Vader Protocol** · UI workspace **Vader Construct** · backend **Vader Engine**. Header: `// VADER_CONSTRUCT :: CONTROL_PLANE`. Dark theme only; Settings toggles OLED (`#000000` / `#0a0a0a`). Tokens via `var(--msc-*)`: accent `#e02b20`, success `#1D9E75`, warning `#BA7517`. Typography: Geist/Inter UI, Geist Mono for logs/ports/values.

**Visual references attached.** Adopt the dark-surface (`#121212` page, `#1c1c1c` cards), card-depth, Bento spacing, and green-pulse indicator logic shown in the attached reference images. Use monospace for ports, PIDs, grades, and log lines. Metric cards: top-row velocity/status pattern; sandbox tiles: tutorial-grid density.

**Layout:** Sidebar 220px → Dashboard → Projects → Templates → Sandboxes → Integrity → Operations (Scripts/Ports/Env) → Protocols → Settings. Header: signature, health pulse, version, 61/61 badge, log toggle, ⌘K. Global log drawer and Command Palette live in root `layout.tsx` AppShell — they must not reset on route change.

**Routing & Shell:**
- Implement a robust `layout.tsx` shell with persistent 220px Sidebar and 48px Header across all routes.
- Generate placeholder pages: `/`, `/projects`, `/templates`, `/sandboxes`, `/integrity`, `/operations`, `/operations/scripts`, `/operations/ports`, `/operations/env`, `/protocols`, `/settings`.
- Each placeholder uses a **Protocol Readiness** card (page title + readiness status / short metric) consistent with Bento aesthetic — not a generic "Coming Soon".

**Command Palette (P0):** Cmd+K global. Navigate, run scripts (grade, msc:lint, kill-dev-port), scaffold templates, kill ports, Start/End Project. Raycast style. Support mouse and keyboard equally.

**Pages:**
- Dashboard: Bento grid (metrics: Vader Velocity, Engine Capacity, Integrity 61/61; 3 sandbox cards; quick actions; activity strip).
- Projects: localStorage-backed table of scaffolds: Name, Template Type, Path, Last Opened, Open Folder button.
- Templates: Gallery + Scaffold dialog (name, path, seed); Protocol Readiness on gallery until wired.
- Integrity: 61/61 hero, Run Grader button, accordion check categories (pipeline-style progress bars).
- Sandboxes: Start/Stop/Open. Stop uses AlertDialog.
- Operations: Scripts (searchable + terminal), Ports (table + kill with AlertDialog), Env (read-only validate-env).
- Protocols + Settings: Start/End Project buttons, theme toggle.

**Components & UX (Quality of Life):** shadcn/ui: Button, Card, Badge, Dialog, AlertDialog, Sheet, Command, Accordion, Tabs, Table, Progress, Alert, Skeleton, Tooltip, Sonner, ScrollArea. Icons: Lucide.
- AlertDialog required before: kill port, kill-all, stop sandbox.
- Skeleton shimmer on all async blocks (metrics, sandboxes, grade, templates).
- Port conflict: inline error → AlertDialog "Kill process PID 12345?" Kill & Restart / Cancel.

**Data:** Real npm scripts, ports 3000, 3001, 3002, 3010. See v3-State-Data.md and v4-Operations.md for API routes and operational logic. Add `data-testid` attributes for Playwright E2E (e.g., `data-testid="run-grader-button"`).

Generate cohesive multi-page prototype with navigation. High density, operational clarity, shippable polish.

**Follow-up prompt (after generation):**

Replace mock data with fetch to /api/health, /api/grade, POST /api/run-script. Wire Command Palette to same endpoints.

**Third prompt (if needed):**

Map colors to tailwind.config via var(--msc-*). Confirm Port Registry includes 3010. Verify every destructive action uses AlertDialog. Point globals.css at `../../ui/msc-shield.css`.
````

---

*Module 6 of 6 · Synthesis and tokens → [v1-Overview.md](v1-Overview.md)*
