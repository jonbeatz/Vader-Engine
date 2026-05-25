# Code-Jedi — Master AI Routing & Module Compass

**Role:** Primary directory compass for incoming agents. Use this file first to locate reusable modules, invoke the correct npm scripts, and follow the documentation SSoT chain—before writing custom automation or duplicating logic.

**Constraints:** Unbranded baseline. Read secrets from `.env.local` via `process.env.*` only. Never paste API keys or passwords into chat.

> **Namespace Protocol:** All custom modules and CSS utilize the `msc-` or `MSC_` prefix to ensure cross-project portability and prevent integration conflicts. These are treated as structural namespaces for collision prevention, not branding. When cloning this boilerplate for a new project, these can be globally replaced if a different namespace anchor is required.

**Module file convention:** Consumer-facing engine files use the **`MSC-Core-`** prefix (e.g. `MSC-Core-Sync.mjs` → `scripts/msc-core-sync.mjs`). This is documentation naming; on-disk script files remain lowercase `msc-core-*` aligned with `msc_` / `msc-` anchors.

---

## Quick agent checklist

| Step | Action |
|------|--------|
| 1 | Read [HOW-TO.md](./HOW-TO.md) (operator runbook) + this file (agent module map) |
| 2 | Follow [START-HERE.md](../../START-HERE.md) cold-start phases |
| 3 | Run `npm run start-project` |
| 4 | Route deep work via [skills index](../skills/README.md) + SSoT chain below |
| 5 | Close with `npm run end-project` + [session-handoff](../prompts/session-handoff.md) |

---

## 1. Tactical intent matrix

Map the operator’s goal to **existing** assets. Extend via env flags and consumer wiring—do not fork parallel utilities.

| Developer objective | Primary modules | Configuration & rules | Automation |
|---------------------|-----------------|----------------------|------------|
| **Email signup & verification sequence** | `core/msc-payload-bridge.ts` (`MscSubscribersCollection`), `core/msc-subscription-handler.ts`, `core/msc-communications.php` | `.env.local`: `MSC_STUDIO_OUTGOING_*`, `BREVO_API_KEY`, `FLUENT_SMTP_CONFIG`, `PAYLOAD_SECRET`, `MSC_PUBLIC_ORIGIN`; CSRF via `msc_buildCsrfOrigins()` | Consumer Payload routes + `process.env` mail keys; validate at trust boundaries |
| **Database state & schema modifications** | `core/msc-sqlite-path.ts`, `core/msc-payload-sqlite-push.ts`, `core/msc-payload-bridge.ts` | `DATABASE_URI` / `DATABASE_URL`, `PAYLOAD_SQLITE_PUSH`, `PAYLOAD_MIGRATING`, `MSC_SQLITE_REPAIR_MANIFEST` | `npm run repair:sqlite`, `npm run db:wal-purge`; skill: [local-data-operations.md](../skills/local-data-operations.md) |
| **Core asset handling & streaming CDN** | `core/msc-payload-media-hooks.ts`, `core/msc-core-engine.ts`, `scripts/msc-core-sync.mjs` | `MSC_MEDIA_STRATEGY` (`local` \| `multi-tenant` \| `stream-cdn`), CDN vars in `.env.example` | `npm run media:sync` → `msc-core-sync.mjs`; spec: [media-strategy-specs.md](./media-strategy-specs.md) |
| **Studio Dark UI layout & scoped customization** | `ui/msc-shield-load.css`, satellites, `ui/msc-*.tsx`; MCP: `shadcn`, `context7` | Path A Shield-only · Path B hybrid Tailwind — [consumer-bootstrap.md](./consumer-bootstrap.md) §6 | Rules: [studio-dark-ui.mdc](../rules/studio-dark-ui.mdc), [tailwind-shadcn-bridge.mdc](../rules/tailwind-shadcn-bridge.mdc), [design-system-rules.mdc](../rules/design-system-rules.mdc); skill: [studio-dark-shield.md](../skills/studio-dark-shield.md) |
| **Auth admin & user lifecycle** | `core/msc-payload-auth-delete-preflight.ts`, `core/msc-auth-admin.ts` | `MSC_RESCUE_*` for lockout stub | `npm run db:rescue-admin` (consumer implementation); hook `preflightDeleteAuthUserRows` on auth collections |
| **Portfolio / showcase grid** | `core/msc-portfolio-collection.ts`, `ui/msc-portfolio-viewer.tsx`, `ui/msc-portfolio.css` | Register collection in consumer `payload.config.ts` | `.msc-portfolio-wrapper` + `msc-shield-load.css` |
| **WordPress / Divi integration** | `core/msc-bootstrap.php`, `core/msc-utilities.php`, `core/msc-assets.php`; consumer bridge `core-Divi-Scriptz.js` (master frontend script) | `msc_` PHP prefix, `msc-` CSS scope; enforce **`MSC-Core-`** file naming on media-related theme/plugin assets | Skill: [wordpress-divi-engineering.md](../skills/wordpress-divi-engineering.md) |
| **Template scaffolding & seeding** | `tools/msc-cli/`, `templates/` | `--target` sibling paths only; seed fallback `.sandbox/` | `npm run msc:template -- list|apply|seed|doctor`; plan: [templates-and-msc-cli.md](../plans/templates-and-msc-cli.md) |
| **Local dev ports & HTTP health** | `scripts/msc-kill-dev-port.mjs`, `scripts/msc-local-http-smoke.mjs` | `MSC_DEV_PORT` (default **3000**), `MSC_SMOKE_STRICT`, `MSC_SMOKE_PATHS` | `npm run msc:kill`, `npm run verify:local`; skill: [node-runtime-mastery.md](../skills/node-runtime-mastery.md) |
| **MCP & agent tooling** | `.cursor/mcp.json`, `.cursor/mcp-blueprint.json` | Keys in `.env.local`; `shadcn` / `context7` need no committed secrets | `npm run verify:mcp` (13 servers; dual-pass hydration audit) |
| **Next.js consumer app bootstrap** | Copy `core/`, `scripts/`, `ui/`, `.cursor/` | Full `.env.local` contract | Guide: [consumer-bootstrap.md](./consumer-bootstrap.md) |
| **Session governance & handoff** | `.cursor/prompts/task-planner.md`, `session-handoff.md` | [TRUTH.md](../../TRUTH.md) precedence | `npm run end-project`; log: [project-log.md](./project-log.md) |
| **Deploy / hosting (Node)** | — | `SPACESHIP_*` env keys | [spaceship-node-deployment.md](./spaceship-node-deployment.md) |
| **AI proxy (LiteLLM)** | `config/litellm_config.yaml` | `MSC_LITELLM_PORT` **4000** / **8000** | [local-ai-proxy-setup.md](./local-ai-proxy-setup.md) |

---

## 2. Script weaponry inventory (`package.json` registry)

**Authority:** Root `package.json` is the only npm command truth. Every script hydrates env via `scripts/lib/msc-load-env.mjs` (`.env.local` → `.env.example`). Prefer these over ad-hoc shell one-liners.

### Initialization & smoke

| Script | When to invoke | What it does |
|--------|----------------|--------------|
| `npm run start-project` | **Every session open** (after task-planner approval) | Alias → `start-project:smoke` |
| `npm run start-project:smoke` | Cold-start health chain | MCP structure verify + optional `MSC_SMOKE_RUN_TYPECHECK` / migrations |
| `npm run verify:local` | Dev server should respond on web port | HTTP smoke on `MSC_DEV_PORT` (default **3000**) |
| `npm run msc:smoke` | Same as `verify:local` (canonical name in gate docs) | Paths from `MSC_SMOKE_PATHS`; template bypass if port idle |
| `npm run end-project` | **Session close** | Kill port **3000** + smoke (exit **0** in template-only mode) |

**Template note:** If no listener on the web port, smoke prints *Baseline Template Mode Detected* and exits **0**. Use `MSC_SMOKE_STRICT=1` in consumer apps to require a live dev server.

### Database safety & recovery

| Script | When to invoke | What it does |
|--------|----------------|--------------|
| `npm run repair:sqlite` | Schema drift, missing columns, push blocked | Backup-first repair via `MSC_SQLITE_REPAIR_MANIFEST` |
| `npm run db:wal-purge` | Before deploy copy / FTP upload of SQLite file | Removes `-wal` / `-shm` sidecars |
| `npm run db:rescue-admin` | Admin lockout (consumer must implement body) | Sets `PAYLOAD_MIGRATING`; reads `MSC_RESCUE_EMAIL` / `MSC_RESCUE_PASSWORD` |

### Frontend verification & cleanup

| Script | When to invoke | What it does |
|--------|----------------|--------------|
| `npm run verify:next:safe` | Before production build when dev may be on **3000** | Kill port → clean `.next` / caches → optional `MSC_VERIFY_NEXT_RUN_BUILD` |
| `npm run clean:next` | Stale chunks, 500 on `/_next/static` (dev **stopped**) | Wipes `.next`, `.turbo`, `.payload`, `node_modules/.cache` |
| `npm run dev:recover` | Port conflict or hung dev | Kill `MSC_DEV_PORT`; optional `MSC_DEV_RECOVER_CLEAN=1` |

### Media & maintenance

| Script | When to invoke | What it does |
|--------|----------------|--------------|
| `npm run media:sync` | Orphan files vs Payload `media` collection | Runs `scripts/msc-core-sync.mjs`; strategy-aware scan; `--with-payload` when CMS linked |

### Agent sanity & MCP

| Script | When to invoke | What it does |
|--------|----------------|--------------|
| `npm run verify:mcp` | After editing `.cursor/mcp.json` or `.env.local` keys; **runs on every `git commit`** (Husky pre-commit) | **Dual-pass:** JSON placeholders + `process.env` hydration; exit **1** aborts commit |
| `npm run verify:mcp:probe` | Optional registry reachability | Adds npx package probe (slower) |

### Lifecycle automation

| Script | When to invoke | What it does |
|--------|----------------|--------------|
| `npm run log` | Session milestone or feature close | `msc-log-event.mjs` → appends `### [YYYY-MM-DD] - [type] - [msg]` to `.cursor/docs/project-log.md` (skips exact duplicate of last entry) |
| `npm run inventory` | After MCP or dependency changes | `msc-generate-inventory.mjs` → refreshes `.cursor/docs/README-inventory.md` (MCP + npm tables, env health) |
| `npm run grade` | v2.2.0 / release audit | `msc-grade-boilerplate.mjs` → structural PASS/FAIL vs TRUTH + Code-Jedi layout (exit **1** on any fail) |

**Husky pre-commit:** lint-staged (Biome) → `msc:validate-env` → `verify:mcp`. **Pre-push:** `grade` + `msc:test:root`. Install hooks: `npm install` (runs `prepare`).

### Bootstrap, sandboxes & quality (v2.3.0)

| Script | When to invoke | What it does |
|--------|----------------|--------------|
| `npm run msc:onboard` | First clone / new operator | Interactive setup wizard |
| `npm run bootstrap` | Manual cold start | Kill dev ports + `quickstart.mjs` hydration |
| `npm run msc:quickstart` | Re-hydrate without full bootstrap | Asset copies, env checks, workspace install |
| `npm run msc:validate-env` | Before commit; credential audit | Secret leak + placeholder scan |
| `npm run msc:kill-dev-port` | All default ports busy | Clears **3000**, **3001**, **8080** |
| `npm run msc:dev:example` | Frontend sandbox | Next.js minimal on port **3000** |
| `npm run msc:dev:payload` | Full-stack sandbox | Payload CMS on port **3001** |
| `npm run msc:health` | Diagnostics | Port/engine dashboard |
| `npm run msc:health -- --json` | Automation hooks | Machine-readable health |
| `npm run msc:lint` | Pre-PR / CI mirror | Biome check entire tree |
| `npm run msc:lint:fix` | Auto-fix lint issues | Biome check --write |
| `npm run msc:format` | Format pass | Biome format --write |
| `npm run msc:test` | Minimal sandbox only | Vitest in `examples/nextjs-minimal` |
| `npm run msc:test:root` | Root structural tests | Vitest at repo root |
| `npm run msc:test:all` | Full release audit | Root Vitest + minimal sandbox |
| `npm run msc:test:grader` | Grader regression | Grader unit test suite |
| `npm run msc:shield:audit` | UI namespace work | Verify `msc-` compliance |
| `npm run msc:e2e` | Release / CI parity | Playwright multi-sandbox smoke |
| `npm run msc:e2e:install` | First-time E2E setup | Install Playwright browsers |
| `npm run msc:new:component` | Scaffold UI | Vader-compliant component generator |
| `npm run msc:ingest` | Import HTML assets | Shield-compliant markup parser |
| `npm run msc:update` | Dependency bumps | Multi-workspace `npm-check-updates` |
| `npm run msc:forge -- <f> <t> <root>` | Re-brand project | Protected namespace string replace |
| `npm run msc:mock:media` | Payload sandbox media | Seed mock media vault |
| `npm run msc:ensure-lockfiles` | Lockfile hygiene | Verify root + sandbox lockfiles |

### Scaffolding Engine Routines (v2.3.0)
| Script Command | Engine Payload Responsibility |
| :--- | :--- |
| `npm run msc:template -- list` | Inspects and displays all blueprints within the `templates/` directory registry. |
| `npm run msc:template -- apply` | Syncs a targeted blueprint out to a `--target` path and executes a deep regex token swap. |
| `npm run msc:template -- seed` | Writes schema-aligned `seed-payload.json` mock data; requires `--template`; optional `--target` and `--fresh`. |
| `npm run msc:template -- doctor` | Runs local connectivity diagnostics on core folder architecture bindings. |

**Log usage:** `npm run log -- --type feat --msg "Description"` (`feat` \| `fix` \| `chore`).

### Port control & repair utilities

| Script | When to invoke | What it does |
|--------|----------------|--------------|
| `npm run msc:kill` | Before smoke, build, or recover | Cross-platform listener termination |
| `npm run repair:ast` | Suspense / AST boundary issues (consumer) | Stub unless `MSC_REPAIR_AST=1` |
| `npm run check:all` | **CI/CD green light** (GitHub Actions, etc.) | MCP `--probe` + smoke `--no-strict` (no dev server) |
| `npm run test:integration` | Baseline engine + env hydration stub | `tests/msc-integration-stub.test.ts` |

**Canonical web gate sequence (Fix-Local-First):**

```text
npm run msc:kill -- <port>  →  npm run msc:smoke -- <port>
```

Default web port: **3000** (`MSC_DEV_PORT`). Proxy ports: **4000** / **8000** — see LiteLLM doc, not web smoke.

---

## 3. Documentation & knowledge flow (SSoT hierarchy)

Read in this order when depth is required. Do not skip upward links when docs conflict.

```text
┌─────────────────────────────────────────────────────────────┐
│  CODE-JEDI.MD (this file) — tactical routing & script index │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  1. README.md — ecosystem overview, layer table, strategies │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  2. HOW-TO.md (this folder) — operator runbook              │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  3. START-HERE.md — agent runway: planner → env → verify    │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  4. system-architecture.md — immutable structural blueprint │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  5. consumer-bootstrap.md — Next.js 15 + Payload install    │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
        ┌──────────────────────┴──────────────────────┐
        ▼                      ▼                      ▼
 TRUTH.md (root)    ecosystem-options-matrix.md   skills/README.md
 (constitution)         (env toggles)            (8-node deep dives)
```

### Satellite references (by task)

| Need | Document |
|------|----------|
| Operator commands & build ritual | [HOW-TO.md](./HOW-TO.md) |
| Constitution / precedence | [TRUTH.md](../../TRUTH.md) |
| Env keys & strategies | [ecosystem-options-matrix.md](./ecosystem-options-matrix.md) · [.env.example](../../.env.example) |
| Zero-leak secrets | [env-ingestion-compliance.mdc](../rules/env-ingestion-compliance.mdc) · [mcp-setup.md](./mcp-setup.md) |
| UI / CSS / hybrid | [studio-dark-shield.md](../skills/studio-dark-shield.md) · [rules/README.md](../rules/README.md) · [consumer-bootstrap.md](./consumer-bootstrap.md) §6 |
| SQLite repair | [sqlite-repair-manifest.md](./sqlite-repair-manifest.md) · [REPAIR_PROTOCOLS.md](./REPAIR_PROTOCOLS.md) |
| Incidents | [incident-response.md](../prompts/incident-response.md) · [incident-log.md](./incident-log.md) |
| Refactors | [refactor-protocol.md](../prompts/refactor-protocol.md) |
| Pillar port audit | [discovered-logic-map.md](./discovered-logic-map.md) |

**ACF protocol hook:** Recall the **ACF Architecture Vault (v1.03)** prompt profile when custom fields require structural reversion, field-group realignment, or alternate ACF configuration. Profile is operator-maintained (typically under `.cursor/prompts/` in the consumer WordPress stack—not bundled in the bare template). Do not improvise ACF schema migrations without that vault or explicit operator approval.

### Agent ritual bindings (non-negotiable)

| Event | File |
|-------|------|
| Open implementation | [task-planner.md](../prompts/task-planner.md) |
| Close session | [session-handoff.md](../prompts/session-handoff.md) |
| Runtime failure | [incident-response.md](../prompts/incident-response.md) |

---

## 4. Module Rosetta Stone (folder index)

| Path | Agent use |
|------|-----------|
| `core/` | PHP bootstrap, Payload bridge, SQLite helpers, `msc-core-engine`, media hooks, auth preflight, subscriptions |
| `scripts/` | All terminal gates; import `lib/msc-load-env.mjs` first in new entry scripts |
| `ui/` | Global Shield CSS satellites + TSX dashboard primitives (`msc-shield-load.css` entry) |
| `config/` | LiteLLM YAML, SQLite repair manifest example, npm mirror JSON |
| `.cursor/prompts/` | Session gates and protocols |
| `.cursor/skills/` | Task-specific competence (8 nodes) |
| `.cursor/rules/` | Env compliance + Studio Dark + design-system + Tailwind bridge ([README](../rules/README.md)) |
| `.cursor/docs/` | Architecture, matrices, logs, this compass |

---

## 5. CSS architecture (Global Shield)

Core-to-Satellite flow — **never** add tokens, resets, or feature layout to a monolithic stylesheet.

| Layer | File | Rule |
|-------|------|------|
| Foundation | `ui/msc-shield.css` | Sole SSoT for `--msc-*` variables and scoped resets |
| Layout | `ui/msc-layout.css` | Grid, flex, containers (no feature UI) |
| Shared chrome | `ui/msc-components.css` | Cards, buttons, badges under namespace containers |
| Features | `ui/msc-[feature].css` | One file per domain; unique wrapper (`.msc-portfolio-wrapper`, `.msc-dashboard-wrapper`, …) |
| Optional | `ui/msc-shield-extensions.css` | Glass, forms, motion — only when `MSC_SHIELD_EXTENSIONS=1` |

**Load order:** Shield → Layout → Components → Features → (optional) Extensions. WordPress: `msc_enqueue_shield_satellite_chain()` in `core/msc-assets.php`. Next.js consumers: `@import` `ui/msc-shield-load.css` in `app/layout` or global CSS.

**Agent rule:** Before creating a new style, check `ui/msc-shield.css` for an existing variable. If missing, create the variable in the Shield, not the satellite. New styles must be placed in a satellite file prefixed with `msc-` and scoped to a unique container class. Do not style bare HTML tags globally; do not hardcode colors or spacing in satellites; do not put layout CSS in TSX `style` props.

When adding a feature (e.g. `msc-portfolio-collection`), create `ui/msc-[feature].css` in the same pass.

**Hybrid consumers (Path B):** Tailwind/shadcn app shells may bridge `--msc-*` into `tailwind.config.ts`; tokens remain defined in `msc-shield.css` first. See [tailwind-shadcn-bridge.mdc](../rules/tailwind-shadcn-bridge.mdc) — does not replace satellite rules for dashboard surfaces (Path A).

---

## 6. Anti-patterns (do not)

- Invent npm scripts not listed in `package.json`
- Hardcode domains, API keys, or machine-specific absolute paths in committed files
- Run `clean:next` / `verify:next` while dev listens on `MSC_DEV_PORT` (use `verify:next:safe` or stop dev)
- Duplicate media, SQLite, or smoke logic in one-off scripts
- Ask the operator to paste secrets into chat—use `.env.example` + `.env.local`

---

## 7. First action by scenario

| Scenario | First commands / files |
|----------|------------------------|
| New agent, blank context | This file → `START-HERE.md` → `npm run start-project` |
| Building Payload feature | [consumer-bootstrap.md](./consumer-bootstrap.md) + tactical matrix row |
| UI work | [studio-dark-shield.md](../skills/studio-dark-shield.md) → Path A or B in [consumer-bootstrap.md](./consumer-bootstrap.md) §6 |
| DB incident | [REPAIR_PROTOCOLS.md](./REPAIR_PROTOCOLS.md) → `repair:sqlite` |
| Port / white screen | `dev:recover` → `verify:next:safe` → restart dev |
| MCP red in Cursor | `verify:mcp` + `.env.local` keys |

---

*Maintained as the primary AI routing compass for Boilerplate-v2.3.0. Update when `package.json` scripts or core module paths change.*
