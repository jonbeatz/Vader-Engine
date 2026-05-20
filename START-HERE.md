# Framework Initialization & Cold-Start Runbook

Welcome to the baseline repository configuration sandbox. This environment is structured as an unbranded, zero-overhead, highly defensive software factory layer.

## The Core Onboarding Map

Before writing, modifying, or refactoring any code files within this workspace, you must sequentially execute and verify the following architectural steps:

### 1. Phase 1: Task Planning Gate

- Say **Start Project** or open `.cursor/prompts/Start-Project.md` (alias → `task-planner.md`).
- Fill out the 3-Phase verification matrix and present it to the operator for explicit validation. Do not bypass this step.

### 2. Phase 2: Environment Setup

- Copy `.env.example` to create your local `.env` (or `.env.local` in a consumer Next/Payload app).
- Update secure API placeholders, database locations, and map your active project filesystem directory inside `.cursor/mcp.json` (see `.cursor/docs/mcp-setup.md`).
- Read `.cursor/docs/mcp-setup.md` to coordinate local MCP server extensions with your global Cursor config.

### 3. Phase 3: Structural Tool Verification

- Verify local configuration health:

```bash
npm run start-project
# or: npm run verify:mcp
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
| Competency routing (Nodes 1–7) | `.cursor/skills/README.md` |
| MCP setup & API keys | `.cursor/docs/mcp-setup.md` · `.env.example` |
| Local LiteLLM & ngrok proxy | `.cursor/docs/local-ai-proxy-setup.md` · `config/litellm_config.yaml` |
| Media strategies (local / tenant / CDN) | `.cursor/docs/media-strategy-specs.md` · `npm run media:sync` |
| Spaceship / cPanel Node deploy | `.cursor/docs/spaceship-node-deployment.md` |
| GitHub releases & branching | `.cursor/docs/github-automation-rules.md` |
| System architecture map | `.cursor/docs/system-architecture.md` |

## Session Closeout

When pausing or handing off work, say **End Project** or open `.cursor/prompts/End-Project.md` (alias → `session-handoff.md`), then:

```bash
npm run end-project
```

Check in `.cursor/docs/project-log.md`.
