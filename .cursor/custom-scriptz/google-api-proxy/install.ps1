# google-api-proxy — install into repo root (parent of .cursor)
param([switch]$WhatIf)

$ErrorActionPreference = "Stop"
$ModuleRoot = $PSScriptRoot
$RepoRoot = (Resolve-Path (Join-Path $ModuleRoot "..\..\..")).Path

Write-Host "Module: google-api-proxy" -ForegroundColor Cyan
Write-Host "Target: $RepoRoot"

function Copy-FileToRepo($RelativeSrc, $DestRelative) {
  $src = Join-Path $ModuleRoot $RelativeSrc
  $dest = Join-Path $RepoRoot $DestRelative
  if (-not (Test-Path $src)) { return }
  if ($WhatIf) {
    Write-Host "[WhatIf] $RelativeSrc -> $DestRelative"
    return
  }
  $parent = Split-Path $dest -Parent
  if (-not (Test-Path $parent)) { New-Item -ItemType Directory -Force -Path $parent | Out-Null }
  Copy-Item $src $dest -Force
  Write-Host "Copied: $DestRelative"
}

Get-ChildItem (Join-Path $ModuleRoot "scripts") -File | ForEach-Object {
  Copy-FileToRepo "scripts\$($_.Name)" "scripts\$($_.Name)"
}
Get-ChildItem (Join-Path $ModuleRoot "scripts\lib") -File -ErrorAction SilentlyContinue | ForEach-Object {
  Copy-FileToRepo "scripts\lib\$($_.Name)" "scripts\lib\$($_.Name)"
}

$configDest = Join-Path $RepoRoot "config\litellm_config.yaml"
if (-not (Test-Path $configDest)) {
  Copy-FileToRepo "config\litellm_config.example.yaml" "config\litellm_config.yaml"
} else {
  Write-Host "Skip: config/litellm_config.yaml already exists"
}

Get-ChildItem (Join-Path $ModuleRoot "google-api") -File -ErrorAction SilentlyContinue | ForEach-Object {
  if ($_.Name -eq 'README.md') { return }
  Copy-FileToRepo "google-api\$($_.Name)" "google-api\$($_.Name)"
}

# Optional: seed ngrok.exe from this module pack OR from target's existing google-api/ (local only)
$ngrokNames = @('ngrok.exe', 'ngrok')
foreach ($name in $ngrokNames) {
  $moduleNgrok = Join-Path $ModuleRoot "google-api\$name"
  $repoNgrok = Join-Path $RepoRoot "google-api\$name"
  if (Test-Path $moduleNgrok) {
    if (-not (Test-Path $repoNgrok) -or (Get-Item $moduleNgrok).Length -gt 0) {
      Copy-FileToRepo "google-api\$name" "google-api\$name"
    }
  }
}
if (-not (Test-Path (Join-Path $RepoRoot "google-api\ngrok.exe")) -and -not (Test-Path (Join-Path $RepoRoot "google-api\ngrok"))) {
  Write-Host "WARN: google-api/ngrok.exe not found — Cloud Agent mode needs ngrok. See google-api/README.md in module." -ForegroundColor Yellow
}

$mergeFile = Join-Path $ModuleRoot "package-scripts.json"
$pkgFile = Join-Path $RepoRoot "package.json"
if ((Test-Path $mergeFile) -and (Test-Path $pkgFile)) {
  if ($WhatIf) {
    Write-Host "[WhatIf] Merge package-scripts.json into package.json"
  } else {
    node -e "import fs from 'node:fs';const r=process.argv[1],m=process.argv[2];const pkg=JSON.parse(fs.readFileSync(r+'/package.json','utf8'));const merge=JSON.parse(fs.readFileSync(m,'utf8'));Object.assign(pkg.scripts,merge.scripts);fs.writeFileSync(r+'/package.json',JSON.stringify(pkg,null,2)+'\n');console.log('[install] merged',Object.keys(merge.scripts).length,'npm scripts');" $RepoRoot $mergeFile
  }
}

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Green
Write-Host "  1) Append env.example.fragment to .env.example (if missing)"
Write-Host "  2) Set GCP credentials in .env.local (never commit keys)"
Write-Host "  3) npm run msc:litellm:preflight"
Write-Host "  4) npm run msc:google-api:start"
Write-Host "  5) Merge shortcuts from package-scripts.json into global.mdc"
