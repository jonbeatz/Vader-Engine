# Contributing

Thank you for improving the MSC boilerplate (**v2.3.0**).

## Fork and Rename

Use the defensive re-brander with dry-run first:

```powershell
npm run msc:forge -- README.md "MyOldName" "MyProject" --dry-run
```

The forge shield blocks mutations on protected `msc-` namespaces and paths under `core/`, `ui/`, and `scripts/msc-*`.

## Script Conventions

- All automation lives under `scripts/`.
- First import: `import './lib/msc-load-env.mjs'` (and node guard where applicable).
- Register new commands in root `package.json` only.
- Update [Code-Jedi.md](.cursor/docs/Code-Jedi.md) and [HOW-TO.md](.cursor/docs/HOW-TO.md) when adding scripts.
- Template blueprints under `templates/` use `{{TOKEN}}` placeholders — excluded from Biome (`biome.json` → `!templates`). Do not run forge against protected paths.

## Scaffolding contributions

- Keep `templates/` read-only in Git; test applies to sibling `--target` directories outside the repo.
- Seed output belongs in `--target` or `.sandbox/` — never commit `.sandbox/`.
- New blueprints must enforce `msc-` / `msc_` namespace and WordPress `ABSPATH` guards on PHP files.

## CSS Naming

All custom classes use the `msc-` prefix. Studio Dark tokens belong in `ui/msc-shield.css` only. Run `npm run msc:shield:audit` after UI changes.

## Pre-Commit Gates

Husky runs (in order):

1. **prepare-commit-msg** — strips `Co-authored-by: Cursor <cursoragent@cursor.com>` (JonBeatz-only commit policy)
2. **lint-staged** — Biome check/write on `*.{js,mjs,ts,tsx,jsx}`; format on `*.{json,css}` (excludes `package-lock.json`)
3. **`npm run msc:validate-env`** — secret leak scan
4. **`npm run verify:mcp`** — MCP structure validation

**Cursor IDE:** Turn off **Settings → Agents → Attribution → Commit attribution** so agents do not inject co-author trailers. The Husky hook above is a second line of defense.

## Pre-Push Gates

1. **`npm run grade`** — 52-point structural audit (must be 100%)
2. **`npm run msc:test:root`** — root Vitest suite

Do not bypass hooks with `--no-verify` unless the operator explicitly accepts drift risk.

## Local Quality Workflow

Before opening a PR:

```powershell
npm run msc:validate-env
npm run msc:lint
npm run grade
npm run msc:test:all
npm run msc:e2e:install   # first time only
npm run msc:e2e           # optional local parity with CI
```

## Pull Requests

- Target branch: **`main`** (single production branch)
- Keep grade at **52/52** before push
- Do not commit `.env.local`, sandbox `.env.local`, or live MCP tokens
- Update [CHANGELOG.md](CHANGELOG.md) for user-visible changes
- CI must pass: validate-env → verify:mcp → lint → grade → root tests → sandbox builds → Playwright E2E

## Documentation Sync

When changing scripts, hooks, or sandboxes, update in the same session:

- `package.json` (authority)
- [Code-Jedi.md](.cursor/docs/Code-Jedi.md)
- [HOW-TO.md](.cursor/docs/HOW-TO.md)
- [README.md](README.md) command reference (if operator-facing)
- [DOCS.md](DOCS.md) index (if new doc files)

Constitutional changes require [TRUTH.md](TRUTH.md) update first.

## Release and versioning

### Pre-tag gate (mandatory)

Before `git tag` or `git push --tags`, run from repo root:

```bash
npm run msc:validate-env
npm run verify:mcp
npm run msc:lint
npm run grade
npm run msc:test:root
```

**Minimum before tag:**

```bash
npm run msc:lint && npm run grade && npm run msc:test:root
```

- **`msc:lint`** must exit **0** (CI runs this in the `validate` job before grade).
- **`grade`** must report **52/52** (or **60/60** after grader expansion).
- **`msc:test:root`** must pass (also enforced by `.husky/pre-push`).

**CI lesson (2026-05-25):** Do not use deprecated `/**` suffixes on Biome folder ignores (`!templates/**` → `!templates`). The v2.3.0 release push failed CI until `biome.json` was fixed (`9a1a4b6`). Run lint locally before every tag.

See also [HOW-TO.md — Pre-release gate](.cursor/docs/HOW-TO.md#pre-release-gate-mandatory-before-any-git-tag).

## Version sync (release or doc sweep)

**Single source of truth:** root `package.json` → `"version"` field (currently **2.3.0**).

On every semver bump or alignment sweep, update **current-version** strings in the same session — never leave operator docs on an older release:

| Surface | Pattern |
|---------|---------|
| `README.md` | Title `# Boilerplate-v2.x.x` · version table · "What's new in v2.x.x" |
| `TRUTH.md` | `Version target:` line |
| `DOCS.md`, `ARCHITECTURE.md`, `TROUBLESHOOTING.md`, `CONTRIBUTING.md` | Header / intro version |
| `START-HERE.md` | Checklist section (`v2.x = checklist`) |
| `.cursor/docs/HOW-TO.md`, `Code-Jedi.md`, `system-architecture.md` | Title + section headers |
| `.cursor/rules/README.md`, `.devcontainer/devcontainer.json` | Boilerplate-v2.x.x |
| `.cursor/docs/project-log.md` | `Current Version:` + ship commit SHA |
| `.github/RELEASE-v2.x.x.md` | New release note file per tag |

**Preserve as history (do not rewrite):** prior `CHANGELOG.md` sections, `.github/RELEASE-v2.x.x.md` archives, README "What's new in v2.x" for older releases.

After sync: run the [pre-tag gate](#pre-tag-gate-mandatory) · `npm run grade` (52/52) · update [CHANGELOG.md](CHANGELOG.md) · tag `vX.Y.Z` on the alignment commit.
