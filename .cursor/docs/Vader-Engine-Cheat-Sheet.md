# Vader Engine - Master Cheat Sheet

> **Version:** v2.6.0 | **Integrity:** 61/61 | **Status:** Production-ready baseline

---

## 📌 At-a-Glance Index

1. Quick Cursor Agent Commands
2. Terminal Commands
3. Quality & Testing
4. Backup & Restore
5. LiteLLM Proxy
6. Troubleshooting Matrix
7. Release Checklist
8. Daily Operator Routine
9. Service URLs
10. Important File Locations

---

## ⚡ Fast Start (60 seconds)

**App dev (dashboard):**

```text
1) start project
2) npm run start-project:gate
3) npm run msc:dev:dashboard
4) open http://localhost:3010
```

**Vertex / `vader-3-flash` (Cursor Cloud Agent):**

```text
1) start google-api          # LiteLLM :4000 + ngrok; copy HTTPS /v1 from output
2) verify google-api         # local + remote /v1/models
3) Cursor → Override OpenAI Base URL = https://<ngrok-host>/v1
4) Cursor → Custom model = vader-3-flash
5) stop google-api           # end of session
```

First time only: `npm run msc:litellm:preflight` then `npm run msc:litellm:install-deps` if Python deps fail.

---

## 🚀 Quick Cursor Agent Commands

| Say This | Action |
|----------|--------|
| `start project` | Begin session with acknowledgment |
| `end project` | Close session with summary logging |
| `update docs` | Sync all documentation |
| `backup project` | Agent-driven conversational backup workflow |
| `create backup` | Alias for backup workflow |
| `start google-api` | `npm run msc:litellm:start:ngrok` — LiteLLM + ngrok; prints HTTPS URL |
| `stop google-api` | `npm run msc:litellm:stop` |
| `status google-api` | `npm run msc:litellm:status` |
| `verify google-api` | `npm run msc:litellm:test:ngrok` — local + ngrok check |
| `restart google-api` | stop then `msc:litellm:start:ngrok` |

---

## 💻 Terminal Commands

### Development Servers

| Command | What it does | Port |
|---------|--------------|------|
| `npm run msc:dev:dashboard` | Start dashboard | 3010 |
| `npm run msc:dev:example` | Start minimal sandbox | 3000 |
| `npm run msc:dev:payload` | Start Payload CMS sandbox | 3001 |
| `npm run msc:dev:tailwind` | Start Tailwind/shadcn sandbox | 3002 |

> Tip: use `npm install --prefix <path>` style for reproducible command history.

### Port Management

| Command | What it does |
|---------|--------------|
| `npm run msc:kill-dev-port` | Kill all dev ports (3000,3001,3002,8080) |
| `npm run msc:kill -- 3010` | Kill specific port (e.g., 3010) |
| `npm run msc:kill -- 4000` | Kill LiteLLM proxy port |

### Build & Install

| Command | What it does |
|---------|--------------|
| `npm install` | Install root dependencies |
| `npm install --prefix ui/dashboard` | Install dashboard dependencies |
| `npm install --prefix examples/nextjs-minimal` | Install minimal sandbox deps |
| `npm install --prefix examples/nextjs-payload` | Install Payload sandbox deps |
| `npm install --prefix examples/nextjs-tailwind` | Install Tailwind sandbox deps |
| `npm run build` | Build minimal sandbox |
| `npm run build --prefix ui/dashboard` | Build dashboard |

### Clean & Reset

| Command | What it does |
|---------|--------------|
| `npm run clean:next` | Clear all .next cache folders |
| `Remove-Item -Recurse -Force node_modules` | Delete root node_modules (PowerShell) |
| `npm run dev:recover` | Recovery from broken state |
| `npm run repair:sqlite` | Repair Payload SQLite database |

---

## 🔧 Quality & Testing

| Command | What it does |
|---------|--------------|
| `npm run grade` | Run 61-point integrity check |
| `npm run msc:lint` | Run Biome linting |
| `npm run msc:lint:fix` | Auto-fix lint issues |
| `npm run msc:test:root` | Run root tests |
| `npm run msc:e2e` | Run full E2E test suite |
| `npm run msc:e2e:install` | Install Playwright browsers |
| `npm run msc:check-deps` | Check for outdated dependencies |
| `npm run start-project:gate` | Full integrity gate |

---

## 📝 Documentation & Logging

| Command | What it does |
|---------|--------------|
| `npm run msc:log-session` | Capture session telemetry |
| `npm run msc:health` | Run health check |
| `npm run msc:health:json` | Health check as JSON |
| `npm run inventory` | Generate project inventory |
| `update docs` | Run docs sync workflow in chat |

---

## 💾 Backup & Restore

| Command | What it does |
|---------|--------------|
| `npm run msc:backup` | Run backup with default standard exclusions |
| `npm run msc:backup:standard` | Explicit standard backup mode |
| `npm run msc:backup:full` | Full backup (includes all folders/files) |
| `npm run msc:backup -- --standard <folder-name>` | Standard backup to custom folder |
| `npm run msc:backup -- --full <folder-name>` | Full backup to custom folder |

### Manual Backup Command

```powershell
robocopy D:\Cursor_Projectz\Vader-Engine G:\Cursor_Project_BackUpz\Vader-Engine\Vader-Engine-v1-x /MIR /XD node_modules .next logs test-results vader-site-deploy
```

### Agent Backup Flow (recommended)

Use `backup project` (or `create backup`) in chat and answer one question at a time:

1. Backup type (`1` Standard / `2` Full)
2. Destination drive (`1` Same G: / `2` Different)
3. Folder naming (`1` Suggested / `2` Custom)
4. Confirm (`1` Yes / `2` No)

### Restore from Backup

```powershell
robocopy G:\Cursor_Project_BackUpz\Vader-Engine\Vader-Engine-v1-x D:\Cursor_Projectz\Vader-Engine /MIR
```

---

## 🔌 LiteLLM Proxy (Google Vertex AI / `vader-3-flash`)

| Command | What it does |
|---------|--------------|
| `npm run msc:litellm:start:ngrok` | **Cloud Agent** — LiteLLM + ngrok; prints Cursor HTTPS URL |
| `npm run msc:litellm:test:ngrok` | Verify local `:4000` + remote ngrok `/v1/models` |
| `npm run msc:litellm:start` | Localhost only (`http://127.0.0.1:4000/v1`) |
| `npm run msc:litellm:verify` | Local Vertex chat smoke |
| `npm run msc:litellm:stop` | Stop LiteLLM port + ngrok inspector |
| `npm run msc:litellm:status` | `online` / `offline` |
| `npm run msc:litellm:preflight` | GCP key + litellm CLI checks |
| `.\google-api\vpe-start-api.ps1 -StartNgrok` | Windows alias → `start:ngrok` |

### Cursor settings (Cloud Agent)

| Setting | Value |
|---------|--------|
| Override OpenAI Base URL | `https://<ngrok-host>/v1` (printed at startup — **not** `127.0.0.1`) |
| Custom model | **`vader-3-flash`** |
| OpenAI API Key | `MSC_LITELLM_MASTER_KEY` in `.env.local` (optional) |

### `.env.local` keys (proxy)

| Key | Purpose |
|-----|---------|
| `GOOGLE_APPLICATION_CREDENTIALS` | `config/gcp-service-account.json` (gitignored) |
| `GOOGLE_CLOUD_PROJECT` | GCP project id |
| `GOOGLE_CLOUD_LOCATION` | `global` |
| `MSC_LITELLM_MASTER_KEY` | Cursor API key field (optional) |
| `NGROK_AUTHTOKEN` | ngrok auth if tunnel fails |
| `MSC_NGROK_BIN` | Optional; default `google-api/ngrok.exe` |

> Root `DATABASE_URL` is for **Payload** only. LiteLLM runs **database-less** unless you set `MSC_LITELLM_DATABASE_URL` (PostgreSQL admin UI).

| Command | What it does |
|---------|--------------|
| `npm run msc:litellm:install-deps` | First-time `pip install litellm[proxy] prisma` |

**Runbook:** [local-ai-proxy-setup.md](local-ai-proxy-setup.md) · **Shortcuts:** `.cursor/rules/global.mdc`

---

## 🔄 Git Commands

### Basic Workflow

| Command | What it does |
|---------|--------------|
| `git status` | Check current state |
| `git add .` | Stage all changes |
| `git add <file>` | Stage specific file |
| `git commit -m "message"` | Commit staged changes |
| `git push` | Push to remote |
| `git pull` | Pull from remote |

### Branch Management

| Command | What it does |
|---------|--------------|
| `git branch` | List local branches |
| `git branch -a` | List all branches (local + remote) |
| `git checkout main` | Switch to main branch |
| `git checkout feat/phase-4-polish` | Switch to feature branch |
| `git checkout -b feat/new-branch` | Create and switch to new branch |
| `git merge main` | Merge main into current branch |
| `git branch -d branch-name` | Delete local branch |
| `git push origin --delete branch-name` | Delete remote branch |

### Sync & Update

| Command | What it does |
|---------|--------------|
| `git fetch origin` | Fetch latest changes without merging |
| `git pull origin main` | Pull latest main |
| `git merge main` | Merge main into current branch |
| `git rebase main` | Rebase current branch onto main |

### Undo & Fix

| Command | What it does |
|---------|--------------|
| `git restore <file>` | Discard changes to file |
| `git restore --staged <file>` | Unstage file |
| `git reset --soft HEAD~1` | Undo last commit (keep changes) |
| `git stash` | Temporarily save changes |
| `git stash pop` | Restore stashed changes |

> Avoid destructive commands like `git reset --hard` unless explicitly intentional and verified.
> Prefer conventional commits and green gates (`msc:lint`, `grade`, `msc:test:root`) before push.

### Remote Management

| Command | What it does |
|---------|--------------|
| `git remote -v` | List remotes |
| `git push origin main` | Push to main |
| `git push origin feat/branch` | Push to feature branch |
| `git push -u origin new-branch` | Push and set upstream |

### View History

| Command | What it does |
|---------|--------------|
| `git log --oneline` | Compact commit history |
| `git log --oneline -10` | Last 10 commits |
| `git diff` | Show unstaged changes |
| `git diff --staged` | Show staged changes |

---

## 🧹 Cleanup & Maintenance

| Command | What it does |
|---------|--------------|
| `npm run clean:next` | Delete all .next folders |
| `npm run repair:sqlite` | Repair Payload database |
| `npm run db:wal-purge` | Purge SQLite WAL files |
| `npm run msc:ensure-lockfiles` | Ensure lockfiles are consistent |

---

## 🛠 Troubleshooting Matrix

| Symptom | Fast check | Primary fix |
|---------|------------|-------------|
| Dashboard not loading on `:3010` | `npm run msc:kill -- 3010` then `npm run msc:dev:dashboard` | Restart dashboard dev server |
| Root localhost route down on `:3000` | `npm run msc:kill -- 3000` then `npm run msc:dev:example` | Restart minimal sandbox |
| Gate fails unexpectedly | `npm run start-project:gate` | Fix first failing step in output (lint/grade/tests) |
| Integrity check below 61/61 | `npm run grade` | Restore missing required files or sync moved doc paths |
| Lint errors after merges | `npm run msc:lint` | Apply `npm run msc:lint:fix`, then re-run lint |
| Tests failing in root | `npm run msc:test:root` | Resolve failing suite, re-run before commit |
| E2E failures | `npm run msc:e2e` | Ensure target dev servers are up and ports are free |
| LiteLLM appears offline | `status google-api` | `start google-api`, then `verify google-api` |
| Cursor `ERROR_PROVIDER_ERROR` | Stale ngrok URL | `restart google-api`; paste **new** HTTPS `/v1` in Cursor |
| Model not found | Wrong model name | Use **`vader-3-flash`** in Cursor |
| Prisma / PostgreSQL error on start | Payload `DATABASE_URL` | Use latest scripts (strip DB for proxy); see proxy runbook |
| Proxy port conflict (`:4000`) | `npm run msc:kill -- 4000` | `npm run msc:litellm:stop` then `start google-api` |
| Docs drift from version | `update docs` | Run docs sync workflow and review report |
| Need fast safe backup | `backup project` | Use conversational flow and confirm standard/full mode |

---

## 🚢 Release Checklist

Use this sequence before tagging or cutting a release:

1. Ensure docs are synced: `update docs`
2. Validate environment contract: `npm run msc:validate-env`
3. Validate MCP map: `npm run verify:mcp`
4. Run lint: `npm run msc:lint`
5. Run integrity grade: `npm run grade` (target **61/61**)
6. Run root test gate: `npm run msc:test:root`
7. (Optional) Run E2E parity: `npm run msc:e2e`
8. Update changelog/release notes if needed (`CHANGELOG.md`, `docs/releases/RELEASE_vX.Y.Z.md`)
9. Commit with conventional message and push
10. Tag release only after all gates are green

---

## 📅 Daily Operator Routine

### Start of Session

1. Say `start project`
2. Run `npm run start-project:gate`
3. Start only needed dev servers (`msc:dev:*`)
4. If using **`vader-3-flash`**: `start google-api` → `verify google-api` (keep proxy terminal open)

### During Session

1. Keep changes scoped and small
2. Use `backup project` before risky refactors
3. Periodically run `npm run msc:lint` and `npm run grade`
4. Update docs in the same session when scripts/workflows change

### End of Session

1. Say `stop google-api` if LiteLLM/ngrok were started
2. Say `end project`
3. Provide concise session summary when asked
4. Confirm `project-log.md` entry was appended
5. Commit/push only after gates are green

---

## 🌐 Service URLs

| Service | URL |
|---------|-----|
| Dashboard | http://localhost:3010 |
| Minimal Sandbox | http://localhost:3000 |
| Payload CMS Sandbox | http://localhost:3001 |
| Tailwind Sandbox | http://localhost:3002 |
| LiteLLM Proxy (local) | http://127.0.0.1:4000/v1 |
| LiteLLM (Cloud Agent) | `https://<ngrok-host>/v1` — printed by `start google-api` |
| Ngrok Inspector | http://127.0.0.1:4040 |

> Use `http://127.0.0.1:<port>` if localhost resolution behaves inconsistently.

---

## 📁 Important File Locations

| File | Purpose |
|------|---------|
| `scripts/msc-litellm-start.mjs` | LiteLLM foreground start (`--ngrok` for Cloud Agent) |
| `scripts/msc-litellm-test-ngrok.mjs` | `verify google-api` health check |
| `config/litellm_config.yaml` | Model aliases (`vader-3-flash` → Vertex) |
| `.cursor/docs/local-ai-proxy-setup.md` | Full `start google-api` runbook |
| `scripts/msc-backup.mjs` | Backup script |
| `scripts/msc-check-deps.mjs` | Dependency checker |
| `scripts/msc-log-session.mjs` | Session telemetry |
| `.cursor/prompts/Start-Project.md` | Session start workflow |
| `.cursor/prompts/End-Project.md` | Session closeout workflow |
| `.cursor/prompts/Update-Docs.md` | Documentation sync workflow |
| `.cursor/rules/global.mdc` | Natural language shortcuts |
| `.cursor/docs/Vader-Engine-Cheat-Sheet.md` | Master quick-reference doc |
| `.cursor/docs/project-log.md` | Session history |
| `.cursor/docs/.last-sync.json` | Tracks last doc sync state |
| `package.json` | Root scripts and dependencies |
| `biome.json` | Linting configuration |

---

## 🎯 Quick Reference Card

```text
┌─────────────────────────────────────────────────────────────────┐
│                    VADER ENGINE - QUICK REFERENCE               │
├─────────────────────────────────────────────────────────────────┤
│  start project      → Begin session                             │
│  end project        → Close session                             │
│  update docs        → Sync documentation                        │
│  backup project     → Conversational backup                     │
│  start google-api   → LiteLLM + ngrok (HTTPS for Cloud Agent)   │
│  verify google-api  → Test local + ngrok /v1/models             │
│  stop google-api    → Stop proxy + ngrok                        │
├─────────────────────────────────────────────────────────────────┤
│  Dashboard:  http://localhost:3010                              │
│  vader-3-flash:  https://<ngrok>/v1  (start google-api)         │
│  Integrity:  61/61                                              │
└─────────────────────────────────────────────────────────────────┘
```

---

*Last updated: May 28, 2026 | Version 2.6.0 — LiteLLM + ngrok / `start google-api` pass*



