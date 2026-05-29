# `.cursor` — Agent layer (Vader Engine)

Project-local Cursor configuration: MCP, hooks, rules, docs, and personal env reference.

| Path | Role | Move? |
|------|------|-------|
| `mcp.json` | Project MCP servers (Cursor loads this path only) | **No** — root required |
| `mcp-blueprint.json` | Extended MCP catalog (reference) | **No** — keep at root |
| `hooks.json` | Cursor hook wiring | **No** — root required |
| `settings.json` | Project Cursor settings | **No** — root required |
| `hooks/` | Hook scripts | Subfolder |
| `rules/` | Always-on / scoped `.mdc` rules | Subfolder |
| `prompts/` | Start/End/Update rituals | Subfolder |
| `skills/` | Procedural agent skills | Subfolder |
| `docs/` | Runbooks, operator cards, repair protocols | Subfolder |
| `plans/` | Roadmaps | Subfolder |
| `blueprints/` | Reference snippets | Subfolder |
| `env/` | Personal env contracts + generated vault | Subfolder |

**Not in `.cursor`:** v0 mock images → `media/design-references/` (local reference; binaries gitignored).

**Commands:** `npm run msc:google-api:start` or say **start google-api** in chat.

**Index:** [rules/README.md](rules/README.md) · [docs/HOW-TO.md](docs/HOW-TO.md) · [env/README.md](env/README.md)
