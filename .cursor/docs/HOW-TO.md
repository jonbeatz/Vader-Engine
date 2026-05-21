# HOW-TO: Boilerplate-v1 Operational Runbook

Single operator-facing guide for running, verifying, and extending **Boilerplate-v1** (`msc-universal-boilerplate`). For agent routing and module maps, use [Code-Jedi.md](./Code-Jedi.md). Constitutional precedence: [TRUTH.md](../../TRUTH.md).

---

## Mission

Boilerplate-v1 is an **unbranded, self-validating engine** — a portable factory layer for Payload/Next.js consumers, WordPress/Divi surfaces, and Studio Dark UI. It ships:

- Env-driven, selectable strategies (no forced production defaults)
- A **13-server** Cursor MCP registry with pre-commit structural verification
- Global Shield CSS (Core-to-Satellite) with optional Tailwind/shadcn hybrid path
- Terminal automation under `scripts/` with `package.json` as the only command authority

This repository is a **template**, not a runnable app: HTTP smoke on port **3000** may bypass when no dev server is listening. Consumer apps add `app/`, `payload.config.ts`, and full dependencies per [consumer-bootstrap.md](./consumer-bootstrap.md).

---

## The Build Ritual

Cold-start sequence every operator or agent session should follow.

### 1. Clone and install

```bash
git clone https://github.com/jonbeatz/Boilerplate-v1.git
cd Boilerplate-v1
npm install
```

`npm install` runs `prepare` → installs **Husky** git hooks.

### 2. Environment contract (zero-leak)

1. Copy `.env.example` → `.env.local` (`.env.local` is gitignored).
2. Fill live values in `.env.local` only — never commit tokens or paste secrets into chat.
3. Set `filesystem` path in `.cursor/mcp.json` to your machine’s absolute project root if you relocate the clone.
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
npm run verify:local
npm run grade
```

Optional CI-style bundle:

```bash
npm run check:all
npm run test:integration
```

### 5. Optional Gold Master certification

When releasing or forking to a new consumer:

```bash
npm run verify:mcp
npm run verify:local
npm run grade
npm run inventory
npm run log -- --type chore --msg "Gold Master audit passed"
```

`grade` must report **100%** before treating the tree as forge-ready.

### 6. Session close

```bash
npm run end-project
```

Then follow [session-handoff.md](../prompts/session-handoff.md) and update [project-log.md](./project-log.md) (or use `npm run log`).

---

## Command Runbook

**Authority:** root `package.json` only. Do not invent ad-hoc shell workflows that duplicate `scripts/msc-*.mjs`.

### Session & initialization

| Task | Command | Description |
|------|---------|-------------|
| Open session (canonical) | `npm run start-project` | Alias → `start-project:smoke` — MCP + optional gates |
| Cold-start smoke detail | `npm run start-project:smoke` | `scripts/msc-start-project-smoke.mjs` |
| Close session | `npm run end-project` | Kill port **3000** + smoke (template mode exit **0** if idle) |

### Verification & MCP

| Task | Command | Description |
|------|---------|-------------|
| MCP structure audit | `npm run verify:mcp` | 13 servers, placeholder hygiene, `.env.local` hydration; **runs on every `git commit`** |
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
| Gold Master structural grade | `npm run grade` | PASS/FAIL audit vs TRUTH + layout; exit **1** on failure |

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

### Git hooks (automatic)

| Mechanism | Behavior |
|-----------|----------|
| `prepare` (npm) | Installs Husky on `npm install` |
| `.husky/pre-commit` | Runs `npm run verify:mcp` — commit aborted on exit **1** |

---

## Agent Routing Protocol

### First actions (agents)

1. Read [Code-Jedi.md](./Code-Jedi.md) — tactical matrix + full script inventory.
2. Read this file for operator commands and build ritual.
3. Run `npm run start-project` after [task-planner.md](../prompts/task-planner.md) approval.
4. Route feature work via [skills/README.md](../skills/README.md) (8 competency nodes).

### Documentation precedence (conflicts)

1. [TRUTH.md](../../TRUTH.md)
2. `.cursorrules` + [rules/README.md](../rules/README.md)
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

3. **Commit gating** — Every commit runs `verify:mcp` via Husky. Do not bypass with `--no-verify` unless the operator explicitly requests it and accepts drift risk.

4. **Anti-patterns** — No invented npm scripts; no live tokens in committed files; no global `@apply` on `body`; no monolithic CSS files; no `clean:next` while dev listens on **3000**; no ad-hoc `taskkill` (use `msc:kill`).

5. **Secret management** — Placeholders (`YOUR_*`) in committed `mcp.json` are intentional. Live values only in `.env.local` and Cursor MCP UI. Agents reference variable **names** only in chat and logs.

---

## Related documents

| Document | Purpose |
|----------|---------|
| [TRUTH.md](../../TRUTH.md) | Constitution — technical precedence |
| [START-HERE.md](../../START-HERE.md) | Phased onboarding for new agents |
| [README.md](../../README.md) | Ecosystem overview and layer map |
| [consumer-bootstrap.md](./consumer-bootstrap.md) | Next.js 15 + Payload consumer install |
| [system-architecture.md](./system-architecture.md) | Structural blueprint |
| [README-inventory.md](./README-inventory.md) | Auto-generated MCP + npm inventory (`npm run inventory`) |

---

*Operational runbook for Boilerplate-v1 v1.0.0. When scripts or gates change, update `package.json`, Code-Jedi, and this file in the same session.*
