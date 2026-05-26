# Vader Protocol — Master v0.dev Prompt

**Module:** `v6-Master-Prompt.md`  
**Product:** Vader Protocol v2.5.0-SOVEREIGN · Copy-paste into [v0.dev](https://v0.dev)

**Blueprint modules:** [v1-Overview.md](v1-Overview.md) · [v2-Layout-Components.md](v2-Layout-Components.md) · [v3-State-Data.md](v3-State-Data.md) · [v4-Operations.md](v4-Operations.md) · [v5-Implementation.md](v5-Implementation.md) · [v6-Master-Prompt.md](v6-Master-Prompt.md)

**Role:** Actionable v0 generation prompt and post-generation follow-ups.

---

## 9. Actionable v0.dev Prompt (copy-paste)

Copy the block below into [v0.dev](https://v0.dev):

````markdown
Build **Vader Protocol v2.5.0-SOVEREIGN** — production visual command center for MSC Boilerplate (Next.js 15 App Router, TypeScript, Tailwind CSS 3, shadcn/ui).

**Brand:** Vader Protocol. Header: `// VADER_PROTOCOL :: CONTROL_PLANE`. Dark theme only; Settings toggles OLED (`#000000` / `#0a0a0a`). Tokens via `var(--msc-*)`: accent `#e02b20`, success `#1D9E75`, warning `#BA7517`. Typography: Geist/Inter UI, Geist Mono for logs/ports.

**Layout:** Sidebar 220px → Dashboard → Projects → Templates → Sandboxes → Integrity → Operations (Scripts/Ports/Env) → Protocols → Settings. Header: signature, health pulse, version, 61/61 badge, log toggle, ⌘K.

**Command Palette (P0):** Cmd+K global. Navigate, run scripts (grade, msc:lint, kill-dev-port), scaffold templates, kill ports, Start/End Project. Raycast style.

**Pages:**
- Dashboard: Bento grid (metrics, 3 sandbox cards, quick actions, activity strip).
- Projects: localStorage-backed table of scaffolds: Name, Template Type, Path, Last Opened, Open Folder button.
- Templates: Gallery + Scaffold dialog (name, path, seed).
- Integrity: 61/61 hero, Run Grader button, accordion check categories.
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

Map colors to tailwind.config via var(--msc-*). Confirm Port Registry includes 3010. Verify every destructive action uses AlertDialog.
````

---

*Module 6 of 6 · Synthesis and tokens → [v1-Overview.md](v1-Overview.md)*
