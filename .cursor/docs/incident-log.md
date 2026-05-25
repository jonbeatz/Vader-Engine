# Incident Log & Runtime Recovery Ledger

Use this ledger to document any breaking runtime faults, locked ports, or deployment exceptions encountered during development sessions.

## 🚨 [INCIDENT-001] [Brief Fault Description Label]
- **Timestamp:** YYYY-MM-DD HH:MM
- **Environment:** Local / Live Staging
- **Symptoms:** [e.g., Terminal port deadlock, 500 error response]

### 🛠️ Root Cause Analysis
- [Detail what broke, what file caused it, or if it was an orphaned process loop]

### 🔄 Resolution Execution
1. `node scripts/msc-kill-dev-port.mjs <port>` — web **3000** or proxy **4000**/**8000**
2. Applied safe code fallback logic.
3. `node scripts/msc-local-http-smoke.mjs <port>` — web gate on **3000** after dev server restart

## ✅ [INCIDENT-002] Biome folder ignore — CI validate failure (2026-05-25)

- **Symptoms:** CI `validate` failed on tag push — `lint/suspicious/useBiomeIgnoreFolder` on `!templates/**`
- **Root cause:** Biome 2.2.0+ rejects trailing `/**` on folder ignore patterns
- **Fix:** `biome.json` — `!templates/**` → `!templates` (commit `9a1a4b6`)
- **Recovery:** `npm run msc:lint` before every tag; full gate = `msc:lint && grade && msc:test:root`
- **Doc sync:** [CHANGELOG.md](../../CHANGELOG.md) · [project-log.md](./project-log.md) · [CONTRIBUTING.md](../../CONTRIBUTING.md)

## 📋 [MAINT-001] Repository sanitization — Phase E (2026-05-25)

- **Scope:** Remote-only cleanup on [jonbeatz/Boilerplate](https://github.com/jonbeatz/Boilerplate)
- **Actions:** Deleted 10 Dependabot branches; removed `phase-2-pass` … `phase-6b-pass`; retained `v2.1.0`–`v2.4.0`
- **Verification:** `git fetch -p` · `git branch -r` → `origin/main` · `npm run start-project:gate` **61/61** · **8/8**
- **Prevention:** `npm run msc:github:sync` or enable **Automatically delete head branches** — see [CONTRIBUTING.md](../../CONTRIBUTING.md#github-repository-settings-mscgithubsync)

