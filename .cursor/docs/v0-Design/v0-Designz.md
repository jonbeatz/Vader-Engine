# Boilerplate Studio — Master Product & Engineering Blueprint

**Document ID:** `v0-Designz.md`  
**Source:** Six v0 design briefs (consolidated; **`v0-Designz.md` is the canonical SSoT**)  
**Baseline:** Boilerplate **v2.5.0-SOVEREIGN** · [jonbeatz/Boilerplate](https://github.com/jonbeatz/Boilerplate)  
**Branch context:** `Boilerplate-FrontEnd-v1`  
**Status:** Definitive synthesis for v0.dev MVP generation and P0 implementation

---

## 0. Synthesis Notes (Conflict Resolution)

| Topic | Sources in conflict | **Resolved decision (SOVEREIGN)** |
| --- | --- | --- |
| Accent / brand color | v0-2/v0-1: `#00ffcc` neon · v0-6: indigo/violet · v0-5: `#e02b20` | **`--msc-accent` (`#e02b20`)** — matches `ui/msc-shield.css` and Path B `tailwind.config.ts` bridge |
| Visual tone | v0-3/v0-6: cyberpunk · v0-4: Linear/Vercel enterprise | **Premium dev-tool** (Linear + Vercel + Railway). No neon overload, no gamer UI |
| Product naming | Control Plane · Master Dashboard · Boilerplate Studio | **Boilerplate Studio** (product) · **Vader Protocol Control Plane** (engineering codename) |
| Home layout | v0-1: Bento grid · v0-4: Mission Control OS | **Bento grid** on Dashboard home inside **Mission Control** shell (sidebar + header + optional log drawer) |
| Grader score | v0-3: 52/52 (stale) | **61/61** — current grader contract |
| Code location | v0-2/v0-5: `ui/dashboard/` | **`ui/dashboard/`** isolated package · port **3010** · **Lean Boundary** (no root deps) |
| Typography | Rajdhani/Share Tech · IBM Plex · Inter/Geist | **Geist / Inter** (UI) + **Geist Mono / IBM Plex Mono** (terminal, ports, grade). Map to `--msc-*` via Tailwind |
| Fonts in v0 output | Decorative sci-fi | Monospace for metrics/logs/commands only; restrained display headings |
| P1 desktop | v0-2 Tauri 2 | **P1: Tauri 2** wrapper (~10MB); P0 remains Next.js web on **3010** |
| MVP screens | v0-4 lists 12+ areas | **P0:** Dashboard (Bento) · Integrity Center · Sandbox Manager · Template Gallery · Protocol Center · Script Runner + Logs |

---

## 1. Executive UI Vision

### 1.1 Product definition

**Boilerplate Studio** is the visual command center for the MSC Universal Boilerplate ecosystem. The CLI (`msc:*` npm scripts) remains the **execution engine**; the dashboard is the **primary operator face** for humans and Cursor agents who should not memorize sixty-plus commands.

**One-line positioning (canonical):**

> Bootstrap a production-hardened, Cursor-native ecosystem in minutes: the v2.5.0 Vader Protocol foundation features an autonomous **61-point** integrity grader, **triple-sandbox** modularity (Payload CMS + Tailwind/shadcn + WordPress shield), and **zero-leak** security — engineered for absolute environmental consistency.

### 1.2 Look and feel

| Dimension | Specification |
| --- | --- |
| **Mood** | Industrial terminal meets premium developer product — disciplined, authoritative, fast |
| **References** | Linear (density, keyboard-first) · Vercel Dashboard (restraint, precision) · Railway (sandbox cards) · Raycast (command palette) — **not** generic admin templates |
| **Theme** | Dark-only Studio Dark · no light mode in P0 |
| **Density** | High information density on Dashboard and Integrity Center; progressive disclosure on secondary panels |
| **Motion** | 150–200ms transitions · subtle green pulse for **running** sandboxes · no bounce/confetti |
| **Signature** | Header line: `// VADER_PROTOCOL :: CONTROL_PLANE` · grade badge **61/61** always visible in chrome |

### 1.3 Bento Grid strategy (Dashboard home)

The **home view** uses a **Bento Grid** to reduce cognitive load (from v0-1) while matching Mission Control goals (from v0-4):

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER: protocol sig · SYSTEM ONLINE · v2.5.0 · 61/61      │
├──────────┬──────────────────────────────────────────────────┤
│ SIDEBAR  │  BENTO ROW 1 (metrics): Grade · Sandboxes · CI · Node │
│          ├──────────────────────────────────────────────────┤
│          │  BENTO ROW 2 (large): Triple-Sandbox status (3-up)     │
│          ├───────────────┬───────────────────────────────────┤
│          │ Protocol      │ Quick Actions (grouped buttons)   │
│          │ Rituals       │                                   │
│          ├───────────────┴───────────────────────────────────┤
│          │  BENTO ROW 3: Recent Activity / Log strip          │
└──────────┴──────────────────────────────────────────────────┘
```

**Bento rules:**

- One concern per card (ports together, rituals together, grade alone).
- Expandable cards for secondary detail (accordion inside card — progressive disclosure).
- Error copy is **actionable** (e.g. “Port 3000 occupied — Kill process” not “Error”).
- All interactive elements use **`--msc-accent`** for primary CTAs; success uses semantic green aligned to `--msc-success` (`#1D9E75`).

### 1.4 Design tokens (mandatory — Vader bridge)

All UI must consume tokens from **`ui/msc-shield.css`** via Tailwind extension (same pattern as `examples/nextjs-tailwind/tailwind.config.ts`):

| Token | CSS variable | Hex (baseline) | Usage |
| --- | --- | --- | --- |
| Canvas | `--msc-bg-main` | `#121212` | Page background |
| Surface | `--msc-bg-surface` | `#1c1c1c` | Cards, sidebar |
| Raised | `--msc-surface-raised` | `#242424` | Modals, hover |
| Border | `--msc-border` | `#2a2a2a` | 1px dividers |
| Text primary | `--msc-text-primary` | `#e0e0e0` | Body |
| Text secondary | `--msc-text-secondary` | `#888888` | Labels |
| Accent | `--msc-accent` | `#e02b20` | CTAs, active nav, critical |
| Accent hover | `--msc-accent-hover` | `#c41e14` | Hover |
| Success | `--msc-success` | `#1D9E75` | PASS, running |
| Warning | `--msc-warning` | `#BA7517` | Degraded |
| Info | `--msc-info` | `#185FA5` | Neutral actions |

**Rejected for P0:** `#00ffcc` terminal green as primary accent (v0-2) — may appear as **log syntax highlight only**, not brand CTA.

---

## 2. Component Hierarchy (shadcn/ui)

Install and compose from **shadcn/ui** (Path B). No CSS modules · no inline `style={{}}` on product components.

### 2.1 Layout shell

| Component | shadcn primitive | Role |
| --- | --- | --- |
| `AppShell` | custom layout | Fixed sidebar 220px + header 48px + main scroll |
| `Sidebar` | `ScrollArea` + `Button` ghost | Nav sections: Overview · Sandboxes · Tools · System |
| `Header` | custom | Protocol signature, global health, version, grade badge |
| `LogDrawer` | `Sheet` (right, 360px) | Global stdout/stderr stream |
| `CommandPalette` | `Command` | Cmd+K — run scripts, navigate, open docs (P0 basic) |

### 2.2 Dashboard / Bento

| Component | shadcn | Notes |
| --- | --- | --- |
| `MetricCard` | `Card` + `CardHeader` + `CardContent` | Grade, sandboxes active, CI, Node version |
| `SandboxCard` | `Card` + `Badge` + `Button` | Port monospace · START/STOP · Open ↗ |
| `ProtocolCard` | `Card` + `Button` | Start Project · End Project triggers |
| `QuickActionsGrid` | `Button` outline + `Tooltip` | Grouped: Lifecycle · Quality · Maintenance |
| `ActivityLog` | `ScrollArea` + monospace `pre` | Last N command results |

### 2.3 Integrity Center (signature)

| Component | shadcn | Notes |
| --- | --- | --- |
| `GradeHero` | custom + `Progress` | Large **61/61** display |
| `RunGraderButton` | `Button` default (accent) | Triggers `npm run grade` |
| `CheckAccordion` | `Accordion` | Categories with pass/fail rows |
| `FailurePanel` | `Alert` destructive | Only when grade &lt; 100% |

### 2.4 Sandbox Manager

| Component | shadcn | Notes |
| --- | --- | --- |
| `SandboxGrid` | responsive grid of `SandboxCard` | Railway-style cards |
| `SandboxDetail` | `Tabs` | Overview · Logs · Env |
| `TerminalLog` | styled `pre` or xterm (P1) | `#0a0a0a` bg · semantic colors |

### 2.5 Template Gallery

| Component | shadcn | Notes |
| --- | --- | --- |
| `TemplateCard` | `Card` | blueprint id, stack pills, SCAFFOLD CTA |
| `ScaffoldDialog` | `Dialog` + `Form` + `Input` | name, target path, seed toggle |
| `CommandPreview` | `code` block | Shows exact `msc:template` command |

### 2.6 Script Runner & Env

| Component | shadcn | Notes |
| --- | --- | --- |
| `ScriptList` | `ScrollArea` + searchable list | Grouped by Lifecycle/Quality/etc. |
| `ScriptTerminal` | full-height `pre` | Stream output |
| `EnvTable` | `Table` | Key · masked value · placeholder flag |
| `EnvTabs` | `Tabs` | Root · Sandbox A/B/C |

### 2.7 Global patterns

| Pattern | shadcn | Notes |
| --- | --- | --- |
| Status badge | `Badge` | RUNNING · STOPPED · PASS · FAIL |
| Confirm destructive | `AlertDialog` | Kill ports, stop sandbox |
| Toast | `Sonner` or `Toast` | Script completion bottom-right |
| Empty state | `Card` centered | Monospace hint, single CTA |

**Icons:** Lucide React only · 20px · stroke 1.5.

---

## 3. State & Data Strategy

### 3.1 Architecture principle

```
┌──────────────┐     API Routes (App Router)      ┌─────────────────┐
│  React UI    │ ──► child_process spawn ──────►│  msc:* scripts  │
│  (Studio)    │ ◄── stdout/stderr parse ────────│  (repo root)    │
└──────────────┘                                 └─────────────────┘
```

- **Do not reimplement** grader, health, or template logic in the dashboard.
- Spawn from API routes with `cwd` = repo root · env from hydrated `process.env` (`.env.local` via existing loader pattern).

### 3.2 TanStack Query (server state)

| Query key | Source | Poll interval | Purpose |
| --- | --- | --- | --- |
| `health` | `npm run msc:health -- --json` | 5s | Ports 3000–3002, **3010**, 8080 (3010 after P0.7) |
| `grade` | parse `npm run grade` output | on-demand + after mutations | 61/61 score |
| `grade-detail` | extended parse (P1) | on-demand | Per-check list |
| `templates` | `msc:template -- list` | 5m | Template gallery |
| `validate-env` | `msc:validate-env` | on-demand | Env manager status |
| `node-info` | health JSON / node -v | 60s | Header metadata |

**Mutations** (invalidate health/grade on success):

- `startSandbox` → `msc:dev:*`
- `killPorts` → `msc:kill-dev-port`
- `runScript` → arbitrary `npm run …`
- `scaffold` → `msc:template apply` (+ optional seed)

### 3.3 Zustand (UI state)

| Store slice | State |
| --- | --- |
| `shell` | sidebar collapsed · active route |
| `logs` | drawer open · active stream buffer · auto-scroll |
| `sandbox` | selected sandbox id · per-sandbox log buffer |
| `scriptRunner` | selected script · running pid (for abort P1) |
| `commandPalette` | open · query |

### 3.4 Persistence (local only)

| Data | Storage | Purpose |
| --- | --- | --- |
| Recent scaffolds | `localStorage` JSON | Recent Projects list |
| UI preferences | `localStorage` | sidebar collapsed |
| Grade history | optional file P1 | Trend chart |

**Never persist secrets** — `.env.local` stays filesystem-only.

### 3.5 Real-time logs

- WebSocket or SSE from API route streaming `child_process` stdout (P0: SSE acceptable).
- ANSI colors optional P1; P0: line-prefix coloring (PASS/OK/FAIL).

---

## 4. Technical Placement & Lean Boundary

| Rule | Implementation |
| --- | --- |
| **Location** | `ui/dashboard/` — own `package.json` |
| **Port** | **3010** — Boilerplate Studio dev server (dedicated; not a sandbox) |
| **Kill-list (P0)** | **3010** must be in `scripts/msc-kill-all-dev-ports.mjs` alongside 3000, 3001, 3002, 8080 — do not rely on P0.7 alone |
| **Root deps** | Forbidden — only new root script: `"msc:dev:dashboard": "cd ui/dashboard && npm run dev"` |
| **Styling** | Import `../../ui/msc-shield.css` in `globals.css` · extend `tailwind.config.ts` with `msc-*` utilities |
| **Path** | Path B hybrid (Tailwind + shadcn) — not Path A Shield-only satellites |

**Alternative (lower isolation):** extend `examples/nextjs-tailwind/` — rejected for Studio scale; dedicated `ui/dashboard/` keeps boilerplate example sandbox pristine.

**Port 3010 — kill-list (explicit, do not miss):**

- [ ] Add **3010** to `scripts/msc-kill-all-dev-ports.mjs` (same array/loop as 3000–3002, 8080)
- [ ] Document **3010** in `.cursor/docs/system-architecture.md` port registry table
- [ ] Extend `scripts/health.mjs` (and `scripts/__tests__/health.test.mjs`) to probe **3010** when dashboard exists
- [ ] P0.7 milestone verification — kill + health both recognize Studio port

---

## 5. MVP Feature Scope (P0 Web)

### 5.1 Must ship (P0)

1. **Dashboard (Bento home)** — metric row · 3 sandbox cards · protocol rituals · quick actions · activity strip  
2. **Integrity Center** — 61/61 hero · run grader · progress · sample categorized checks (parse or mock until parser exists)  
3. **Sandbox Manager** — start/stop/open · port status from health JSON  
4. **Template Gallery + Scaffold modal** — list blueprints · apply + optional seed · terminal output  
5. **Script Runner** — script list · run · terminal panel  
6. **Protocol Center** — buttons/workflows for Start Project gate + End Project sequence (documented steps + run commands)  
7. **Env Manager (basic)** — validate-env status · link to docs for editing `.env.local`  
8. **Port Registry table** — from health JSON · kill-all with confirm  
9. **Global log drawer** — any mutation streams here  

### 5.2 Defer (P1+)

- Command palette full parity (v0-4)  
- CI/CD release tagging UI (v0-2)  
- Documentation center renderer  
- Analytics charts (v0-6)  
- AI project builder placeholder UI only (v0-4)  
- GitHub API live release info  
- Grade history Recharts  
- Tauri desktop shell  

---

## 6. Roadmap Phases

### Phase P0 — Web MVP (Boilerplate-FrontEnd-v1)

**Goal:** Shippable `ui/dashboard` on port **3010** calling existing scripts.

| Milestone | Deliverable | Verification |
| --- | --- | --- |
| P0.1 | Scaffold `ui/dashboard` Next 15 + shadcn + token bridge | `npm run build` in package |
| P0.2 | API routes: health, grade, spawn script | Integration tests |
| P0.3 | App shell + Dashboard Bento | Manual + Storybook optional |
| P0.4 | Integrity Center + Sandbox Manager | `grade` 61/61 displays |
| P0.5 | Template gallery + scaffold flow | `msc:template list` works |
| P0.6 | Protocol Center + log drawer | `start-project:gate` from UI |
| P0.7 | Add port 3010 to `msc-kill-all-dev-ports.mjs` + docs | health probe includes 3010 |
| P0.8 | README `ui/dashboard/README.md` | Lean Boundary audit |

**Exit criteria:** Operator can cold-start, launch sandboxes, run grader, scaffold template, and close session without terminal — matching `@Start-Project.md` / `@End-Project.md` intent.

### Phase P1 — Desktop & depth

| Milestone | Deliverable |
| --- | --- |
| P1.1 | Tauri 2 wrapper loading `localhost:3010` or embedded static export |
| P1.2 | Native folder picker for scaffold target |
| P1.3 | Full grade parser — all 61 checks in accordion |
| P1.4 | Command palette (Raycast-style) |
| P1.5 | Grade history + export report |
| P1.6 | xterm.js log viewer · process abort |

### Phase P2 — Platform

- Documentation center · deployment center · MCP status panel · optional AI builder

---

## 7. Navigation & Information Architecture

**Sidebar (collapsed groups):**

| Section | Route | Priority |
| --- | --- | --- |
| **OVERVIEW** | | |
| Dashboard | `/` | P0 |
| **SANDBOXES** | | |
| Minimal (:3000) | `/sandboxes/minimal` | P0 |
| Payload (:3001) | `/sandboxes/payload` | P0 |
| Tailwind (:3002) | `/sandboxes/tailwind` | P0 |
| **TOOLS** | | |
| Integrity Center | `/integrity` | P0 |
| Script Runner | `/scripts` | P0 |
| Templates | `/templates` | P0 |
| Env Manager | `/env` | P0 |
| **SYSTEM** | | |
| Port Registry | `/ports` | P0 |
| Protocols | `/protocols` | P0 |
| Changelog | `/changelog` | P1 |
| Settings | `/settings` | P1 |

---

## 8. Canonical Script Surface (UI buttons)

All buttons map 1:1 to `package.json` scripts — no invented commands.

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
- `npm run msc:health` / `msc:health -- --json`

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

### Protocols (orchestrated sequences)

- **Start Project:** `start-project:gate` + readiness checklist UI  
- **End Project:** `msc:kill-dev-port` → `start-project:gate` optional → git status display → project-log reminder → Handoff Block template  

---

## 9. Actionable v0.dev Prompt (copy-paste)

Copy everything inside the fence below into [v0.dev](https://v0.dev) to generate the **P0 MVP** UI.

````markdown
You are an expert frontend architect. Build **Boilerplate Studio — Vader Protocol Control Plane**, a production-grade Next.js 15 dashboard (App Router, TypeScript, Tailwind CSS 3, shadcn/ui).

## Brand (use exactly — Vader Protocol v2.5.0)

- Product: Boilerplate Studio v2.5.0
- Tagline: Production-hardened Cursor-native ecosystem with 61-point integrity grader and triple-sandbox modularity
- Live brand reference: https://vaderlabz.com
- Header signature (monospace, 11px): `// VADER_PROTOCOL :: CONTROL_PLANE`
- Colors — map to Tailwind from CSS variables (define in globals + tailwind.config):
  - --msc-bg-main: #121212
  - --msc-bg-surface: #1c1c1c
  - --msc-surface-raised: #242424
  - --msc-border: #2a2a2a
  - --msc-text-primary: #e0e0e0
  - --msc-text-secondary: #888888
  - --msc-accent: #e02b20 (PRIMARY CTA — Vader red)
  - --msc-accent-hover: #c41e14
  - --msc-success: #1D9E75
  - --msc-warning: #BA7517
  - --msc-info: #185FA5
- Typography: Geist or Inter for UI; monospace (Geist Mono) for ports, grade scores, logs, npm script names
- Aesthetic: Linear.app + Vercel Dashboard + Railway cards — premium enterprise dev tool. NOT cyberpunk neon. NOT purple SaaS gradients.
- Motion: 150ms transitions; subtle green pulse on RUNNING status dots only

## Layout

- Fixed left sidebar 220px: Overview (Dashboard), Sandboxes (3000/3001/3002), Tools (Integrity, Scripts, Templates, Env), System (Ports, Protocols)
- Fixed top header 48px: protocol signature left; center "SYSTEM ONLINE" with green pulse or "DEGRADED"; right badges "v2.5.0" and "61/61"
- Main: scrollable content
- Optional right Sheet 360px for global logs (toggle in header)

## Page 1 — Dashboard (Bento Grid home)

Use a responsive Bento grid:

ROW 1 — four metric cards:
1) Grade "61/61" "100% CERTIFIED" green shield icon
2) Active Sandboxes "2/3" with labels
3) CI "PASSING"
4) Node "v20.19.1"

ROW 2 — three equal sandbox cards (Minimal :3000, Payload CMS :3001, Tailwind :3002):
Each: stack pills, large port number monospace, RUNNING green pulse or STOPPED grey dot, START/STOP buttons, "Open ↗" when running

ROW 3 — two columns:
Left card "Protocol Rituals": buttons "Start Project" (runs start-project:gate) and "End Project"
Right card "Quick Actions" grouped buttons with real script labels:
  Lifecycle: bootstrap, validate-env, kill-dev-port
  Quality: grade (accent red), lint, lint:fix, test:root
  Maintenance: shield:audit, verify:mcp

ROW 4 — Recent Activity log (monospace terminal style):
Sample lines like:
  14:23:01 [PASS] npm run grade — 61/61 (100%) — 2.3s
  14:18:44 [OK] npm run msc:lint — 0 errors — 1.1s

## Page 2 — Integrity Center

- Hero: huge "61/61" monospace, green progress bar full width
- Prominent red "RUN GRADER" button
- Accordion categories with sample checks (Root Config, MCP, UI Shield, Sandboxes, Security) each with green check rows
- Show failure panel only in a variant (red border) for documentation

## Page 3 — Sandbox detail (Payload CMS example)

- Header with START/STOP, port 3001, stack description
- Terminal log panel 400px height dark #0a0a0a with sample Next.js dev output
- Env status card: ".env.local" placeholder warnings

## Page 4 — Script Runner

- Left: searchable list of npm scripts (grade, msc:lint, msc:dev:example, etc.)
- Right: terminal with sample output for `npm run msc:lint` ending in "Exited 0 · 1.4s [PASS]"

## Page 5 — Template Gallery

- Grid of 4 cards: frontend/portfolio, cms/divi-bridge, full-stack/task-manager, full-stack/vader-site (featured, link vaderlabz.com)
- SCAFFOLD opens Dialog: project name, target path, seed checkbox, command preview

## Components

Use shadcn: Button, Card, Badge, Dialog, Sheet, Accordion, Tabs, Table, Progress, Alert, Tooltip, Sonner toasts, ScrollArea
Icons: Lucide only
No CSS modules. No inline styles. Use Tailwind utility classes mapped to msc tokens.

## Sample data rules

Use REAL script names (npm run grade, msc:dev:payload, etc.) and REAL ports 3000, 3001, 3002, 3010.
Use realistic copy — not lorem ipsum.
Dashboard port for this app: 3010.

## Output

Generate a cohesive multi-page UI prototype with navigation between all pages. Dark theme only. Should feel shippable — the face of a professional boilerplate project.
````

### 9.1 First Run (v0 follow-up — run after first generation)

After v0 ships the UI prototype, paste this **second prompt** in the same v0 chat (or a new one with the generated code attached):

> Replace all mock data with real API calls. Use `fetch` to `/api/health`, `/api/grade`, and `/api/run-script`. The production API routes will use `child_process` to execute repo-root npm scripts.

**Optional third prompt (tokens + registry):**

> Map all colors to `tailwind.config.ts` using `var(--msc-*)`. Add port **3010** (Boilerplate Studio) to the Port Registry page with kill action wired to the same pattern as 3000–3002.

### 9.2 Optional UX polish (v0 may skip — implement in P0 if missing)

| Item | Why it matters | P0 guidance |
| --- | --- | --- |
| **Error states** | v0 often omits failure UX | Port conflicts (EADDRINUSE), script non-zero exit, grader timeout — use `Alert` destructive + actionable CTA (“Kill port 3000”, “Retry grade”) |
| **Loading states** | Health polling and grade runs feel broken without feedback | Skeleton cards on Dashboard metrics; `Button` loading on RUN GRADER; pulse on sandbox cards while `health` query is `isFetching` |

---

## 10. Implementation Checklist (engineering)

- [ ] Create `ui/dashboard/` package (Next 15, isolated deps)
- [ ] Bridge `ui/msc-shield.css` + Tailwind `msc-*` utilities
- [ ] API routes: `/api/health`, `/api/grade`, `/api/run-script`
- [ ] TanStack Query + Zustand stores per §3
- [ ] Wire sandbox START/STOP (spawn/kill — P0 may open browser only on "Open")
- [ ] Parser for `grade` stdout → accordion data (incremental)
- [ ] Add **3010** to `scripts/msc-kill-all-dev-ports.mjs` and `.cursor/docs/system-architecture.md`
- [ ] `ui/dashboard/README.md` + DOCS.md index link
- [ ] Do not modify root `package.json` except one `msc:dev:dashboard` script
- [ ] Verify `npm run grade` still **61/61** from repo root after integration

---

## 11. References (repository)

| Doc | Path |
| --- | --- |
| Constitution | `TRUTH.md` |
| Operator controls | `README.md` § Operator Controls |
| Cold start | `.cursor/prompts/Start-Project.md` |
| Session close | `.cursor/prompts/End-Project.md` |
| Token bridge example | `examples/nextjs-tailwind/tailwind.config.ts` |
| Path B rules | `.cursor/rules/tailwind-shadcn-bridge.mdc` |
| Port contract | `.cursor/docs/system-architecture.md` |

---

*Synthesized 2026-05-25 · Boilerplate-FrontEnd-v1 · Ready for v0.dev and P0 implementation.*
