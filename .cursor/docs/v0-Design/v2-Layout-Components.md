# Vader Protocol — Layout & Components

**Module:** `v2-Layout-Components.md`  
**Product:** Vader Protocol · Port **3010** · `ui/dashboard/`

**Blueprint modules:** [v1 Overview](v1-Overview.md) · [v2 Layout & Components](v2-Layout-Components.md) · [v3 State & Data](v3-State-Data.md) · [v4 Operations](v4-Operations.md) · [v5 Implementation](v5-Implementation.md) · [v6 Master Prompt](v6-Master-Prompt.md)

**Role:** Bento dashboard layout, port-conflict UX, and shadcn/ui component hierarchy.  
**Tokens:** See [v1-Overview.md](v1-Overview.md) §1.4 · **Nav order:** See [v4-Operations.md](v4-Operations.md) §7

---

## 1.3 Bento Grid strategy (Dashboard home)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER: protocol sig · SYSTEM ONLINE · v2.5.0 · 61/61 · ⌘K │
├──────────┬──────────────────────────────────────────────────┤
│ SIDEBAR  │  BENTO ROW 1: Grade · Sandboxes · CI · Node      │
│ (v4 §7)  ├──────────────────────────────────────────────────┤
│          │  BENTO ROW 2: Triple-Sandbox status (3-up)       │
│          ├───────────────┬──────────────────────────────────┤
│          │ Protocol      │ Quick Actions                    │
│          ├───────────────┴──────────────────────────────────┤
│          │  BENTO ROW 3: Recent Activity / Log strip        │
└──────────┴──────────────────────────────────────────────────┘
```

**Bento rules:**

- One concern per card (ports together, rituals together, grade alone).
- Expandable cards for secondary detail (accordion inside card).
- Error copy is **actionable** (e.g. “Port 3000 occupied — Kill process” not “Error”).
- Primary CTAs use **`--msc-accent`**; success uses `--msc-success` (`#1D9E75`).

**Port conflict handling (mandatory):**

When health reports a port conflict, show inline error: `Port 3000 occupied — Kill process`. Clicking the CTA opens **`AlertDialog`**:

- Title: `Port 3000 is occupied`
- Body: `Port 3000 is occupied by PID 12345. Kill process?`
- Actions: **`Kill & Restart`** (accent destructive) · **`Cancel`**

Same pattern for **3010**, **3001**, **3002**, and **kill all** (with stronger copy: “This stops all dev servers and Vader Protocol.”).

---

## 2. Component Hierarchy (shadcn/ui)

Install and compose from **shadcn/ui** (Path B). No CSS modules · no inline `style={{}}` on product components.

### 2.1 Layout shell

| Component | shadcn primitive | Role |
| --- | --- | --- |
| `AppShell` | custom layout | Fixed sidebar 220px + header 48px + main scroll |
| `Sidebar` | `ScrollArea` + `Button` ghost | Nav per [v4-Operations.md](v4-Operations.md) §7 (8 top-level areas) |
| `Header` | custom | Protocol signature · health pulse · version · **61/61** · **⌘K** trigger |
| `LogDrawer` | `Sheet` (right, 360px) | Global stdout/stderr (SSE-fed) |
| `CommandPalette` | `Command` | **P0 first-class** — Cmd+K global (see §2.8) |

### 2.2 Dashboard / Bento

| Component | shadcn | Notes |
| --- | --- | --- |
| `MetricCard` | `Card` + `Skeleton` | Grade, sandboxes, CI, Node — shimmer while `health` fetching |
| `SandboxCard` | `Card` + `Badge` + `Button` | Port monospace · START/STOP · Open ↗ |
| `ProtocolCard` | `Card` + `Button` | Start / End Project |
| `QuickActionsGrid` | `Button` outline + `Tooltip` | Lifecycle · Quality · Maintenance |
| `ActivityLog` | `ScrollArea` + monospace `pre` | Last N command results |

### 2.3 Projects (scaffold management)

Management dashboard for recent scaffolds (**persistence:** `localStorage`).

| Component | shadcn | Notes |
| --- | --- | --- |
| `ProjectList` | `Table` (preferred) or dense list | Columns: **Name** · **Template Type** (`Badge`) · **Local Path** (mono) · **Last Opened** (relative timestamp) |
| `ProjectRowActions` | `Button` default (accent) | **Open Folder** primary action per row |
| `EmptyProjects` | `Card` centered | Copy: **No projects yet.** CTA button: **Scaffold from Templates →** navigates to `/templates` |

### 2.4 Integrity Center

| Component | shadcn | Notes |
| --- | --- | --- |
| `GradeHero` | `Progress` + `Skeleton` | **61/61** — skeleton during grade mutation |
| `RunGraderButton` | `Button` (accent) + loading | `npm run grade` |
| `CheckAccordion` | `Accordion` | Categories pass/fail |
| `FailurePanel` | `Alert` destructive | When grade &lt; 100% |

### 2.5 Sandbox Manager

| Component | shadcn | Notes |
| --- | --- | --- |
| `SandboxGrid` | grid of `SandboxCard` | Railway-style |
| `SandboxDetail` | `Tabs` | Overview · Logs · Env status |
| `TerminalLog` | `pre` / xterm P1 | `#0a0a0a` bg · SSE lines |
| `StopSandboxButton` | `Button` + **`AlertDialog`** | Confirm before STOP |

### 2.6 Template Gallery

| Component | shadcn | Notes |
| --- | --- | --- |
| `TemplateCard` | `Card` + `Skeleton` | blueprint id · stack pills · SCAFFOLD |
| `ScaffoldDialog` | `Dialog` + `Form` | name · path · seed · command preview |
| `CommandPreview` | `code` | Exact `msc:template` command |

### 2.7 Operations (Scripts · Ports · Env)

| Component | shadcn | Notes |
| --- | --- | --- |
| `ScriptList` | `ScrollArea` + search | Grouped Lifecycle / Quality / … |
| `ScriptTerminal` | `pre` | SSE stream · POST for run |
| `PortRegistryTable` | `Table` | Auto from `/api/health` JSON incl. **3010** |
| `KillPortButton` | `Button` + **`AlertDialog`** | Per-port and kill-all |
| `EnvStatusCard` | `Card` + `Badge` | **P0 read-only** — `validate-env` result only |

### 2.8 Command Palette (P0 — first-class)

**Not optional.** Ships in P0.3 with app shell.

| Capability | Example query | Action |
| --- | --- | --- |
| Navigate | `integrity`, `templates`, `payload` | Route change |
| Run script | `grade`, `lint`, `msc:dev:example` | POST `/api/run-script` |
| Scaffold | `scaffold portfolio` | Open `ScaffoldDialog` pre-filled |
| Kill port | `kill 3000`, `kill all` | `AlertDialog` then mutation |
| Protocols | `start project`, `end project` | Protocol Center flows |
| Recent | — | Last 5 commands at top of list |

**UX:** Header **⌘K** button + `Cmd+K` / `Ctrl+K` shortcut · Raycast/Linear styling · shadcn `Command` + `CommandDialog`.

### 2.9 Global patterns

| Pattern | shadcn | Notes |
| --- | --- | --- |
| Status badge | `Badge` | RUNNING · STOPPED · PASS · FAIL |
| Destructive confirm | **`AlertDialog`** | **Required:** kill port(s), stop sandbox, kill-all, destructive script hints |
| Loading | **`Skeleton`** | All async sections (metrics, sandboxes, grade hero, templates) |
| Toast | `Sonner` | Non-blocking completion |
| Empty state | `Card` | Monospace hint + single CTA |
| Error state | `Alert` destructive | EADDRINUSE · script exit ≠ 0 · grader timeout + retry CTA |

**Icons:** Lucide React only · 20px · stroke 1.5.

---

*Module 2 of 6 · State/data → [v3-State-Data.md](v3-State-Data.md)*
