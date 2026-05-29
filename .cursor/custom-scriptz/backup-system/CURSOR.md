# CURSOR — Install `backup-system`

## When to use

Operator says **`install backup module`**, or enabling `backup project` in a new repo.

## Agent steps

1. Confirm `scripts/lib/msc-load-env.mjs` exists in target repo.
2. Run:

   ```powershell
   .\.cursor\custom-scriptz\backup-system\install.ps1
   ```

3. Add `MSC_BACKUP_ROOT` to `.env.example` from `env.example.fragment` if missing.
4. Merge `package-scripts.json` shortcuts into `.cursor/rules/global.mdc` (backup conversational workflow).
5. Optional: point operator to Cheat Sheet restore checklist after Standard backup.

## Agent backup ritual

Follow `global.mdc` **Backup Workflow** — one question at a time; Standard summary = skips only.

## Report

```
✅ backup-system installed
📂 scripts/msc-backup.mjs
📦 npm scripts: msc:backup, msc:backup:standard, msc:backup:full
```
