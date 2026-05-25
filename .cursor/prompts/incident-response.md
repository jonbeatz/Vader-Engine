# Incident Response & Recovery Protocol

Execute this blueprint when localhost fails, databases lock, deploys regress, or ports collide. **Additive** to session rituals — use **after** triage; close sessions with `End-Project.md` when work pauses.

Does not replace **Node 2** (`node-runtime-mastery.md`) or **Node 6** (AI proxy doc) — run their **Local Script Gate Sequence** first when ports are in scope.



---

## 0. Authority chain

1. **`package.json` scripts** — command truth only
2. **Root `.cursorrules`** — fix-local-first, port contract
3. **This prompt** — triage matrix and escalation
4. **`.cursor/docs/incident-log.md`** — forensic ledger
5. **`.cursor/docs/spaceship-node-deployment.md`** — live host recovery (operator-requested only)

---

## 1. Triage matrix (symptom → bucket)

| Symptom | Bucket | First action |
|---------|--------|--------------|
| `ERR_CONNECTION_REFUSED`, white screen | Local dev dead | Local Script Gate Sequence on **3000** |
| Missing vendor chunks, stale `.next` | Build artifact drift | Kill port → clean `.next` → rebuild → smoke |
| `SQLITE_BUSY` / database locked | DB writer conflict | Stop all dev servers → backup → single writer |
| `no such column` / schema mismatch | Payload schema drift | `repair:sqlite` equivalent (project script) after backup |
| Port **3000** / **4000** / **8000** in use | Process collision | `node scripts/msc-kill-dev-port.mjs <port>` |
| Cursor `ERROR_PROVIDER_ERROR` | Stale ngrok / LiteLLM | Restart proxy + tunnel; refresh `/v1` base URL |
| Live 500 after FTP | Partial `.next` upload | Stop app → `rm -rf .next` on host → full re-upload |
| Auth false redirect / empty vault | Session hydration race | Document in incident log; avoid broadening tenant scope |

---

## 2. Fix-local-first execution (agents MUST run)

### A. Web dev (port **3000**)

```bash
node scripts/msc-kill-dev-port.mjs 3000
# restart dev server per package.json when required
node scripts/msc-local-http-smoke.mjs 3000
```

Report HTTP status codes for `/`, `/admin`, or paths in `MSC_SMOKE_PATHS`.

### B. AI proxy (ports **4000** or **8000**)

```bash
node scripts/msc-kill-dev-port.mjs 4000
# restart LiteLLM + ngrok per .cursor/docs/local-ai-proxy-setup.md
```

Ping `http://127.0.0.1:4000/v1/models` with LiteLLM `master_key` before claiming success.

### C. Database / SQLite

1. **Stop writers** — no `next dev`, workers, or admin uploads during repair.
2. **Backup** — `payload.sqlite.bak.<ISO-timestamp>` (or project DB path from `DATABASE_URI`).
3. **Clear WAL sidecars** before cross-host copy: remove `*.sqlite-wal` and `*.sqlite-shm`.
4. Run project **repair** script if defined; else additive `ALTER` only — never delete rows without operator consent.
5. **Last resort** — replace DB from known-good backup; document in incident log.

### D. Ghost Node processes

When kill-port is insufficient, tree-aware termination per platform — then re-run gate sequence. Never delete `node_modules` or `.next` while dev is actively serving that output.

---

## 3. Escalation ladder

| Level | When | Action |
|-------|------|--------|
| **Standard** | First failure | One-shot recover script + gate sequence |
| **Deep** | Repeated vault/media drift | Deep reconcile / full media resync (project script) |
| **Schema** | Migration mismatch | Backup → idempotent repair → restart |
| **Production** | Live host only | Spaceship deploy runbook — operator explicit request |
| **Emergency access** | Locked-out operator on live | Documented SQL verify fallback only per deploy cutover doc |

---

## 4. Incident capture (required before closeout)

Append to **`.cursor/docs/incident-log.md`**:

```markdown
## [INCIDENT-XXX] Title
- **Timestamp:**
- **Environment:** Local | Staging | Production
- **Symptoms:**
### Root Cause
### Recovery (shortest verified path)
1. ...
### Do-not-regress
- ...
```

---

## 5. Operator phrases (execute without re-asking)

| Phrase | Maps to |
|--------|---------|
| Postflight local / verify localhost | Gate sequence on **3000** + status report |
| Hard recovery | Kill → clean artifacts → build → smoke |
| Ready to begin | Read startup docs → gate sequence → optional services |
| Port 4000 in use | Kill **4000** → restart LiteLLM bridge |

---

## 6. Handoff

After stabilization, run **`.cursor/prompts/End-Project.md`** — include validation exit codes and active blockers in the Handoff Block.

