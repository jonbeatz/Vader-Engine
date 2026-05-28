# Update Docs - Full Documentation Sync & Feature Detection

## Trigger
When user says "Update Docs" or "@Update-Docs.md"

## Overview
Performs comprehensive documentation sync including version updates, feature detection, changelog generation, and link validation.

## Execution Steps

### Phase 1: Version Sync

1. Read `package.json` to get current version (store as `$VERSION`)
2. Scan these files for version mismatches:
   - `README.md` (badge and "What's New")
   - `PROJECT_CONTEXT.md`
   - `CHANGELOG.md` (ensure latest version has entry)
   - `DOCS.md`, `START-HERE.md`, `TRUTH.md`
   - `docs/SECURITY.md`, `docs/CONTRIBUTING.md`
   - `.cursor/prompts/Start-Project.md`
   - `.cursor/prompts/End-Project.md`
3. Update any mismatched versions to `$VERSION`
4. Update release dates to today's date where applicable

### Phase 2: Load Last Sync State

Check `.cursor/docs/.last-sync.json` for previous state.
If not exists, create with current snapshot.

Compare:
- `package.json` scripts
- `.cursor/rules/global.mdc` shortcuts
- `.cursor/prompts/` files list
- `scripts/*.mjs` files list

### Phase 3: Detect New Features

Report any NEW items found:

**New npm scripts:**
- `msc:backup`
- `msc:backup:full`
- etc.

**New chat shortcuts:**
- `"backup project" → npm run msc:backup`
- etc.

**New prompt files:**
- `.cursor/prompts/Update-Docs.md`
- etc.

**New script files:**
- `scripts/msc-backup.mjs`
- etc.

### Phase 4: Generate Documentation

For each new feature, ask:

```
🆕 New feature detected: [description]

Add to CHANGELOG.md? (y/n)
Add to project-log.md? (y/n)
```

If yes, automatically format and append:

**CHANGELOG.md format:**
```markdown
## [Unreleased]

### Added
- [Feature description]

### Changed
- [Any changes]
```

**project-log.md format:**
```markdown
### [YYYY-MM-DD] - [Feature Name]
- **Added:** [Description]
- **Files changed:** [list]
```

### Phase 5: Link Validation

Check all markdown links in:
- `README.md`, `DOCS.md`, `START-HERE.md`, `PROJECT_CONTEXT.md`
- `.cursor/docs/TRUTH.md`, `Project-Bible.md`, `REPAIR_PROTOCOLS.md`, `MCPs.md`
- `.cursor/prompts/*.md`

Verify referenced files exist (active paths only — `_archive/` links are historical). Report broken links to **non-archive** targets.

### Phase 6: Save New State

Update `.cursor/docs/.last-sync.json` with current snapshot:

```json
{
  "lastSync": "2026-05-28T...",
  "version": "2.6.1",
  "scripts": ["list of all npm scripts"],
  "shortcuts": ["list of natural language shortcuts"],
  "prompts": ["list of prompt files"],
  "scripts_files": ["list of script files"]
}
```

### Phase 7: Generate Report

Print:

```
✅ DOCS SYNC — v2.6.1 · Version sync · No new features · No broken links
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Documentation is up to date.
```

If there ARE changes:

```
✅ DOCS SYNC — v2.6.1 · 3 files updated · 2 new features · 0 broken links
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🆕 New features: msc:backup, "backup project" shortcut
📝 Added to CHANGELOG.md
📝 Added to project-log.md
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Documentation sync complete.
```

### Phase 8: Commit Offer

Ask: "Commit these documentation updates? (y/n)"

If yes: `git add . && git commit -m "docs: sync documentation to v$VERSION" && git push`

## Important Notes

- Never auto-add to changelog without asking
- Preserve existing formatting in files
- Only append, never overwrite existing sections
- If a file doesn't exist, skip (don't create)
