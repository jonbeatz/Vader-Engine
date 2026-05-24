# Config Directory

Optional operator configuration files (not required for baseline bootstrap).

| File | Purpose |
|------|---------|
| `litellm_config.yaml` | LiteLLM proxy model routing and provider keys (local AI proxy on port 4000/8000). |
| `npm-scripts-appendix.json` | Reference list of extended npm scripts; merge manually into root `package.json` when adopting optional workflows. |
| `sqlite-repair-manifest.example.json` | Example manifest for SQLite repair automation. |

Live secrets for LiteLLM or other services belong in `.env.local`, not in committed YAML.

See `.cursor/docs/local-ai-proxy-setup.md` for proxy setup.
