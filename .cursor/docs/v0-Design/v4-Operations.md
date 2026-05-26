# Vader Protocol — Operations, Scope & Navigation

**Module:** `v4-Operations.md`  
**Product:** Vader Protocol · **Baseline:** v2.5.0-Engine · **Nav:** Dashboard → Projects → Templates → Sandboxes → Integrity → Operations → Protocols → Settings

**Blueprint modules:** [v1-Overview.md](v1-Overview.md) · [v2-Layout-Components.md](v2-Layout-Components.md) · [v3-State-Data.md](v3-State-Data.md) · [v4-Operations.md](v4-Operations.md) · [v5-Implementation.md](v5-Implementation.md) · [v6-Master-Prompt.md](v6-Master-Prompt.md)

**Role:** P0/P1 feature scope, sidebar IA, canonical npm script surface.  
**Components:** [v2-Layout-Components.md](v2-Layout-Components.md) · **Roadmap:** [v5-Implementation.md](v5-Implementation.md) §6

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
13. **Loading + error states** — Skeleton + destructive Alerts per [v3-State-Data.md](v3-State-Data.md) §3.6  

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

*Module 4 of 6 · Engineering → [v5-Implementation.md](v5-Implementation.md)*
