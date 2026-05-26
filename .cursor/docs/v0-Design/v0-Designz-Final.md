# Vader Protocol — Master Product & Engineering Blueprint (Final)

**Document ID:** `v0-Designz-Final.md`  
**Role:** Single **absolute Master Product Blueprint** for **Vader Protocol** (interface product · v0.dev · P0 engineering · operator UX)  
**Baseline:** MSC Universal Boilerplate **v2.5.0-SOVEREIGN** · [jonbeatz/Boilerplate](https://github.com/jonbeatz/Boilerplate)  
**Branch context:** `Boilerplate-FrontEnd-v1`  
**Status:** Final — conflict-free, implementation-ready · **no superseding design doc**

---

## 0. Synthesis Notes (Conflict Resolution)

| Topic | Prior variants | **Resolved decision (SOVEREIGN)** |
| --- | --- | --- |
| Accent / brand color | Neon `#00ffcc` · indigo SaaS · `#e02b20` | **`--msc-accent` (`#e02b20`)** — `ui/msc-shield.css` + Path B `tailwind.config.ts` |
| Visual tone | Cyberpunk · generic admin | **Premium dev-tool** (Linear + Vercel + Railway). No neon overload |
| Product naming | Boilerplate Studio · Control Plane · Master Dashboard | **Vader Protocol** — canonical interface product name (UI, nav, v0 prompt, chrome copy) |
| Home layout | Bento · Mission Control | **Bento grid** inside **Mission Control** shell (sidebar + header + log drawer) |
| Navigation IA | Tools/System split · flat sandboxes | **Dashboard → Projects → Templates → Sandboxes → Integrity → Operations → Protocols → Settings** |
| Grader score | Stale 52/52 | **61/61** — current grader contract |
| Code location | `ui/dashboard/` | Isolated package · port **3010** · **Lean Boundary** |
| Theme | Dark-only · OLED toggle | **Default `dark`** · optional **`oled`** slice in Zustand — **no light mode in P0** |
| Command Palette | P1 defer · P0 basic | **P0 first-class** — global **Cmd+K** (navigation + scripts + scaffold + kill + protocols) |
| Primary interaction | Mouse-first panels | **Keyboard-first** — Cmd+K parity with Linear/Raycast |
| Env Manager | Full CRUD table | **P0 read-only** `validate-env` + docs link · **P1** EnvTable/EnvTabs CRUD |
| Log transport | WebSocket generic | **P0 SSE** stdout stream · **POST** `/api/run-script` for spawn + input |
| Destructive UX | Toast only | **`AlertDialog`** required before kill port, stop sandbox, kill-all |
| MVP screens | 12+ areas | P0 scope in §5 — Operations groups Scripts, Ports, Env |

---

## 1. Executive UI Vision

### 1.1 Product definition

**Vader Protocol** is the visual command center (interface product) for the MSC Universal Boilerplate ecosystem. The CLI (`msc:*` npm scripts) remains the **execution engine**; the **`ui/dashboard`** app on port **3010** is the **primary operator face** for humans and Cursor agents who should not memorize sixty-plus commands.

**One-line positioning (canonical):**

> Bootstrap a production-hardened, Cursor-native ecosystem in minutes: the v2.5.0 Vader Protocol foundation features an autonomous **61-point** integrity grader, **triple-sandbox** modularity (Payload CMS + Tailwind/shadcn + WordPress shield), and **zero-leak** security — engineered for absolute environmental consistency.

**Brand references:** [jonbeatz/Boilerplate](https://github.com/jonbeatz/Boilerplate) · design tone [vaderlabz.com](https://vaderlabz.com/) — disciplined industrial dark, not decorative sci-fi.

### 1.2 Look and feel

| Dimension | Specification |
| --- | --- |
| **Mood** | Industrial terminal meets premium developer product — disciplined, authoritative, fast |
| **References** | Linear (density, keyboard-first) · Vercel Dashboard (restraint) · Railway (sandbox cards) · Raycast (command palette) |
| **Theme modes** | **`dark`** (Vader Protocol dark / `msc-shield` tokens, default) · **`oled`** (true black surfaces) — toggle in Settings; **no light mode in P0** |
| **Density** | High information density; **~30% less decorative noise** than generic admin templates — operational clarity over ornament |
| **Motion** | 150–200ms transitions · subtle green pulse for **running** sandboxes · skeleton shimmer for async blocks |
| **Signature** | Header: `// VADER_PROTOCOL :: CONTROL_PLANE` · grade badge **61/61** always visible in chrome |

**OLED mode tokens (applied via `data-theme="oled"` or class on `html`):**

| Token | Dark (default) | OLED |
| --- | --- | --- |
| `--msc-bg-main` | `#121212` | `#000000` |
| `--msc-bg-surface` | `#1c1c1c` | `#0a0a0a` |

All other `--msc-*` tokens unchanged; accent remains `#e02b20`.

### 1.3 Bento Grid strategy (Dashboard home)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER: protocol sig · SYSTEM ONLINE · v2.5.0 · 61/61 · ⌘K │
├──────────┬──────────────────────────────────────────────────┤
│ SIDEBAR  │  BENTO ROW 1: Grade · Sandboxes · CI · Node      │
│ (§7 IA)  ├──────────────────────────────────────────────────┤
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

### 1.4 Design tokens (mandatory — Vader bridge)

All UI consumes tokens from **`ui/msc-shield.css`** via Tailwind extension (pattern: `examples/nextjs-tailwind/tailwind.config.ts`):

| Token | CSS variable | Hex (baseline) | Usage |
| --- | --- | --- | --- |
| Canvas | `--msc-bg-main` | `#121212` | Page background |
| Surface | `--msc-bg-surface` | `#1c1c1c` | Cards, sidebar |
| Raised | `--msc-surface-raised` | `#242424` | Modals, hover |
| Border | `--msc-border` | `#2a2a2a` | Dividers |
| Text primary | `--msc-text-primary` | `#e0e0e0` | Body |
| Text secondary | `--msc-text-secondary` | `#888888` | Labels |
| Accent | `--msc-accent` | `#e02b20` | CTAs, active nav |
| Accent hover | `--msc-accent-hover` | `#c41e14` | Hover |
| Success | `--msc-success` | `#1D9E75` | PASS, running |
| Warning | `--msc-warning` | `#BA7517` | Degraded |
| Info | `--msc-info` | `#185FA5` | Neutral actions |

**Rejected for P0:** `#00ffcc` as primary accent — log syntax highlight only.

---

## 2. Component Hierarchy (shadcn/ui)

Install and compose from **shadcn/ui** (Path B). No CSS modules · no inline `style={{}}` on product components.

### 2.1 Layout shell

| Component | shadcn primitive | Role |
| --- | --- | --- |
| `AppShell` | custom layout | Fixed sidebar 220px + header 48px + main scroll |
| `Sidebar` | `ScrollArea` + `Button` ghost | Nav per §7 order (8 top-level areas) |
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

## 3. State & Data Strategy

### 3.1 Architecture principle

```
┌──────────────────┐     API Routes (App Router)      ┌─────────────────┐
│  React UI        │ ──► child_process spawn ───────►│  msc:* scripts  │
│  (Vader Protocol)│ ◄── SSE stdout / JSON ─────────│  (repo root)    │
└──────────────────┘     POST /api/run-script         └─────────────────┘
```

- **Do not reimplement** grader, health, or template logic in the dashboard.
- Spawn with `cwd` = repo root · env from hydrated `process.env` (`.env.local` via loader pattern).

### 3.2 TanStack Query (server state)

| Query key | Source | Poll interval | Purpose |
| --- | --- | --- | --- |
| `health` | `npm run msc:health -- --json` | 5s | Ports 3000–3002, **3010**, 8080 |
| `grade` | parse `npm run grade` | on-demand + post-mutation | 61/61 score |
| `grade-detail` | extended parse | on-demand (P1 full 61 rows) | Per-check list |
| `templates` | `msc:template -- list` | 5m | Template gallery |
| `validate-env` | `msc:validate-env` | on-demand | Env status (read-only P0) |
| `node-info` | health JSON / node -v | 60s | Header metadata |

**Mutations** (invalidate `health` / `grade` on success):

- `startSandbox` → `msc:dev:*`
- `killPorts` → `msc:kill-dev-port` (after `AlertDialog`)
- `runScript` → `npm run …` via POST `/api/run-script`
- `scaffold` → `msc:template apply` (+ optional seed)

### 3.3 Zustand (UI state)

| Store slice | State |
| --- | --- |
| `shell` | sidebar collapsed · active route · **`theme: 'dark' \| 'oled'`** |
| `logs` | drawer open · stream buffer · auto-scroll |
| `sandbox` | selected sandbox id · per-sandbox log buffer |
| `scriptRunner` | selected script · running job id (abort P1) |
| `commandPalette` | open · query · recent commands[] |

> **Theme:** Persist `theme` in `localStorage`. Default `'dark'`. Applying `'oled'` sets `data-theme="oled"` on `document.documentElement` and swaps canvas/surface CSS variables per §1.2. No light mode in P0.

### 3.4 Persistence (local only)

| Data | Storage | Purpose |
| --- | --- | --- |
| Recent scaffolds / projects | `localStorage` JSON | **Projects** page |
| UI preferences | `localStorage` | sidebar · theme |
| Command history | `localStorage` | Palette recent commands |
| Grade history | file P1 | Trend chart |

**Never persist secrets** — `.env.local` stays filesystem-only.

### 3.5 Real-time logs

- **P0:** Server-Sent Events (SSE) from API route streaming `child_process` stdout/stderr.
- **Command input:** **POST** `/api/run-script` — spawn script, optional stdin for interactive tools (P1: `rs` restart hints).
- P0 line-prefix coloring: `[PASS]` · `[OK]` · `[FAIL]`; full ANSI P1.

### 3.6 Error & loading UX (P0 required)

| Scenario | UI pattern |
| --- | --- |
| Health polling | Metric + sandbox **`Skeleton`** shimmer |
| Grade running | `RunGraderButton` loading + hero skeleton |
| Port conflict | Inline error + **`AlertDialog`** (§1.3) |
| Script exit ≠ 0 | `Alert` destructive in terminal + toast |
| Grader timeout | Retry CTA + log drawer auto-open |
| Template list fetch | Card grid skeletons |

---

## 4. Technical Placement & Lean Boundary

| Rule | Implementation |
| --- | --- |
| **Location** | `ui/dashboard/` — own `package.json` |
| **Port** | **3010** — Vader Protocol control plane (not a sandbox) |
| **Kill-list (P0)** | **3010** in `scripts/msc-kill-all-dev-ports.mjs` with 3000, 3001, 3002, 8080 |
| **Root deps** | Forbidden — only new root script: `"msc:dev:dashboard": "cd ui/dashboard && npm run dev"` |
| **Styling** | `../../ui/msc-shield.css` in `globals.css` · Tailwind `msc-*` utilities |
| **Path** | Path B (Tailwind + shadcn) |
| **Repo hygiene** | Root `.gitignore` must exclude dashboard artifacts (§10) |

**Port 3010 — kill-list (explicit):**

- [ ] Add **3010** to `scripts/msc-kill-all-dev-ports.mjs`
- [ ] Document **3010** in `.cursor/docs/system-architecture.md`
- [ ] Extend `scripts/health.mjs` + `scripts/__tests__/health.test.mjs` for **3010**
- [ ] Port Registry UI auto-populates from `/api/health` — verify **3010** row visible

> **Tailwind version:** v0 generates **Tailwind v3** by default. Migration to v4 is a **P0.1** engineering task post-v0 generation if repo standardizes on v4.

---

## 5. MVP Feature Scope (P0 Web)

### 5.1 Must ship (P0)

1. **Dashboard (Bento)** — metrics · triple sandbox · rituals · quick actions · activity  
2. **Projects** — scaffold management dashboard (`localStorage`): Name · Template Type badge · Local Path · Last Opened · **Open Folder** per row; empty state **No projects yet. Scaffold from Templates →**  
3. **Template Gallery + Scaffold dialog** — list · apply · seed · terminal via SSE  
4. **Sandbox Manager** — grid + detail · START/STOP/Open · **`AlertDialog`** on STOP  
5. **Integrity Center** — 61/61 hero · run grader · accordion (incremental parser)  
6. **Operations — Scripts** — searchable list · run · SSE terminal  
7. **Operations — Port Registry** — table from health JSON · per-port + kill-all with **`AlertDialog`**  
8. **Operations — Env** — **read-only** `validate-env` status + link to edit `.env.local` in docs  
9. **Protocols** — Start Project / End Project workflows (`Start-Project.md` / `End-Project.md`)  
10. **Settings** — theme **`dark` \| `oled`** · sidebar preference  
11. **Global Command Palette (Cmd+K)** — navigation · scripts · scaffold · kill · protocols · recents  
12. **Global log drawer** — all mutations stream here  
13. **Loading + error states** — Skeleton + destructive Alerts per §3.6  

### 5.2 Defer (P1+)

- Env Manager CRUD (`EnvTable`, `EnvTabs`, masked values)  
- Command palette **advanced** (fuzzy scoring, git branch hints)  
- CI/CD release tagging UI  
- Documentation center renderer  
- Analytics charts  
- AI project builder (placeholder only in P0 if needed)  
- GitHub API live release info  
- Grade history Recharts  
- Tauri 2 desktop shell  
- xterm.js + process abort  

---

## 6. Roadmap Phases

### Phase P0 — Web MVP

**Goal:** `ui/dashboard` on **3010** — operator can run full session without terminal.

| Milestone | Deliverable | Verification |
| --- | --- | --- |
| P0.1 | Scaffold Next 15 + shadcn + token bridge | `npm run build` in package |
| P0.2 | API: `/api/health`, `/api/grade`, `/api/run-script`, SSE logs | Integration smoke |
| P0.3 | App shell + **Command Palette (Cmd+K)** + §7 nav | Palette navigates all routes |
| P0.4 | Dashboard Bento + Projects page | Skeletons on poll |
| P0.5 | Integrity + Sandboxes + **`AlertDialog`** flows | STOP/kill confirm |
| P0.6 | Templates + Operations (Scripts, Ports, Env read-only) | `msc:template list` |
| P0.7 | Port **3010** kill-list + health probe + Port Registry row | ☐ 3010 in UI table |
| P0.8 | Protocols + log drawer + Settings (theme) | `start-project:gate` from UI |
| P0.9 | Root `.gitignore` dashboard paths + `ui/dashboard/README.md` | Lean Boundary audit |

**Exit criteria:** Cold-start, sandboxes, grader, scaffold, protocol closeout — aligned with `.cursor/prompts/Start-Project.md` and `End-Project.md`.

### Phase P1 — Desktop & depth

| Milestone | Deliverable |
| --- | --- |
| P1.1 | Tauri 2 → `localhost:3010` |
| P1.2 | Native folder picker (scaffold) |
| P1.3 | Full grade parser — 61 checks in accordion |
| P1.4 | Env CRUD · xterm.js · process abort |
| P1.5 | Grade history + export |

### Phase P2 — Platform

Documentation center · deployment center · MCP status · optional AI builder

---

## 7. Navigation & Information Architecture

**Canonical sidebar order (top → bottom):**

| # | Area | Route | Priority | Notes |
| --- | --- | --- | --- | --- |
| 1 | **Dashboard** | `/` | P0 | Bento home |
| 2 | **Projects** | `/projects` | P0 | Scaffold management (table + Open Folder) |
| 3 | **Templates** | `/templates` | P0 | Scaffold engine |
| 4 | **Sandboxes** | `/sandboxes` | P0 | Hub; children optional |
| 4a | └ Minimal | `/sandboxes/minimal` | P0 | :3000 |
| 4b | └ Payload CMS | `/sandboxes/payload` | P0 | :3001 |
| 4c | └ Tailwind / shadcn | `/sandboxes/tailwind` | P0 | :3002 |
| 5 | **Integrity** | `/integrity` | P0 | 61-point gate |
| 6 | **Operations** | `/operations` | P0 | Hub (or flat routes below) |
| 6a | └ Scripts | `/operations/scripts` | P0 | Script runner |
| 6b | └ Ports | `/operations/ports` | P0 | Registry + kill |
| 6c | └ Environment | `/operations/env` | P0 | Read-only validate |
| 7 | **Protocols** | `/protocols` | P0 | Start / End rituals |
| 8 | **Settings** | `/settings` | P0 | Theme · preferences |

**Header (all routes):** protocol signature · SYSTEM ONLINE / DEGRADED · `v2.5.0` · **61/61** · log drawer toggle · **⌘K**.

**Keyboard:**

| Shortcut | Action |
| --- | --- |
| `Cmd+K` / `Ctrl+K` | Open Command Palette |
| `Esc` | Close palette / dialog |

---

## 8. Canonical Script Surface (UI buttons)

All controls map 1:1 to `package.json` scripts — no invented commands.

### Lifecycle

- `npm run msc:onboard`
- `npm run bootstrap`
- `npm run msc:validate-env`
- `npm run msc:kill-dev-port`
- `npm run start-project:gate`

### Development

- `npm run msc:dev:example` (3000)
- `npm run msc:dev:payload` (3001)
- `npm run msc:dev:tailwind` (3002)
- `npm run msc:dev:dashboard` (3010) — when added at root
- `npm run msc:health` / `npm run msc:health -- --json`

### Quality

- `npm run grade` (**primary**)
- `npm run msc:lint` / `msc:lint:fix`
- `npm run msc:test:root`
- `npm run verify:mcp`
- `npm run msc:shield:audit`

### Templates

- `npm run msc:template -- list`
- `npm run msc:template -- apply …`
- `npm run msc:template -- seed …`

### Protocols

- **Start Project:** `start-project:gate` + checklist UI  
- **End Project:** `msc:kill-dev-port` → optional gate → git status → project-log → Handoff Block  

---

## 9. Actionable v0.dev Prompt (copy-paste)

Copy the fenced block into [v0.dev](https://v0.dev) for the **P0 MVP** UI.

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

## 10. Implementation Checklist (engineering)

- [ ] Create `ui/dashboard/` package (Next 15, isolated deps)
- [ ] Bridge `ui/msc-shield.css` + Tailwind `msc-*` utilities
- [ ] API routes: `/api/health`, `/api/grade`, `/api/run-script` + SSE log stream
- [ ] TanStack Query + Zustand per §3 (`theme: 'dark' \| 'oled'` in `shell`)
- [ ] **Command Palette (Cmd+K)** — P0.3 gate, not deferrable
- [ ] **`AlertDialog`** on all destructive actions (§1.3, §2.9)
- [ ] **Skeleton** loading on async UI blocks
- [ ] Sidebar IA per §7 (Dashboard → … → Settings)
- [ ] Projects page (§2.3 table spec) + `localStorage` recent scaffolds
- [ ] Wire sandbox START/STOP with confirm dialog
- [ ] Parser for `grade` stdout → accordion (incremental)
- [ ] Add **3010** to `scripts/msc-kill-all-dev-ports.mjs` + `system-architecture.md` + health tests
- [ ] Port Registry auto-populates from `/api/health` — verify **3010** row
- [ ] Env Operations page: **read-only** `validate-env` only (P1 CRUD)
- [ ] Add to **root `.gitignore`:** `ui/dashboard/node_modules/`, `ui/dashboard/.next/`, `ui/dashboard/.env.local`
- [ ] `ui/dashboard/README.md` + DOCS.md index link
- [ ] Root `package.json`: only add `"msc:dev:dashboard"` script
- [ ] Verify `npm run grade` still **61/61** from repo root after integration

---

## 11. References (repository)

| Doc | Path |
| --- | --- |
| Constitution | `TRUTH.md` |
| Operator controls | `README.md` § Operator Controls |
| Cold start | `.cursor/prompts/Start-Project.md` |
| Session close | `.cursor/prompts/End-Project.md` |
| Token bridge | `examples/nextjs-tailwind/tailwind.config.ts` |
| Path B rules | `.cursor/rules/tailwind-shadcn-bridge.mdc` |
| Port contract | `.cursor/docs/system-architecture.md` |
| Studio Dark skill | `.cursor/skills/studio-dark-shield.md` |

---

*Final merge 2026-05-25 · Boilerplate-FrontEnd-v1 · **Product: Vader Protocol · Nav: Dashboard → Projects → Templates → Sandboxes → Integrity → Operations → Protocols → Settings · `v0-Designz-Final.md` is the absolute, sole Master Product Blueprint.***
