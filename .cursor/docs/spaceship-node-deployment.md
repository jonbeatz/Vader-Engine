# Spaceship Hosting: Node.js & FTP Deployment Runbook

This document details the canonical production pipeline for deploying Node.js apps (Next.js standalone, Payload CMS, or Express engines) onto Spaceship shared hosting using FTP/SFTP and cPanel Application Managers.



---

## 📁 1. The Production Directory Architecture

When uploading built bundles via FTP, adhere strictly to this isolated directory map to keep Node runtime binaries separate from standard static public assets:

```text
/home/<cpanel_username>/
├── public_html/                 # Static web roots (marketing HTML, legacy PHP)
│   └── ui-assets/               # Optional decoupled front-end static builds
└── node-apps/                    # Recommended isolation (name may vary by account)
    └── msc-production-vault/    # Main Node / Passenger application home
        ├── .env                 # Live secrets (mirror .env.example — never commit)
        ├── package.json
        ├── package-lock.json
        ├── server.js            # Passenger ignition entry (Next custom server or adapter)
        ├── payload.config.ts    # When using Payload
        ├── payload.sqlite       # SQLite vault (if applicable)
        ├── media/               # Upload staticDir / public media mirror
        ├── .next/               # Full production Next build output
        ├── .stderr.log          # Runtime errors (tail after deploy)
        └── .stdout.log          # Boot logs
```

**Golden rules**

- One **`.next`** directory beside `package.json` / `server.js` — never nested `.next/.next`.
- FTP **merges** files; stale chunks cause `vendor-chunks` 500s — delete `.next` on host before full re-upload when recovering.
- **`node_modules`** is usually **not** uploaded; run **`npm install --legacy-peer-deps`** on the server when dependencies change.

---

## 🧭 2. Local PC vs cPanel Terminal (who runs what)

| Action | Where | Command pattern |
|--------|--------|-----------------|
| Production build | **PC repo root** | `npm run build` (or project `verify:next` gate first) |
| FTPS upload | **PC only** | Project deploy script (`pushitup`, `pushitlive`, SFTP) |
| `npm install` | **cPanel Terminal** | After `package.json` / lockfile / `patches/` change |
| App restart | **cPanel → Setup Node.js App** | Stop → wait → Start (or Restart) |
| Smoke test (local) | **PC** | Gate sequence on **3000**: kill → smoke (Node 2) |
| Smoke test (live) | **Browser** | Incognito: `/`, `/admin`, health routes |

**Never** run PC upload scripts inside cPanel Terminal — you will see `npm: command not found` until the Node venv is activated, and deploy aliases are not server commands.

**cPanel path trap:** use `/home/<username>/app-folder` or `~/app-folder`, not `/<username>/app-folder`.

---

## ⚙️ 3. Passenger / Node.js Application Manager

Typical Spaceship + cPanel setup:

| Setting | Value |
|---------|--------|
| Node version | 20.x LTS (match local dev) |
| Application mode | Production |
| Application root | `/home/<username>/<app-folder>` (see `SPACESHIP_APP_DIR`) |
| Application startup file | `server.js` |
| Passenger / proxy | Enabled via cPanel Node selector |

**After every deploy that changes compiled output or env:**

1. Stop app (when replacing `.next` or DB).
2. Upload artifacts from PC.
3. Terminal: activate venv → `cd` app root → `npm install` if needed.
4. Restart Node application.
5. Validate in Incognito.

**Activate Node venv (template — adjust domain segment):**

```bash
source ~/nodevenv/your-domain.com/20/bin/activate
cd ~/your-app-folder
# or: cd $SPACESHIP_APP_DIR per your host layout
```

---

## 📤 4. FTP / SFTP Upload Strategy

### Connection profile (placeholders)

- Protocol: **FTPS** (explicit TLS), port **21** (or host-provided SFTP port)
- Remote root: often **chrooted to the app directory** (FileZilla shows `/` with `package.json` inside)

### `remotePath` discipline

| Context | Path | Result |
|---------|------|--------|
| cPanel / SSH shell | `/home/<user>/<app>` | Correct for `sqlite3`, `pkill`, `npm install` |
| FTPS `remotePath` when chrooted | `/` | Files land next to `package.json` |
| Wrong nested remotePath | `/home/<user>/<app>/` under chroot | Double-nested tree — Node will not load build |

**Post-config check:** upload a marker file; confirm it appears beside `server.js` and `.next`.

### What to upload (typical Next + Payload)

| Artifact | When |
|----------|------|
| Entire **`.next/`** | After every `npm run build` affecting app/router/components |
| **`public/`**, **`media/`** | Static assets changed |
| **`payload.sqlite`** | CMS data cutover (see WAL cleanup below) |
| **`server.js`**, **`package.json`**, lockfile | Hosting or dependency changes |
| Source bundles (optional) | Admin branding-only tiers — still require matching `.next` for UI |

**Do not** cherry-pick files inside `.next` except during targeted chunk recovery after a failed upload.

### Zip alternative

Some workflows zip `.next` locally, upload one archive, and unzip on server. If used: **remove** old `.next` first, extract into app root, verify `BUILD_ID` and `server/` timestamps.

---

## 🧹 5. Required Pre-Upload Cleanup (cPanel)

Run **Stop app** first, then in **cPanel Terminal** at app root:

```bash
cd ~/your-app-folder
rm -rf .next
rm -f payload.sqlite-wal payload.sqlite-shm
```

| Command | Why |
|---------|-----|
| `rm -rf .next` | Prevents merged stale webpack runtime + missing `vendor-chunks` 500s |
| `rm -f *.sqlite-wal *.sqlite-shm` | Stops SQLite replaying an old journal over a freshly uploaded DB |

Then upload from PC and restart Node.

---

## 🚀 6. Master Deploy Sequence (universal SOP)

### A. On the PC (before upload)

1. Copy **`.env.example`** → **`.env`** locally; never commit live secrets.
2. Run build gate: `npm run verify:next` or project equivalent until exit **0**.
3. Run **`npm run build`** with production public URL env (`MSC_PUBLIC_ORIGIN` / `NEXT_PUBLIC_SITE_URL`).
4. Package or FTPS-upload per project script (`final_deploy.zip` or folder push).
5. Confirm `server.js`, `package.json`, and database file exist in the bundle.

### B. On the server

1. Upload archive or folders to **app root** (not `public_html` unless that *is* the Node root).
2. Unzip if applicable; verify single `.next` at correct level.
3. Mirror env vars in **Node.js Application Manager → Environment Variables** (preferred over relying on checked-in `.env` alone).
4. `npm install --legacy-peer-deps` when lockfile changed.
5. **Restart** application.

### C. Post-deploy verification

| Check | Method |
|-------|--------|
| HTTP routes | Incognito: `/`, `/admin`, `/api/health` |
| Build integrity | `tail -n 120 .stderr.log` — no `vendor-chunks` module errors |
| DB parity | Compare sqlite file size vs local when CMS content must match |
| Media URLs | SQL or admin: URLs use `/media/...` convention |

Local script gate (before shipping):

```bash
node scripts/msc-kill-dev-port.mjs 3000
node scripts/msc-local-http-smoke.mjs 3000
```

---

## 📧 7. Production Environment Variables

Set in **cPanel Node env UI** (mirror `.env.example`):

| Variable | Purpose |
|----------|---------|
| `NODE_ENV` | `production` |
| `MSC_PUBLIC_ORIGIN` / `NEXT_PUBLIC_SITE_URL` | Public HTTPS origin (verification links, cookies) |
| `PAYLOAD_SECRET` | Payload crypto secret |
| `DATABASE_URL` / `DATABASE_URI` | Same SQLite or MySQL URI |
| `MSC_STUDIO_OUTGOING_*` | SMTP for verification/system mail (if using nodemailer) |

PHP-only stacks may instead route mail through **`msc_send_mail()`** in `core/msc-communications.php` — do not duplicate SMTP config in two runtimes unless intentional.

---

## 🔧 8. Recovery Playbooks

### `Cannot find module './vendor-chunks/...'`

1. Stop app.
2. `rm -rf .next` on server.
3. PC: `npm run build` → upload **full** `.next`.
4. Restart; test Incognito.

### Live 500 after partial FTP

1. Confirm no nested `.next/.next`.
2. Re-upload failed chunk paths or entire `.next`.
3. Check `.stderr.log` for first missing module.

### Stale CMS content after DB upload

1. Stop app.
2. `rm -f payload.sqlite-wal payload.sqlite-shm`.
3. Re-upload `payload.sqlite`.
4. Restart; verify admin globals.

### Permission / EACCES

Fix ownership on app root, `.next`, `media/`, and sqlite file per host docs (often `chmod` / user must match Node process).

---

## 📋 9. Deploy Tier Reference (conceptual)

| Tier | Scope | Typical artifacts |
|------|--------|-------------------|
| **1** | Branding / admin skin | Payload admin SCSS, graphics, nav components |
| **2** | Full runtime | `build` + `.next` + sqlite + `public/media` |
| **3** | Server config | `package.json`, `server.js`, `patches/`, middleware |

Always align tier with what changed; **UI/route code changes require Tier 2 `.next`**.

---

## 📚 Related boilerplate assets

- **`.env.example`** (repo root) — configuration contract
- **`scripts/msc-local-http-smoke.mjs`** — local HTTP gate
- **`scripts/msc-kill-dev-port.mjs`** — port clearance before rebuild
- **`core/msc-communications.php`** — transactional mail in PHP stacks
- **`.cursor/skills/docs-ops-governance.md`** — doc authority pointer

---

