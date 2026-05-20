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

## ⚙️ 2. LiteLLM Proxy Setup

LiteLLM acts as an OpenAI-compatible translation layer for your Google service account credentials.

### Prerequisites

1. Enable **Vertex AI API** on your GCP project (billing as required).
2. Create a **service account** with Vertex AI User (or equivalent).
3. Download the JSON key to a **local-only** path (gitignored), e.g. `config/gcp-service-account.json`.
4. **Never commit** service account keys or `master_key` values to public repositories.

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

  - model_name: msc-gemini-flash
    litellm_params:
      model: vertex_ai/gemini-3-flash-preview
      vertex_project: "your-gcp-project-id"
      vertex_location: "global"

general_settings:
  master_key: "replace-with-long-random-sk-local-only"
```

### Start LiteLLM

```bash
litellm --config path/to/litellm_config.yaml --port 4000
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
| Custom models | Exact `model_name` entries from `litellm_config.yaml` (e.g. `msc-gemini-flash`) |

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
- Prefer **localhost** base URL when Cursor and LiteLLM share the same machine; use ngrok only when external access is required.

---

## 📚 Related boilerplate docs

- **`.env.example`** — `MSC_PUBLIC_ORIGIN`, smoke gates, optional proxy port notes
- **`.cursor/prompts/task-planner.md`** — Phase 3 port/smoke before implementation work
- **`.cursor/docs/incident-log.md`** — log proxy/tunnel failures

