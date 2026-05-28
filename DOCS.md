# Documentation Index (SSoT Router)

Single entry point for all **Vader Engine v2.5.0-Engine** documentation. Technical precedence: [TRUTH.md](TRUTH.md).

| Field | Value |
| --- | --- |
| **Repository** | [github.com/jonbeatz/Vader-Engine](https://github.com/jonbeatz/Vader-Engine) |
| **Clone** | `git clone https://github.com/jonbeatz/Vader-Engine.git my-project` |
| **Version** | v2.5.0-Engine · semver `2.5.0` · grade **61/61** |

## Human control panel (root)

| Document | Purpose |
|----------|---------|
| [TRUTH.md](TRUTH.md) | Constitution — v2 principles, tokens, zero-leak, MCP portability |
| [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) | Agent onboarding map — structure, ports, components, cleanup status (derived; TRUTH wins on conflict) |
| [README.md](README.md) | System overview, governance, triple-sandbox map, operator controls, commands |
| [START-HERE.md](START-HERE.md) | Agent/operator cold-start phases and checklists |
| [DOCS.md](DOCS.md) | This index |
| [ARCHITECTURE.md](ARCHITECTURE.md) | High-level layout, sandboxes, CI pipeline |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Operational recovery paths |
| [SECURITY.md](SECURITY.md) | Private advisory reporting and zero-leak policy |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Fork, forge, hooks, PR gates |
| [CHANGELOG.md](CHANGELOG.md) | Release history (v2.5.0 · v2.4.0 · v2.3.1 · v2.3.0 · v2.2.0 · v2.1.0) |
| [DEPLOY_TO_HOSTINGER.md](DEPLOY_TO_HOSTINGER.md) | Hostinger Node.js deploy for VaderLabz template |
| [docs/releases/](docs/releases/) | Tagged release notes (`RELEASE_v*.md`) |
| [docs/assets/](docs/assets/) | Asset index — committed media under `media/` |

## Operator runbooks (`.cursor/docs/`)

| Document | Purpose |
|----------|---------|
| [HOW-TO.md](.cursor/docs/HOW-TO.md) | Command runbook, build ritual, release certification |
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
| [audit/VADER_ENGINE_AUDIT_2026-05-27.md](.cursor/docs/audit/VADER_ENGINE_AUDIT_2026-05-27.md) | Comprehensive cleanup audit (Option C — archive list for manual review) |

## Vader Protocol design blueprint (`.cursor/docs/v0-Design/`)

| Document | Purpose |
| --- | --- |
| [v0-Design/README.md](.cursor/docs/v0-Design/README.md) | Module index · reading order · Git branches |
| [v6-Master-Prompt.md](.cursor/docs/v0-Design/v6-Master-Prompt.md) | Copy-paste [v0.dev](https://v0.dev) prompt + 6 reference images |
| [v5-Implementation.md](.cursor/docs/v0-Design/v5-Implementation.md) | `ui/dashboard/` Lean Boundary · §12–§14 post-v0 handoff |
| [v0-Run-Sheet.md](.cursor/docs/v0-Design/v0-Run-Sheet.md) | One-page v0 Stage 1–3 operator checklist |
| [ENGINE_ROADMAP.md](.cursor/plans/ENGINE_ROADMAP.md) | **Master integration roadmap** — Phases 1–3, API wiring, terminal plan |
| Visual refs | `.cursor/design_references/v0-Design-Refrences/` |

Active feature branch for dashboard work: **`feat/v0-core-integration-v1`** (v0 live-data integration; branch from `main`).

**Local-only (gitignored, not on GitHub):** `.cursor/docs/BOILERPLATE-IMPROVEMENT/`, `.cursor/docs/README/` — upgrade runbooks and README drafts.

## Agent layer

| Path | Purpose |
|------|---------|
| [.cursor/skills/README.md](.cursor/skills/README.md) | Competency nodes 1–8 |
| [.cursor/skills/studio-dark-shield.md](.cursor/skills/studio-dark-shield.md) | Path A Shield vs Path B Tailwind |
| [.cursor/rules/README.md](.cursor/rules/README.md) | Conditional rules index |
| [.cursor/rules/global.mdc](.cursor/rules/global.mdc) | Always-on session bindings |
| [.cursor/prompts/task-planner.md](.cursor/prompts/task-planner.md) | Start Project gate |
| [.cursor/prompts/End-Project.md](.cursor/prompts/End-Project.md) | End Project / session closeout gate |

## Examples (sandboxes)

| Path | Stack | Port |
|------|-------|------|
| [examples/nextjs-minimal/](examples/nextjs-minimal/) | Next.js 15.5.7 + TypeScript + Vitest | **3000** |
| [examples/nextjs-payload/](examples/nextjs-payload/) | Next.js 15.4.11 + Payload CMS v3 + SQLite | **3001** |
| [examples/nextjs-tailwind/](examples/nextjs-tailwind/) | Next.js 15.5.7 + Tailwind 3 + shadcn (Path B hybrid) | **3002** |
| [ui/dashboard/](ui/dashboard/) | Vader Construct dashboard (v0 export hardened to Tailwind 3) | **3010** |

From repo root: `npm run msc:dev:tailwind` → http://127.0.0.1:3002. Lean Boundary — deps only in the sandbox `package.json`.

## Testing the Tailwind Sandbox

After running `npm run msc:dev:tailwind`, visit:

- http://localhost:3002 — Main demo page
- http://localhost:3002/sandbox-test — Component stress-test page

Both pages should render with Vader Protocol styling (dark background, accent colors). Root `npm run build` does not compile this sandbox — only `examples/nextjs-minimal` (Lean Boundary intact). Env contract: copy `examples/nextjs-tailwind/.env.example` → `.env.local`; never commit live secrets.

## Template blueprints (read-only registry)

| Path | Purpose |
|------|---------|
| [templates/frontend/portfolio/](templates/frontend/portfolio/) | Vader Shield portfolio scaffold (Path A) |
| [templates/cms/divi-bridge/](templates/cms/divi-bridge/) | WordPress/Divi 4 bridge with ABSPATH guard |
| [templates/full-stack/task-manager/](templates/full-stack/task-manager/) | Payload CRM collection stubs |
| [templates/full-stack/vader-site/](templates/full-stack/vader-site/) | Vader Protocol Next.js 15 site (port **3003**) |

Scaffold via `npm run msc:template -- apply <category/name> --name="..."` (default `../Dev-Projectz/<slug>`) or `--target=../Dev-Projectz/custom-path`. Operator guide: [HOW-TO.md — Scaffolding System](.cursor/docs/HOW-TO.md#-the-template--scaffolding-system-v240).

## Maintainer tooling (`tools/msc-cli`)

| Command | Purpose |
| --- | --- |
| `npm run msc:template -- list \| apply \| seed \| doctor` | Template scaffolding CLI |
| `npm run msc:github:sync` | GitHub About + `delete_branch_on_merge` via `gh` (see [CONTRIBUTING.md](CONTRIBUTING.md#github-repository-settings-mscgithubsync)) |
| `npm run msc:test:root` | `npm audit --production` + root Vitest (**pre-push**) |

## Scripts reference (vader-site)

| Script | Purpose |
|--------|---------|
| `scripts/prep-hostinger-deploy.sh` | Copies vader-site to `vader-site-deploy/`, validates deps, GitHub-ready |
| `scripts/deploy-prep.sh` | Strips dev artifacts, writes `.env.production`, full deploy prep |
| `scripts/prebuild-static.mjs` | Stashes Payload modules for static-only builds |
| `scripts/dev-fresh.mjs` | Clears `.next` cache before dev start, passes through env unchanged |
| `scripts/postinstall.mjs` | No-op in static mode, seeds DB in CMS mode |

## Cursor skills (Vader Protocol)

| Skill | Trigger phrases |
|-------|-----------------|
| `.cursor/skills/vader_protocol_skill.md` | "Vader Protocol", "VaderLabz", "dark aesthetic", "keep my design style" |
| `.cursor/skills/vader_animations_skill.md` | "add animations", "make it feel alive", "vader animations", "micro-interactions" |

## v2.5 verification

```bash
npm run msc:template -- doctor
npm run msc:template -- list
npm run msc:validate-env
npm run verify:mcp
npm run msc:lint
npm run grade
npm run msc:test:all
npm run msc:e2e:install   # first time only
npm run msc:e2e
```

Target: **61/61 (100%)** on `npm run grade` before forge-ready release.

**CI mirror (GitHub Actions):** validate-env → verify:mcp → lint → grade → msc:test:root → minimal `npm ci` + test → payload `npm ci` + build → Playwright install → `msc:e2e`.

## Version sync contract

**Authority:** root `package.json` `"version"` — all **current-release** docs must match in the same commit as a semver bump.

Operator checklist: [CONTRIBUTING.md — Version sync](CONTRIBUTING.md#version-sync-release-or-doc-sweep). Agent skill: [docs-ops-governance.md](.cursor/skills/docs-ops-governance.md).

*Powered by the MSC Media Engine*
