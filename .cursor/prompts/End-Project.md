**Act as a Lead Systems Architect. We are performing a 'Session Closeout' for the v2.6.0-Engine project.**

## 1. Environment Cleanup & Verification

- Run `npm run msc:kill-dev-port` to clear ports 3000, 3001, 3002, 8080
- Run `npm run start-project:gate` to verify 61/61 grade, lint, and tests
- Run `npm run msc:lint:fix` to ensure all files meet standards
- If any gate fails, stop and report immediately before closing

## 1.5 LiteLLM/Vertex AI Proxy Shutdown

If LiteLLM was started during this session:

- Run `npm run msc:litellm:stop` to stop the proxy and kill ngrok
- Verify port is free: `node scripts/msc-kill-dev-port.mjs 4000`
- Log status in `.cursor/docs/project-log.md` (e.g., "LiteLLM stopped")

## 2. Project Log Update

- Append to `.cursor/docs/project-log.md` with the current date:

```markdown
### [YYYY-MM-DD] - Session Closeout
- **Added/Modified:** [Summary of session work]
- **Verified:** start-project:gate PASS (61/61, lint, tests)
- **Ports cleared:** 3000, 3001, 3002, 8080
```

- Check `.cursor/docs/incident-log.md` for any session-specific resolutions

## 3. Task Planner Sync Check

- Check `.cursor/prompts/task-planner.md` for active Phase 1–3 objectives
- If completed: note **"✅ Task planner objectives cleared"** in handoff block
- If pending: note **"⏳ Task planner objectives still pending"**

## 4. Git Audit & Commit

- Run `git status --porcelain`
- Ensure no credentials leaked (`.env.local` remains unstaged)
- Suggest a commit message following [Conventional Commits](https://www.conventionalcommits.org/)
- Ask operator: **"Commit and push to origin/main? (yes/no)"**
- If yes: `git add . && git commit -m "[message]" && git push origin main`

## 5. Mandatory Handoff Block

Print:

```
✅ SESSION CLOSEOUT — v2.6.0 · Ports cleared · 61/61 · Git clean · LiteLLM [stopped/not used]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Goodbye for now, Jon. See you next session.
```

Where:
- `Git clean` changes to `Git has changes` if there are unstaged files
- `LiteLLM stopped` if the proxy was running and then stopped during closeout
- `LiteLLM not used` if the proxy was never started this session
- Add `⚠️ Blockers: [None/list]` on a new line if there are any blockers

**Cold-start pointer for next agent:** Run `@Start-Project.md`, then initialize `task-planner.md` Phase 1–3.

**I am ready for closeout. Acknowledge and proceed.**
