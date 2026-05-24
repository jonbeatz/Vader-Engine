---
SESSION: Provide this file + 00-MASTER-INDEX.md to Cursor.
Expected output: msc:shield:audit passes, component generator works.
---

# 📌 Phase 3: Vader Protocol & Shield Layer Isolation Upgrades

Studio Dark contract: Background `#121212`, Surface `#1c1c1c`, text high-contrast light gray. All layout classes use unique `msc-` prefixes to prevent Divi collisions. The Divi consumer bridge **`core/core-Divi-Scriptz.js`** (exact casing) must remain registered in `core/index.mjs` as `MSC_DIVI_SCRIPT` and enqueued from `core/msc-assets.php` when operating in WordPress contexts.

**Phase 3 completion criteria:** `npm run msc:shield:audit` passes. `npm run grade` at 100%. No hardcoded hex in `examples/**/*.tsx`.

---

### 3.1 — CSS class namespace enforcement script (P0)

Create `scripts/msc-shield-audit.mjs` that scans every `ui/*.css` file, extracts class selectors, and exits non-zero when any class does not start with `msc-` (excluding pseudo-states). Register `"msc:shield:audit": "node scripts/msc-shield-audit.mjs"`.

---

### 3.2 — Design asset ingestion parser (`msc-ingest`) (P1)

Create `tests/fixtures/sample-input.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head><title>MSC Ingest Fixture</title></head>
<body>
  <motion.div class="flex p-4 bg-gray-900 text-white" style="color: red;">
    <script>console.log('strip me')</script>
    <h1 class="text-2xl font-bold">Sample Hero</h1>
    <button class="btn-primary px-4 py-2">Click</button>
  </motion.div>
</body>
</html>
```

Create `scripts/msc-ingest.mjs`:

1. Usage: `npm run msc:ingest -- <input.html> <output-dir>`.
2. Strip `<script>`, inline `style=""`, Tailwind utility classes.
3. Rewrite class tokens to `msc-import-*` prefix.
4. Wrap output in `<motion.div class="msc-viewport-shield msc-shield-root">`.
5. Write to `ui/imports/msc-import-<timestamp>.html` + companion CSS using only `var(--msc-*)` tokens.

Validation command:

```powershell
npm run msc:ingest -- tests/fixtures/sample-input.html ui/imports
$files = Get-ChildItem "ui/imports/msc-import-*.html" -ErrorAction SilentlyContinue
if ($files | Select-String 'msc-import-') { "Ingest OK" } else { "FAIL: msc-import- not found" }
if ($files | Select-String 'msc-viewport-shield') { "Shield wrapper OK" } else { "FAIL: shield wrapper missing" }
```

---

### 3.3 — PHP shield enqueue chain hardening (P0)

In `core/msc-assets.php`, ensure `msc_enqueue_shield_satellite_chain()` loads: `msc-shield.css` → `studio-dark-shield.css` → `msc-shield-load.css` → extensions when `MSC_SHIELD_EXTENSIONS=1`. Add `defined('ABSPATH') || exit;` as first executable line. All PHP functions use `msc_*` naming.

---

### 3.4 — TSX component guardrails (P0)

Update `examples/nextjs-minimal/app/layout.tsx` — see Phase 6 Step 28 for exact replacement instructions.

Import shield chain in `app/globals.css` via `@import` of `../../../ui/msc-shield.css`, `studio-dark-shield.css`, `msc-shield-load.css`. Grade check rejects hardcoded hex in `examples/**/*.tsx`.

---

### 3.5 — Snippet vault (`.cursor/blueprints/`) (P1)

Create `.cursor/blueprints/README.md` indexing: `msc-smtp-verification.php`, `msc-sqlite-collection.ts`, `msc-dashboard-shell.tsx`. Each uses `msc-` prefixes and Studio Dark wrappers.

Generate initial blueprint stub:

```powershell
node -e "import fs from 'node:fs'; fs.mkdirSync('.cursor/blueprints',{recursive:true}); fs.writeFileSync('.cursor/blueprints/msc-smtp-verification.php','# msc-smtp-verification.php — MSC SMTP verification snippet stub\n')"
```

---

### 3.6 — Component generator (Vader-compliant) (P1)

Create `scripts/msc-new-component.mjs` — usage `npm run msc:new:component -- msc-button [nextjs-minimal]`. Reject names not matching `/^msc-[a-z0-9-]+$/`. Scaffold `index.tsx`, `styles.css`, Vitest test file, README with Studio Dark token comments.

---

### 3.7 — Phase 3 exit gate

```bash
npm run msc:shield:audit
npm run msc:new:component -- msc-smoke-test nextjs-minimal
npm run test --prefix examples/nextjs-minimal
npm run grade
```

Tag: `git tag phase-3-pass`.

### ⛔ PHASE 3 COMPLETE — STOP AND REPORT

Before proceeding to Phase 4, **stop and output this checklist to the human operator:**

```
✅ PHASE 3 COMPLETE
- Grade: X/X (100%)
- Tag created: git tag phase-3-pass
- Files modified: [list]
- Files created: [list]
- Any STOP_AND_ASK events: [none / describe]

⏳ Awaiting human confirmation to begin Phase 4.
Type "CONTINUE" to proceed or "ABORT" to stop here.
```

---
