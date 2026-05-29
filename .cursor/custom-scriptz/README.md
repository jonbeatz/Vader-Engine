# Portable modules (`custom-scriptz`)

Drop-in capability packs you can copy into any Vader Engine (or compatible Node) repo.

| Module | Purpose |
|--------|---------|
| [google-api-proxy](./google-api-proxy/) | LiteLLM + Vertex + ngrok for Cursor Cloud Agent (drop `ngrok.exe` in module `google-api/` for portable copies) |
| [backup-system](./backup-system/) | Standard/Full robocopy backups to `MSC_BACKUP_ROOT` |

## Install (human)

```powershell
cd .cursor/custom-scriptz/google-api-proxy   # or backup-system
.\install.ps1
```

## Install (Cursor Agent)

Say **`install google-api module`** or **`install backup module`** — follow each module's `CURSOR.md`.

## Create a new module

Say **`make new`** or **`create module`** — runs [Create-New-Module.md](../prompts/Create-New-Module.md).

## Prerequisites (all modules)

Target repo must already have:

- `scripts/lib/msc-load-env.mjs` (env hydration)
- Root `.env.example` / `.env.local` contract
- `package.json` with `"type": "module"` (recommended)
