# Windows PowerShell Compatibility Audit
## BOILERPLATE-FINAL-Update.md — Full Command Review

**Verdict:** 14 commands/patterns need fixes before running on Windows.
All `npm run *` and `node *` commands are fine — they're cross-platform.
All `git *` commands are fine — Git for Windows handles these natively.
All issues are in raw shell commands used as validation gates or audit one-liners.

---

## 🔴 CRITICAL FIXES — Will break Phase 6 on Windows

---

### FIX 1 — Phase 1.1: `test !` and `&&` chaining (line ~335)

**Original (bash only):**
```bash
test ! -d node_modules/next && test ! -d node_modules/payload && echo "Root lean OK" || echo "HALT: framework deps in root node_modules"
```

**Replace with PowerShell:**
```powershell
if (-not (Test-Path "node_modules/next") -and -not (Test-Path "node_modules/payload")) { "Root lean OK" } else { "HALT: framework deps in root node_modules" }
```

**Or use the Node.js equivalent (works on all platforms — recommended):**
```bash
node -e "import fs from 'node:fs'; const bad=['node_modules/next','node_modules/payload'].filter(p=>fs.existsSync(p)); if(bad.length){console.error('HALT:',bad);process.exit(1)} console.log('Root lean OK')"
```

---

### FIX 2 — Phase 1.2b: `test -f` / `test !` file checks (line ~370)

**Original (bash only):**
```bash
test -f core/core-Divi-Scriptz.js && echo "Canonical path OK" || echo "MISSING: core/core-Divi-Scriptz.js"
test ! -f core/coreDiviScriptz.js && echo "No camelCase drift" || echo "HALT: rename coreDiviScriptz.js to core-Divi-Scriptz.js"
```

**Replace with PowerShell:**
```powershell
if (Test-Path "core/core-Divi-Scriptz.js") { "Canonical path OK" } else { "MISSING: core/core-Divi-Scriptz.js" }
if (-not (Test-Path "core/coreDiviScriptz.js")) { "No camelCase drift" } else { "HALT: rename coreDiviScriptz.js to core-Divi-Scriptz.js" }
```

**Or Node.js equivalent (recommended for Cursor terminal):**
```bash
node -e "import fs from 'node:fs'; console.log(fs.existsSync('core/core-Divi-Scriptz.js')?'Canonical path OK':'MISSING: core/core-Divi-Scriptz.js'); if(fs.existsSync('core/coreDiviScriptz.js'))console.error('HALT: rename coreDiviScriptz.js')"
```

---

### FIX 3 — Phase 1.5: Forge shield verification pipe with `grep` (line ~450)

**Original (bash only):**
```bash
node scripts/msc-forge.mjs ui/msc-shield.css msc-accent msc-danger --dry-run 2>&1 | grep -q "blocked\|protected\|shield" && echo "Forge shield active" || echo "HALT: forge shield not blocking"
```

**Replace with PowerShell:**
```powershell
$result = node scripts/msc-forge.mjs ui/msc-shield.css msc-accent msc-danger --dry-run 2>&1
if ($result -match "blocked|protected|shield") { "Forge shield active" } else { "HALT: forge shield not blocking" }
```

---

### FIX 4 — Phase 2.4: `rm -f` Prettier cleanup (line ~718)

**Original (bash only):**
```bash
rm -f .prettierrc .prettierrc.json .prettierrc.js .prettierignore
rm -f examples/nextjs-minimal/.prettierrc examples/nextjs-minimal/.prettierignore
rm -f examples/nextjs-payload/.prettierrc examples/nextjs-payload/.prettierignore
find examples -name '.prettierrc*' -o -name '.prettierignore' 2>/dev/null | while read f; do rm -f "$f"; done
```

**The PowerShell equivalent is already in the doc at line ~724 — use that:**
```powershell
Get-ChildItem -Recurse -Include .prettierrc,.prettierrc.json,.prettierrc.js,.prettierignore -File | Remove-Item -Force -ErrorAction SilentlyContinue
```
✅ Already has PowerShell variant — just make sure Cursor uses the PowerShell block, not the bash block.

---

### FIX 5 — Phase 2.7: `head | tail | grep` for `.mdc` blank line check (line ~891)

**Original (bash only):**
```bash
head -n 6 .cursor/rules/global.mdc | tail -n 1 | grep -q '^$' && echo "OK: blank line present" || echo "FIX: add blank line after ---"
```

**The PowerShell equivalent is already in the doc at line ~896 — use that:**
```powershell
$lines = Get-Content .cursor/rules/global.mdc -TotalCount 6; if ($lines[5] -match '^\s*$') { 'OK: blank line present' } else { 'FIX: add blank line after ---' }
```
✅ Already has PowerShell variant — Cursor must use this one.

---

### FIX 6 — Phase 3.5: `mkdir -p` and `echo >` (line ~1021)

**Original (bash only):**
```bash
mkdir -p .cursor/blueprints
echo "# msc-smtp-verification.php — MSC SMTP verification snippet stub" > .cursor/blueprints/msc-smtp-verification.php
```

**Replace with PowerShell:**
```powershell
New-Item -ItemType Directory -Force -Path ".cursor/blueprints" | Out-Null
"# msc-smtp-verification.php — MSC SMTP verification snippet stub" | Set-Content ".cursor/blueprints/msc-smtp-verification.php"
```

**Or Node.js equivalent (recommended for Cursor terminal):**
```bash
node -e "import fs from 'node:fs'; fs.mkdirSync('.cursor/blueprints',{recursive:true}); fs.writeFileSync('.cursor/blueprints/msc-smtp-verification.php','# msc-smtp-verification.php — MSC SMTP verification snippet stub\n')"
```

---

### FIX 7 — Phase 3.2 (ingest validation): `grep -q` piped to file glob (line ~993)

**Original (bash only):**
```bash
grep -q 'msc-import-' ui/imports/msc-import-*.html && echo "Ingest OK"
grep -q 'msc-viewport-shield' ui/imports/msc-import-*.html && echo "Shield wrapper OK"
```

**Replace with PowerShell:**
```powershell
$files = Get-ChildItem "ui/imports/msc-import-*.html" -ErrorAction SilentlyContinue
if ($files | Select-String 'msc-import-') { "Ingest OK" } else { "FAIL: msc-import- not found" }
if ($files | Select-String 'msc-viewport-shield') { "Shield wrapper OK" } else { "FAIL: shield wrapper missing" }
```

---

### FIX 8 — Phase 4.2 & §6.2: Inline env var assignment for bash (line ~1073)

**Original (bash only):**
```bash
cd examples/nextjs-payload
NODE_ENV=production PAYLOAD_SECRET= npm run build
```

Bash inline env var assignment (`KEY=value command`) does **not** work in PowerShell or CMD.

**Replace with PowerShell:**
```powershell
cd examples/nextjs-payload
$env:NODE_ENV = "production"; $env:PAYLOAD_SECRET = ""; npm run build
cd ../..
```

**Important:** After the test, reset the env vars:
```powershell
Remove-Item Env:NODE_ENV -ErrorAction SilentlyContinue
Remove-Item Env:PAYLOAD_SECRET -ErrorAction SilentlyContinue
```

---

### FIX 9 — Phase 6 Step 5 validation: `cat .nvmrc` (line ~1456)

**Original (bash only):**
```bash
cat .nvmrc
```

**Replace with PowerShell:**
```powershell
Get-Content .nvmrc
```
Or use the cross-platform Node alternative:
```bash
node -e "import fs from 'node:fs'; console.log(fs.readFileSync('.nvmrc','utf8').trim())"
```

---

### FIX 10 — Phase 6 Step 4 validation: `grep node:20` (line ~1455)

**Original (bash only):**
```bash
grep node:20 .devcontainer/devcontainer.json
```

**Replace with PowerShell:**
```powershell
Select-String "node:20" .devcontainer/devcontainer.json
```

---

### FIX 11 — Phase 6 Step 7 validation: `test -f` (line ~1458)

**Original (bash only):**
```bash
test -f core/core-Divi-Scriptz.js
```

**Replace with PowerShell:**
```powershell
if (Test-Path "core/core-Divi-Scriptz.js") { "OK" } else { exit 1 }
```

---

### FIX 12 — Phase 6 Step 15 validation: `test ! -f` (line ~1466)

**Original (bash only):**
```bash
test ! -f .prettierrc && test ! -f .prettierignore
```

**Replace with PowerShell:**
```powershell
if (-not (Test-Path ".prettierrc") -and -not (Test-Path ".prettierignore")) { "OK: Prettier removed" } else { "HALT: Prettier files still present" }
```

---

### FIX 13 — `msc:test:all` script uses `&&` and `cd` (line ~1359)

**Original in `package.json`:**
```json
"msc:test:all": "vitest run && cd examples/nextjs-minimal && npm test"
```

`cd` inside `&&` chains doesn't behave the same across PowerShell. npm scripts run in a subshell so this usually works, but to be safe use:
```json
"msc:test:all": "vitest run && npm test --prefix examples/nextjs-minimal"
```
`--prefix` is cross-platform and avoids the `cd` entirely.

---

### FIX 14 — Phase 4.7 and Step 37/49: Chained `cd && npm ci && npm run build`

**Original (bash only):**
```bash
cd examples/nextjs-payload && npm ci && npm run build
```

In PowerShell, `cd` + `&&` chaining can fail. Use `--prefix` instead:
```powershell
npm ci --prefix examples/nextjs-payload
npm run build --prefix examples/nextjs-payload
```
Or as two explicit lines in PowerShell:
```powershell
Set-Location examples/nextjs-payload
npm ci
npm run build
Set-Location ../..
```

---

## 🟡 ADVISORY — Work as-is in Cursor terminal but worth knowing

### ESM `node -e` inline scripts (multiple locations)

The long `node -e "import fs..."` one-liners throughout the doc use double-quote strings. In PowerShell, double-quote strings allow variable expansion, which can corrupt the embedded JavaScript if it contains `$` characters.

**Safe pattern for PowerShell — use single quotes around the outer string:**
```powershell
node -e 'import fs from "node:fs"; const p=JSON.parse(fs.readFileSync("./package.json","utf8")); console.log(p.name)'
```

The ESM lean boundary check at line ~268 is the main one to watch:
```bash
# Original - fine in bash, risky in PowerShell if JS contains $
node -e "import fs from 'node:fs'; const p=JSON.parse(..."
```

**PowerShell-safe version:**
```powershell
node -e 'import fs from "node:fs"; const p=JSON.parse(fs.readFileSync("./package.json","utf8")); const bad=[...Object.keys(p.dependencies||{}),...Object.keys(p.devDependencies||{})].filter(k=>/^(next|payload|@payloadcms)/.test(k)); if(bad.length){console.error("LEAN BOUNDARY VIOLATION:",bad);process.exit(1)} console.log("Lean boundary OK")'
```

### Pre-flight version pin check (line ~299)

Same double-quote issue. Rewrite with single outer quotes:
```powershell
node -e 'import fs from "node:fs"; const m=JSON.parse(fs.readFileSync("examples/nextjs-minimal/package.json","utf8")); const p=JSON.parse(fs.readFileSync("examples/nextjs-payload/package.json","utf8")); if(!String(m.dependencies?.next||"").includes("15.5.7")){console.error("HALT: nextjs-minimal must pin Next 15.5.7");process.exit(1)} if(!String(p.dependencies?.next||"").includes("15.4.11")){console.error("HALT: nextjs-payload must pin Next 15.4.11");process.exit(1)} console.log("Next.js pins verified")'
```

---

## ✅ Commands Confirmed Safe on Windows (no changes needed)

All of these work as-is in PowerShell and Cursor terminal:

| Command pattern | Status |
|----------------|--------|
| All `npm run *` scripts | ✅ Safe |
| All `node scripts/*.mjs` | ✅ Safe |
| All `git *` commands (status, checkout, add, commit, tag, stash, reset) | ✅ Safe — Git for Windows |
| `npx biome *` | ✅ Safe |
| `npx lint-staged` | ✅ Safe |
| `npm install`, `npm ci`, `npm pkg get` | ✅ Safe |
| `node -v`, `npm -v` | ✅ Safe |
| All YAML/JSON code blocks (not executed as shell) | ✅ Safe |
| `docker compose config` | ✅ Safe if Docker Desktop installed |
| Husky hook scripts (`.husky/pre-commit`, `.husky/pre-push`) | ✅ Safe — Husky spawns sh via Git Bash on Windows |

---

## Summary: What to Do Right Now

You have two options:

**Option A (Recommended) — Instruct Cursor at session start:**
Add this line to the top of each session prompt you hand to Cursor:

> "You are running on Windows with PowerShell as the terminal. For every validation gate or shell command in this runbook, use the PowerShell or cross-platform `node -e` equivalent instead of bash syntax. Specifically: replace `test -f` with `Test-Path`, replace `grep` with `Select-String`, replace `rm -f` with `Remove-Item -Force -ErrorAction SilentlyContinue`, replace inline `KEY=value command` env assignment with `$env:KEY = "value"; command`, and replace `mkdir -p` with `New-Item -ItemType Directory -Force`."

**Option B — Patch the doc:**
Add a Windows Command Translation Reference table at the top of Phase 1, right after the Lean Boundary Reference section:

```markdown
## Windows PowerShell Command Translation (Cursor terminal)

| Bash pattern | PowerShell equivalent |
|-------------|----------------------|
| `test -f <path>` | `Test-Path "<path>"` |
| `test ! -f <path>` | `-not (Test-Path "<path>")` |
| `test ! -d <path>` | `-not (Test-Path "<path>")` |
| `rm -f <file>` | `Remove-Item "<file>" -Force -ErrorAction SilentlyContinue` |
| `mkdir -p <dir>` | `New-Item -ItemType Directory -Force -Path "<dir>"` |
| `grep -q "pattern" <file>` | `Select-String "pattern" <file>` |
| `cat <file>` | `Get-Content <file>` |
| `KEY=value command` | `$env:KEY = "value"; command` |
| `cmd1 \| grep -q "x" && echo "OK"` | `if (cmd1 \| Select-String "x") { "OK" }` |
| `echo "text" > file` | `"text" \| Set-Content "file"` |
| `cd dir && npm run x` | `npm run x --prefix dir` |
```

Option A is faster. Option B makes the doc self-contained for the next person.

---

*Audit complete — 14 issues found, all fixable. Core npm/node/git workflow unaffected.*
