# Update Project — Auto-Sync All Tracking Docs

## Trigger

When user says **"update project"**

## Overview

Automatically updates all tracking documentation based on git history, recent changes, and session activity.

**Canonical tracking files:**

- `.cursor/docs/UPDATE_LOG.md` — fix history
- `.cursor/docs/project-log.md` — session changelog
- `.cursor/docs/Checkpoint.md` — branch / milestone status
- `CHANGELOG.md` — semver features (when applicable)
- `.cursor/docs/.last-sync.json` — last sync timestamp

## Execution Steps

### Step 1: Detect recent changes

Run from repo root:

```bash
git log --oneline -10
git diff --name-only HEAD~5
git branch --show-current
git status --short
```

Use output to populate Steps 2–5.

### Step 2: Update UPDATE_LOG.md

Scan for errors or fixes in recent activity:

- Read `.cursor/docs/project-log.md` for recent session entries
- Ask user: **"Any new fixes to log? (y/n)"**
- If yes, prompt for: **Problem**, **Solution**, **Prevention**
- Auto-format and append to `.cursor/docs/UPDATE_LOG.md`:

```markdown
## [YYYY-MM-DD] — [Short title]

### Problem
- …

### Solution
- …

### Prevention
- …
```

### Step 3: Update project-log.md

Append a checkpoint:

```markdown
### [YYYY-MM-DD HH:MM] - Update Project Checkpoint
- **Status:** [current progress]
- **Branch:** [git branch --show-current]
- **Files changed:** [list from git diff]
- **Next:** [next steps]
```

### Step 4: Update Checkpoint.md

Check if branch has changed or milestones reached:

- Update **Active release / branch** section
- Update **Current status** (date, branch, gate result if known)
- Add milestone row if a release or merge occurred since last checkpoint

### Step 5: Update CHANGELOG.md (if new features)

Scan recent commits for `feat:` prefix (from Step 1 log).

Ask: **"Found new features. Add to CHANGELOG.md? (y/n)"**

If yes, append under `[Unreleased]` or current version per [Conventional Commits](https://www.conventionalcommits.org/).

### Step 6: Update .last-sync.json

Set `lastSync` to ISO timestamp (now). Preserve existing `scripts`, `shortcuts`, `prompts` arrays unless `Update-Docs` full sync is also requested.

### Step 7: Summary report

Print:

```
📊 PROJECT UPDATE SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 UPDATE_LOG.md: [added/skipped]
📋 project-log.md: checkpoint added
🏁 Checkpoint.md: status updated
📦 CHANGELOG.md: [updated/skipped]
🔗 Last sync: [timestamp]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Project tracking updated.
```

## Files modified

- `.cursor/docs/UPDATE_LOG.md`
- `.cursor/docs/project-log.md`
- `.cursor/docs/Checkpoint.md`
- `CHANGELOG.md` (if new features)
- `.cursor/docs/.last-sync.json`

## Notes

- **Do not** commit unless operator explicitly asks
- **Never** log secret values — reference variable names only
- For full doc/version sweep, operator may also run **update docs** (`.cursor/prompts/Update-Docs.md`)
