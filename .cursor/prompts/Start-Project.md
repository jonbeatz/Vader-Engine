**Act as a Lead Systems Architect. We are performing a 'Cold-Start' initialization for the v2.6.0-Engine project.**

## 1. Environment Initialization

Run `npm run start-project:gate` to verify 61/61 grade, lint, and tests.

## 1.5 LiteLLM / Vertex AI Proxy (Required when using `vader-3-flash` in Cursor)

Cursor custom models route through the local OpenAI-compatible proxy to **Vertex AI**. If the proxy is offline or the model alias is missing, Cursor shows **Provider Error / resource not found**.

**Execute in order (agent runs these; do not skip when operator uses Gemini via Vertex):**

1. Say **`start google-api`** or run `npm run msc:litellm:start:ngrok` — preflight, ngrok HTTPS URL, foreground LiteLLM (keep terminal open)
2. Say **`verify google-api`** or run `npm run msc:litellm:test:ngrok` — local `:4000` + remote ngrok `/v1/models`
3. **Local IDE only (no Cloud Agent):** `npm run msc:litellm:start` + `msc:litellm:verify` — `http://127.0.0.1:4000/v1`
4. First-time Python deps: `npm run msc:litellm:install-deps` if preflight fails

Full runbook: `.cursor/docs/local-ai-proxy-setup.md` (Operator quick start: `start google-api`).

**Cursor checklist (operator):**

| Setting | Value |
|---------|--------|
| Override OpenAI Base URL | `http://127.0.0.1:4000/v1` (local) or live ngrok URL + `/v1` |
| OpenAI API Key | `MSC_LITELLM_MASTER_KEY` from `.env.local` (if set) |
| Custom model | **`vader-3-flash`** (must match `config/litellm_config.yaml`) |

**Env contract (`.env.local`, never commit):** `GOOGLE_APPLICATION_CREDENTIALS`, `GOOGLE_CLOUD_PROJECT`, optional `MSC_LITELLM_MASTER_KEY`. Place service account JSON at `config/gcp-service-account.json` (gitignored).

> Proxy port: **4000** (`MSC_LITELLM_PORT`). Logs: `.sandbox/litellm/`. Stop: `npm run msc:litellm:stop`.

## 2. Context Ingestion (Read-Only Scan)

- Scan `.cursor/docs/` and `.cursor/rules/` directories
- Load core architecture from `ARCHITECTURE.md`, `TRUTH.md`, and `system-architecture.md`
- Load root operator docs from `README.md`, `DOCS.md`, `START-HERE.md`, `SECURITY.md`, `CHANGELOG.md`, `CONTRIBUTING.md`
- Apply behavioral constraints from `.cursor/rules/global.mdc`, `studio-dark-ui.mdc`, and `terminal-discipline.mdc`

## 3. Operational Readiness Check

- Confirm latest `project-log.md` entry
- Verify `git status` is clean
- Review `examples/` directory — Tailwind/shadcn for UI, Payload for backend

## 4. Objective Setting

- Check `.cursor/prompts/task-planner.md` for active Phase 1–3 goals
- Report: `System Ready. [Current Status] [Active Task].`

## 5. Acknowledgment

After completing all steps, print:

```
✅ v2.6.0 READY — 61/61 · 8/8 · Git [clean|has changes] · LiteLLM [running|offline] · vader-3-flash [verified|failed]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Ok, Jon. Let's build.
```

Where:

- `Git clean` → `Git has changes` if unstaged files exist
- `LiteLLM running` after `msc:litellm:status` is `online` (or `verify google-api` / `msc:litellm:test:ngrok` passes)
- `vader-3-flash verified` when ngrok + `/v1/models` includes `vader-3-flash` (Cloud Agent path)

**I am ready for high-velocity development. Acknowledge and proceed.**
