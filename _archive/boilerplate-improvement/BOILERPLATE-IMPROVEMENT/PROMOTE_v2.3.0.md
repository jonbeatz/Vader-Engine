# Vader Engine v2.3.0 Promotion — Master Prompt
> Run this entire prompt in Cursor against the Vader Engine repo root.

---

I am officially promoting Vader Engine to **v2.3.0 — VaderLabz Template**. Perform a comprehensive update of all documentation, metadata, and release artifacts to reflect this milestone. Follow every step in order. Do not skip steps. Report completion of each step before moving to the next.

---

## STEP 0 — Pre-Flight Checks (Run First, Report Before Continuing)

Before making any changes, perform these checks and report findings:

1. **Template sync check** — verify `templates/full-stack/vader-site/` contains `vader.css` and does NOT contain `page.module.css` or `BackToTop.module.css`. If out of sync, re-sync from `Dev-Projectz/vader-site/` before proceeding.

2. **Ghost assets check** — scan for any of the following in the repo and report:
   - `page.module.css` in templates
   - `BackToTop.module.css` in templates
   - Any `style={{` inline props remaining in TSX files
   - Any `styles.` CSS module references remaining in TSX files

3. **Leakage check** — scan for and report any:
   - `node_modules/` folders committed to git
   - `.next/` folders committed to git
   - `*.db`, `*.db-wal`, `*.db-shm` files committed to git
   - `.env.local` or `.env.production` files committed to git
   - `vader-site-deploy/` folder committed to git

4. **`.env.example` check** — verify `templates/full-stack/vader-site/.env.example` exists and contains `ENABLE_PAYLOAD=false` as the default. If missing, create it with:
   ```
   # Vader Protocol — Environment Config
   # Set to true only when running with Payload CMS locally
   ENABLE_PAYLOAD=false
   NODE_ENV=development
   PORT=3003
   MSC_PUBLIC_ORIGIN=http://localhost:3003
   # Required when ENABLE_PAYLOAD=true:
   # PAYLOAD_SECRET=your-secret-here
   # DATABASE_URI=file:./database/payload.db
   ```

**Do not proceed to Step 1 until all pre-flight issues are resolved.**

---

## STEP 1 — Version Bump

- Update `package.json` `"version"` field to `"2.3.0"`
- Globally search and replace ALL instances of `v2.2.0` and `2.2.0` with `v2.3.0` and `2.3.0` across all `.md`, `.json`, `.mjs`, `.ts`, `.tsx`, `.css`, and `.sh` files
- Update the footer version string in `Dev-Projectz/vader-site/app/(app)/vader.css` and any TSX files from `v2.2.0` to `v2.3.0`
- Update version in `templates/full-stack/vader-site/package.json` to `2.3.0`

---

## STEP 2 — CHANGELOG.md

Add a new entry at the TOP of `CHANGELOG.md`:

```md
## v2.3.0 — VaderLabz Template

### New Features
- **Template Factory**: Added `templates/full-stack/vader-site/` — a production-ready Next.js 15 site template with optional Payload CMS integration, seeded with VaderLabz baseline data (3 projects + 16 stack items)
- **Vader Protocol CSS Architecture**: Introduced `vader.css` as the single source of truth for all component styles — replaces `page.module.css`, eliminates all inline styles, zero CSS module imports in TSX
- **Animation System**: Implemented full `vader_animations_skill.md` — staggered hero entrance (fadeInUp with 0.15s delays), flicker on hero title (6s), pulse-red on CTAs (3s), card top-border scaleX reveal on hover, nav underline slide-in via ::after, pulse-green status dot
- **BackToTop Component**: New `'use client'` component with scroll-triggered visibility at 400px, Vader Protocol styling, smooth scroll, positioned above footer
- **Boot Screen**: Optional `BootScreen.tsx` component for dramatic page load sequence with progress bar
- **useInView Hook**: Scroll-triggered section entrance animations via Intersection Observer
- **Cursor Skills**: Two new Cursor-native skill files added to `.cursor/skills/` for permanent design system memory

### Architecture
- Decoupled Payload/CMS via `ENABLE_PAYLOAD` environment flag — static-first by default, full CMS on demand
- `scripts/prebuild-static.mjs` — stashes Payload modules for static builds, restores for CMS builds
- `scripts/deploy-prep.sh` — strips dev artifacts, writes `.env.production`, prepares GitHub-ready deploy package
- `scripts/dev-fresh.mjs` — fixed ENABLE_PAYLOAD environment mismatch that caused webpack runtime error `a[d] is not a function`
- `scripts/prep-hostinger-deploy.sh` — copies `vader-site` into `vader-site-deploy/`, validates `next` in dependencies, produces clean GitHub-ready output
- `scripts/postinstall.mjs` — no-op in static mode, seeds DB in CMS mode
- `pm2.config.js` — Hostinger PM2 profile (ENABLE_PAYLOAD=false, port 3003, 0.0.0.0 binding)

### Deployment
- `DEPLOY_TO_HOSTINGER.md` — step-by-step Hostinger Node.js GitHub repo deployment workflow
- `vader-site-deploy/` artifact strategy — clean deployable folder separate from source, gitignored from Vader Engine
- Verified end-to-end deployment on Hostinger with GitHub auto-deploy connected to `jonbeatz/VaderLabz`
- Live proof: https://vaderlabz.com

### Skills & Documentation
- Added `.cursor/skills/vader_protocol_skill.md` — Vader Protocol design system reference (color tokens, typography, layout rules, component patterns, do's and don'ts)
- Added `.cursor/skills/vader_animations_skill.md` — full animation system reference (all keyframes, applied animations per element, atmospheric effects, performance rules, quick reference table)
- Both skills are Cursor-native and auto-referenced in agent workflows via `.cursorrules`

### Fixes
- Removed scanline legacy code entirely from all templates and live site
- Fixed `dev-fresh.mjs` ENABLE_PAYLOAD environment mismatch causing webpack runtime errors
- Fixed footer `> VADERLABZ` color — resolved CSS specificity war between `vader.css` and `layout.css` using `footer.vader-footer span.vader-footer-brand` full selector with `!important`
- Fixed stale `.next` cache causing ghost CSS to persist in dev — `npm run dev` now always runs `dev-fresh.mjs` first
- Removed all inline `style={{}}` props across all TSX — zero inline styles policy enforced
- Fixed `{{PORT}}` template token not being replaced in scaffolded `package.json`
- Fixed hero layout — `vader-hero-content` uses `max-width: 800px; margin: 0 auto; text-align: left` matching vaderlabz.com exactly
```

---

## STEP 3 — README.md Updates

- Update the version badge/header to `v2.3.0 — VaderLabz Template`
- Add a **Vader Protocol Design System** section:
  ```md
  ## Vader Protocol Design System

  All VaderLabz UI is governed by two Cursor-native skill files in `.cursor/skills/`:

  | Skill | Purpose |
  |---|---|
  | `vader_protocol_skill.md` | Colors, typography, layout, components |
  | `vader_animations_skill.md` | Keyframes, hover effects, entrance animations, atmospheric effects |

  Reference these in any Cursor prompt with: *"follow vader_protocol_skill and vader_animations_skill"*
  ```
- Add a **Deploy to Hostinger** section referencing `DEPLOY_TO_HOSTINGER.md`
- Add `vader-site` to the templates table:
  | Template | Description | Port |
  |---|---|---|
  | `full-stack/vader-site` | Vader Protocol Next.js 15 site with optional Payload CMS | 3003 |
- Remove any references to `core-Divi-Scriptz.js` — that belongs to a separate project and should not appear in this repo's docs

---

## STEP 4 — DOCS.md Script & Skill Registry

Ensure all new scripts are documented in `DOCS.md` (or equivalent documentation file) under a **Scripts Reference** section:

| Script | Purpose |
|---|---|
| `scripts/prep-hostinger-deploy.sh` | Copies vader-site to vader-site-deploy/, validates deps, GitHub-ready |
| `scripts/deploy-prep.sh` | Strips dev artifacts, writes .env.production, full deploy prep |
| `scripts/prebuild-static.mjs` | Stashes Payload modules for static-only builds |
| `scripts/dev-fresh.mjs` | Clears .next cache before dev start, passes through env unchanged |
| `scripts/postinstall.mjs` | No-op in static mode, seeds DB in CMS mode |

And both skills under a **Cursor Skills** section:

| Skill | Trigger Phrases |
|---|---|
| `.cursor/skills/vader_protocol_skill.md` | "Vader Protocol", "VaderLabz", "dark aesthetic", "keep my design style" |
| `.cursor/skills/vader_animations_skill.md` | "add animations", "make it feel alive", "vader animations", "micro-interactions" |

---

## STEP 5 — .gitignore Leakage Audit

Verify `.gitignore` at the repo root explicitly includes ALL of the following. Add any that are missing:

```gitignore
# Build artifacts
node_modules/
.next/
dist/
build/

# Environment files
.env
.env.local
.env.production
.env.development

# Database files
*.db
*.db-wal
*.db-shm

# Deploy artifacts
vader-site-deploy/

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
```

Report any files that are currently tracked by git that should be in `.gitignore`, and remove them from tracking with `git rm --cached`.

---

## STEP 6 — RELEASE_v2.3.0.md

Create this file at the repo root:

```md
# Release v2.3.0 — VaderLabz Template

**Released:** [today's date]
**Tag:** v2.3.0
**Previous:** v2.2.0 — Template Scaffolding CLI

---

## Why This Release Matters

v2.3.0 marks the shift from a developer scaffolding tool to a **production-proven, animation-rich, static-first deployment protocol**.

The VaderLabz template is the first full proof-of-concept for the Vader Engine's end-to-end capability:

- Template factory → scaffold → local dev → deploy in one workflow
- Cursor-native skills as living design system documentation
- CSS architecture (`vader.css`) that scales without drift
- Hostinger-ready static builds with optional Payload CMS upgrade path
- Live deployment at https://vaderlabz.com

---

## What Shipped

### Template
A complete Next.js 15 site template implementing the Vader Protocol design system — deep black, crimson accents, Rajdhani + Share Tech Mono typography, terminal/command-center aesthetic.

### CSS Architecture
`vader.css` replaces all CSS modules and inline styles. One file, all component styles, prefixed with `vader-*`. Zero inline `style={{}}` props anywhere.

### Animation System
Full keyframe library: `flicker`, `fadeInUp`, `fadeInLeft`, `pulse-red`, `pulse-green`, `bootReveal`, `borderMarch`, `glitch-1/2`, `shake`, `scaleIn`, `countUp`. All applied per-element per the `vader_animations_skill.md` reference.

### Deployment Tooling
Three new scripts handle the full Hostinger deploy pipeline. `DEPLOY_TO_HOSTINGER.md` documents every click. Verified working on production.

### Cursor Skills
Two permanent `.cursor/skills/` files ensure every future AI-assisted build stays on-brand automatically.

---

## Upgrade from v2.2.0

No breaking changes to the Vader Engine core.

To scaffold the new template:
\`\`\`bash
npm run msc:template -- apply full-stack/vader-site --name=your-site
\`\`\`

To deploy to Hostinger, follow `DEPLOY_TO_HOSTINGER.md`.

---

## Live Proof
https://vaderlabz.com — built and deployed entirely using this boilerplate template.
```

---

## STEP 7 — Self-Grader Validation

Run the 52-point self-grader and confirm score:
```bash
npm run grade
```

Report the score. If any points dropped from v2.2.0, identify which checks failed and fix them before tagging.

---

## STEP 8 — Git Tag (ONLY AFTER ALL STEPS PASS)

Only after:
- ✅ Pre-flight checks clear
- ✅ All docs updated
- ✅ Leakage audit clean
- ✅ Self-grader score confirmed
- ✅ Template synced to vader.css architecture

Then and only then run:
```bash
git add .
git commit -m "docs(v2.3.0): promote to VaderLabz Template release"
git tag v2.3.0
git push origin main --tags
```

Then create the GitHub Release:
- Tag: `v2.3.0`
- Title: `v2.3.0 — VaderLabz Template`
- Body: paste contents of `RELEASE_v2.3.0.md`
- Mark as **Latest release**

---

## Summary Checklist

| Step | Task | Status |
|---|---|---|
| 0 | Pre-flight checks + template sync + .env.example | ⬜ |
| 1 | Version bump to 2.3.0 everywhere | ⬜ |
| 2 | CHANGELOG.md new entry | ⬜ |
| 3 | README.md updates | ⬜ |
| 4 | DOCS.md script + skill registry | ⬜ |
| 5 | .gitignore leakage audit | ⬜ |
| 6 | RELEASE_v2.3.0.md created | ⬜ |
| 7 | npm run grade — score confirmed | ⬜ |
| 8 | git tag v2.3.0 + GitHub Release | ⬜ |
