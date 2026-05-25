# GitHub Automation, Branching, & Release Protocol

This guide defines the source-control standards, automated release build scripts, and tag-management rules for decoupled repositories using this boilerplate.

**Canonical repository:** [jonbeatz/Boilerplate](https://github.com/jonbeatz/Boilerplate) · clone: `git clone https://github.com/jonbeatz/Boilerplate.git my-project`

**Remote hygiene (2026-05-25):** `main` is the only long-lived branch; release tags use `v2.*` semver only. Obsolete `phase-*` tags and stale Dependabot branches were removed — do not recreate `phase-*` tags; use annotated `v2.x.y` tags per section 2 below.

**Settings automation:** `npm run msc:github:sync` — syncs repository description, homepage, and **delete branch on merge** (requires `gh auth login`). Re-run after a repo rename.

---

## 🌿 1. Branching Governance Matrix

| Branch | Role | Rules |
|--------|------|--------|
| **`main`** | Production stable layer | Primary branch — v2.5.0-SOVEREIGN baseline lives here. Merge via PR recommended. |
| **`dev`** | Integration sandbox (optional) | Staging track for feature consolidation before release. |
| **`feature/*`** | Isolated functional tracks | Scoped per task (e.g. `feature/msc-auth-bridge`, `feature/ui-shield-tokens`). |
| **`hotfix/*`** | Urgent production repair | Branch from `main`; merge back to `main` and `dev` after verification. |

**Anti-conflict:** One feature per branch; avoid long-lived divergent forks without periodic `dev` merges.

---

## 🏷️ 2. Automated Release & Tag Management

When cutting a release from a verified build:

### Pre-release gates (local)

1. Align **`package.json` `version`** with the target release (semver).
2. Run **`npm run grade`** (must show **61/61**) and **`npm run msc:test:all`**.
3. Run **`npm run msc:e2e`** after `npm run msc:e2e:install` (CI parity).
4. Clear stuck dev ports when needed:

```bash
node scripts/msc-kill-dev-port.mjs 3000
node scripts/msc-local-http-smoke.mjs 3000
```

5. Confirm distributable artifacts exist (`dist/`, `final_deploy.zip`, `.next/`, etc.) per project scripts.

### Tag convention

Use annotated tags matching semver:

```bash
git tag -a v1.0.4 -m "Release v1.0.4"
git push origin <branch> --tags
```

**Dedup pattern:** If tag `v1.0.4` already exists on the remote, append a build suffix (`v1.0.4-b2`) rather than overwriting published releases.

### Release packaging (conceptual)

Automated upload scripts (PowerShell or bash) typically:

1. Read version from **`package.json`**.
2. Zip compiled output (e.g. `win-unpacked/`, `dist/`, deploy folder).
3. Inject release notes from a template (`{{VERSION}}`, `{{BRANCH}}`, `{{TIMESTAMP}}`).
4. Publish via **`gh release create`** with attached assets.

Keep **`GITHUB_TOKEN`** / **`gh` CLI** auth on the operator machine only—never commit tokens.

---

## 🤖 3. GitHub Actions Integration Contract

Workflows under **`.github/workflows/`** should align with **`.env.example`** principles (secrets via GitHub Actions **Secrets**, not committed env files).

### Minimum CI pipeline (push + pull_request)

| Step | Purpose |
|------|---------|
| Checkout | Pin action versions (e.g. `actions/checkout@v4`) |
| Setup Node | Match production LTS (e.g. **20.x**) + lockfile cache |
| `npm ci` | Reproducible install |
| Lint | `npm run lint` when defined |
| Typecheck | `npm run typecheck` when defined |
| Native rebuild | Electron/native modules only when applicable |
| Migration guard | DB/schema smoke when applicable |
| Build | Renderer/app compile step |

Example trigger contract:

```yaml
name: CI
on: [push, pull_request]
```

### Release workflow (on `v*` tag → `main`)

When a **`v*`** tag lands on the production branch, optional release automation should:

1. Run **lint + typecheck + build** (fail fast).
2. Produce **distribution artifact** (zip/installer) named after package identity.
3. Attach artifacts to the GitHub Release with generated notes.
4. Never publish unsigned secrets or `.env` files in artifacts.

Tag-only jobs example:

```yaml
on:
  push:
    tags:
      - 'v*'
```

---

## 📋 4. Pull Request Checklist

- [ ] `.cursor/prompts/task-planner.md` matrix was confirmed for the feature scope
- [ ] `package.json` scripts referenced in docs still exist
- [ ] No credentials, `gcp_key.json`, or machine paths in diff
- [ ] **Local Script Gate Sequence** passed on port **3000**: `msc-kill-dev-port.mjs` → `msc-local-http-smoke.mjs` (exit **0**)
- [ ] `.cursor/docs/project-log.md` updated at session closeout when applicable

---

## 🛠️ 5. Operator Commands Reference

| Intent | Typical command |
|--------|----------------|
| CI parity locally | `npm ci && npm run typecheck && npm run lint` |
| Create release tag | `git tag -a vX.Y.Z -m "..."` |
| Publish release | `gh release create vX.Y.Z ./dist/artifact.zip --notes-file notes.md` |
| List releases | `gh release list` |

Replace `gh` flows with UI equivalents when CLI is unavailable.

---

## 📚 Related docs

- **`.cursor/docs/spaceship-node-deployment.md`** — production FTP/cPanel deploy (separate from GitHub Releases)
- **`.cursor/prompts/session-handoff.md`** — branch + log check-in at session end
- **`.env.example`** — variable contract for CI secrets mapping

