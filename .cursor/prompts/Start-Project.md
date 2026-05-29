**Act as a Lead Systems Architect. We are performing a 'Cold-Start' initialization for the v2.7.0-Engine project.**

## 1. Mandatory document reads (Read tool — do not skip)

Re-read in order before any shell commands or status claims:

1. **`README.md`** — repo overview
2. **`PROJECT_CONTEXT.md`** — current scope and constraints
3. **`.cursor/docs/TRUTH.md`** — agent constitution (integrity gate, zero-leak, ports)
4. **`.cursor/docs/Project-Bible.md`** — command lexicon (§5)
5. **`.cursor/docs/REPAIR_PROTOCOLS.md`** — skim recovery paths
6. **`.cursor/docs/MCPs.md`** — MCP status (when using tools)
7. **`START-HERE.md`** — operator cold-start contract

Also apply: **`.cursor/rules/global.mdc`**, **`.cursor/rules/start-project-ritual.mdc`**

## 2. Environment initialization

Run **`npm run start-project:gate`** to verify **61/61** grade, lint, and tests.

## 2.5 LiteLLM / Vertex AI Proxy (when using `vader-3-flash` in Cursor)

Cursor custom models route through the local OpenAI-compatible proxy to **Vertex AI**. If the proxy is offline or the model alias is missing, Cursor shows **Provider Error / resource not found**.

**Execute in order (agent runs these; do not skip when operator uses Gemini via Vertex):**

1. Say **`start google-api`** or run `npm run msc:google-api:start` — clean stop, LiteLLM boot, ngrok HTTPS URL, **READY** when `/v1/models` returns **200** (keep terminal open)
2. Say **`verify google-api`** or run `npm run msc:litellm:test:ngrok` — local `:4000` + remote ngrok `/v1/models`
3. **Local IDE only (no Cloud Agent):** `npm run msc:litellm:start` + `msc:litellm:verify` — `http://127.0.0.1:4000/v1`
4. First-time Python deps: `npm run msc:litellm:install-deps` if preflight fails

Full runbook: **`.cursor/docs/local-ai-proxy-setup.md`** (Operator quick start: `start google-api`).

**Cursor checklist (operator):**

| Setting | Value |
|---------|--------|
| Override OpenAI Base URL | `http://127.0.0.1:4000/v1` (local) or live ngrok URL + `/v1` |
| OpenAI API Key | `MSC_LITELLM_MASTER_KEY` from `.env.local` (if set) |
| Custom model | **`vader-3-flash`** (must match `config/litellm_config.yaml`) |

**Env contract (`.env.local`, never commit):** `GOOGLE_APPLICATION_CREDENTIALS`, `GOOGLE_CLOUD_PROJECT`, optional `MSC_LITELLM_MASTER_KEY`. Place service account JSON at `config/gcp-service-account.json` (gitignored).

> Proxy port: **4000** (`MSC_LITELLM_PORT`). Logs: `.sandbox/litellm/`. Stop: `npm run msc:litellm:stop`.

## 3. Operational readiness check

- Confirm latest **`.cursor/docs/project-log.md`** entry
- Verify **`git status`** (report clean vs has changes)
- Review **`examples/`** — Tailwind/shadcn for UI, Payload for backend
- **Do not** start dev servers unless operator explicitly requests a sandbox UI

## 4. Objective setting

- Check **`.cursor/prompts/task-planner.md`** for active Phase 1–3 goals
- Obtain operator confirmation before writing or modifying code
- Report: `System Ready. [Current Status] [Active Task].`

## 5. Acknowledgment

After completing all steps, print:

```
✅ v2.7.0 READY — 61/61 · 8/8 · Git [clean|has changes] · LiteLLM [running|offline] · vader-3-flash [verified|failed|n/a]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Ok, Jon. Let's build.
```

Where:

- `Git clean` → `Git has changes` if unstaged files exist
- `LiteLLM running` after `msc:litellm:status` is `online` (or `verify google-api` / `msc:litellm:test:ngrok` passes)
- `vader-3-flash verified` when ngrok + `/v1/models` includes `vader-3-flash` (Cloud Agent path); `n/a` when operator is not using Vertex proxy

**I am ready for high-velocity development. Acknowledge and proceed.**
