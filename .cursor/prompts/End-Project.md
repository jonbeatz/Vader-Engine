**Act as a Lead Systems Architect. We are performing a 'Session Closeout' for the v2.6.1-Engine project.**

## 1. Bridge teardown & port cleanup

**First** — stop AI proxy if it was started this session:

- Run **`npm run msc:litellm:stop`** (LiteLLM + ngrok)
- Verify port free: **`npm run msc:kill -- 4000`**

Then clear dev sandboxes:

- Run **`npm run msc:kill-dev-port`** — ports **3000, 3001, 3002, 8080**

## 2. Verification gate

Run in order:

1. **`npm run start-project:gate`** — **61/61**, lint, tests
2. **`npm run msc:lint:fix`** — auto-fix where safe
3. **Typecheck** — if examples were edited: `cd examples/nextjs-minimal && npx tsc --noEmit` (or relevant sandbox)

If any gate fails, **stop and report** before closing.

## 2.5 Auto-Update Tracking Docs

Execute **`.cursor/prompts/Update-Project.md`** (same as **`update project`**):

- Detect recent git changes
- Append checkpoint to **project-log.md** and **Checkpoint.md**
- Offer **UPDATE_LOG.md** / **CHANGELOG.md** updates per that workflow
- Refresh **`.last-sync.json`** timestamp

Run this **before** the session summary in §4 when possible — avoid duplicate project-log entries; merge into one closeout block if both run in the same session.

## 3. Git audit

- Run **`git status --porcelain`**
- Ensure **`.env.local`** and credentials remain unstaged
- Note branch and ahead/behind vs `main`
- Ask operator: **"Commit and push? (yes/no)"** — only commit when explicitly approved

## 4. Session summary (project-log)

If §2.5 already appended an **Update Project Checkpoint**, extend that entry with closeout details instead of duplicating. Otherwise ask the operator:

```
📝 Generate session summary?

What did we accomplish this session? (brief summary)
```

Append to **`.cursor/docs/project-log.md`**:

```markdown
### [YYYY-MM-DD] - Session Closeout
- **Session Summary:** [user's summary]
- **Added/Modified:** [list files changed based on git diff]
- **Verified:** start-project:gate PASS (61/61, lint, tests)
- **Ports cleared:** 3000, 3001, 3002, 8080, 4000
- **LiteLLM:** [running/stopped/not used]
```

Offer **CHANGELOG.md** update if new scripts, shortcuts, or prompts shipped.

## 5. Task planner sync

- Check **`.cursor/prompts/task-planner.md`** for Phase 1–3 objectives
- Completed → note "✅ Task planner objectives cleared" in handoff
- Pending → note "⏳ Task planner objectives still pending"

## 6. Mandatory handoff block (print last)

```text
✅ SESSION CLOSEOUT — v2.6.0 · Ports cleared · 61/61 · Git [clean|has changes] · LiteLLM stopped
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Goodbye for now, Jon. See you next session.
```

**Cold-start pointer for next agent:** Run **`@Start-Project.md`** — mandatory reads: README → PROJECT_CONTEXT → `.cursor/docs/TRUTH.md` → Project-Bible → REPAIR_PROTOCOLS → MCPs → START-HERE.

**I am ready for closeout. Acknowledge and proceed.**
