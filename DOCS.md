# Documentation Index (SSoT Router)

Single entry point for all **Boilerplate-v2.1.0 Gold Master** documentation. Technical precedence: [TRUTH.md](TRUTH.md).

## Human control panel (root)

| Document | Purpose |
|----------|---------|
| [TRUTH.md](TRUTH.md) | Constitution — v2.1 principles, tokens, zero-leak, MCP portability |
| [README.md](README.md) | System overview, quick start, full command reference |
| [START-HERE.md](START-HERE.md) | Agent/operator cold-start phases and checklists |
| [DOCS.md](DOCS.md) | This index |
| [ARCHITECTURE.md](ARCHITECTURE.md) | High-level layout, sandboxes, CI pipeline |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Operational recovery paths |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Fork, forge, hooks, PR gates |
| [CHANGELOG.md](CHANGELOG.md) | Release history (v2.1.0 Gold Master) |

## Operator runbooks (`.cursor/docs/`)

| Document | Purpose |
|----------|---------|
| [HOW-TO.md](.cursor/docs/HOW-TO.md) | Command runbook, build ritual, Gold Master certification |
| [Code-Jedi.md](.cursor/docs/Code-Jedi.md) | Module compass, npm script inventory |
| [system-architecture.md](.cursor/docs/system-architecture.md) | Structural blueprint (4 layers) |
| [consumer-bootstrap.md](.cursor/docs/consumer-bootstrap.md) | Next.js 15 + Payload consumer install |
| [mcp-setup.md](.cursor/docs/mcp-setup.md) | MCP servers, `${workspaceFolder}`, API key contract |
| [mcp-env-token-map.md](.cursor/docs/mcp-env-token-map.md) | MCP ↔ `.env.example` key mapping |
| [ecosystem-options-matrix.md](.cursor/docs/ecosystem-options-matrix.md) | Env strategies and toggles |
| [project-log.md](.cursor/docs/project-log.md) | Session changelog |
| [incident-log.md](.cursor/docs/incident-log.md) | Incident history |
| [REPAIR_PROTOCOLS.md](.cursor/docs/REPAIR_PROTOCOLS.md) | Repair escalation paths |
| [discovered-logic-map.md](.cursor/docs/discovered-logic-map.md) | Multi-repo capability map |
| [local-ai-proxy-setup.md](.cursor/docs/local-ai-proxy-setup.md) | LiteLLM / ngrok proxy |
| [media-strategy-specs.md](.cursor/docs/media-strategy-specs.md) | Media sync strategies |
| [spaceship-node-deployment.md](.cursor/docs/spaceship-node-deployment.md) | cPanel Node deploy |
| [github-automation-rules.md](.cursor/docs/github-automation-rules.md) | Releases and branching |
| [sqlite-repair-manifest.md](.cursor/docs/sqlite-repair-manifest.md) | SQLite repair contract |
| [README-inventory.md](.cursor/docs/README-inventory.md) | Auto-generated MCP + npm inventory (`npm run inventory`) |

**Local-only (gitignored, not on GitHub):** `.cursor/docs/BOILERPLATE-IMPROVEMENT/`, `.cursor/docs/README/` — upgrade runbooks and README drafts.

## Agent layer

| Path | Purpose |
|------|---------|
| [.cursor/skills/README.md](.cursor/skills/README.md) | Competency nodes 1–8 |
| [.cursor/skills/studio-dark-shield.md](.cursor/skills/studio-dark-shield.md) | Path A Shield vs Path B Tailwind |
| [.cursor/rules/README.md](.cursor/rules/README.md) | Conditional rules index |
| [.cursor/rules/global.mdc](.cursor/rules/global.mdc) | Always-on session bindings |
| [.cursor/prompts/task-planner.md](.cursor/prompts/task-planner.md) | Start Project gate |
| [.cursor/prompts/session-handoff.md](.cursor/prompts/session-handoff.md) | End Project gate |

## Examples (sandboxes)

| Path | Stack | Port |
|------|-------|------|
| [examples/nextjs-minimal/](examples/nextjs-minimal/) | Next.js 15.5.7 + TypeScript + Vitest | **3000** |
| [examples/nextjs-payload/](examples/nextjs-payload/) | Next.js 15.4.11 + Payload CMS v3 + SQLite | **3001** |

## v2.1 Gold Master verification

```bash
npm run msc:validate-env
npm run verify:mcp
npm run msc:lint
npm run grade
npm run msc:test:all
```

Target: **52/52 (100%)** on `npm run grade` before forge-ready release.

**CI mirror (GitHub Actions):** validate-env → verify:mcp → lint → grade → msc:test:root → sandbox tests/build.

*Powered by the MSC Media Engine*
