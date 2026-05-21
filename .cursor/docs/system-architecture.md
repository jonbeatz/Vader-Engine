# System Architecture Map

Single source of truth for repository layout, subsystem boundaries, and integration contracts. Aligns with the master profile in [README.md](../../README.md). Agent routing compass: [Code-Jedi.md](./Code-Jedi.md). Technical precedence: [TRUTH.md](./TRUTH.md).

> **Namespace Protocol:** All custom modules and CSS utilize the `msc-` or `MSC_` prefix to ensure cross-project portability and prevent integration conflicts. These are treated as structural namespaces for collision prevention, not branding. When cloning this boilerplate for a new project, these can be globally replaced if a different namespace anchor is required.

**Core engine files:** `scripts/msc-core-sync.mjs`, `core/msc-core-engine.ts` (`MSC-Core-*` documentation convention; `msc-core-*` on disk).

---

## Unified Core Layout Tree

```text
📁 Boilerplate-v1/
├── 📄 START-HERE.md              ◄ [Universal Cold-Start Ignition Runbook]
├── 📄 package.json                ◄ [Command Registry: verify, kill, smoke, repair]
├── 📄 .env.example                ◄ [Strategy Environment Configuration Contract]
├── 📂 .cursor/
│   ├── 📄 mcp.json                ◄ [Project-Scoped AI Agent Context Connectors]
│   ├── 📂 prompts/                ◄ [Operational Gates: task-planner, session-handoff]
│   └── 📂 skills/                 ◄ [The 7-Node Architectural Competency Index]
├── 📂 core/                       ◄ [PHP Engine Bootstrappers & Headless TS Contracts]
├── 📂 config/                     ◄ [Proxy Mappings & Structural Configuration Appendixes]
├── 📂 scripts/                    ◄ [Defensive Terminal Automation & Repair Gates]
└── 📂 ui/                         ◄ [Scope-Isolated CSS Primitives & Visual Layout Shields]
```

Extended operator docs, hooks, rules, and repair runbooks live under `.cursor/docs/` (see [ecosystem-options-matrix.md](./ecosystem-options-matrix.md)). Consumer apps merge optional npm aliases from `config/npm-scripts-appendix.json`.

---

## Integrated Subsystems (4 Layers)

### 1. Entry & AI Context Layer

**Paths:** `START-HERE.md`, `.cursor/`, `.cursorrules` (session bindings at repo root)

Cold-start ignition routes operators through environment copy, MCP verification, and session open/close rituals before code changes.

| Asset | Function |
|-------|----------|
| `START-HERE.md` | Ordered runbook: env → gates → dev lifecycle |
| `.cursor/prompts/` | **task-planner** (session open), **session-handoff** (close), incident/refactor protocols |
| `.cursor/skills/README.md` | Seven-node competency router (WordPress, Node runtime, data ops, docs governance, handoff, AI proxy, GitHub) |
| `.cursor/mcp.json` | Project-scoped MCP server definitions (keys via env, never committed) |
| `scripts/msc-verify-mcp.mjs` | Structural MCP config validation |

Agents read skills and prompts first; MCP extends filesystem, GitHub, search, and optional CMS connectors without embedding secrets in the tree.

---

### 2. Logic & Database Core

**Paths:** `core/`, `scripts/`

Portable contracts and terminal gates shared across PHP, Payload/Next, and standalone Node consumers. Logic stays env-driven—no hardcoded hosts or tenant IDs.

| Area | `core/` modules | `scripts/` gates |
|------|-----------------|------------------|
| PHP bootstrap | `msc-bootstrap.php`, `msc-assets.php`, `msc-utilities.php`, `msc-communications.php` | — |
| Headless CMS | `msc-payload-bridge.ts`, `msc-payload-media-hooks.ts`, `msc-payload-sqlite-push.ts`, `msc-sqlite-path.ts` | `msc-core-sync.mjs` |
| Data safety | `msc-payload-auth-delete-preflight.ts`, portfolio/subscription collections | `msc-sqlite-repair.mjs`, `msc-sqlite-wal-purge.mjs`, `msc-rescue-admin.mjs` (stub) |
| Runtime recovery | — | `msc-kill-dev-port.mjs`, `msc-local-http-smoke.mjs`, `msc-dev-recover.mjs`, `msc-verify-next-safe.mjs`, `msc-clean-next-cache.mjs` |

**Fix-Local-First gate sequence (web):**

```text
msc-kill-dev-port.mjs  →  msc-local-http-smoke.mjs   (port MSC_DEV_PORT, default 3000)
```

SQLite workflows: backup-first repair manifest, WAL sidecar purge before deploy copy, dual `DATABASE_URI` / `DATABASE_URL` resolution. See [local-data-operations.md](../skills/local-data-operations.md) and [sqlite-repair-manifest.md](./sqlite-repair-manifest.md).

---

### 3. Scoped Presentation Shield

**Paths:** `ui/`, enforced by `.cursor/rules/studio-dark-ui.md`

Visual layer is **scope-isolated**—tokens and components bind to `.msc-viewport-shield` and `.msc-dashboard-container` only. No global document resets; no framework bleed.

| File | Role |
|------|------|
| `msc-shield.css` | Canonical Studio Dark tokens (`#121212` canvas, `#1c1c1c` surface, accent via `--msc-accent`) |
| `msc-shield-extensions.css` | Optional barrel: glass, forms, motion, layout utilities (load when `MSC_SHIELD_EXTENSIONS=1`) |
| `msc-hero-slider.css` / `.tsx` | Carousel primitive atop shield |
| `msc-project-manager.tsx`, `msc-portfolio-viewer.tsx` | Dashboard grids reusing `.msc-card-panel` |

PHP enqueue path: `core/msc-assets.php` loads shield → optional extensions → hero slider. Next/React consumers import CSS in the same order.

---

### 4. Multi-Strategy Configuration Matrix

**Paths:** `.env.example`, `config/`, [ecosystem-options-matrix.md](./ecosystem-options-matrix.md)

All cross-cutting behavior is **selectable**, not defaulted. Operators enable strategies in `.env.local`; the template ships contracts and stubs only.

| Strategy domain | Primary env keys | Reference |
|-----------------|------------------|-----------|
| Application origin | `MSC_PUBLIC_ORIGIN`, `NEXT_PUBLIC_SITE_URL` | `.env.example` |
| SQLite / Payload | `DATABASE_URI`, `DATABASE_URL`, `PAYLOAD_SQLITE_PUSH`, `PAYLOAD_MIGRATING` | `core/msc-sqlite-path.ts` |
| Schema repair | `MSC_SQLITE_REPAIR_MANIFEST`, `MSC_SQLITE_REPAIR_DRY_RUN` | `config/sqlite-repair-manifest.example.json` |
| Media pipeline | `MSC_MEDIA_STRATEGY` (`local` \| `multi-tenant` \| `stream-cdn`) | [media-strategy-specs.md](./media-strategy-specs.md) |
| UI extensions | `MSC_SHIELD_EXTENSIONS` | `ui/msc-shield-extensions.css` |
| Build / recovery | `MSC_CLEAN_NEXT`, `MSC_DEV_RECOVER_CLEAN`, `MSC_VERIFY_NEXT_RUN_BUILD` | [REPAIR_PROTOCOLS.md](./REPAIR_PROTOCOLS.md) |
| AI proxy | `MSC_LITELLM_PORT`, GCP paths under `config/` | [local-ai-proxy-setup.md](./local-ai-proxy-setup.md) |
| MCP integrations | Keys mirrored in `.env.example` | [mcp-setup.md](./mcp-setup.md) |

Consumer `package.json` scripts are appended from `config/npm-scripts-appendix.json` (`repair:sqlite`, `dev:recover`, `verify:next:safe`, `start-project:smoke`, etc.).

---

## Port & Connector Contract

| Port | Role |
|------|------|
| **3000** | Web dev + HTTP smoke (`MSC_DEV_PORT`) |
| **4000** / **8000** | Local AI proxy (`MSC_LITELLM_PORT`) |

| Connector | Entry |
|-----------|--------|
| MCP agents | `.cursor/mcp.json` + `msc-verify-mcp.mjs` |
| Env contract | `.env.example` → consumer `.env.local` |
| Mail (optional) | `msc_send_mail()` / `MSC_STUDIO_OUTGOING_*` in PHP bridge |
| Data store (default) | SQLite via Payload adapter; override URI per environment |

---

## Agent Competency Index (7 Nodes)

See [`.cursor/skills/README.md`](../skills/README.md):

1. WordPress & Divi Engineering  
2. Node.js Runtime Mastery (runtime-gate)  
3. Local Data & Infrastructure Operations  
4. Documentation & Governance Operations  
5. Session Handoff & Project Closeout  
6. Local AI Proxy Engine (doc Node 6)  
7. GitHub Automation & Release Governance (doc Node 7)  

---

## Related Architecture Artifacts

| Document | Purpose |
|----------|---------|
| [TRUTH.md](./TRUTH.md) | Constitution — doc precedence, Fix-Local-First, token baseline |
| [ecosystem-options-matrix.md](./ecosystem-options-matrix.md) | Full env ↔ script matrix |
| [discovered-logic-map.md](./discovered-logic-map.md) | Pillar-repo port audit |
| [project-log.md](./project-log.md) | Session changelog |
