# Vader Protocol — Implementation & Roadmap

**Module:** `v5-Implementation.md`  
**Product:** Vader Protocol · **`ui/dashboard/`** · Port **3010**

**Blueprint modules:** [v1 Overview](v1-Overview.md) · [v2 Layout & Components](v2-Layout-Components.md) · [v3 State & Data](v3-State-Data.md) · [v4 Operations](v4-Operations.md) · [v5 Implementation](v5-Implementation.md) · [v6 Master Prompt](v6-Master-Prompt.md)

**Role:** Lean Boundary, phased roadmap, engineering checklist, repository references.  
**v0 generation:** [v6-Master-Prompt.md](v6-Master-Prompt.md)

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

## 6. Roadmap Phases

### Phase P0 — Web MVP

**Goal:** `ui/dashboard` on **3010** — operator can run full session without terminal.

| Milestone | Deliverable | Verification |
| --- | --- | --- |
| P0.1 | Scaffold Next 15 + shadcn + token bridge | `npm run build` in package |
| P0.2 | API: `/api/health`, `/api/grade`, `/api/run-script`, SSE logs | Integration smoke |
| P0.3 | App shell + **Command Palette (Cmd+K)** + [v4](v4-Operations.md) §7 nav | Palette navigates all routes |
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

## 10. Implementation Checklist (engineering)

- [ ] Create `ui/dashboard/` package (Next 15, isolated deps)
- [ ] Bridge `ui/msc-shield.css` + Tailwind `msc-*` utilities
- [ ] API routes: `/api/health`, `/api/grade`, `/api/run-script` + SSE log stream
- [ ] TanStack Query + Zustand per [v3-State-Data.md](v3-State-Data.md) (`theme: 'dark' \| 'oled'` in `shell`)
- [ ] **Command Palette (Cmd+K)** — P0.3 gate, not deferrable
- [ ] **`AlertDialog`** on all destructive actions ([v2-Layout-Components.md](v2-Layout-Components.md) §1.3, §2.9)
- [ ] **Skeleton** loading on async UI blocks
- [ ] Sidebar IA per [v4-Operations.md](v4-Operations.md) §7 (Dashboard → … → Settings)
- [ ] Projects page ([v2-Layout-Components.md](v2-Layout-Components.md) §2.3 table spec) + `localStorage` recent scaffolds
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

*Module 5 of 6 · v0 prompt → [v6-Master-Prompt.md](v6-Master-Prompt.md)*
