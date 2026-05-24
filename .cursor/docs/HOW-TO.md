# HOW-TO: Boilerplate-v2.1.0 Operational Runbook

Single operator-facing guide for running, verifying, and extending **Boilerplate-v2.1.0 Gold Master** (`msc-universal-boilerplate`). For agent routing and module maps, use [Code-Jedi.md](./Code-Jedi.md). Constitutional precedence: [TRUTH.md](../../TRUTH.md).

---

## Mission

Boilerplate-v2.1.0 is an **unbranded, self-validating engine** — a portable factory layer for Payload/Next.js consumers, WordPress/Divi surfaces, and Studio Dark UI. It ships:

- **52-point** structural grader with CI and pre-push enforcement
- Env-driven, selectable strategies (no forced production defaults)
- A **13-server** Cursor MCP registry with pre-commit structural verification
- Global Shield CSS (Core-to-Satellite) with optional Tailwind/shadcn hybrid path
- Dual sandboxes: `examples/nextjs-minimal` (:3000) and `examples/nextjs-payload` (:3001)
- Playwright multi-sandbox E2E (`npm run msc:e2e`) — 3 smoke tests × chromium + firefox
- Terminal automation under `scripts/` with `package.json` as the only command authority

This repository is a **template**, not a runnable app: HTTP smoke on port **3000** may bypass when no dev server is listening. Consumer apps add `app/`, `payload.config.ts`, and full dependencies per [consumer-bootstrap.md](./consumer-bootstrap.md).

---

## The Build Ritual

Cold-start sequence every operator or agent session should follow.

### 1. Clone and install

```bash
git clone https://github.com/jonbeatz/Boilerplate-v2.git
cd Boilerplate-v2
npm run msc:onboard
# or: npm install && npm run bootstrap
```

### 2. Environment contract (zero-leak)

1. Copy `.env.example` → `.env.local` (`.env.local` is gitignored).
2. Fill live values in `.env.local` only — never commit tokens or paste secrets into chat.
3. Keep `.cursor/mcp.json` portable — use `"${workspaceFolder}"` for path-scoped servers (never machine-specific absolute paths).
4. Mirror MCP keys into Cursor Settings → MCP env, or rely on hydration via `scripts/lib/msc-load-env.mjs`.

All `scripts/*.mjs` entry points import `msc-load-env.mjs` first: **`.env.local` → `.env.example`** (example fills gaps only).

### 3. Session open gate

1. Complete [task-planner.md](../prompts/task-planner.md) (or say **Start Project**) and obtain operator approval before code changes.
2. Run structural verification:

```bash
npm run start-project
```

Equivalent to `start-project:smoke` (MCP verify + optional typecheck/migrations when env flags are set).

### 4. Baseline health checks

```bash
npm run verify:mcp
npm run msc:lint
npm run verify:local
npm run grade
npm run msc:test:root
```

Optional CI-style bundle:

```bash
npm run check:all
npm run msc:test:all
npm run test:integration
```

### 5. Optional Gold Master certification

When releasing or forking to a new consumer:

```bash
npm run verify:mcp
npm run msc:lint
npm run verify:local
npm run grade
npm run msc:test:all
npm run msc:e2e:install   # first time only
npm run msc:e2e
npm run inventory
npm run log -- --type chore --msg "Gold Master audit passed"
```

`grade` must report **52/52 (100%)** before treating the tree as forge-ready.

### 6. Session close

```bash
npm run end-project
```

Then follow [session-handoff.md](../prompts/session-handoff.md) and update [project-log.md](./project-log.md) (or use `npm run log`).

---

## Command Runbook

**Authority:** root `package.json` only. Do not invent ad-hoc shell workflows that duplicate `scripts/msc-*.mjs`.

### Bootstrap & onboarding

| Task | Command | Description |
|------|---------|-------------|
| Interactive setup | `npm run msc:onboard` | Guided first-run wizard (recommended) |
| Full bootstrap | `npm run bootstrap` | Kill dev ports + quickstart hydration |
| Re-hydrate | `npm run msc:quickstart` | Env checks + workspace install |
| Env validation | `npm run msc:validate-env` | Secret leak scan; **pre-commit gate** |
| Kill all dev ports | `npm run msc:kill-dev-port` | Clears 3000, 3001, 8080 |

### Development sandboxes

| Task | Command | Description |
|------|---------|-------------|
| Minimal frontend | `npm run msc:dev:example` | Next.js on port **3000** |
| Payload CMS | `npm run msc:dev:payload` | Full-stack on port **3001** |
| Health dashboard | `npm run msc:health` | Ports, engines, locks |
| Health JSON | `npm run msc:health:json` | Machine-readable output |

### Quality & lint

| Task | Command | Description |
|------|---------|-------------|
| Biome lint | `npm run msc:lint` | Full-tree check; **CI gate** |
| Biome fix | `npm run msc:lint:fix` | Auto-fix lint issues |
| Biome format | `npm run msc:format` | Format pass |
| Structural grade | `npm run grade` | **52 checks**; **pre-push gate** |
| Root tests | `npm run msc:test:root` | Vitest at repo root; **pre-push** |
| Full test sweep | `npm run msc:test:all` | Root + minimal sandbox |
| Grader tests | `npm run msc:test:grader` | Grader unit regression |
| Minimal tests only | `npm run msc:test` | Vitest in nextjs-minimal |

### Shield & scaffolding

| Task | Command | Description |
|------|---------|-------------|
| Namespace audit | `npm run msc:shield:audit` | Verify `msc-` compliance |
| Multi-sandbox E2E | `npm run msc:e2e` | Playwright smoke (3 tests × chromium + firefox) |
| E2E browser install | `npm run msc:e2e:install` | Install Playwright chromium + firefox |
| New component | `npm run msc:new:component` | Vader-compliant UI scaffold |
| Asset ingest | `npm run msc:ingest` | HTML → shield markup |
| Safe re-brand | `npm run msc:forge -- <from> <to> <root>` | Protected string replace |
| Dependency bumps | `npm run msc:update` | Multi-workspace updates |
| Mock media | `npm run msc:mock:media` | Payload sandbox media seed |
| Lockfile check | `npm run msc:ensure-lockfiles` | Root + sandbox lockfiles |

### Session & initialization

| Task | Command | Description |
|------|---------|-------------|
| Open session (canonical) | `npm run start-project` | Alias → `start-project:smoke` — MCP + optional gates |
| Cold-start smoke detail | `npm run start-project:smoke` | `scripts/msc-start-project-smoke.mjs` |
| Close session | `npm run end-project` | Kill port **3000** + smoke (template mode exit **0** if idle) |

### Verification & MCP

| Task | Command | Description |
|------|---------|-------------|
| MCP structure audit | `npm run verify:mcp` | 13 servers, placeholder hygiene, `.env.local` hydration; **pre-commit** |
| MCP + registry probe | `npm run verify:mcp:probe` | Adds npx reachability check (slower) |
| Local HTTP smoke | `npm run verify:local` | Smoke `MSC_DEV_PORT` (default **3000**); template bypass if no listener |
| HTTP smoke (alias) | `npm run msc:smoke` | Same as `verify:local` |
| CI green light | `npm run check:all` | MCP `--probe` + smoke `--no-strict` |
| Integration stub | `npm run test:integration` | Env hydration + core engine module presence |

### Lifecycle automation

| Task | Command | Description |
|------|---------|-------------|
| Append changelog | `npm run log -- --type feat --msg "Description"` | Types: `feat`, `fix`, `chore` → `.cursor/docs/project-log.md` |
| Refresh dep/MCP inventory | `npm run inventory` | Writes `.cursor/docs/README-inventory.md` |
| Gold Master structural grade | `npm run grade` | **52-point** PASS/FAIL audit; exit **1** on failure; **pre-push** |

### Git hooks (automatic)

| Mechanism | Behavior |
|-----------|----------|
| `prepare` (npm) | Installs Husky on `npm install` |
| `.husky/pre-commit` | lint-staged (Biome; skips `package-lock.json`) → `msc:validate-env` → `verify:mcp` |
| `.husky/pre-push` | `grade` → `msc:test:root` |

### Port & runtime recovery

| Task | Command | Description |
|------|---------|-------------|
| Kill dev port | `npm run msc:kill -- 3000` | Cross-platform listener termination (`MSC_DEV_PORT`) |
| Recover hung dev | `npm run dev:recover` | Kill port; optional clean via `MSC_DEV_RECOVER_CLEAN=1` |
| Safe Next prep | `npm run verify:next:safe` | Kill port → clean caches → optional build |
| Clean Next caches | `npm run clean:next` | Wipes `.next`, `.turbo`, `.payload`, caches — **dev stopped** |

**Canonical web gate (Fix-Local-First):**

```bash
npm run msc:kill -- 3000
npm run msc:smoke -- 3000
```

LiteLLM proxy uses ports **4000** / **8000** — not the web smoke port. See [local-ai-proxy-setup.md](./local-ai-proxy-setup.md).

### Database & data safety

| Task | Command | Description |
|------|---------|-------------|
| SQLite repair | `npm run repair:sqlite` | Backup-first; uses `MSC_SQLITE_REPAIR_MANIFEST` |
| WAL sidecar purge | `npm run db:wal-purge` | Remove `-wal` / `-shm` before deploy copy |
| Admin rescue (stub) | `npm run db:rescue-admin` | Consumer implements body; `MSC_RESCUE_*` env |

### Media & maintenance

| Task | Command | Description |
|------|---------|-------------|
| Media filesystem sync | `npm run media:sync` | `scripts/msc-core-sync.mjs`; strategy via `MSC_MEDIA_STRATEGY` |
| AST repair stub | `npm run repair:ast` | Active when `MSC_REPAIR_AST=1` |

---

## Agent Routing Protocol

### First actions (agents)

1. Read [Code-Jedi.md](./Code-Jedi.md) — tactical matrix + full script inventory.
2. Read this file for operator commands and build ritual.
3. Run `npm run start-project` after [task-planner.md](../prompts/task-planner.md) approval.
4. Route feature work via [skills/README.md](../skills/README.md) (8 competency nodes).

### Documentation precedence (conflicts)

1. [TRUTH.md](../../TRUTH.md)
2. [.cursor/rules/global.mdc](../rules/global.mdc) + [rules/README.md](../rules/README.md)
3. [ecosystem-options-matrix.md](./ecosystem-options-matrix.md)
4. Skills under `.cursor/skills/`
5. [project-log.md](./project-log.md) / [incident-log.md](./incident-log.md)

### Studio Dark UI — Path A vs Path B

Use [studio-dark-shield.md](../skills/studio-dark-shield.md) as the decision skill.

| Path | When | CSS / tooling |
|------|------|----------------|
| **Path A — Shield-only** | Payload admin, `ui/msc-*.tsx`, WordPress/Divi, `.msc-dashboard-container` | Import `ui/msc-shield-load.css`; satellites `msc-layout`, `msc-components`, `msc-[feature].css`; rules: [studio-dark-ui.mdc](../rules/studio-dark-ui.mdc) |
| **Path B — Hybrid Tailwind** | Consumer Next.js `app/` with shadcn | Tailwind theme bridges `--msc-*` from `ui/msc-shield.css`; MCP: `shadcn`, `context7`; rule: [tailwind-shadcn-bridge.mdc](../rules/tailwind-shadcn-bridge.mdc) |

**Token rule (both paths):** new colors go in `ui/msc-shield.css` first — never hardcode hex in satellites or TSX `style` props. See [design-system-rules.mdc](../rules/design-system-rules.mdc).

### MCP servers (project layer)

Registered in `.cursor/mcp.json`:

`payload`, `github`, `playwright`, `filesystem`, `fetch`, `tavily`, `firecrawl`, `resend`, `sequential-thinking`, `wordpress-local`, `neon-postgres`, `shadcn`, `context7`

Setup details: [mcp-setup.md](./mcp-setup.md). Extended catalog: `.cursor/mcp-blueprint.json`.

### Active Cursor rules

| Rule | Application |
|------|-------------|
| [env-ingestion-compliance.mdc](../rules/env-ingestion-compliance.mdc) | Always on — secrets boundary |
| [studio-dark-ui.mdc](../rules/studio-dark-ui.mdc) | `ui/**`, `*.tsx`, `*.css` |
| [design-system-rules.mdc](../rules/design-system-rules.mdc) | Tokens-first |
| [tailwind-shadcn-bridge.mdc](../rules/tailwind-shadcn-bridge.mdc) | Path B consumers |
| [local-runtime-recovery.mdc](../rules/local-runtime-recovery.mdc) | Port/cache incidents |

---

## Best Practices Checklist

1. **Namespacing** — PHP functions `msc_`, CSS/TSX classes `msc-`, env anchors `MSC_`. Consumer docs may use **MSC-Core-** for engine naming; on-disk scripts stay `msc-*`.

2. **Single source of truth** — Commands from `package.json`; tokens from `ui/msc-shield.css`; secrets from `.env.local`; tactics from Code-Jedi + TRUTH. Regenerate inventory with `npm run inventory` after MCP or dependency changes.

3. **Commit gating** — Pre-commit: lint-staged + validate-env + verify:mcp. Pre-push: grade + msc:test:root. Do not bypass with `--no-verify` unless the operator explicitly accepts drift risk.

4. **Anti-patterns** — No invented npm scripts; no live tokens in committed files; no global `@apply` on `body`; no monolithic CSS files; no `clean:next` while dev listens on **3000**; no ad-hoc `taskkill` (use `msc:kill`).

5. **Secret management** — Placeholders (`YOUR_*`) in committed `mcp.json` are intentional. Live values only in `.env.local` and Cursor MCP UI. Agents reference variable **names** only in chat and logs.

---

## Related documents

| Document | Purpose |
|----------|---------|
| [TRUTH.md](../../TRUTH.md) | Constitution — technical precedence |
| [START-HERE.md](../../START-HERE.md) | Phased onboarding for new agents |
| [README.md](../../README.md) | Ecosystem overview and layer map |
| [ARCHITECTURE.md](../../ARCHITECTURE.md) | High-level layout and CI gates |
| [TROUBLESHOOTING.md](../../TROUBLESHOOTING.md) | Recovery paths |
| [CONTRIBUTING.md](../../CONTRIBUTING.md) | PR and hook conventions |
| [CHANGELOG.md](../../CHANGELOG.md) | Release history |
| [consumer-bootstrap.md](./consumer-bootstrap.md) | Next.js 15 + Payload consumer install |
| [system-architecture.md](./system-architecture.md) | Structural blueprint |
| [README-inventory.md](./README-inventory.md) | Auto-generated MCP + npm inventory (`npm run inventory`) |

---

*Operational runbook for Boilerplate-v2.1.0 Gold Master. When scripts or gates change, update `package.json`, Code-Jedi, and this file in the same session.*

---

## 📁 The Template & Scaffolding System (v2.2.0)
Boilerplate-v2 contains a cross-platform, native scaffolding CLI to generate custom workspaces into sibling directories outside the main repository root.

### Available Subcommands
- **List Blueprints:** `npm run msc:template -- list`
- **Scaffold New Instance:** `npm run msc:template -- apply <category/blueprint-name> --name="My Project" --target=../my-project-path`
- **Dry-Run Analysis:** Append `--dry-run` to the apply command to analyze structural configurations without writing files to disk.
- **Engine Doctor:** `npm run msc:template -- doctor`
