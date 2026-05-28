# Documentation Index (SSoT Router)

Single entry point for all **Vader Engine v2.6.0** documentation. Technical precedence: [TRUTH.md](TRUTH.md) (root) → [.cursor/docs/TRUTH.md](.cursor/docs/TRUTH.md) (agent ritual).

| Field | Value |
| --- | --- |
| **Repository** | [github.com/jonbeatz/Vader-Engine](https://github.com/jonbeatz/Vader-Engine) |
| **Version** | v2.6.0 · semver `2.6.0` · grade **61/61** |

## Human control panel (root)

| Document | Purpose |
|----------|---------|
| [TRUTH.md](TRUTH.md) | Constitution — v2 principles, tokens, zero-leak, MCP portability |
| [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) | Agent onboarding map — structure, ports, components |
| [README.md](README.md) | GitHub landing — overview, sandboxes, commands |
| [START-HERE.md](START-HERE.md) | Cold-start phases and checklists |
| [DOCS.md](DOCS.md) | This index |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | High-level layout, sandboxes, CI |
| [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) | Operational recovery |
| [SECURITY.md](docs/SECURITY.md) | Zero-leak and advisory policy |
| [CONTRIBUTING.md](docs/CONTRIBUTING.md) | Fork, hooks, PR gates |
| [CHANGELOG.md](CHANGELOG.md) | Release history |
| [DEPLOY_TO_HOSTINGER.md](docs/DEPLOY_TO_HOSTINGER.md) | Hostinger Node deploy |
| [docs/releases/](docs/releases/) | Tagged release notes |
| [media/readme/](media/readme/) | README screenshots (committed) |

## Agent workflow (`.cursor/docs/` — active)

| Document | Purpose |
|----------|---------|
| [TRUTH.md](.cursor/docs/TRUTH.md) | Agent constitution — gates, ports, LiteLLM ritual |
| [Project-Bible.md](.cursor/docs/Project-Bible.md) | Command lexicon (§5) |
| [REPAIR_PROTOCOLS.md](.cursor/docs/REPAIR_PROTOCOLS.md) | Recovery runbooks |
| [UPDATE_LOG.md](.cursor/docs/UPDATE_LOG.md) | Fix history |
| [MCPs.md](.cursor/docs/MCPs.md) | MCP catalog + status |
| [Checkpoint.md](.cursor/docs/Checkpoint.md) | Branch / release milestones |
| [Vader-Engine-Cheat-Sheet.md](.cursor/docs/Vader-Engine-Cheat-Sheet.md) | Quick reference |
| [Vader-Engine-Operator-Card.md](.cursor/docs/Vader-Engine-Operator-Card.md) | One-page operator card |
| [project-log.md](.cursor/docs/project-log.md) | Session changelog |
| [local-ai-proxy-setup.md](.cursor/docs/local-ai-proxy-setup.md) | LiteLLM / ngrok / `vader-3-flash` |
| [.last-sync.json](.cursor/docs/.last-sync.json) | Update Docs sync state |

## Agent runbooks (`.cursor/docs/`)

| Document | Purpose |
|----------|---------|
| [HOW-TO.md](.cursor/docs/HOW-TO.md) | Build ritual, release certification |
| [Code-Jedi.md](.cursor/docs/Code-Jedi.md) | Module compass, npm inventory |
| [system-architecture.md](.cursor/docs/system-architecture.md) | Four-layer structural blueprint |
| [consumer-bootstrap.md](.cursor/docs/consumer-bootstrap.md) | Next.js 15 + Payload consumer install |
| [mcp-setup.md](.cursor/docs/mcp-setup.md) | MCP servers, `${workspaceFolder}`, keys |
| [mcp-env-token-map.md](.cursor/docs/mcp-env-token-map.md) | MCP ↔ `.env.example` mapping |
| [ecosystem-options-matrix.md](.cursor/docs/ecosystem-options-matrix.md) | Env strategies |
| [incident-log.md](.cursor/docs/incident-log.md) | Incident history |
| [discovered-logic-map.md](.cursor/docs/discovered-logic-map.md) | Multi-repo capability map |
| [media-strategy-specs.md](.cursor/docs/media-strategy-specs.md) | Media sync strategies |
| [spaceship-node-deployment.md](.cursor/docs/spaceship-node-deployment.md) | cPanel Node deploy |
| [github-automation-rules.md](.cursor/docs/github-automation-rules.md) | Releases and branching |
| [sqlite-repair-manifest.md](.cursor/docs/sqlite-repair-manifest.md) | SQLite repair contract |
| [README-inventory.md](.cursor/docs/README-inventory.md) | Auto inventory (`npm run inventory`) |

## Agent layer (prompts, rules, plans)

| Path | Purpose |
|------|---------|
| [.cursor/prompts/Start-Project.md](.cursor/prompts/Start-Project.md) | Cold-start ritual |
| [.cursor/prompts/End-Project.md](.cursor/prompts/End-Project.md) | Session closeout |
| [.cursor/prompts/Update-Docs.md](.cursor/prompts/Update-Docs.md) | Doc sync workflow |
| [.cursor/prompts/task-planner.md](.cursor/prompts/task-planner.md) | Phase 1–3 gate |
| [.cursor/rules/README.md](.cursor/rules/README.md) | Rules index |
| [.cursor/rules/global.mdc](.cursor/rules/global.mdc) | Always-on session bindings |
| [.cursor/rules/start-project-ritual.mdc](.cursor/rules/start-project-ritual.mdc) | Start Project defaults |
| [.cursor/plans/ENGINE_ROADMAP.md](.cursor/plans/ENGINE_ROADMAP.md) | Master integration roadmap |
| [.cursor/plans/v0-integration-roadmap.md](.cursor/plans/v0-integration-roadmap.md) | v0 integration plan |
| [.cursor/skills/README.md](.cursor/skills/README.md) | Skills nodes 1–8 |

## Archived reference ([`_archive/`](../_archive/README.md))

| Path | Purpose |
|------|---------|
| [_archive/v0-design-docs/v0-Design/](../_archive/v0-design-docs/v0-Design/) | v0.dev blueprint (reference only) |
| [_archive/boilerplate-improvement/](../_archive/boilerplate-improvement/) | Legacy upgrade runbooks |
| [_archive/old-plans/](../_archive/old-plans/) | Completed implementation plans |
| [_archive/old-workflow-reference/](../_archive/old-workflow-reference/) | Nova Launcher doc reference |

Visual refs for v0: `.cursor/design_references/v0-Design-Refrences/`

## Examples (sandboxes)

| Path | Stack | Port |
|------|-------|------|
| [examples/nextjs-minimal/](examples/nextjs-minimal/) | Next.js 15 + Vitest | **3000** |
| [examples/nextjs-payload/](examples/nextjs-payload/) | Payload CMS v3 + SQLite | **3001** |
| [examples/nextjs-tailwind/](examples/nextjs-tailwind/) | Tailwind 3 + shadcn (Path B) | **3002** |
| [ui/dashboard/](ui/dashboard/) | Vader Construct dashboard | **3010** |

## Verification

```bash
npm run start-project:gate   # 61/61 + lint + tests
npm run grade              # integrity gate only
npm run verify:mcp         # MCP structure
```

**Update Docs:** say `update docs` or run [.cursor/prompts/Update-Docs.md](.cursor/prompts/Update-Docs.md).

*Powered by the MSC Media Engine*
