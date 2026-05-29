# backup-system (portable module)

Robocopy-based **Standard** and **Full** project backups to a configurable drive (`MSC_BACKUP_ROOT`).

## Standard skips

`node_modules`, `.next`, `logs`, `test-results`, `vader-site-deploy`, `.env.local`

Summaries should list **skips only**, not “includes”.

## How it works

When you run `npm run msc:backup` or **`backup project`**, the script will:

1. Ask for backup drive/folder (defaults to `G:\Cursor_Project_BackUpz`)
2. Suggest a folder name based on the project name + timestamp
3. Ask for confirmation, then create the backup with standard exclusions

Set **`MSC_BACKUP_ROOT`** in `.env.local` to use a fixed backup root (skips the location prompt).

Non-interactive / CI: pass a folder name and `--yes`, e.g. `npm run msc:backup -- --standard my-backup --yes`.

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

## Install

```powershell
.\.cursor\custom-scriptz\backup-system\install.ps1
.\.cursor\custom-scriptz\backup-system\install.ps1 -WhatIf
```

Uses same repo-root detection as google-api-proxy. Pulls `msc-load-env` from google-api-proxy `prerequisites/` if missing.

## Env

| Key | Default (personal) |
|-----|---------------------|
| `MSC_BACKUP_ROOT` | `G:\Cursor_Project_BackUpz\Vader-Engine` |

Set in `.env.local` per project name. Installer appends comment to `.env.example` if missing.

Manifest: [module.manifest.json](module.manifest.json)
