# Agent Session Closeout & Context Snapshot Protocol

When the operator triggers this closeout blueprint, execute the following state-preservation matrix precisely.

## 📝 1. The Git Status & File Audit

1. Run a local directory evaluation to identify all Modified, Created, or Deleted files.
2. Ensure no project-specific credentials, environment tokens, or hardcoded local server directory paths have accidentally leaked into trackable files.

## 📊 2. The Project Log Update (Document Check-in)

Open `.cursor/docs/project-log.md` and immediately append a new timestamped log entry under the **Development Changelog** section following this exact schema:

```markdown
### [YYYY-MM-DD] - Session Closeout [Brief Title]
- **Added:** [Bullet list of newly introduced functional code assets, utilities, or components]
- **Modified:** [Bullet list of adjusted refactors, layout styles, or schema hooks]
- **Verified:** Confirm the **Local Script Gate Sequence** completed with exit **0**: (1) `node scripts/msc-kill-dev-port.mjs <port>` then (2) `node scripts/msc-local-http-smoke.mjs <port>` (web **3000** unless otherwise documented).
```

Update `.cursor/docs/incident-log.md` if any runtime fault was resolved during the session (symptom → root cause → recovery path).

## 🔀 3. Branch & Checkpoint (when requested)

1. Confirm intentional tree state with the operator.
2. Create or note the active branch name.
3. Add a **Restore-Points** row in project docs when the milestone warrants rollback metadata.
4. Ask for **explicit confirmation** before commit, push, or deploy — execute only when approved.

## 📦 4. Mandatory Handoff Block (terminal response)

Generate a concise, high-density **Handoff Block** at the absolute end of your terminal response. This block is designed to be read by the next AI agent during a cold start to prevent context drift. It must include:

- **Current Functional State:** [Where the code stands right now]
- **Next Immediate Actions:** [The very next step the incoming agent must take]
- **Active Blockers/Warnings:** [Any lingering port conflicts, incomplete migrations, or uninstalled packages]

**Cold-start pointer for the next agent:** Begin the next session with `.cursor/prompts/task-planner.md` before any new code changes.

