# backup-system (portable module)

Robocopy-based **Standard** and **Full** project backups to a configurable drive (`MSC_BACKUP_ROOT`).

## Standard skips

`node_modules`, `.next`, `logs`, `test-results`, `vader-site-deploy`

Everything else is mirrored (including `.env.local`). Summaries should list **skips only**, not “includes”.

## Install

```powershell
cd .cursor/custom-scriptz/backup-system
.\install.ps1
```

## Commands

| Command | Action |
|---------|--------|
| `npm run msc:backup` | Standard backup (default) |
| `npm run msc:backup:standard` | Same |
| `npm run msc:backup:full` | Full mirror (includes `node_modules`, `.next`) |
| `npm run msc:backup -- --standard Vader-Engine-v1-x` | Named folder |

Chat: **`backup project`** — conversational flow in `global.mdc`.

## After restore (Standard)

1. robocopy backup → project folder  
2. `npm install` (+ `--prefix` for workspaces you use)  
3. `npm run start-project:gate`

See `.cursor/docs/Vader-Engine-Cheat-Sheet.md` § Backup & Restore.

## Env

| Key | Default |
|-----|---------|
| `MSC_BACKUP_ROOT` | `G:\Cursor_Project_BackUpz\Vader-Engine` (Windows) |

Set in `.env.local` per project name.
