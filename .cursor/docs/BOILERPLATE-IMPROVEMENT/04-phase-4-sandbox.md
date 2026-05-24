---
SESSION: Provide this file + 00-MASTER-INDEX.md to Cursor.
Expected output: Payload sandbox builds, all three lockfiles present.
---

# 📌 Phase 4: Full-Stack Sandbox & Lean Boundary Hardening

**Phase 4 completion criteria:** Payload sandbox builds after `npm ci`. All three lockfiles committed. Grade at 100%.

---

### 4.1 — SQLite data isolation (P0)

Ensure `examples/nextjs-payload/.gitignore` contains `database/`, `*.db`, `*.db-wal`, `*.db-shm`, `.env.local`. Create `examples/nextjs-payload/database/.gitkeep`. Document Next.js 15.4.11 pin in sandbox README and `_comment` in `package.json`.

---

### 4.2 — Payload config tightening (P0)

In `examples/nextjs-payload/src/payload.config.ts`: throw when `!process.env.PAYLOAD_SECRET` in production; honor `PAYLOAD_DB_PUSH=false` from env; keep `serverURL` from `MSC_PUBLIC_ORIGIN` defaulting to `http://127.0.0.1:3001`. Maintain sandbox-local `.env.example` with `PAYLOAD_SECRET`, `DATABASE_URI=file:./database/payload.db`.

Exact production guard (Phase 6 Step 32):

```typescript
if (process.env.NODE_ENV === 'production' && !process.env.PAYLOAD_SECRET) {
  throw new Error('PAYLOAD_SECRET is required in production')
}
```

Test failure mode:

```powershell
$env:NODE_ENV = "production"; $env:PAYLOAD_SECRET = ""; npm run build --prefix examples/nextjs-payload
Remove-Item Env:NODE_ENV -ErrorAction SilentlyContinue
Remove-Item Env:PAYLOAD_SECRET -ErrorAction SilentlyContinue
# Must exit non-zero with PAYLOAD_SECRET error
$env:NODE_ENV = "development"; npm run build --prefix examples/nextjs-payload
Remove-Item Env:NODE_ENV -ErrorAction SilentlyContinue
# Must succeed with dev defaults
```

---

### 4.3 — Mock media asset pipeline (P1)

Create `scripts/msc-mock-media.mjs` generating placeholders in `examples/nextjs-payload/media/mock/` only. Register `"msc:mock:media": "node scripts/msc-mock-media.mjs"`.

---

### 4.4 — Docker Compose (optional Postgres mirror) (P2)

Create root `docker-compose.yml` with `msc-postgres` service (postgres:16-alpine, port 5432, healthcheck). Create `scripts/msc-docker-up.mjs` and `scripts/msc-docker-down.mjs` (first line: `import './lib/msc-load-env.mjs'`).

Docker is **opt-in** — default dev remains SQLite in payload sandbox. Grade check verifies `docker-compose.yml` exists, not that containers are running.

Add commented keys to root `.env.example`:

```bash
# --- Docker Services (optional — uncomment if using docker-compose.yml) ---
# DOCKER_POSTGRES_URL=postgresql://msc_user:msc_password@localhost:5432/msc_db
# DOCKER_REDIS_URL=redis://localhost:6379
```

If skipping Docker entirely, leave keys commented. Step 36 is satisfied when commented keys exist in `.env.example`.

---

### 4.5 — WordPress shield quarantine documentation (P1)

Add Stack Support table to README: Web App (nextjs-minimal), Full-Stack CMS (nextjs-payload), WordPress Shield (`core/msc-bootstrap.php`). PHP never installs via npm. Reference `core/core-Divi-Scriptz.js` as Divi consumer bridge.

---

### 4.6 — Lockfile hygiene (P0)

Require committed: `package-lock.json`, `examples/nextjs-minimal/package-lock.json`, `examples/nextjs-payload/package-lock.json`. CI uses `npm ci`.

Create `scripts/msc-ensure-lockfiles.mjs`:

```javascript
import './lib/msc-load-env.mjs'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { execSync } from 'node:child_process'
import { MSC_PROJECT_ROOT } from './lib/msc-load-env.mjs'

const targets = [
  '.',
  'examples/nextjs-minimal',
  'examples/nextjs-payload',
]

for (const rel of targets) {
  const dir = join(MSC_PROJECT_ROOT, rel)
  const lock = join(dir, 'package-lock.json')
  if (!existsSync(lock)) {
    console.log(`[msc:ensure-lockfiles] Generating ${rel}/package-lock.json`)
    execSync('npm install --package-lock-only', { cwd: dir, stdio: 'inherit' })
  } else {
    console.log(`[msc:ensure-lockfiles] OK ${rel}/package-lock.json`)
  }
}
console.log('[msc:ensure-lockfiles] All lockfiles present')
```

Register: `"msc:ensure-lockfiles": "node scripts/msc-ensure-lockfiles.mjs"`.

Update `.github/workflows/ci.yml` to run payload `npm ci && npm run build`.

**Build order (mandatory):** Always run `npm ci` before `npm run build` in payload sandbox.

---

### 4.7 — Phase 4 exit gate

```bash
npm run msc:mock:media
npm ci --prefix examples/nextjs-payload
npm run build --prefix examples/nextjs-payload
npm run grade
```

Tag: `git tag phase-4-pass`.

### ⛔ PHASE 4 COMPLETE — STOP AND REPORT

Before proceeding to Phase 5, **stop and output this checklist to the human operator:**

```
✅ PHASE 4 COMPLETE
- Grade: X/X (100%)
- Tag created: git tag phase-4-pass
- Files modified: [list]
- Files created: [list]
- Any STOP_AND_ASK events: [none / describe]

⏳ Awaiting human confirmation to begin Phase 5.
Type "CONTINUE" to proceed or "ABORT" to stop here.
```

---
