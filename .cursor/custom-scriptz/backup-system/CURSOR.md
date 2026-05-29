# CURSOR — Install `backup-system`

## When to use

- Operator says **`install backup module`**
- Enabling `backup project` on a personal repo

## Agent procedure

1. Read [module.manifest.json](module.manifest.json).
2. Run from repo root:

   ```powershell
   .\.cursor\custom-scriptz\backup-system\install.ps1
   ```

3. Merge `env.example.fragment` (installer adds `MSC_BACKUP_ROOT` comment if missing).
4. Optional: set `MSC_BACKUP_ROOT` in `.env.local` (default `G:\Cursor_Project_BackUpz\Vader-Engine`).
5. Merge backup shortcuts from `package-scripts.json` / `global.mdc` if new repo.
6. Smoke: `npm run msc:backup -- --standard install-smoke-test` (operator confirms delete after).

## Backup ritual

Follow `.cursor/rules/global.mdc` — Standard summary lists **skips only**.

## Report

```text
✅ backup-system installed
📂 scripts/msc-backup.mjs
📦 msc:backup, msc:backup:standard, msc:backup:full
```
