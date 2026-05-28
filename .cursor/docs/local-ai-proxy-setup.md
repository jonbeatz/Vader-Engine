# Local AI Proxy Engine: LiteLLM, Ngrok, & Vertex AI Setup

This runbook documents the canonical architecture for running a local AI proxy layer that exposes **OpenAI-compatible** routes to **Google Vertex AI**, routable into Cursor or other local development tools without port collisions.



---

## 🗺️ 1. Local Architecture Map

```text
┌──────────────┐      ┌─────────────┐      ┌────────────┐      ┌───────────┐
│ Cursor Client│ ───► │ Ngrok Tunnel│ ───► │   LiteLLM  │ ───► │ Vertex AI │
│ (Base URL)   │      │ (Public URL)│      │ Proxy Port │      │  (GCP)    │
└──────────────┘      └─────────────┘      └────────────┘      └───────────┘
```

| Hop | Default port | Notes |
|-----|----------------|-------|
| LiteLLM (local) | **4000** (convention) or **8000** | Single listener; must match ngrok target |
| Ngrok inspector | **4040** | Local dashboard for tunnel URL |
| App dev server | **3000** (typical Next.js) | Keep separate from proxy port |

**Cursor base URL must end with `/v1`** — e.g. `http://127.0.0.1:4000/v1` or `https://<tunnel-subdomain>.ngrok-free.app/v1`.

---

## 🚀 Operator quick start: `start google-api` (canonical)

Use this when Cursor is set to **`vader-3-flash`** and routes through Vertex via LiteLLM.

### Natural language (Cursor Agent)

| You say | Command |
|---------|---------|
| `start google-api` | `npm run msc:litellm:start:ngrok` |
| `verify google-api` | `npm run msc:litellm:test:ngrok` |
| `status google-api` | `npm run msc:litellm:status` |
| `stop google-api` | `npm run msc:litellm:stop` |
| `restart google-api` | `npm run msc:litellm:stop` then `npm run msc:litellm:start:ngrok` |

Defined in `.cursor/rules/global.mdc`.

### What `start google-api` does

1. Runs `msc:litellm:preflight` (GCP key, `litellm` CLI, database-less mode).
2. Clears ports **4000** (LiteLLM) and **4040** (ngrok inspector) if busy.
3. Starts **ngrok** in the background (`google-api/ngrok.exe` or `MSC_NGROK_BIN`).
4. Waits for the **HTTPS** public URL and prints a **Cursor settings** checklist.
5. Starts **LiteLLM in the foreground** in the same terminal (keep open; Ctrl+C stops both processes on that shell).

### npm scripts (package.json truth)

| Script | Purpose |
|--------|---------|
| `msc:litellm:start:ngrok` | LiteLLM + ngrok (Cloud Agent) |
| `msc:litellm:start` | LiteLLM localhost only (same machine as Cursor IDE) |
| `msc:litellm:test:ngrok` | Verify local `:4000` + remote ngrok `/v1/models` |
| `msc:litellm:verify` | Local Vertex chat smoke |
| `msc:litellm:stop` | Kill proxy port + ngrok inspector |
| `msc:litellm:status` | `online` / `offline` on port 4000 |
| `msc:litellm:preflight` | Pre-start checks |
| `msc:litellm:install-deps` | `pip install litellm[proxy] prisma` (first time) |

### First-time setup (`.env.local`)

| Key | Purpose |
|-----|---------|
| `GOOGLE_APPLICATION_CREDENTIALS` | Path to `config/gcp-service-account.json` (gitignored) |
| `GOOGLE_CLOUD_PROJECT` | GCP project id (or auto from JSON `project_id`) |
| `GOOGLE_CLOUD_LOCATION` | `global` for Gemini 3 preview |
| `MSC_LITELLM_MASTER_KEY` | Optional — Cursor OpenAI API Key field |
| `NGROK_AUTHTOKEN` | ngrok auth (if tunnel fails to register) |
| `MSC_NGROK_BIN` | Optional — default resolves `google-api/ngrok.exe` |

**Do not** set root `DATABASE_URL` for LiteLLM — that key is for **Payload** (`file:./…sqlite`). Start scripts strip it so Prisma does not expect PostgreSQL.

### Cursor settings (after `start google-api`)

| Setting | Value |
|---------|--------|
| Override OpenAI Base URL | `https://<your-ngrok-host>/v1` (printed at startup) |
| Custom model | **`vader-3-flash`** (must match `config/litellm_config.yaml`) |
| OpenAI API Key | `MSC_LITELLM_MASTER_KEY` from `.env.local` (if configured) |

**Cloud Agent cannot use** `http://127.0.0.1:4000/v1` — always use the live ngrok HTTPS URL.

### Troubleshooting

| Symptom | Cause | Fix |
|---------|--------|-----|
| `ERROR_PROVIDER_ERROR` / resource not found | Stale ngrok URL or proxy offline | `start google-api` → copy **new** HTTPS URL into Cursor |
| Model not found | Cursor model ≠ config alias | Use **`vader-3-flash`** exactly |
| `ModuleNotFoundError: prisma` | Missing Python deps | `npm run msc:litellm:install-deps` |
| Prisma / `postgresql://` URL error | Payload `DATABASE_URL` leaked to LiteLLM | Ensure latest scripts; no `DATABASE_URL` override for proxy |
| ngrok URL missing | Tunnel not up / authtoken | Set `NGROK_AUTHTOKEN`; check `http://127.0.0.1:4040` |
| Port 4000 busy | Orphan LiteLLM | `npm run msc:litellm:stop` or `npm run msc:kill -- 4000` |

---

## ⚙️ 2. LiteLLM Proxy Setup

LiteLLM acts as an OpenAI-compatible translation layer for your Google service account credentials.

### Prerequisites

1. Enable **Vertex AI API** on your GCP project (billing as required).
2. Create a **service account** with Vertex AI User (or equivalent).
3. Download the JSON key to a **local-only** path (gitignored), e.g. `config/gcp-service-account.json`.
4. **Never commit** service account keys or `master_key` values to public repositories.
5. Python proxy deps: `pip install litellm[proxy]` (or `npm run msc:litellm:install-deps`). **Prisma/PostgreSQL are optional** — only needed if you set `MSC_LITELLM_DATABASE_URL` for the LiteLLM admin UI.
6. **Do not** point LiteLLM at Payload's `DATABASE_URL` (`file:./…sqlite` in `.env.example`). The start scripts strip it automatically; Cursor-only Vertex routing uses **no database**.

### Environment variables (recommended)

| Variable | Purpose |
|----------|---------|
| `GOOGLE_APPLICATION_CREDENTIALS` | Absolute path to service account JSON |
| `GOOGLE_CLOUD_PROJECT` / `GCLOUD_PROJECT` | GCP project id (or read from JSON `project_id`) |
| `GOOGLE_CLOUD_LOCATION` / `VERTEXAI_LOCATION` | `global` for Gemini 3 preview models |
| `LITELLM_DROP_PARAMS` | `true` — strips OpenAI params Vertex rejects |
| `MSC_LITELLM_PORT` | Proxy listen port (default **4000**) |

### `config/litellm_config.yaml` (template)

```yaml
litellm_settings:
  drop_params: true

model_list:
  - model_name: msc-gemini-pro
    litellm_params:
      model: vertex_ai/gemini-3.1-pro-preview
      vertex_project: "your-gcp-project-id"
      vertex_location: "global"
      # vertex_credentials: "/absolute/path/to/service-account.json"  # optional if ADC env is set

  - model_name: vader-3-flash
    litellm_params:
      model: vertex_ai/gemini-3-flash-preview
      vertex_project: os.environ/GOOGLE_CLOUD_PROJECT
      vertex_location: os.environ/GOOGLE_CLOUD_LOCATION
      vertex_credentials: os.environ/GOOGLE_APPLICATION_CREDENTIALS

  - model_name: msc-gemini-flash
    litellm_params:
      model: vertex_ai/gemini-3-flash-preview
      vertex_project: os.environ/GOOGLE_CLOUD_PROJECT
      vertex_location: os.environ/GOOGLE_CLOUD_LOCATION

general_settings:
  master_key: os.environ/MSC_LITELLM_MASTER_KEY
```

### Start LiteLLM (canonical)

**Cursor Cloud Agent** (cannot reach localhost — use ngrok):

```bash
npm run msc:litellm:start:ngrok    # foreground; prints HTTPS URL + Cursor checklist
# second terminal:
npm run msc:litellm:test:ngrok      # verifies local + remote /v1/models
```

Windows alias (same as above):

```powershell
.\google-api\vpe-start-api.ps1 -StartNgrok
# or: .\scripts\vpe-start-api.ps1 -StartNgrok
```

**Local IDE only** (same machine as LiteLLM):

```bash
npm run msc:litellm:start
npm run msc:litellm:verify
```

Manual fallback:

```bash
litellm --config config/litellm_config.yaml --port 4000
```

Confirm the log shows **`Uvicorn running on http://0.0.0.0:4000`** (or your chosen port). Only **one** LiteLLM instance may bind that port.

### Verify locally

```bash
curl -s -H "Authorization: Bearer <master_key>" http://127.0.0.1:4000/v1/models
```

Expect JSON model list. Free a stuck proxy listener before restart:

```bash
node scripts/msc-kill-dev-port.mjs 4000
```

Web app verification (separate port **3000**) uses the full **Local Script Gate Sequence** — see Node 2.

---

## 🌐 3. Ngrok Secure Tunneling

To route HTTPS traffic without editing system host profiles:

```bash
ngrok http 4000
```

1. Copy the **HTTPS** forwarding URL from `http://127.0.0.1:4040` or the ngrok console.
2. Append **`/v1`** for Cursor **Override OpenAI Base URL**.
3. Set **OpenAI API Key** in Cursor to `general_settings.master_key` from your LiteLLM config.

**Stale tunnel rule:** Free ngrok URLs stop when the tunnel process exits. If Cursor shows `ERROR_PROVIDER_ERROR`, restart LiteLLM + ngrok and paste the **new** URL.

### End bridge (clean shutdown)

Before the next session, free the proxy port and ngrok forwarders (project-specific scripts may wrap this). Pattern:

```bash
node scripts/msc-kill-dev-port.mjs 4000
```

---

## 🖥️ 4. Cursor IDE Integration Checklist

| Setting | Value |
|---------|--------|
| Override OpenAI Base URL | `https://<live-ngrok-host>/v1` or `http://127.0.0.1:4000/v1` |
| OpenAI API Key | LiteLLM `master_key` |
| Custom models | **`vader-3-flash`** (Cursor) or `vertex-gemini-flash` / `msc-gemini-flash` — must match `config/litellm_config.yaml` |

**Test:** Chat with the flash model alias; expect **200** in LiteLLM access logs.

**Agent vs Ask:** If Agent mode fails with tool/schema errors, test **Ask** mode first, upgrade LiteLLM, and keep `drop_params: true`.

---

## 🚫 5. LocalWP & Port Collision Management

**Rule:** Reserve the LiteLLM proxy port (default **4000**) exclusively for the AI bridge. LocalWP, Next.js (`3000`), and other Node apps must not steal that listener.

| Conflict | Action |
|----------|--------|
| Port busy on proxy | `node scripts/msc-kill-dev-port.mjs 4000` |
| Port busy on Next dev | `node scripts/msc-kill-dev-port.mjs 3000` |
| Wrong Uvicorn port in log | Stop all LiteLLM windows, clear `PORT` env overrides, restart until log shows intended port |

**Pre-flight (Start Project ritual):** Read proxy docs → confirm credentials → start LiteLLM → optional ngrok → ping `/v1/models` → do **not** start unrelated dev servers unless requested.

---

## 🔒 Security Baseline

- Service account JSON and `master_key` live only in gitignored paths or secret stores.
- Rotate keys if exposed; never paste live secrets into `.cursor/docs/`.
- **Cursor Cloud Agent:** ngrok HTTPS + `/v1` only (`start google-api`).
- **Cursor on same machine as LiteLLM:** `http://127.0.0.1:4000/v1` is OK (`npm run msc:litellm:start`).

---

## 📚 Related boilerplate docs

- **`.env.example`** — `MSC_PUBLIC_ORIGIN`, smoke gates, optional proxy port notes
- **`.cursor/prompts/task-planner.md`** — Phase 3 port/smoke before implementation work
- **`.cursor/docs/incident-log.md`** — log proxy/tunnel failures

