# Config Directory

Optional operator configuration files (not required for baseline bootstrap).

| File | Purpose |
|------|---------|
| `litellm_config.yaml` | LiteLLM → Vertex routing; Cursor model **`vader-3-flash`**. Database-less proxy (no Payload `DATABASE_URL`). |
| `npm-scripts-appendix.json` | Reference list of extended npm scripts; merge manually into root `package.json` when adopting optional workflows. |
| `sqlite-repair-manifest.example.json` | Example manifest for SQLite repair automation. |

Live secrets for LiteLLM or other services belong in `.env.local`, not in committed YAML.

See `.cursor/docs/local-ai-proxy-setup.md` for proxy setup.
