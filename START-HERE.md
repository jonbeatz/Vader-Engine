# Framework Initialization & Cold-Start Runbook

Welcome to the baseline repository configuration sandbox. This environment is structured as an unbranded, zero-overhead, highly defensive software factory layer.

**Constitution:** [TRUTH.md](TRUTH.md) — technical precedence when docs conflict.

**Operator runbook:** [HOW-TO.md](.cursor/docs/HOW-TO.md) — commands, build ritual, commit gates, Path A/B UI.

**Primary agent compass:** [.cursor/docs/Code-Jedi.md](.cursor/docs/Code-Jedi.md) — tactical intent matrix, full npm script inventory, and documentation SSoT reading order. Open it when routing features to `core/`, `scripts/`, or `ui/` modules.

## v2 Gold Master checklist (iterative features)

- [ ] `npm run bootstrap` — ports cleared, deps installed, `.env.local` template, env validation
- [ ] `npm run msc:validate-env` — no live secrets in committed config
- [ ] `npm run msc:test` — example Vitest 3/3 pass
- [ ] `npm run grade` — **100%** structural audit
- [ ] `npm run msc:dev:example` — UI on port **3000**

Full doc index: [DOCS.md](DOCS.md).

## The Core Onboarding Map

Before writing, modifying, or refactoring any code files within this workspace, you must sequentially execute and verify the following architectural steps:

### 1. Phase 1: Task Planning Gate

- Say **Start Project** or open `.cursor/prompts/Start-Project.md` (alias → `task-planner.md`).
- Fill out the 3-Phase verification matrix and present it to the operator for explicit validation. Do not bypass this step.

### 2. Phase 2: Environment Setup (Local Ingestion Protocol)

**Zero-leak boundary:** Live secrets exist only in `.env.local` at the repo root. That file is gitignored and must never be committed or pasted into chat.

1. Copy **key names** from `.env.example` (the committed contract — placeholders only).
2. Create `.env.local` and assign real values there (PATs, API keys, database paths, ports).
3. Run `npm install` once so `dotenv` is available to automation scripts.

**How scripts and agents consume values:**

- Every `scripts/*.mjs` entry point imports `scripts/lib/msc-load-env.mjs` first.
- Hydration order: `.env.local` → `.env.example` (example fills only missing keys).
- Runtime reads **`process.env.VARIABLE_NAME`** only — no hardcoded tokens or production domains in committed code.
- Cursor agents use the same hydrated process when running npm/node scripts; they must **not** ask you to paste plain-text keys into chat. New services → add the key to `.env.example` + value in `.env.local`.

MCP paths in `.cursor/mcp.json` must use `"${workspaceFolder}"` — never machine-specific paths. See `.cursor/docs/mcp-setup.md` for MCP + global Cursor merge.

**Fast path:** `npm run bootstrap` then `npm run msc:dev:example`.

### 3. Phase 3: Structural Tool Verification

- Verify local configuration health:

```bash
npm run start-project
# runs start-project:smoke (MCP verify + optional gates)
```

- Optional registry/network probe:

```bash
npm run verify:mcp:probe
```

- When a dev server runs on port **3000**, use the canonical gate sequence:

```bash
npm run msc:kill -- 3000
npm run msc:smoke -- 3000
```

## Pillar Documentation Directories

| Topic | Path |
|-------|------|
| **Constitution** | `TRUTH.md` |
| **Documentation index** | `DOCS.md` |
| **Operational runbook (commands)** | `.cursor/docs/HOW-TO.md` |
| **Master AI routing compass** | `.cursor/docs/Code-Jedi.md` |
| Competency routing (Nodes 1–8) | `.cursor/skills/README.md` |
| Studio Dark / hybrid UI | `.cursor/skills/studio-dark-shield.md` · [consumer-bootstrap.md](.cursor/docs/consumer-bootstrap.md) §6 |
| Cursor rules index | `.cursor/rules/README.md` |
| MCP setup & API keys (zero-leak) | `.cursor/docs/mcp-setup.md` · `.env.example` |
| Local LiteLLM & ngrok proxy | `.cursor/docs/local-ai-proxy-setup.md` · `config/litellm_config.yaml` |
| Media strategies (local / tenant / CDN) | `.cursor/docs/media-strategy-specs.md` · `npm run media:sync` |
| Spaceship / cPanel Node deploy | `.cursor/docs/spaceship-node-deployment.md` |
| GitHub releases & branching | `.cursor/docs/github-automation-rules.md` |
| System architecture map | `.cursor/docs/system-architecture.md` |
| Consumer Next + Payload bootstrap | `.cursor/docs/consumer-bootstrap.md` |

## Session Closeout

When pausing or handing off work, say **End Project** or open `.cursor/prompts/End-Project.md` (alias → `session-handoff.md`), then:

```bash
npm run end-project
```

Check in `.cursor/docs/project-log.md`.
