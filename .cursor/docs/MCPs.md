# Active MCP Servers (Vader Engine v2.7.0)

Reference for MCP servers in **`.cursor/mcp.json`**. Extended setup: **[mcp-setup.md](./mcp-setup.md)**. Structure check: **`npm run verify:mcp`** (no secret values printed).

**Zero-leak:** Committed JSON uses `YOUR_*` placeholders. Live tokens → `.env.local` and/or Cursor Settings → MCP.

---

## payload

**Description:** Payload CMS schema — collections, fields, config.  
**Package:** `@govcraft/payload-cms-mcp@latest`  
**Usage:** Create a Blog Posts collection with title and rich text.  
**Status:** ✅ Active (no key in `.env.example` for baseline)

---

## github

**Description:** Repositories, issues, PRs, code search.  
**Env:** `GITHUB_PERSONAL_ACCESS_TOKEN` → set in `.env.local` / MCP UI  
**Usage:** List open PRs on jonbeatz/Vader-Engine.  
**Status:** ⚠️ Active when token configured

---

## playwright

**Description:** Browser automation (Chrome, localhost allowlist).  
**Usage:** Navigate to `http://127.0.0.1:3000` and capture accessibility snapshot.  
**Status:** ✅ Active

---

## filesystem

**Description:** Read/write within workspace.  
**Path:** `${workspaceFolder}` — portable, never hardcode drive letters  
**Usage:** List files under `examples/nextjs-minimal/src`.  
**Status:** ✅ Active

---

## fetch

**Description:** HTTP fetch for URLs (markdown-friendly).  
**Usage:** Fetch a public docs page for summarization.  
**Status:** ✅ Active

---

## tavily

**Description:** Web search API.  
**Env:** `TAVILY_API_KEY`  
**Usage:** Search for Next.js 15 Suspense migration patterns.  
**Status:** ⚠️ Active when key configured

---

## firecrawl

**Description:** Scrape/crawl structured web content.  
**Env:** `FIRECRAWL_API_KEY`  
**Usage:** Scrape a documentation index into markdown.  
**Status:** ⚠️ Active when key configured

---

## resend

**Description:** Email send via Resend API.  
**Env:** `RESEND_API_KEY`  
**Usage:** Send a test transactional email from a script flow.  
**Status:** ⚠️ Active when key configured

---

## sequential-thinking

**Description:** Step-by-step reasoning tool.  
**Usage:** Break down a failing grade check into ordered hypotheses.  
**Status:** ✅ Active (no key required)

---

## wordpress-local

**Description:** WordPress remote MCP adapter.  
**Env:** `WP_API_URL`, `WP_API_USERNAME`, `WP_API_PASSWORD`  
**Usage:** Fetch recent posts from a local `.test` site.  
**Status:** ⚠️ Active when site + app password configured

---

## neon-postgres

**Description:** Neon serverless Postgres (HTTP transport).  
**URL:** `https://mcp.neon.tech/mcp`  
**Usage:** Verify migration applied on Neon branch.  
**Status:** ✅ Active (OAuth / Neon account in Cursor)

---

## shadcn

**Description:** shadcn/ui registry MCP — add components.  
**Usage:** Add the `button` component to Path B example.  
**Status:** ✅ Active (no API key for baseline)

---

## context7

**Description:** Up-to-date library documentation lookup.  
**Usage:** Get current AI SDK usage for streaming chat.  
**Status:** ✅ Active (no API key for baseline)

---

## Quick status matrix

| Server | Key required | Committed placeholder |
|--------|--------------|------------------------|
| payload | No | — |
| github | Yes | `YOUR_GITHUB_PERSONAL_ACCESS_TOKEN` |
| playwright | No | — |
| filesystem | No | — |
| fetch | No | — |
| tavily | Yes | `YOUR_TAVILY_API_KEY` |
| firecrawl | Yes | `YOUR_FIRECRAWL_API_KEY` |
| resend | Yes | `YOUR_RESEND_API_KEY` |
| sequential-thinking | No | — |
| wordpress-local | Yes | `YOUR_WP_*` |
| neon-postgres | OAuth | — |
| shadcn | No | — |
| context7 | No | — |

---

## Operator notes

- **Restart Cursor** after editing `.cursor/mcp.json` or MCP env in Settings
- **Never** replace `YOUR_*` with live tokens in Git commits
- User-level MCPs (browser devtools, terminal-controller, etc.) may exist outside this repo file — document in session handoff if used

**Signature:** Vader Engine v2.7.0 · 13 servers in project `mcp.json`
