# Vader Engine - Operator Card (One Page)

> **Version:** v2.6.0 | **Integrity target:** 61/61 | **Use this for fast daily operations**

---

## Start Session

1. `start project`
2. `npm run start-project:gate`
3. Start what you need:
   - `npm run msc:dev:dashboard` (3010)
   - `npm run msc:dev:example` (3000)
   - `npm run msc:dev:payload` (3001)
   - `npm run msc:dev:tailwind` (3002)

### Vertex / `vader-3-flash` (Cursor Cloud Agent)

Cloud Agent **cannot** use `http://127.0.0.1:4000` — use ngrok HTTPS.

| Step | Action |
|------|--------|
| 1 | `start google-api` → `npm run msc:litellm:start:ngrok` |
| 2 | Copy **HTTPS URL `/v1`** from terminal output |
| 3 | `verify google-api` → `npm run msc:litellm:test:ngrok` |
| 4 | Cursor Settings → see table below |

| Cursor setting | Value |
|----------------|--------|
| Override OpenAI Base URL | `https://<ngrok-host>/v1` |
| Custom model | **`vader-3-flash`** |
| OpenAI API Key | `MSC_LITELLM_MASTER_KEY` (`.env.local`, optional) |

**Keep the proxy terminal open** (LiteLLM runs in foreground). ngrok runs in background.

**Local IDE only** (same PC as LiteLLM): `npm run msc:litellm:start` + `http://127.0.0.1:4000/v1`

**First time:** `npm run msc:litellm:preflight` · `npm run msc:litellm:install-deps` if needed

---

## Core Health Gates

- `npm run msc:lint`
- `npm run grade` (must be **61/61**)
- `npm run msc:test:root`
- `npm run msc:e2e` (optional local parity)

Quick docs sync:
- `update docs`

---

## Backup (Agent-Driven)

Say: `backup project`

Flow (one question at a time):
1. Type (`1` Standard / `2` Full)
2. Destination (`1` Same G: / `2` Different)
3. Folder (`1` Suggested / `2` Custom)
4. Confirm (`1` Yes / `2` No)

Equivalent direct commands:
- `npm run msc:backup -- --standard <folder-name>`
- `npm run msc:backup -- --full <folder-name>`

---

## End Session

1. `stop google-api` if proxy was started
2. `end project`
3. Provide short summary when prompted
4. Confirm `.cursor/docs/project-log.md` entry
5. Commit/push only after gates are green

---

## Fast Troubleshooting

- Port issue: `npm run msc:kill -- <port>`
- Dashboard down: `npm run msc:kill -- 3010` then `npm run msc:dev:dashboard`
- Proxy down: `status google-api` → `start google-api` → `verify google-api`
- Cursor **Provider Error**: `restart google-api`; paste **new** ngrok HTTPS `/v1` in settings
- Model not found: use **`vader-3-flash`** exactly
- Prisma/PostgreSQL on proxy start: Payload `DATABASE_URL` — use latest scripts (DB stripped for LiteLLM)
- Broken local state: `npm run dev:recover`
- Lint drift: `npm run msc:lint:fix` then `npm run msc:lint`

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
| `start google-api` | `msc:litellm:start:ngrok` |
| `verify google-api` | `msc:litellm:test:ngrok` |
| `stop google-api` | `msc:litellm:stop` |
| `status google-api` | `msc:litellm:status` |
| `restart google-api` | stop + `start:ngrok` |

---

## Reference Docs

- **Proxy runbook:** `.cursor/docs/local-ai-proxy-setup.md`
- **Full reference:** `.cursor/docs/Vader-Engine-Cheat-Sheet.md`
- **Session history:** `.cursor/docs/project-log.md`
- **Rules/shortcuts:** `.cursor/rules/global.mdc`

---

*Last updated: May 28, 2026 — LiteLLM + ngrok / `start google-api`*
