# Vader Credentials — Master Personal Reference

> **Purpose:** One-page backup for your G: drive / offline reference.  
> **Last updated:** 2026-05-29 · **Engine version:** v2.6.1 · **Branch:** `Vader-Engine-Dev-v1`  
> **Security:** Copy this file + the JSON key files to your backup drive. Do **not** push live secrets to public GitHub.

---

## At-a-glance (copy-paste ready)

| Item | Value |
|------|--------|
| **OpenAI API Key (Cursor)** | `sk-vader-protocol-1234` (= `MSC_LITELLM_MASTER_KEY` in `.env.local`) |
| **Override OpenAI Base URL (Cloud Agent)** | `https://pushy-water-reformer.ngrok-free.dev/v1` |
| **Override OpenAI Base URL (local IDE)** | `http://127.0.0.1:4000/v1` |
| **Recommended model** | `vader-3.5-flash` |
| **GCP project** | `wordpress-map-1492461083797` |
| **Vertex location** | `global` |
| **Canonical LiteLLM config** | `config/litellm_config.yaml` |
| **LiteLLM port** | `4000` |
| **Ngrok inspector** | `http://127.0.0.1:4040` |

---

<details>
<summary>🖥️ Cursor Settings — step by step</summary>

| Setting | Value |
|---------|--------|
| **Override OpenAI Base URL** | `https://pushy-water-reformer.ngrok-free.dev/v1` *(paste fresh URL after each `start google-api`)* |
| **OpenAI API Key** | `sk-vader-protocol-1234` |
| **Custom model (add + enable)** | `vader-3.5-flash` |

### How to use `vader-3.5-flash`

1. Run **`start google-api`** (or `npm run msc:litellm:stop && npm run msc:litellm:start:ngrok`).
2. Copy the **HTTPS `/v1` URL** from the terminal (ngrok URL changes if tunnel restarts).
3. Cursor → **Settings → Models** → paste Base URL and API key above.
4. Add custom model **`vader-3.5-flash`** and enable it.
5. Select **`vader-3.5-flash`** in the Agent model picker.

</details>

<details>
<summary>🤖 Working models (Vertex aliases)</summary>

| Cursor model | Vertex backend | Use case |
|--------------|----------------|----------|
| **`vader-3.5-flash`** | `vertex_ai/gemini-3.5-flash` | **Recommended** — coding / agent work (uses thinking tokens) |
| **`vader-31-pro`** | `vertex_ai/gemini-3.1-pro-preview` | More powerful, slower |
| **`vader-3-pro`** | `vertex_ai/gemini-3-pro-preview` | Good balance |
| **`vader-3-flash`** | `vertex_ai/gemini-3-flash-preview` | Fastest, legacy compatibility |

> **Thinking models:** Use higher `max_tokens` in API tests (e.g. 64–300). Low limits can return `content: null` while reasoning finishes.

</details>

<details>
<summary>🔑 API keys & where they live</summary>

| Question | Answer |
|----------|--------|
| **What do I paste in Cursor “OpenAI API Key”?** | `sk-vader-protocol-1234` |
| **Where is the master key defined?** | `config/litellm_config.yaml` → `general_settings.master_key` |
| **Where is it mirrored for scripts?** | `.env.local` → `MSC_LITELLM_MASTER_KEY` |
| **Must they match?** | **Yes** — mismatch causes 401/400 in Cursor |

```text
OpenAI API Key:     sk-vader-protocol-1234
Base URL (ngrok):   https://pushy-water-reformer.ngrok-free.dev/v1
Base URL (local):   http://127.0.0.1:4000/v1
```

</details>

<details>
<summary>📝 `.env.local` template (gitignored)</summary>

Live values belong in **repo-root `.env.local` only** (never commit).

```bash
# LiteLLM proxy — must match general_settings.master_key in config/litellm_config.yaml
MSC_LITELLM_MASTER_KEY=sk-vader-protocol-1234

# Optional — scripts hydrate from .env.example if unset
GOOGLE_APPLICATION_CREDENTIALS=config/gcp-service-account.json
GOOGLE_CLOUD_PROJECT=wordpress-map-1492461083797
GOOGLE_CLOUD_LOCATION=global

# Optional — ngrok
# NGROK_AUTHTOKEN=your_ngrok_token
# MSC_NGROK_BIN=google-api/ngrok.exe
```

| Variable | Purpose |
|----------|---------|
| `MSC_LITELLM_MASTER_KEY` | Cursor “OpenAI API Key” + LiteLLM auth |
| `GOOGLE_APPLICATION_CREDENTIALS` | Path to primary GCP service account JSON |
| `GOOGLE_CLOUD_PROJECT` | GCP project id |
| `GOOGLE_CLOUD_LOCATION` | `global` for Gemini 3.x preview |
| `NGROK_AUTHTOKEN` | Required if ngrok tunnel fails to start |

</details>

<details>
<summary>⚙️ LiteLLM config (`config/litellm_config.yaml`)</summary>

**Runtime path:** `config/litellm_config.yaml` — **not** `google-api/litellm_config.yaml` (reference copy only).

```yaml
litellm_settings:
  drop_params: true

model_list:
  - model_name: vader-3-flash
    litellm_params:
      model: vertex_ai/gemini-3-flash-preview
      vertex_project: "wordpress-map-1492461083797"
      vertex_location: "global"

  - model_name: vader-3-pro
    litellm_params:
      model: vertex_ai/gemini-3-pro-preview
      vertex_project: "wordpress-map-1492461083797"
      vertex_location: "global"

  - model_name: vader-31-pro
    litellm_params:
      model: vertex_ai/gemini-3.1-pro-preview
      vertex_project: "wordpress-map-1492461083797"
      vertex_location: "global"

  - model_name: vader-3.5-flash
    litellm_params:
      model: vertex_ai/gemini-3.5-flash
      vertex_project: "wordpress-map-1492461083797"
      vertex_location: "global"

general_settings:
  master_key: sk-vader-protocol-1234
```

| Config note | Detail |
|-------------|--------|
| `vertex_credentials` in YAML | **Not used** — auth via `GOOGLE_APPLICATION_CREDENTIALS` at runtime |
| `google-api/litellm_config.yaml` | Keep in sync manually for reference |

</details>

<details>
<summary>📁 GCP service account key files</summary>

### Which file is active?

Scripts use **`scripts/lib/msc-litellm-env.mjs`** fallback order:

1. `config/gcp-service-account.json` ← **primary (wins when both exist)**
2. `google-api/gcp_key.json` ← fallback if config file missing

| File | Service account email | Role |
|------|----------------------|------|
| `config/gcp-service-account.json` | `litellm-proxy@wordpress-map-1492461083797.iam.gserviceaccount.com` | **Active** |
| `google-api/gcp_key.json` | `cursor-access@wordpress-map-1492461083797.iam.gserviceaccount.com` | Backup / legacy |

| Metadata | Primary key | Fallback key |
|----------|-------------|--------------|
| `project_id` | `wordpress-map-1492461083797` | `wordpress-map-1492461083797` |
| `private_key_id` | `d61bf7a81931cfcf0f1af1cbb146aa1b2af11f5c` | `37ed200dd004018ab3f0dcefa4042c60a55acb9c` |

### Backup checklist (copy these files to G: drive)

- [ ] `config/gcp-service-account.json`
- [ ] `google-api/gcp_key.json`
- [ ] `.env.local` (from repo root — **never** in Git)
- [ ] This file: `Vader-Credentials.md`

> Full PEM private keys live **inside** the JSON files above — back up the files themselves; do not paste PEM blocks into Git.

</details>

<details>
<summary>🚀 LiteLLM & ngrok commands</summary>

### Agent shortcuts (say in Cursor chat)

| Say | Runs |
|-----|------|
| `start google-api` | `npm run msc:litellm:stop && npm run msc:litellm:start:ngrok` |
| `stop google-api` | `npm run msc:litellm:stop` |
| `status google-api` | `npm run msc:litellm:status` |
| `verify google-api` | `npm run msc:litellm:test:ngrok` |
| `restart google-api` | Same as `start google-api` |
| `test 3.5 flash` | POST `/v1/chat/completions` with model `vader-3.5-flash` |

### npm commands

```bash
# Clean start (recommended)
npm run msc:litellm:stop && npm run msc:litellm:start:ngrok

# Local only (no ngrok)
npm run msc:litellm:start

# Verify models + ngrok
npm run msc:litellm:test:ngrok

# Local verify only
npm run msc:litellm:verify

# Preflight / first-time deps
npm run msc:litellm:preflight
npm run msc:litellm:install-deps
```

### Windows PowerShell alias

```powershell
.\google-api\vpe-start-api.ps1 -StartNgrok
# or
.\scripts\vpe-start-api.ps1
```

</details>

<details>
<summary>🔌 Ports & URLs</summary>

| Service | Port / URL |
|---------|------------|
| LiteLLM proxy | `4000` → `/v1` |
| Ngrok inspector | `4040` |
| Ngrok public (example — **changes**) | `https://pushy-water-reformer.ngrok-free.dev/v1` |
| Dashboard | `3010` |
| Minimal sandbox | `3000` |
| Payload sandbox | `3001` |
| Tailwind sandbox | `3002` |

</details>

<details>
<summary>🧪 Quick tests</summary>

### List models (authenticated)

```bash
# PowerShell — use node if curl JSON escaping fails
node -e "fetch('https://pushy-water-reformer.ngrok-free.dev/v1/models',{headers:{Authorization:'Bearer sk-vader-protocol-1234'}}).then(r=>r.json()).then(j=>console.log((j.data||[]).map(m=>m.id).join(', ')))"
```

### Test `vader-3.5-flash` chat

```bash
node -e "fetch('https://pushy-water-reformer.ngrok-free.dev/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer sk-vader-protocol-1234'},body:JSON.stringify({model:'vader-3.5-flash',messages:[{role:'user',content:'Say pong'}],max_tokens:64})}).then(r=>r.json()).then(console.log)"
```

</details>

<details>
<summary>🩹 Troubleshooting (symptom → fix)</summary>

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Cursor **Provider Error** / model not found | Stale ngrok URL or proxy offline | `start google-api` → paste **new** HTTPS `/v1` in Cursor |
| **401** on `/v1/models` | Missing/wrong API key | Align Cursor key with `MSC_LITELLM_MASTER_KEY` + config `master_key` |
| **400** invalid model `vader-31-pro` | Proxy not restarted after config edit | `restart google-api` |
| Chat returns `content: null` | Thinking model + low `max_tokens` | Retry with `max_tokens` 64–300 |
| Port **4000** in use | Stale LiteLLM/ngrok | `npm run msc:litellm:stop` then `start google-api` |
| Preflight **GCP creds FAIL** | Key file renamed/missing | Restore `config/gcp-service-account.json` |
| Wrong GCP account used | Only `google-api/gcp_key.json` present | Restore primary config key file |

</details>

<details>
<summary>📂 File index (master list)</summary>

| Path | Purpose |
|------|---------|
| `config/litellm_config.yaml` | **Canonical** LiteLLM + model aliases |
| `google-api/litellm_config.yaml` | Reference copy (sync manually) |
| `config/gcp-service-account.json` | **Primary** GCP key (gitignored) |
| `google-api/gcp_key.json` | Fallback GCP key (gitignored) |
| `google-api/ngrok.exe` | Bundled ngrok binary |
| `.env.local` | Live secrets (gitignored) |
| `.env.example` | Key names + placeholders only |
| `scripts/msc-litellm-start.mjs` | Start proxy (`--ngrok`) |
| `scripts/msc-litellm-stop.mjs` | Stop proxy + kill ngrok |
| `scripts/lib/msc-litellm-env.mjs` | GCP path hydration |
| `.cursor/rules/global.mdc` | `start google-api` shortcuts |
| `.cursor/docs/local-ai-proxy-setup.md` | Full runbook |
| `.cursor/docs/Vader-Engine-Operator-Card.md` | One-page ops |
| `.cursor/docs/Vader-Engine-Cheat-Sheet.md` | Extended cheat sheet |
| `.cursor/env/README.md` | Env backup index + vault regenerate command |
| `.cursor/env/Personal-Secrets-Vault.md` | Generated full secrets (gitignored) |

</details>

<details>
<summary>🔧 Other useful Vader commands</summary>

```bash
npm run start-project:gate    # 61/61 + tests
npm run msc:dev:dashboard     # port 3010
npm run msc:e2e               # Playwright
npm run msc:backup -- --standard 111   # example backup folder name
```

| Say | Action |
|-----|--------|
| `start project` | Cold-start ritual |
| `end project` | Closeout + tracking |
| `backup project` | Conversational backup |
| `update docs` / `update project` | Sync documentation |

</details>

---

## Related docs (pointers only)

| File | Status |
|------|--------|
| **`Vader-Credentials.md`** | **Master** — LiteLLM / Cursor / GCP operator card |
| **`env/Personal-Secrets-Vault.md`** | **Generated** — all env + MCP keys (gitignored; run vault script) |
| `env/README.md` | Env backup folder index |
| `Google-API-Setup-Info.md` | Archived → points here (inline keys removed) |
| `Google-API-DropDowns.md` | Archived → points here |
| `local-ai-proxy-setup.md` | Full operator runbook in repo |

---

## Formatting reference (how this file is structured)

| Issue | Fix applied in this doc |
|-------|-------------------------|
| Sections run together | Blank line between each `</details>` and `<details>` |
| Code not fenced | Triple backticks with `yaml`, `bash`, `text` |
| Tables hard to read | Pipe `\|` tables with header dashes |
| Wrong GCP note (“same account”) | Corrected: two different service accounts; primary wins |

---

*Personal backup tip: copy `Vader-Credentials.md` + `config/gcp-service-account.json` + `google-api/gcp_key.json` + `.env.local` to `G:\Cursor_Project_BackUpz\` (or your vault folder).*
