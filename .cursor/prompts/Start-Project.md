**Act as a Lead Systems Architect. We are performing a 'Cold-Start' initialization for the v2.6.0-Engine project.**

## 1. Environment Initialization

Run `npm run start-project:gate` to verify 61/61 grade, lint, and tests.

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

**I am ready for high-velocity development. Acknowledge and proceed.**