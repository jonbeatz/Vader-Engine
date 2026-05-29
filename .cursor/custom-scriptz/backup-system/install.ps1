# backup-system — install into repo root (parent of .cursor)
param([switch]$WhatIf)

$ErrorActionPreference = "Stop"
$ModuleRoot = $PSScriptRoot
$RepoRoot = (Resolve-Path (Join-Path $ModuleRoot "..\..\..")).Path

Write-Host "Module: backup-system" -ForegroundColor Cyan
Write-Host "Target: $RepoRoot"

$src = Join-Path $ModuleRoot "scripts\msc-backup.mjs"
$dest = Join-Path $RepoRoot "scripts\msc-backup.mjs"

if ($WhatIf) {
  Write-Host "[WhatIf] scripts/msc-backup.mjs -> $dest"
} else {
  Copy-Item $src $dest -Force
  Write-Host "Copied: scripts/msc-backup.mjs"
}

$mergeFile = Join-Path $ModuleRoot "package-scripts.json"
if ((Test-Path $mergeFile) -and (Test-Path (Join-Path $RepoRoot "package.json"))) {
  if ($WhatIf) {
    Write-Host "[WhatIf] Merge package-scripts.json into package.json"
  } else {
    node -e "import fs from 'node:fs';const r=process.argv[1],m=process.argv[2];const pkg=JSON.parse(fs.readFileSync(r+'/package.json','utf8'));const merge=JSON.parse(fs.readFileSync(m,'utf8'));Object.assign(pkg.scripts,merge.scripts);fs.writeFileSync(r+'/package.json',JSON.stringify(pkg,null,2)+'\n');console.log('[install] merged',Object.keys(merge.scripts).length,'npm scripts');" $RepoRoot $mergeFile
  }
}

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Green
Write-Host "  1) Set MSC_BACKUP_ROOT in .env.local (optional; default G:\...\Vader-Engine)"
Write-Host "  2) npm run msc:backup -- --standard <folder-name>"
Write-Host "  3) Add backup project shortcuts from package-scripts.json to global.mdc"
