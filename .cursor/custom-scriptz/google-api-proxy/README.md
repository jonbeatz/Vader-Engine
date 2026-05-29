# google-api-proxy (portable module)

Local **LiteLLM** proxy to **Google Vertex AI**, with optional **ngrok** for Cursor Cloud Agent (`vader-3-flash` / `vader-3.5-flash`).

## Contents

| Path | Purpose |
|------|---------|
| `scripts/msc-litellm-*.mjs` | Start, stop, status, verify, preflight, ngrok test |
| `scripts/lib/msc-litellm-env.mjs` | Port, config path, auth headers, health probes |
| `scripts/lib/msc-ngrok-utils.mjs` | ngrok binary resolve, tunnel URL, Cursor settings banner |
| `scripts/vpe-start-api.ps1` | Windows launcher → `npm run msc:litellm:start[:ngrok]` |
| `config/litellm_config.example.yaml` | Model aliases + `master_key` template |
| `google-api/` | **Runtime slot** — place `ngrok.exe` here (~31 MB, not in Git). See `google-api/README.md` |
| `google-api/vpe-start-api.ps1` | Windows launcher shim |
| `package-scripts.json` | npm scripts + env keys + chat shortcuts |
| `env.example.fragment` | Keys to append to target `.env.example` |

## Install

```powershell
cd .cursor/custom-scriptz/google-api-proxy
.\install.ps1
.\install.ps1 -WhatIf   # dry run
```

## Operator commands (after install)

| Say | npm |
|-----|-----|
| `start google-api` | `npm run msc:google-api:start` |
| `verify google-api` | `npm run msc:litellm:test:ngrok` |
| `stop google-api` | `npm run msc:litellm:stop` |

## Prerequisites

- Node 20+ repo with `scripts/lib/msc-load-env.mjs`
- Python `pip install litellm[proxy]` (`npm run msc:litellm:install-deps`)
- GCP service account JSON (gitignored) — `GOOGLE_APPLICATION_CREDENTIALS`
- **`google-api/ngrok.exe`** on disk (or `ngrok` on PATH) — required for Cloud Agent / `msc:litellm:start:ngrok`
- `NGROK_AUTHTOKEN` in `.env.local` for authenticated tunnels

## Ports

| Service | Default |
|---------|---------|
| LiteLLM | `4000` (`MSC_LITELLM_PORT`) |
| ngrok inspector | `4040` |

Full runbook: `.cursor/docs/local-ai-proxy-setup.md` (when installed in Vader Engine).
