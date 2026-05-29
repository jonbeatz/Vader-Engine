# Portable modules (`custom-scriptz`)

Personal dev packs — **fat on disk** (include `ngrok.exe` locally), **lean in Git** (binaries gitignored).

| Module | Purpose | Manifest |
|--------|---------|----------|
| [google-api-proxy](google-api-proxy/) | LiteLLM + Vertex + ngrok | [module.manifest.json](google-api-proxy/module.manifest.json) |
| [backup-system](backup-system/) | Standard/Full robocopy to G: | [module.manifest.json](backup-system/module.manifest.json) |

Shared installer helpers: [_lib/Msc-ModuleInstall.ps1](_lib/Msc-ModuleInstall.ps1)

## Quick install (Vader or any repo)

```powershell
.\.cursor\custom-scriptz\google-api-proxy\install.ps1
.\.cursor\custom-scriptz\backup-system\install.ps1
```

## Copy to another project

1. Robocopy entire `.cursor/custom-scriptz/` folder (includes local `ngrok.exe` in google-api-proxy).
2. Run both `install.ps1` scripts from the new repo root.
3. `npm install` · copy `.env.local` + GCP key manually.
4. `npm run msc:litellm:preflight`

## Create a new module

Say **`make new`** or **`create module`** — [Create-New-Module.md](../prompts/Create-New-Module.md)

## Agent rule

Point the agent at a module folder → read `module.manifest.json` + `CURSOR.md` → run `install.ps1`.
