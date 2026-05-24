# Contributing

Thank you for improving the MSC boilerplate (**v2.1.0 Gold Master**).

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

## CSS Naming

All custom classes use the `msc-` prefix. Studio Dark tokens belong in `ui/msc-shield.css` only. Run `npm run msc:shield:audit` after UI changes.

## Pre-Commit Gates

Husky runs (in order):

1. **lint-staged** — Biome check/write on `*.{js,mjs,ts,tsx,jsx}`; format on `*.{json,css}`
2. **`npm run msc:validate-env`** — secret leak scan
3. **`npm run verify:mcp`** — MCP structure validation

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
```

## Pull Requests

- Target branch: **`main`** (single production branch)
- Keep grade at **52/52** before push
- Do not commit `.env.local`, sandbox `.env.local`, or live MCP tokens
- Update [CHANGELOG.md](CHANGELOG.md) for user-visible changes
- CI must pass: validate-env → verify:mcp → lint → grade → tests → sandbox builds

## Documentation Sync

When changing scripts, hooks, or sandboxes, update in the same session:

- `package.json` (authority)
- [Code-Jedi.md](.cursor/docs/Code-Jedi.md)
- [HOW-TO.md](.cursor/docs/HOW-TO.md)
- [README.md](README.md) command reference (if operator-facing)
- [DOCS.md](DOCS.md) index (if new doc files)

Constitutional changes require [TRUTH.md](TRUTH.md) update first.
