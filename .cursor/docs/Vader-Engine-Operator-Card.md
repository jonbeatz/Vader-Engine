# Vader Engine - Operator Card (One Page)

> **Version:** v2.6.1 | **Integrity target:** 61/61 | **Use this for fast daily operations**

---

## What You Have Now

| Command | What it does |
|---------|--------------|
| `update project` | Auto-syncs tracking docs (UPDATE_LOG, project-log, Checkpoint, CHANGELOG) |
| `update docs` | Syncs version numbers across documentation |
| `start project` | Session start with mandatory reads |
| `end project` | Runs `update project` + cleanup + handoff |

---

## Start Session

1. `start project` — reads README → PROJECT_CONTEXT → `.cursor/docs/TRUTH.md` → Project-Bible → REPAIR_PROTOCOLS → MCPs → START-HERE
2. `npm run start-project:gate`
3. Start only what you need:
   - `npm run msc:dev:dashboard` (3010)
   - `npm run msc:dev:example` (3000)
   - `npm run msc:dev:payload` (3001)
   - `npm run msc:dev:tailwind` (3002)

> Dev servers are **not** started by `start project` unless you ask.

### Vertex / `vader-3.5-flash` (Cursor Cloud Agent)

Cloud Agent **cannot** use `http://127.0.0.1:4000` — use ngrok HTTPS. Recommended model is **`vader-3.5-flash`**.

| Step | Action |
|------|--------|
| 1 | `start google-api` → `npm run msc:google-api:start` |
| 2 | Copy **HTTPS URL `/v1`** from terminal output |
| 3 | `verify google-api` → `npm run msc:litellm:test:ngrok` |
| 4 | Cursor Settings → see table below |

| Cursor setting | Value |
|----------------|--------|
| Override OpenAI Base URL | `https://<ngrok-host>/v1` |
| Custom model | **`vader-3.5-flash`** |
| OpenAI API Key | `sk-vader-protocol-1234` (from `MSC_LITELLM_MASTER_KEY` in `.env.local`) |

**Your Working Models:**

| Model | Use Case |
|-------|----------|
| **`vader-3.5-flash`** | Recommended — best for coding/agent tasks, uses thinking |
| **`vader-31-pro`** | More powerful, slower, no thinking |
| **`vader-3-pro`** | Good balance |
| **`vader-3-flash`** | Fastest, no thinking (legacy compatibility) |

**Keep the proxy terminal open** (LiteLLM runs in foreground). ngrok runs in background.

**Local IDE only** (same PC as LiteLLM): `npm run msc:litellm:start` + `http://127.0.0.1:4000/v1`

**First time:** `npm run msc:litellm:preflight` · `npm run msc:litellm:install-deps` if needed

---

## Core Health Gates

- `npm run msc:lint`
- `npm run grade` (must be **61/61**)
- `npm run msc:test:root`
- `npm run msc:e2e` (optional local parity)

**Docs vs tracking:**

| Say | Use when |
|-----|----------|
| `update project` | Log fixes, checkpoint branch/status, refresh project-log + Checkpoint |
| `update docs` | Sync versions, README, DOCS index, detect new npm scripts |

---

## Backup (Agent-Driven)

Say: `backup project`

Flow (one question at a time):
1. Type (`1` Standard / `2` Full)
2. Destination (`1` Same G: / `2` Different)
3. Folder (`1` Suggested / `2` Custom)
4. Confirm (`1` Yes / `2` No`)

**Standard skips:** `node_modules`, `.next`, `logs`, `test-results`, `vader-site-deploy`

Equivalent direct commands:
- `npm run msc:backup -- --standard <folder-name>`
- `npm run msc:backup -- --full <folder-name>`

---

## End Session

1. `stop google-api` if proxy was started
2. `end project` — gate + **auto `update project`** + session summary
3. Answer prompts for summary / new fixes (if asked)
4. Confirm `.cursor/docs/project-log.md` + `Checkpoint.md` updated
5. Commit/push only after gates are green

Optional mid-session: `update project` (without full closeout).

---

## Fast Troubleshooting

- Port issue: `npm run msc:kill -- <port>`
- Dashboard down: `npm run msc:kill -- 3010` then `npm run msc:dev:dashboard`
- Proxy down: `status google-api` → `start google-api` → `verify google-api`
- Cursor **Provider Error**: `restart google-api`; paste **new** ngrok HTTPS `/v1` in settings
- Model not found: use **`vader-3.5-flash`** (or `vader-31-pro` / `vader-3-flash`) exactly in Settings
- Prisma/PostgreSQL on proxy start: Payload `DATABASE_URL` — proxy runs database-less by default
- Broken local state: `npm run dev:recover`
- Lint drift: `npm run msc:lint:fix` then `npm run msc:lint`
- Docs/version drift: `update docs`
- Tracking drift: `update project`

---

## Service URLs

| Service | URL |
|---------|-----|
| Dashboard | http://127.0.0.1:3010 |
| Minimal | http://127.0.0.1:3000 |
| Payload | http://127.0.0.1:3001 |
| Tailwind | http://127.0.0.1:3002 |
| LiteLLM (local) | http://127.0.0.1:4000/v1 |
| LiteLLM (Cloud Agent) | `https://<ngrok-host>/v1` — from `start google-api` |
| Ngrok inspector | http://127.0.0.1:4040 |

---

## Agent shortcuts (`global.mdc`)

| Say | Runs |
|-----|------|
| `start project` | `@Start-Project.md` |
| `end project` | `@End-Project.md` (+ auto tracking sync) |
| `update project` | `.cursor/prompts/Update-Project.md` |
| `update docs` / `sync docs` | `.cursor/prompts/Update-Docs.md` |
| `start google-api` | `npm run msc:google-api:start` (clean stop → boot → ngrok → **READY**) |
| `verify google-api` | `msc:litellm:test:ngrok` |
| `stop google-api` | `msc:litellm:stop` |
| `status google-api` | `msc:litellm:status` |
| `restart google-api` | `npm run msc:google-api:start` |
| `backup project` | `npm run msc:backup` (conversational) |

---

## Reference Docs

| Doc | Purpose |
|-----|---------|
| `DOCS.md` | Root documentation index |
| `.cursor/docs/TRUTH.md` | Agent constitution |
| `.cursor/docs/Project-Bible.md` | Command lexicon |
| `.cursor/docs/local-ai-proxy-setup.md` | LiteLLM / ngrok runbook |
| `.cursor/docs/Vader-Engine-Cheat-Sheet.md` | Full quick reference |
| `.cursor/docs/project-log.md` | Session history |
| `.cursor/rules/global.mdc` | All chat shortcuts |

---

*Last updated: May 28, 2026 — `update project`, workflow docs, end-project auto-tracking*
