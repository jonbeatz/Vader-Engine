# Documentation Index (SSoT Router)

Single entry point for all Boilerplate-v2 Gold Master documentation. Technical precedence: [TRUTH.md](TRUTH.md).

## Human control panel (root)

| Document | Purpose |
|----------|---------|
| [TRUTH.md](TRUTH.md) | Constitution — v2 principles, tokens, zero-leak, MCP portability |
| [README.md](README.md) | System overview + **QUICKSTART** |
| [START-HERE.md](START-HERE.md) | Agent/operator cold-start phases and checklists |
| [DOCS.md](DOCS.md) | This index |

## Operator runbooks (`.cursor/docs/`)

| Document | Purpose |
|----------|---------|
| [HOW-TO.md](.cursor/docs/HOW-TO.md) | Command runbook, build ritual, Gold Master certification |
| [Code-Jedi.md](.cursor/docs/Code-Jedi.md) | Module compass, npm script inventory |
| [system-architecture.md](.cursor/docs/system-architecture.md) | Structural blueprint |
| [consumer-bootstrap.md](.cursor/docs/consumer-bootstrap.md) | Next.js 15 + Payload consumer install |
| [mcp-setup.md](.cursor/docs/mcp-setup.md) | MCP servers, `${workspaceFolder}`, API key contract |
| [ecosystem-options-matrix.md](.cursor/docs/ecosystem-options-matrix.md) | Env strategies and toggles |
| [project-log.md](.cursor/docs/project-log.md) | Session changelog |
| [discovered-logic-map.md](.cursor/docs/discovered-logic-map.md) | Multi-repo capability map |
| [local-ai-proxy-setup.md](.cursor/docs/local-ai-proxy-setup.md) | LiteLLM / ngrok proxy |
| [media-strategy-specs.md](.cursor/docs/media-strategy-specs.md) | Media sync strategies |
| [spaceship-node-deployment.md](.cursor/docs/spaceship-node-deployment.md) | cPanel Node deploy |
| [github-automation-rules.md](.cursor/docs/github-automation-rules.md) | Releases and branching |
| [sqlite-repair-manifest.md](.cursor/docs/sqlite-repair-manifest.md) | SQLite repair contract |

## Agent layer

| Path | Purpose |
|------|---------|
| [.cursor/skills/README.md](.cursor/skills/README.md) | Competency nodes 1–8 |
| [.cursor/skills/studio-dark-shield.md](.cursor/skills/studio-dark-shield.md) | Path A Shield vs Path B Tailwind |
| [.cursor/rules/README.md](.cursor/rules/README.md) | Conditional rules index |
| [.cursor/prompts/task-planner.md](.cursor/prompts/task-planner.md) | Start Project gate |
| [.cursor/prompts/session-handoff.md](.cursor/prompts/session-handoff.md) | End Project gate |

## Examples

| Path | Purpose |
|------|---------|
| [examples/nextjs-minimal/](examples/nextjs-minimal/) | Next.js 15 + Vitest on port **3000** |

## v2 Gold Master verification

```bash
npm run verify:mcp
npm run verify:local
npm run grade
```

Target: **100%** on `npm run grade` before forge-ready release.

*Powered by the MSC Media Engine*
