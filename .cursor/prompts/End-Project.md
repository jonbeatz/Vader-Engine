**Act as a Lead Systems Architect. We are performing a 'Session Closeout' for the v2.5.0-SOVEREIGN project.**

## 1. Environment Cleanup & Verification

- Run `npm run msc:kill-dev-port` to clear ports 3000, 3001, 3002, 8080 (runs `msc-kill-all-dev-ports.mjs`)
- Run `npm run start-project:gate` to verify 61/61 grade, lint, and tests
- Run `npm run msc:lint:fix` to ensure all files meet standards
- If any gate fails, stop and report immediately before closing

## 2. Project Log Update

- Append to `.cursor/docs/project-log.md`:

```markdown
### [YYYY-MM-DD] - Session Closeout
- **Added/Modified:** [Summary of session work]
- **Verified:** start-project:gate PASS (61/61, lint, tests)
- **Ports cleared:** 3000, 3001, 3002, 8080
```

- Check `.cursor/docs/incident-log.md` for any session-specific resolutions

## 3. Git Audit & Commit

- Run `git status --porcelain`
- Ensure no credentials leaked (`.env.local` remains unstaged)
- Suggest a commit message following [Conventional Commits](https://www.conventionalcommits.org/)
- Ask operator: **"Commit and push to origin/main? (yes/no)"**
- If yes: `git add . && git commit -m "[message]" && git push origin main`

## 4. Mandatory Handoff Block

Print:

```
╔══════════════════════════════════════════════════════════════╗
║  ✅ Session Closeout — v2.5.0-SOVEREIGN                       ║
║  📦 Ports cleared | 🎯 Grade: 61/61                           ║
║  📝 Git: [clean / changes staged / unstaged]                  ║
║  📝 Current State: [Summary of functional standing]           ║
║  🚀 Next Action: [Phase 1-3 from task-planner.md]             ║
║  ⚠️ Blockers: [None / List active]                            ║
║  🔄 Next session: Run @Start-Project.md to resume               ║
╚══════════════════════════════════════════════════════════════╝
```

**Cold-start pointer for the next agent:** Begin by running `@Start-Project.md`, then initialize `task-planner.md` Phase 1–3.

**I am ready for closeout. Acknowledge and proceed.**
