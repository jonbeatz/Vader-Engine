# Update Docs - Documentation Sync & Version Bump

## Trigger
When user says `Update Docs` or `@Update-Docs.md`.

## Task
Perform a full documentation audit and sync so docs stay aligned to the current root `package.json` version.

## Execution Steps

### 1) Check Current Version
- Read `package.json`.
- Store `version` as `$CURRENT_VERSION`.

### 2) Scan for Version References

Check for mismatches in:

- `README.md`
- `PROJECT_CONTEXT.md`
- `CHANGELOG.md`
- `DOCS.md`
- `START-HERE.md`
- `TRUTH.md`
- `docs/SECURITY.md`
- `docs/CONTRIBUTING.md`
- `docs/releases/RELEASE_v*.md`
- `.cursor/prompts/Start-Project.md`
- `.cursor/prompts/End-Project.md`
- `.cursor/prompts/task-planner.md`
- `.cursor/rules/global.mdc` (if version text appears)
- `.cursor/skills/*.md` (if version text appears)

### 3) Report Findings
Print:

| File | Current Version | Expected Version | Status |
|------|-----------------|------------------|--------|
| `path/to/file` | `X.X.X` | `$CURRENT_VERSION` | `✅/⚠️/❌` |

### 4) Fix Mismatches
- Update mismatched version strings to `$CURRENT_VERSION`.
- If this is an actual release bump, update release-date mentions to today.
- Update "What's New" sections only when a version bump is part of the request.

### 5) Verify Internal Links
- Validate local markdown cross-references and flag broken links.
- Auto-fix safe relative-path errors.

### 6) Generate Sync Report
Print:

```text
📚 DOCUMENTATION SYNC REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 Target Version: X.X.X
✅ Files synced: [count]
⚠️ Files with warnings: [count]
🔗 Broken links found: [count]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Documentation sync complete.
```

### 7) Offer Commit
Ask:
`Commit these documentation updates? (yes/no)`

If yes, run:

```bash
git add . && git commit -m "docs: sync all documentation to vX.X.X" && git push
```

## Manual Review Items (report only)
- `docs/releases/RELEASE_v*.md` existence for current version.
- External URLs (badges/demo links) still valid.
- `google-api/litellm_config.yaml` version mentions (if any).
