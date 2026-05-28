# The Vader Engine Project Bible (v2.6.0)

Architecture, workflow, and **what we fixed**. Command tables are authoritative only when they match root **`package.json`**.

**Related:** [TRUTH.md](./TRUTH.md) · [REPAIR_PROTOCOLS.md](./REPAIR_PROTOCOLS.md) · [UPDATE_LOG.md](./UPDATE_LOG.md) · [local-ai-proxy-setup.md](./local-ai-proxy-setup.md)

---

## 1. Core architecture

- **Layers:** Root docs → `.cursor/` (agents) → `scripts/` (automation) → `examples/` (sandboxes) → `templates/` (read-only blueprints) → `ui/` (Studio Dark Shield) → `tools/msc-cli/` (scaffolding)
- **Sandboxes:** `examples/nextjs-minimal` (**3000**), `examples/nextjs-payload` (**3001**), `examples/nextjs-tailwind` (**3002**)
- **Templates:** Never mutate in place — `npm run msc:template -- apply --target <path>`
- **Self-grader:** `npm run grade` — **61/61** integrity checks

## 2. Naming conventions

- **Prefix:** `msc-`, `msc:`, `msc_` on all custom code
- **Files:** `kebab-case` for scripts; match existing example conventions
- **CSS:** `msc-` class prefix; tokens only in `ui/msc-shield.css`

## 3. Master workflow rules

1. **`package.json` is command truth** — never invent npm scripts
2. **Fix local first** — run recovery scripts before asking operator to paste secrets
3. **No dev server by default on Start Project** — gate + optional LiteLLM only unless operator requests UI
4. **Additive-only** — new capabilities ship as stubs or env-gated scripts, not forced defaults

## 4. The Great Library (docs)

| File | Purpose |
|------|---------|
| **Project-Bible.md** (this file) | Architecture + command lexicon |
| **TRUTH.md** | Agent constitution + ritual law |
| **REPAIR_PROTOCOLS.md** | Nuke, cache, SQLite, Suspense AST |
| **UPDATE_LOG.md** | Fix history and verification |
| **Checkpoint.md** | Branch / release milestones |
| **MCPs.md** | MCP server catalog |
| **project-log.md** | Session check-ins |

## 5. Vader Engine: Command Lexicon (v2.6.0)

Single reference for **maintenance, dev, gates, and AI proxy**. Authoritative list: root **`package.json`** → `scripts`.

### 5.1 System maintenance & recovery

| Command | Name | What it does |
|---------|------|----------------|
| **`npm run dev:recover`** | One-shot recover | Port cleanup + cache repair path per `msc-dev-recover.mjs` |
| **`npm run msc:kill-dev-port`** | Kill dev matrix | Clears **3000, 3001, 3002, 8080** |
| **`npm run msc:kill -- <port>`** | Single port | `msc-kill-dev-port.mjs` — e.g. **4000** for LiteLLM |
| **`npm run clean:next`** | Next cache scrub | `msc-clean-next-cache.mjs --force` |
| **`npm run repair:sqlite`** | SQLite repair | `msc-sqlite-repair.mjs` — backup before schema ops |
| **`npm run repair:ast`** | Suspense AST fix | `scripts/repair/msc-fix-suspense.mjs` |
| **`npm run msc:onboard`** | Fresh clone ritual | Onboarding → productive in ≤10 min |
| **`npm run bootstrap`** | Alias | Same as onboard where defined |

### 5.2 Integrity & start ritual

| Command | Name | What it does |
|---------|------|----------------|
| **`npm run grade`** | Integrity gate | **61/61** checks — hard fail on any miss |
| **`npm run start-project:gate`** | Full cold gate | Node + env + lint + grade + root tests + LiteLLM status |
| **`npm run start-project:smoke`** | Light smoke | `msc-start-project-smoke.mjs` |
| **`npm run start-project`** | Start alias | Node check + smoke |
| **`npm run msc:validate-env`** | Env contract | Structural `.env` validation |
| **`npm run verify:mcp`** | MCP structure | Validates `.cursor/mcp.json` — no secret print |

### 5.3 Development sandboxes

| Command | Name | What it does |
|---------|------|----------------|
| **`npm run msc:dev:example`** | Minimal Next | Port **3000** |
| **`npm run msc:dev:payload`** | Payload CMS | Port **3001** |
| **`npm run msc:dev:tailwind`** | Tailwind/shadcn | Port **3002** |
| **`npm run msc:dev:dashboard`** | Shield dashboard | Port **3010** |
| **`npm run msc:smoke`** | HTTP smoke | `msc-local-http-smoke.mjs` on `MSC_DEV_PORT` |
| **`npm run msc:e2e`** | Playwright E2E | Multi-sandbox config under `e2e/` |

### 5.4 LiteLLM / Vertex (Google API bridge)

| Command | Name | What it does |
|---------|------|----------------|
| **`npm run msc:litellm:preflight`** | Preflight | Config, GCP creds, port, deps check |
| **`npm run msc:litellm:install-deps`** | Python deps | `prisma` / `litellm[proxy]` when needed |
| **`npm run msc:litellm:start`** | Local proxy | Foreground LiteLLM on **:4000** |
| **`npm run msc:litellm:start:ngrok`** | Cloud Agent path | LiteLLM + ngrok HTTPS URL |
| **`npm run msc:litellm:verify`** | Local verify | `127.0.0.1:4000/v1/models` |
| **`npm run msc:litellm:test:ngrok`** | Remote verify | Local + ngrok `/v1/models` |
| **`npm run msc:litellm:status`** | Status | online/offline |
| **`npm run msc:litellm:stop`** | Teardown | Proxy + ngrok |

**Natural language (agents):** `start google-api`, `verify google-api`, `stop google-api`, `status google-api` — see [global.mdc](../rules/global.mdc).

### 5.5 UI, scaffolding, backup

| Command | Name | What it does |
|---------|------|----------------|
| **`npm run msc:shield:audit`** | Shield audit | Token/component compliance |
| **`npm run msc:new:component`** | New satellite | Scaffold `ui/msc-*.css` |
| **`npm run msc:template`** | CLI | `list`, `apply`, `seed`, `doctor` |
| **`npm run msc:backup`** | Backup | Conversational standard/full |
| **`npm run msc:lint`** / **`msc:lint:fix`** | Biome | Lint / auto-fix |

### 5.6 Integration notes

- **Nuke vs reconcile:** Vader Engine has no Electron vault — use **`dev:recover`** + **`clean:next`** for Next cache; **`repair:sqlite`** for DB; not `vpe:nuke-install` (Nova Launcher only).
- **LiteLLM:** Strips Payload `DATABASE_URL` unless `MSC_LITELLM_DATABASE_URL` set — proxy runs database-less by default.
- **Process safety:** Run **`msc:kill-dev-port`** before rebuild when ports are stuck.

---

## 6. Solved problems (recent)

### LiteLLM + Cursor Provider Error (2026-05-28)

- **Symptom:** Cursor **Provider Error** / resource not found for `vader-3-flash`
- **Fixes:** Node scripts under `scripts/msc-litellm-*.mjs`; model alias in `config/litellm_config.yaml`; strip Payload `DATABASE_URL`; ngrok path for Cloud Agent
- **Verify:** `npm run msc:litellm:test:ngrok`

### Phase 4 polish branch (2026-05)

- **Branch:** `feat/phase-4-polish` — docs sync, operator card, backup conversational flow
- **Gate:** 61/61 + 8/8 tests maintained

See **[UPDATE_LOG.md](./UPDATE_LOG.md)** for dated entries.

---

**Baseline:** Vader Engine v2.6.0 · **Signature:** Powered by the MSC Media Engine
