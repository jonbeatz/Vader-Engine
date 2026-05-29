# Create New Portable Module

## Trigger

When user says **`make new`** or **`create module`**

## Overview

Scaffold a new drop-in pack under `.cursor/custom-scriptz/[module-name]/` using the same layout as **`google-api-proxy`** and **`backup-system`**.

Reference modules:

- `.cursor/custom-scriptz/google-api-proxy/` — LiteLLM + ngrok (multi-script + config)
- `.cursor/custom-scriptz/backup-system/` — single-script + robocopy

## Steps (one question at a time)

1. Ask: **"What is the module name?"** (kebab-case, e.g. `email-verification`)
2. Ask: **"What does this module do?"** (one-line description)
3. Ask: **"What files does it need?"** (paths in current repo, or "none yet — scaffold only")
4. Ask: **"What npm scripts does it need?"** (if any — name + command)
5. Ask: **"What shortcuts should it add to global.mdc?"** (if any — phrase → action)

Wait for each answer before the next question.

## Scaffold (after answers)

Create:

```text
.cursor/custom-scriptz/[module-name]/
├── module.manifest.json   # agent machine-readable contract
├── README.md
├── CURSOR.md
├── install.ps1            # dot-source ../_lib/Msc-ModuleInstall.ps1
├── package-scripts.json   # { "scripts", "envKeys", "shortcuts", optional "dependencies" }
├── env.example.fragment
├── global.mdc.fragment    # optional shortcut rows
├── prerequisites/         # optional — msc-load-env, msc-kill-dev-port, package-scripts.json (dotenv)
└── scripts/ | config/ | …
```

### README.md template

- Title, one-line purpose
- Contents table
- `.\install.ps1` instructions
- Prerequisites (`msc-load-env.mjs`, Node 20+)
- npm / chat commands after install

### CURSOR.md template

- When to use
- Agent steps: preflight → `install.ps1` → env.example → global.mdc shortcuts → verify command
- Zero-leak rules
- Report block (below)

### install.ps1 rules

- Dot-source [`.cursor/custom-scriptz/_lib/Msc-ModuleInstall.ps1`](../custom-scriptz/_lib/Msc-ModuleInstall.ps1)
- Use `Resolve-MscRepoRoot` (cwd with `package.json`, else `..\..\..` from module)
- `Install-MscPrerequisites` when target lacks `msc-load-env.mjs`
- `Merge-MscPackageJson` via **Node only** — never PowerShell `ConvertTo-Json` on `package.json`
- `Merge-MscEnvFragment` with a unique marker key
- Support `-WhatIf`, `-Force`, `-SkipVerify`
- Run `npm run msc:litellm:preflight` (or module-specific verify) when `node_modules` exists

### package-scripts.json

```json
{
  "scripts": {},
  "envKeys": [],
  "shortcuts": {}
}
```

### Script rules

- Every `.mjs` entry must start with: `import './lib/msc-load-env.mjs';` (or `../lib/` from subfolders)
- No hardcoded secrets, paths, or production domains — use `process.env.*`

## After creation

1. Append row(s) to `.cursor/custom-scriptz/README.md` module index table
2. **Register the module** in [.cursor/custom-scriptz/Prompt-Module.md](../custom-scriptz/Prompt-Module.md) under **Available modules** (folder name + one-line description)
3. If operator requested new chat shortcuts: add to `global.mdc`, then mirror to **Cheat Sheet** and **Operator Card** (What You Have Now + shortcuts tables)
4. Optionally add install shortcut to `global.mdc` if operator requested
5. Report:

```text
✅ Module [name] created
📂 Location: .cursor/custom-scriptz/[name]/
📄 Files: README.md, CURSOR.md, install.ps1, package-scripts.json, scripts/…
⏭️  Operator: run install.ps1 when targeting another repo
```

## Important

- Do not copy `.env.local`, credentials JSON, or live keys into the module
- Prefer `.example` suffix for config templates (`litellm_config.example.yaml`)
- Keep modules portable — no Vader-only hardcoded drive letters in scripts (env vars only)
