# MCP Setup — Vader Engine Project Layer

How Model Context Protocol servers are split between **this repo** (`.cursor/mcp.json`) and your **global** Cursor config (`~/.cursor/mcp.json` on Windows: `%USERPROFILE%\.cursor\mcp.json`).

---

## Local secrets (zero-leak)

| File | Use |
|------|-----|
| `.env.local` | Live `GITHUB_PERSONAL_ACCESS_TOKEN`, `TAVILY_API_KEY`, etc. — **gitignored** |
| `.env.example` | Key names + placeholders only — safe to commit |

Node scripts hydrate via `scripts/lib/msc-load-env.mjs` before reading `process.env.*`.  
**Do not** put live tokens in committed `.cursor/mcp.json`; use Cursor global MCP env or operator-local overrides.

Agents must not ask operators to paste secrets into chat — add keys to `.env.example` + values in `.env.local`.

**Personal backup vault (optional):** Regenerate a full local snapshot with `node scripts/msc-build-personal-secrets-vault.mjs` → `.cursor/env/Personal-Secrets-Vault.md` (gitignored). Index: [env/README.md](../env/README.md). Operator card: [Vader-Credentials.md](./Vader-Credentials.md).

---

## Two-layer model

| Layer | File | Purpose |
|-------|------|---------|
| **Project** | `.cursor/mcp.json` | 13 servers: Payload, GitHub, Playwright, search, WordPress, Neon, **shadcn**, **context7**, … — travels with the boilerplate copy |
| **Global** | `~/.cursor/mcp.json` | Machine-specific tools: `console-ninja`, `mcpterm`, `desktop-commander`, `playwright-electron`, wide filesystem roots |
| **Reference** | `.cursor/mcp-blueprint.json` | Full catalog + optional servers (Docker, InstaWP, Google Workspace) to add per consumer |

Cursor **merges** project + global servers when this workspace is open.

---

## Project servers (`.cursor/mcp.json`)

| Server | Package | Requires key / setup |
|--------|---------|----------------------|
| `payload` | `@govcraft/payload-cms-mcp` | Active Payload app in workspace |
| `github` | `@modelcontextprotocol/server-github` | `GITHUB_PERSONAL_ACCESS_TOKEN` |
| `playwright` | `@playwright/mcp` | Local dev on **3000** for smoke |
| `filesystem` | `@modelcontextprotocol/server-filesystem` | Replace `REPLACE_WITH_ABSOLUTE_PROJECT_ROOT` with repo path |
| `fetch` | `mcp-server-fetch` | None |
| `tavily` | `tavily-mcp` | `TAVILY_API_KEY` |
| `firecrawl` | `firecrawl-mcp` | `FIRECRAWL_API_KEY` |
| `resend` | `resend-mcp` | `RESEND_API_KEY` |
| `sequential-thinking` | `@zengwenliang/mcp-server-sequential-thinking` | None |
| `wordpress-local` | `@automattic/mcp-wordpress-remote` | `WP_API_*` + MCP adapter on WP site |
| `neon-postgres` | Neon hosted MCP | Browser auth on first use |
| `shadcn` | `shadcn@latest mcp` | Consumer `components.json`; enable in Cursor MCP UI |
| `context7` | `@upstash/context7-mcp` | None; prompt with “use context7” for live library docs |

### Intentionally **not** in project file

- **Site-specific** WordPress MCP entries (multiple `.local` hosts) — add one generic `wordpress-local` per consumer
- **`playwright-electron`** — only for Electron/CDP apps (Node-Launcher VPE pattern)
- **Wide filesystem roots** (`C:\Users\...`, entire `D:\Cursor_Projectz`) — scope filesystem to **one project root** only
- **Figma Dev Mode MCP** — desktop SSE; enable globally per machine (see blueprint `figma-dev-mode`)

### Design / UI MCP pair (Tier 1)

- **shadcn** — registry browse/install; requires consumer `components.json` for full tool surface.
- **context7** — up-to-date Tailwind, React, Next, Payload docs in agent context.

Hybrid styling paths: [consumer-bootstrap.md](./consumer-bootstrap.md) §6 · skill [studio-dark-shield.md](../skills/studio-dark-shield.md).

---

## Environment contract

Copy **`.env.example`** → `.env.local` in your consumer app. Keys listed under **MCP & INTEGRATION API KEYS** must match what you paste into:

1. Cursor → Settings → MCP → per-server env, or
2. `.cursor/mcp.json` `env` blocks (placeholders only in Git)

Never commit filled `.env` or live tokens.

---

## First-time setup checklist

1. Copy `.env.example` to `.env.local` and fill placeholders.
2. Edit `.cursor/mcp.json` → set `filesystem` arg to your absolute project path (e.g. `D:\\Cursor_Projectz\\MyApp`).
3. In Cursor MCP settings, confirm project servers show **green** after reload.
4. Run package pulse check:

```bash
node scripts/msc-verify-mcp.mjs
```

5. For Payload + portfolio work, prefer **Node 2** script gates before MCP browser tools:

```bash
node scripts/msc-kill-dev-port.mjs 3000
node scripts/msc-local-http-smoke.mjs 3000
```

---

## Global MCP recommendations (keep in `~/.cursor/mcp.json`)

Useful across all MSC workspaces but **machine-bound**:

- `terminal-controller` / `mcpterm` — shell automation
- `desktop-commander` — file/process ops
- `console-ninja` — live console tap
- `cursor-rules-generator` — rules scaffolding
- `postgres` — only when `DATABASE_URI` points at local Postgres
- `mcp-vercel` — deploy pipelines

Rotate any PAT or app password if it was ever committed or shared in logs.

---

## Agent discipline

- Read MCP tool schemas before `CallMcpTool`.
- Prefer `scripts/msc-kill-dev-port.mjs` → `msc-local-http-smoke.mjs` for local port hygiene.
- Use **Node 6** doc for LiteLLM/ngrok — separate from MCP browser tools.
