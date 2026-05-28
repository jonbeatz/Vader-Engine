# Vader Engine - Operator Card (One Page)

> **Version:** v2.6.0 | **Integrity target:** 61/61 | **Use this for fast daily operations**

---

## Start Session

1. `start project`
2. `npm run start-project:gate`
3. Start what you need:
   - `npm run msc:dev:dashboard` (3010)
   - `npm run msc:dev:example` (3000)
   - `npm run msc:dev:payload` (3001)
   - `npm run msc:dev:tailwind` (3002)

If using Gemini via proxy:
- `status google-api`
- `start google-api` (only if needed)

---

## Core Health Gates

- `npm run msc:lint`
- `npm run grade` (must be **61/61**)
- `npm run msc:test:root`
- `npm run msc:e2e` (optional local parity)

Quick docs sync:
- `update docs`

---

## Backup (Agent-Driven)

Say: `backup project`

Flow (one question at a time):
1. Type (`1` Standard / `2` Full)
2. Destination (`1` Same G: / `2` Different)
3. Folder (`1` Suggested / `2` Custom)
4. Confirm (`1` Yes / `2` No)

Equivalent direct commands:
- `npm run msc:backup -- --standard <folder-name>`
- `npm run msc:backup -- --full <folder-name>`

---

## End Session

1. `end project`
2. Provide short summary when prompted
3. Confirm `.cursor/docs/project-log.md` entry
4. Commit/push only after gates are green

---

## Fast Troubleshooting

- Port issue: `npm run msc:kill -- <port>`
- Dashboard down: `npm run msc:kill -- 3010` then `npm run msc:dev:dashboard`
- Proxy down: `npm run msc:litellm:status` then `npm run msc:litellm:start`
- Broken local state: `npm run dev:recover`
- Lint drift: `npm run msc:lint:fix` then `npm run msc:lint`

---

## Service URLs

- Dashboard: `http://localhost:3010`
- Minimal: `http://localhost:3000`
- Payload: `http://localhost:3001`
- Tailwind: `http://localhost:3002`
- LiteLLM: `http://localhost:4000`

Use `http://127.0.0.1:<port>` if localhost resolution is inconsistent.

---

## Reference Docs

- Full master reference: `.cursor/docs/Vader-Engine-Cheat-Sheet.md`
- Session history: `.cursor/docs/project-log.md`
- Rules/shortcuts: `.cursor/rules/global.mdc`
