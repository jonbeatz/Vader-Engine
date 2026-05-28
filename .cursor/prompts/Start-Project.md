**Act as a Lead Systems Architect. We are performing a 'Cold-Start' initialization for the v2.6.0-Engine project.**

## 1. Environment Initialization

Run `npm run start-project:gate` to verify 61/61 grade, lint, and tests.

## 1.5 LiteLLM/Vertex AI Proxy (Optional)

Only start if you need Gemini models in Cursor:

- Check status: `npm run msc:litellm:status`
- If offline: `npm run msc:litellm:start`
- Verify: `npm run msc:litellm:verify`
- The proxy runs on port 4000. Keep the terminal open while using.

## 2. Context Ingestion (Read-Only Scan)

- Scan `.cursor/docs/` and `.cursor/rules/` directories
- Load core architecture from `ARCHITECTURE.md`, `TRUTH.md`, and `system-architecture.md`
- Load root operator docs from `README.md`, `DOCS.md`, `START-HERE.md`, `SECURITY.md`, `CHANGELOG.md`, `CONTRIBUTING.md`
- Apply behavioral constraints from `.cursor/rules/global.mdc`, `studio-dark-ui.mdc`, and `terminal-discipline.mdc`

## 3. Operational Readiness Check

- Confirm latest `project-log.md` entry
- Verify `git status` is clean
- Review `examples/` directory — Tailwind/shadcn for UI, Payload for backend

## 4. Objective Setting

- Check `.cursor/prompts/task-planner.md` for active Phase 1–3 goals
- Report: `System Ready. [Current Status] [Active Task].`

## 5. Acknowledgment

After completing all steps, print:

```
✅ v2.6.0 READY — 61/61 · 8/8 · Git clean · LiteLLM stopped
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Ok, Jon. Let's build.
```

Where:
- `Git clean` changes to `Git has changes` if there are unstaged files
- `LiteLLM stopped` changes to `LiteLLM running` if the proxy is active

**I am ready for high-velocity development. Acknowledge and proceed.**