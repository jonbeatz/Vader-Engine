# Vader Protocol — Master v0.dev Prompt

**Module:** `v6-Master-Prompt.md`  
**Product:** Vader Protocol v2.5.0 · Copy-paste into [v0.dev](https://v0.dev)

**Blueprint modules:** [v1 Overview](v1-Overview.md) · [v2 Layout & Components](v2-Layout-Components.md) · [v3 State & Data](v3-State-Data.md) · [v4 Operations](v4-Operations.md) · [v5 Implementation](v5-Implementation.md) · [v6 Master Prompt](v6-Master-Prompt.md)

**Role:** Actionable v0 generation prompt and post-generation follow-ups.  
**Tokens / brand:** [v1-Overview.md](v1-Overview.md) · **Checklist:** [v5-Implementation.md](v5-Implementation.md) §10

---

## 9. Actionable v0.dev Prompt (copy-paste)

Copy the fenced block below into [v0.dev](https://v0.dev) for the **P0 MVP** UI.

````markdown
You are an expert frontend architect. Build **Vader Protocol v2.5.0**, the production-grade visual command center for MSC Universal Boilerplate (Next.js 15 App Router, TypeScript, Tailwind CSS 3, shadcn/ui).

## Brand

- Product name (use everywhere in UI): **Vader Protocol** v2.5.0
- Tagline: Production-hardened Cursor-native ecosystem with 61-point integrity grader and triple-sandbox modularity
- Reference: https://vaderlabz.com
- Header signature (11px mono): `// VADER_PROTOCOL :: CONTROL_PLANE`
- Tokens (globals + tailwind.config via var(--msc-*)):
  --msc-bg-main #121212, --msc-bg-surface #1c1c1c, --msc-surface-raised #242424,
  --msc-border #2a2a2a, --msc-text-primary #e0e0e0, --msc-text-secondary #888888,
  --msc-accent #e02b20, --msc-accent-hover #c41e14, --msc-success #1D9E75,
  --msc-warning #BA7517, --msc-info #185FA5
- Typography: Geist/Inter UI; Geist Mono for ports, grade, logs, npm names
- Aesthetic: Linear + Vercel + Railway — premium enterprise dev tool. NOT cyberpunk neon.
- Theme: default dark; Settings toggle for OLED (--msc-bg-main #000000, --msc-bg-surface #0a0a0a). No light mode.

## Layout

- Sidebar 220px — nav order EXACTLY:
  1 Dashboard, 2 Projects, 3 Templates, 4 Sandboxes (sub: 3000/3001/3002),
  5 Integrity, 6 Operations (Scripts, Ports, Environment), 7 Protocols, 8 Settings
- Header 48px: signature left; center SYSTEM ONLINE green pulse or DEGRADED;
  right: v2.5.0 badge, 61/61 badge, log Sheet toggle, ⌘K button
- Main scrollable; optional right Sheet 360px for global logs

## Global Command Palette (P0 — REQUIRED)

- shadcn Command + CommandDialog; Cmd+K / Ctrl+K and header button
- Search: navigate all pages; run scripts (grade, msc:lint, msc:dev:*, kill-dev-port, start-project:gate);
  "scaffold portfolio" opens dialog; "kill 3000" / "kill all"; Start/End Project
- Show 5 recent commands at top; Raycast/Linear style

## Page 1 — Dashboard (Bento)

Row 1 metrics: 61/61 grade, Active Sandboxes 2/3, CI PASSING, Node v20
Row 2: three sandbox cards (:3000, :3001, :3002) RUNNING pulse or STOPPED, START/STOP, Open
Row 3: Protocol Rituals (Start/End Project) + Quick Actions (real npm script labels)
Row 4: Recent Activity monospace log with [PASS]/[OK] lines

## Page 2 — Projects

**Projects Page:** A management dashboard for recent scaffolds (persistence via localStorage). Implementation: A clean list/table view showing project Name, Template Type (badge), Local Path, and "Last Opened" timestamp. Each row must include an "Open Folder" primary action button. Empty state: A clear, actionable "No projects yet. Scaffold from Templates →" call-to-action button that navigates directly to the Templates page.

## Page 3 — Templates

4 template cards; SCAFFOLD dialog with name, path, seed, command preview

## Page 4 — Integrity

Huge 61/61 hero, RUN GRADER (red accent), accordion check categories, failure Alert variant

## Page 5 — Sandbox detail (Payload :3001)

START/STOP with AlertDialog on stop; terminal panel #0a0a0a; env placeholder card

## Page 6 — Operations / Scripts

Searchable script list + terminal panel sample msc:lint output

## Page 7 — Operations / Ports

Table: port, service, status, PID — include 3010 Vader Protocol; Kill buttons open AlertDialog

## Page 8 — Protocols + Settings

Protocol buttons; Settings with dark/oled theme toggle

## Components & UX

shadcn: Button, Card, Badge, Dialog, AlertDialog, Sheet, Command, Accordion, Tabs, Table,
Progress, Alert, Skeleton, Tooltip, Sonner, ScrollArea
- AlertDialog REQUIRED before: kill port, kill all, stop sandbox
- Skeleton shimmer on all async blocks (metrics, sandboxes, grade, templates)
- Port conflict: "Port 3000 occupied" → AlertDialog "Kill process PID 12345?" Kill & Restart / Cancel
Icons: Lucide only. No CSS modules. No inline styles.

## Data rules

REAL npm script names and ports 3000, 3001, 3002, 3010. App runs on 3010.
Note in code comments: production uses fetch /api/health, /api/grade, /api/run-script with child_process.

Generate cohesive multi-page prototype with navigation. High density, operational clarity, shippable polish.
````

### 9.1 First Run (v0 follow-up)

After first generation:

> Replace all mock data with real API calls. Use `fetch` to `/api/health`, `/api/grade`, and POST `/api/run-script`. Production API routes use `child_process` at repo root. Wire Command Palette actions to the same endpoints.

**Optional third prompt:**

> Map colors to tailwind.config with var(--msc-*). Ensure Port Registry lists 3010. Confirm every destructive action uses AlertDialog.

### 9.2 Optional polish (if v0 omits — implement in P0)

| Item | P0 guidance |
| --- | --- |
| Error states | EADDRINUSE, script fail, grader timeout — Alert destructive + CTA |
| Loading | Skeleton on metrics, sandboxes, grade hero, template grid |

---

*Module 6 of 6 · Start with [v1-Overview.md](v1-Overview.md) for synthesis and tokens.*
