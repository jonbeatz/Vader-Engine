# Deploy `vader-site` to Hostinger (Node.js + GitHub)

This guide deploys the **static** VaderLabz Next.js site from `Dev-Projectz/vader-site` using a **separate GitHub repository**. It does **not** modify the existing [VaderLabz](https://github.com/jonbeatz/VaderLabz) repo or the current `vaderlabz.com` deployment.

---

## Prerequisites

| Item | Requirement |
|------|-------------|
| **Source app** | `../Dev-Projectz/vader-site` (built with `ENABLE_PAYLOAD=false` for production) |
| **Boilerplate repo** | This repository (`Boilerplate`) |
| **Shell** | Git Bash or WSL on Windows; bash on macOS/Linux |
| **Node on Hostinger** | **20.x** or **24.x** (match `.nvmrc` policy) |
| **New GitHub repo** | Empty repo for deploy only (e.g. `vader-site-hostinger`) |

---

## Step 1 — Generate the deploy folder locally

From the **Boilerplate** repository root:

```bash
bash scripts/prep-hostinger-deploy.sh
```

This creates `vader-site-deploy/` with:

- No `node_modules/`, `.next/`, or Payload CMS routes
- `package.json` scripts exactly:
  - `"build": "next build"`
  - `"start": "next start -p ${PORT:-3000}"`
- `next` under **dependencies** (moved from `devDependencies` if needed)
- `.env.production` with `ENABLE_PAYLOAD=false` by default

Override source path if needed:

```bash
MSC_VADER_SITE_SRC=/path/to/vader-site bash scripts/prep-hostinger-deploy.sh
```

---

## Step 2 — Push to a new GitHub repository

```bash
cd vader-site-deploy
git init
git add .
git commit -m "VaderLabz static site — Hostinger production"
git branch -M main
git remote add origin https://github.com/YOUR_USER/vader-site-hostinger.git
git push -u origin main
```

Use a **dedicated** repo — not the main VaderLabz marketing repository.

---

## Step 3 — Hostinger: Node.js website from GitHub

1. Log in to [Hostinger hPanel](https://hpanel.hostinger.com/).
2. **Websites** → **Add website** (or open an existing site subfolder).
3. Choose **Node.js** application (or **Node.js Web App** / **Deploy from GitHub** — wording varies by plan).
4. **Connect GitHub** and authorize Hostinger.
5. Select the **new** repository (`vader-site-hostinger` or similar).
6. Branch: `main`.

### Build & start commands

| Setting | Value |
|---------|--------|
| **Install command** | `npm install` (or `npm ci` if you add a lockfile to the deploy repo) |
| **Build command** | `npm run build` |
| **Start command** | `npm run start` |
| **Root directory** | `/` (repository root) |
| **Node version** | 20 or 24 |

Hostinger sets `PORT` automatically; the start script uses `${PORT:-3000}`.

### Environment variables (hPanel → Environment)

| Variable | Value |
|----------|--------|
| `NODE_ENV` | `production` |
| `ENABLE_PAYLOAD` | `false` |
| `MSC_PUBLIC_ORIGIN` | `https://vaderlabz.com` (or your preview URL) |
| `HOSTNAME` | `0.0.0.0` |

`.env.production` in the repo already defaults `ENABLE_PAYLOAD=false`. You may mirror or override these in hPanel.

---

## Step 4 — Domain & SSL

1. Point your domain (or subdomain) to the Hostinger site in **Domains** → **DNS**.
2. Enable **SSL** (Let’s Encrypt) in hPanel.
3. Redeploy after DNS propagates if Hostinger requires it.

---

## Step 5 — Verify deployment

After the build succeeds:

- Homepage loads with Vader Protocol UI (dark, crimson, Rajdhani / mono).
- Projects and tech stack render from **static** data (no database).
- `/admin` returns **404** (Payload excluded — expected in static mode).

---

## Re-run prep after local changes

When you update `Dev-Projectz/vader-site`:

```bash
# From Boilerplate root
bash scripts/prep-hostinger-deploy.sh
cd vader-site-deploy
git add .
git commit -m "Sync Hostinger deploy artifact"
git push
```

Hostinger redeploys on push if auto-deploy is enabled.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Build: `next: command not found` | Re-run `prep-hostinger-deploy.sh` — ensures `next` is in `dependencies`. |
| Build: Payload / database errors | Confirm `ENABLE_PAYLOAD=false` in hPanel and that `app/(payload)` is absent in the deploy repo. |
| Wrong port / crash on start | Ensure start command is `npm run start`; do not hardcode port in hPanel if `PORT` is provided. |
| Stale content | Re-run prep script and push; content is baked from `lib/static-site-data.ts` in static mode. |

---

## Optional: CMS-enabled deploy later

To edit projects/stack via Payload on a server:

1. Set `ENABLE_PAYLOAD=true` and database secrets in environment.
2. Use the full `vader-site` tree (not this static prep script) with `pm2` or Payload-enabled build pipeline.

The Hostinger prep script in this doc is optimized for **static production only**.

---

## Related files

| Path | Purpose |
|------|---------|
| `scripts/prep-hostinger-deploy.sh` | Generates `vader-site-deploy/` |
| `../Dev-Projectz/vader-site/` | Local development source |
| `Dev-Projectz/vader-site/pm2.config.js` | VPS PM2 profile (not copied to GitHub deploy tree) |
