# Vader Protocol — Implementation & Roadmap

**Module:** `v5-Implementation.md`  
**Product:** Vader Protocol · **`ui/dashboard/`** · Port **3010**

**Blueprint modules:** [v1-Overview.md](v1-Overview.md) · [v2-Layout-Components.md](v2-Layout-Components.md) · [v3-State-Data.md](v3-State-Data.md) · [v4-Operations.md](v4-Operations.md) · [v5-Implementation.md](v5-Implementation.md) · [v6-Master-Prompt.md](v6-Master-Prompt.md)

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
| Modular blueprint index | `.cursor/docs/v0-Design/README.md` |
| Supplemental notes | [Updated-Notes/](Updated-Notes/) |
| Visual references | `.cursor/design_references/v0-Design-Refrences/` |

---

## 12. Post-v0 Integration Workflow

After downloading the v0 `.zip`, **do not** extract directly into `ui/dashboard/`. Follow this sequence to preserve Lean Boundary integrity:

| Step | Action |
| --- | --- |
| 1. **Extract & isolate** | `unzip v0-dashboard.zip -d ui/dashboard-temp` — copy only `/app`, `/components`, `/lib`, `tailwind.config.ts`, etc. into `ui/dashboard/`; remove temp folder |
| 2. **Verify** | `cd ui/dashboard && npm install && npm run dev` — confirm UI on **http://localhost:3010** |
| 3. **Token bridge** | Point `ui/dashboard/globals.css` at `../../ui/msc-shield.css`; align `tailwind.config.ts` with Path B (`examples/nextjs-tailwind/`) |
| 4. **Cursor handoff** | Open Composer (Cmd+I) → drag `ui/dashboard/` + attach [v6-Master-Prompt.md](v6-Master-Prompt.md). Use integration prompt in [Updated-Notes/v0-Notez2.md](Updated-Notes/v0-Notez2.md) §3 |
| 5. **Port registry** | Add **3010** to `scripts/msc-kill-all-dev-ports.mjs`; extend `scripts/health.mjs` + tests; root `.gitignore` for `ui/dashboard/node_modules/`, `.next/`, `.env.local` |
| 6. **API wiring** | Replace mocks with `/api/health`, `/api/grade`, `/api/run-script`, SSE log stream — `cwd` = repo root per [v3-State-Data.md](v3-State-Data.md) |
| 7. **Validate** | From repo root: `npm run grade` (**61/61**), `npm run msc:dev:dashboard`, smoke Dashboard / Integrity / Command Palette |

**Design-Code Bridge Protocol:** Prototype UI in v0 using [v6-Master-Prompt.md](v6-Master-Prompt.md). Avoid manual CSS drift — refactor v0 output in Composer against `.cursor/rules/` and `msc-*` tokens.

**Optional Git flow:** Push v0 output to `feat/design-vader-dashboard` before merging to `main`.

---

## 13. Tooling & Integration Resources

### GitHub tools

| Project | Purpose |
| --- | --- |
| [hellolucky/v0-mcp](https://github.com/hellolucky/v0-mcp) | MCP server — Cursor Agent calls v0 API for React components |
| [zudsniper/mcp-v0](https://github.com/zudsniper/mcp-v0) | Alternative MCP — multi-file generation, Figma-guided path |
| [@djm204/agent-skills](https://www.npmjs.com/package/@djm204/agent-skills) | 44 prompt packs (web-frontend, web-backend, code review, security) |
| [ai-agent-skills](https://www.npmjs.com/package/ai-agent-skills) | CLI to install curated Cursor skills |
| [Composio](https://composio.dev) | OAuth connector for v0 ↔ Cursor MCP setup |
| [bdcorps/cursor-demo](https://github.com/bdcorps/cursor-demo) | Example GitHub Actions + Cursor tooling in CI |

### Cursor skills (install from repo root)

```bash
npx ai-agent-skills install webapp-testing --agent cursor
npx ai-agent-skills install web-frontend --agent cursor
npx ai-agent-skills install web-backend --agent cursor
```

### MCP integration (Cursor ↔ v0)

| Method | Setup |
| --- | --- |
| **API key** | v0 API key in Cursor OpenAI settings; base URL `https://api.v0.dev/v1` — Agent calls v0 like an LLM |
| **MCP server** | Configure `v0-mcp` or `mcp-v0` in `.cursor/mcp.json` — programmatic tool calls from Agent mode |

**Workflow (local first):** Design in v0 → GitHub branch/PR → pull in Cursor → integrate Vader Engine APIs → test on **3010** → deploy later (Hostinger / Vercel) when ready.

---

## 14. Vader Handoff (after v0 generation)

1. Extract v0 `.zip` to `ui/dashboard-temp/` (**never** directly to `ui/dashboard/`).
2. Verify generated `globals.css` imports `../../ui/msc-shield.css`.
3. Copy validated files to `ui/dashboard/`.
4. Open Cursor Composer (Cmd+I) → drag entire `ui/dashboard/` folder.
5. Prompt: *"Refactor this UI to use shared msc_ components, wire to /api/ endpoints per v3-State-Data.md, and enforce v6-Master-Prompt.md design standards."*

Post-handoff validation: `npm run grade` · `npm run msc:dev:dashboard` · test metrics, sandboxes, Templates, Command Palette on **3010**.

---

## 15. Name candidates (deferred)

Final product/repo naming is **not locked**. Preserve for future branding decisions (from supplemental notes):

**Tier 1:** Vader Protocol · Imperial Core · Jedi Studio Engine · Vader Engine Studioz  

**Tier 2:** Vader Construct · Vader Syntax · Vader Vault  

**Tier 3:** Vader Labz Core · Apex Studioz  

**Workspace split (recommended pair):** **Vader Protocol** (core engine) + **Vader Construct** (UI workbench) — see [v6-Master-Prompt.md](v6-Master-Prompt.md) branding table.

**Alternates under consideration:** Vertex, Daemon, Apex, Jedi, Master, Source, Syntax, Vault, Imperial, Shadowz, Fortress, Dark Side — and repo names such as Vader Labz, Vader Studioz, Vader Vault, Sith Vault, MSC Studioz Engine. Tag **SOVEREIGN** may be revised.

---

*Module 5 of 6 · v0 prompt → [v6-Master-Prompt.md](v6-Master-Prompt.md)*
