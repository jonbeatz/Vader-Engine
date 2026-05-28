# PROJECT_CONTEXT — Vader Engine Agent Onboarding Map

> **Derived onboarding doc.** Technical precedence: [TRUTH.md](TRUTH.md). Command truth: [package.json](package.json). Documentation index: [DOCS.md](DOCS.md).  
> **Cleanup mode (2026-05-27):** Option C — audit + this file only; no archive moves until you approve [.cursor/docs/audit/VADER_ENGINE_AUDIT_2026-05-27.md](.cursor/docs/audit/VADER_ENGINE_AUDIT_2026-05-27.md).

---

## 2.1 Executive Summary & Project Goals

**Vader Engine** is a Cursor-native, lean full-stack **development factory** (v2.5.0-Engine): structural self-grader (61 checks), triple Next.js sandboxes, Payload CMS example, Tailwind/shadcn Path B sandbox, Studio Dark Shield UI, template scaffolding CLI, and MCP-ready agent workflows.

| Field | Value |
|-------|--------|
| **Version** | `2.5.0` (`vader-engine` in root `package.json`) |
| **Repository** | [jonbeatz/Vader-Engine](https://github.com/jonbeatz/Vader-Engine) |
| **Primary users** | Operators and AI agents building MSC/Vader Protocol products |
| **Active feature work** | Vader Construct dashboard (`ui/dashboard/`, port **3010**) on `feat/v0-core-integration-v1` |

---

## 2.2 Complete Technical Stack

| Area | Technology |
|------|------------|
| **Runtime** | Node **20.x–24.x** (CI / `.nvmrc` pin **20.19.1**) |
| **Sandboxes** | Next.js 15.x — minimal, Payload v3, Tailwind 3 + shadcn |
| **Control plane** | Next.js 16 + Tailwind 3 (`ui/dashboard/`) |
| **WordPress** | Shield bridge via `core/` PHP + `templates/cms/divi-bridge` |
| **Styling** | MSC Shield — CSS variables in `ui/msc-shield.css`; Path B maps `var(--msc-*)` in Tailwind |
| **Hosting** | Hostinger workflow — [DEPLOY_TO_HOSTINGER.md](DEPLOY_TO_HOSTINGER.md), `scripts/prep-hostinger-deploy.sh` |
| **Testing** | Vitest (root + minimal sandbox), Playwright (`npm run msc:e2e`) |
| **Tooling** | `tools/msc-cli/` (`msc:template`), Biome, Husky |
| **AI** | `.cursor/mcp.json` (13 servers), optional LiteLLM proxy (ports **4000** / **8000**) |

---

## 2.3 Protocol Mandates (THE RULES)

1. **Naming:** `msc_` / `msc:` / `msc-` on custom code; Shield classes scoped under `.msc-*` wrappers.
2. **Aesthetic:** Studio Dark — BG `#121212`, surface `#1c1c1c`, accent `#e02b20` (tokens in Shield only).
3. **Integrity:** `npm run grade` → **61/61** before declaring baseline green.
4. **Zero-leak:** `.env.example` = contract; live values in `.env.local` only (gitignored).
5. **Security:** PHP under `core/` uses `defined('ABSPATH') || exit;` for WordPress consumers.
6. **Hydration:** Client relative-time UI must use mounted-state pattern (see dashboard activity feed).
7. **Commands:** Never invent npm scripts — UI allowlist mirrors root [package.json](package.json).

Full constitution: [TRUTH.md](TRUTH.md) · Session rules: [.cursor/rules/global.mdc](.cursor/rules/global.mdc).

---

## 2.4 Project Structure (Where Everything Lives)

| Path | Purpose | Status |
|------|---------|--------|
| `TRUTH.md`, `DOCS.md`, `START-HERE.md` | Human + agent entry | Active |
| `.cursor/rules/`, `.cursor/skills/`, `.cursor/prompts/` | Agent bindings | Active |
| `.cursor/docs/` | Runbooks, logs, audit | Active |
| `scripts/` | Automation (`msc:*` entry points) | Active |
| `scripts/lib/` | Shared libs (`msc-load-env`, spawn, grade parse) | Active |
| `tools/msc-cli/` | Template `list` / `apply` / `seed` / `doctor` | Active |
| `ui/msc-shield.css` + satellites | Token SSoT + feature CSS | Active |
| `ui/dashboard/` | Vader Construct ops UI | Active · **3010** |
| `examples/nextjs-minimal/` | Frontend baseline + Vitest | Active · **3000** |
| `examples/nextjs-payload/` | Payload CMS + SQLite | Active · **3001** |
| `examples/nextjs-tailwind/` | Path B hybrid demo | Active · **3002** |
| `templates/` | Read-only blueprints (never mutate in place) | Active |
| `templates/full-stack/vader-site/` | Marketing / optional Payload site | Active · **3003** when applied |
| `core/` | TS + PHP shared bridge | Active |
| `e2e/` | Playwright multi-sandbox | Active |
| `.cursor/design_references/` | v0 Stage 2 JPG/PDF refs | Active |
| `vader-site-deploy/` | Hostinger deploy output | Gitignored · regenerate only |
| `_archive/` | Future operator-approved moves | **Not created** — Phase 3A deferred all archive items (2026-05-27) |

**Do not archive `examples/`** — required by grader and CI.

---

## 2.5 Development Workflow & Commands

### Cold start

```bash
npm run msc:check-node
npm run start-project:gate    # validate-env · lint · grade · test:root
```

### Dev servers (from repo root)

| Command | Port | Target |
|---------|------|--------|
| `npm run msc:dev:example` | 3000 | `examples/nextjs-minimal` |
| `npm run msc:dev:payload` | 3001 | `examples/nextjs-payload` |
| `npm run msc:dev:tailwind` | 3002 | `examples/nextjs-tailwind` |
| `npm run msc:dev:dashboard` | 3010 | `ui/dashboard` |

Kill ports: `npm run msc:kill-dev-port` (all) or `npm run msc:kill -- <port>`.

Dashboard route smoke (dev must be up): `npm run msc:dashboard:smoke`.

### Quality

```bash
npm run grade
npm run msc:lint
npm run msc:test:root
npm run msc:shield:audit
npm run msc:e2e              # after msc:e2e:install
```

### Recovery

```bash
npm run dev:recover
npm run verify:next:safe
```

### Deployment

```bash
npm run msc:forge
bash scripts/prep-hostinger-deploy.sh   # → vader-site-deploy/ (gitignored)
```

Full inventory: `npm run inventory` · [.cursor/docs/Code-Jedi.md](.cursor/docs/Code-Jedi.md).

### Environment

All `scripts/*.mjs` import `scripts/lib/msc-load-env.mjs` first: `.env.local` → `.env.example` (fill gaps only).

---

## 2.6 UI/UX Design System

**Token SSoT:** [ui/msc-shield.css](ui/msc-shield.css)

| Token | Role |
|-------|------|
| `--msc-bg-main` | Page background |
| `--msc-bg-surface` | Cards / panels |
| `--msc-bg-surface-hover` | Hover states |
| `--msc-accent` / `--msc-accent-hover` | Primary actions |
| `--msc-text-primary` / `--msc-text-secondary` | Typography |
| `--msc-border-color` | Borders |
| `--msc-radius`, `--msc-transition` | Shape / motion |
| `--msc-gap-sm` / `md` / `lg` | Spacing scale |

**Path B (dashboard):** [ui/dashboard/app/globals.css](ui/dashboard/app/globals.css) imports Shield; shadcn theme maps to `var(--msc-*)` per [tailwind-shadcn-bridge.mdc](.cursor/rules/tailwind-shadcn-bridge.mdc).

**Load order (Path A):** Shield → Layout → Components → Feature satellites → optional extensions (`MSC_SHIELD_EXTENSIONS=1`).

**Modal / command palette:** Centered dialog; intentional `!important` overrides in dashboard globals (Biome warnings documented).

**Motion:** `prefers-reduced-motion` block in dashboard globals.

---

## 2.7 Key Components Registry

### Vader Construct (`ui/dashboard/`)

| Component / route | Path | Status |
|-------------------|------|--------|
| App shell | `components/dashboard/app-shell.tsx` | Stable |
| Dashboard home | `components/dashboard/dashboard-home.tsx` | Stable · TanStack Query |
| Sandbox cards | `components/dashboard/sandbox-card.tsx` | Stable · mutations + toasts |
| Command palette | `components/dashboard/command-palette.tsx` | Stable |
| Sidebar | `components/dashboard/sidebar.tsx` | Stable · Operations sub-nav |
| Query provider | `components/providers/msc-query-provider.tsx` | Stable |
| Hooks | `lib/hooks/msc-use-health.ts`, `msc-use-logs.ts`, `msc-use-sandbox-mutation.ts` | Stable |
| Templates page | `app/templates/page.tsx` | Live · `/api/templates` |
| Operations hub | `app/operations/page.tsx` | Stable · route grid |
| Ports / Env | `app/operations/ports/page.tsx`, `env/page.tsx` | Live · `/api/health`, `/api/env` |
| Protocols / Settings | `app/protocols/page.tsx`, `settings/page.tsx` | Static / client prefs |
| Integrity / grader | `app/integrity/page.tsx` | Stable · manual grade run |
| API health / grade / run-script / logs | `app/api/health`, `grade`, `run-script`, `logs` | Stable |
| API templates / env / projects / scripts | `app/api/templates`, `env`, `projects`, `scripts` | Stable |
| Bridge | `lib/msc-bridge.ts` | Stable |

### Sandboxes

| Item | Path |
|------|------|
| Smoke test widget | `examples/nextjs-minimal/components/msc-smoke-test/` |
| Path B hero | `examples/nextjs-tailwind/components/msc-sandbox-hero.tsx` |

### Templates (read-only)

| Blueprint | Path |
|-----------|------|
| Portfolio | `templates/frontend/portfolio/` |
| Divi bridge | `templates/cms/divi-bridge/` |
| Task manager | `templates/full-stack/task-manager/` |
| Vader site | `templates/full-stack/vader-site/` |

---

## 2.8 Current State & Known Issues

| Item | State |
|------|--------|
| **Integrity** | **61/61** · **8/8** tests |
| **Lint** | 11 warnings (`noImportantStyles` in dashboard globals) |
| **Branch** | `feat/v0-core-integration-v1` |
| **Dashboard** | Phase 1 largely wired (TanStack Query, live APIs, ops sub-pages); tickets mock + SSE polish open — [v0-integration-roadmap.md](.cursor/plans/v0-integration-roadmap.md) |
| **CI E2E** | `.github/workflows/ci.yml` installs sandbox + `ui/dashboard` deps before `npm run msc:e2e` |
| **Cleanup** | Audit complete; archive list awaiting operator approval |

---

## 2.9 Cleanup Recommendations (no action taken)

See checklist in [.cursor/docs/audit/VADER_ENGINE_AUDIT_2026-05-27.md](.cursor/docs/audit/VADER_ENGINE_AUDIT_2026-05-27.md).

**Tier-1 archive candidates (when you approve):** `design_references/VaderLabz/`, `design_references/deprecated/`, `ui/imports/msc-import-*`, `boilerplate_v240_suggestions.md`.

**Keep:** `examples/`, all `templates/`, `scripts/lib/msc-load-env.mjs`, Shield CSS.

---

## 2.10 Future Improvement Roadmap

### Short-term (operator review)

- [ ] Approve archive checklist → run `git mv` to `_archive/` per audit report
- [x] `msc:dashboard:smoke` wired in `package.json`
- [ ] Commit `Cleanup-Prompt.md` + audit + this file

### Medium (product)

- [x] Playwright dashboard E2E in CI (workspace `npm ci` before `msc:e2e`)
- [ ] Live activity SSE UI; wire `/projects` and `/operations/scripts` pages to APIs
- [ ] Optional grader check for `ui/dashboard/README.md`

### Long-term

- [ ] Depcheck per sandbox · trim duplicate v0 design assets after Stage 2
- [ ] Grade history + env manager on dashboard

---

## Quick links for new agents

1. Read [TRUTH.md](TRUTH.md) → [START-HERE.md](START-HERE.md) → this file  
2. Run `npm run start-project:gate`  
3. Dashboard: `npm run msc:dev:dashboard` → http://127.0.0.1:3010  
4. Task gate: [.cursor/prompts/task-planner.md](.cursor/prompts/task-planner.md)
