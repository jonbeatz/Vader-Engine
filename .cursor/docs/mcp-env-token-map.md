# MCP Environment Token Map

Binding between `.cursor/mcp.json` env keys and root `.env.example` contract keys. Scripts hydrate live values via `scripts/lib/msc-load-env.mjs` (`.env.local` → `.env.example`).

| MCP env key | `.env.example` key | Hydration |
|-------------|-------------------|-----------|
| `GITHUB_PERSONAL_ACCESS_TOKEN` | `GITHUB_PERSONAL_ACCESS_TOKEN` | `msc-load-env.mjs` |
| `TAVILY_API_KEY` | `TAVILY_API_KEY` | same |
| `FIRECRAWL_API_KEY` | `FIRECRAWL_API_KEY` | same |
| `RESEND_API_KEY` | `RESEND_API_KEY` | same |
| `WP_API_USERNAME` | `WP_API_USERNAME` | same |
| `WP_API_PASSWORD` | `WP_API_PASSWORD` | same |

Committed `.cursor/mcp.json` must use `YOUR_*` placeholders only — never live tokens.
