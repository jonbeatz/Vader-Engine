# Contributing

Thank you for improving the MSC boilerplate.

## Fork and Rename

Use the defensive re-brander with dry-run first:

```powershell
npm run msc:forge -- README.md "Boilerplate-v1" "MyProject" --dry-run
```

The forge shield blocks mutations on protected `msc-` namespaces and paths under `core/`, `ui/`, and `scripts/msc-*`.

## Script Conventions

- All automation lives under `scripts/`.
- First import: `import './lib/msc-load-env.mjs'` (and node guard where applicable).
- Register new commands in root `package.json` only.

## CSS Naming

All custom classes use the `msc-` prefix. Studio Dark tokens belong in `ui/msc-shield.css` only.

## Pre-Commit Gates

Husky runs:

1. `lint-staged` (Biome)
2. `npm run msc:validate-env`
3. `npm run verify:mcp`

Pre-push runs `npm run grade` and `npm run msc:test:root`.

## Pull Requests

- Keep grade at 100% before push.
- Do not commit `.env.local` or live MCP tokens.
