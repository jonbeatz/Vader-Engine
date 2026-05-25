# Troubleshooting

Operational recovery paths for the **MSC v2.3.0** workspace.

## Bootstrap Failures

- Run `npm run msc:onboard` (recommended) or `npm run bootstrap` from repo root with Node **20.x or 24.x**.
- Ensure `.env.local` exists (copied from `.env.example` on first quickstart).
- Run `npm run msc:validate-env` — fix any live secret patterns in committed files.
- Run `npm run msc:ensure-lockfiles` if sandbox installs fail due to missing lockfiles.

## Port Conflicts

Free a single dev port:

```powershell
npm run msc:kill -- 3000
npm run msc:health -- --json
```

Clear all default dev ports (3000, 3001, 8080):

```powershell
npm run msc:kill-dev-port
```

Recover hung dev server:

```powershell
npm run dev:recover
```

## Payload Sandbox

- Copy template: `examples/nextjs-payload/.env.example` → `examples/nextjs-payload/.env.local`
- Set `PAYLOAD_SECRET` locally (never commit).
- Install and build:

```powershell
npm ci --prefix examples/nextjs-payload
npm run build --prefix examples/nextjs-payload
```

- Dev server: `npm run msc:dev:payload` (port **3001**)
- Mock media seed: `npm run msc:mock:media`

## Credential Scan / Zero-Leak

- `npm run msc:validate-env` scans committed surfaces for live secret patterns.
- MCP token map: `.cursor/docs/mcp-env-token-map.md`
- Live values belong only in `.env.local` — never in chat, commits, or `.cursor/mcp.json`.

## MCP Failures

- Structure check: `npm run verify:mcp`
- Optional registry probe: `npm run verify:mcp:probe`
- Hydrate keys in `.env.local` per `.env.example` contract.
- Filesystem server must use `"${workspaceFolder}"` in `.cursor/mcp.json` — not absolute paths.

## Lint / Format (Biome)

```powershell
npm run msc:lint
npm run msc:lint:fix
npm run msc:format
```

Note: Markdown is not processed by Biome — pre-commit lint-staged covers JS/TS/JSON/CSS only.

## Grade / CI Drift

- Local grade: `npm run grade` (must show **52/52**).
- Grader unit tests: `npm run msc:test:grader`
- Root tests: `npm run msc:test:root`
- Full sweep: `npm run msc:test:all`
- E2E parity with CI: `npm run msc:e2e:install` then `npm run msc:e2e`
- On failure, read stderr `FAILED CHECK:` lines and fix the named artifact.

## Playwright E2E

First-time browser setup:

```powershell
npm run msc:e2e:install
npm run msc:e2e
```

- Spins up dev servers on ports **3000** (minimal) and **3001** (payload).
- Payload uses a dedicated SQLite file (`database/payload-e2e.db`) — separate from local dev DB.
- CI ensures `examples/nextjs-payload/database/` exists before E2E (committed via `database/.gitkeep`).

If `/admin` returns 500 in CI or locally:

- Confirm `examples/nextjs-payload/database/` exists and is writable.
- Set `PAYLOAD_SECRET` in env or `.env.local` for the payload sandbox.
- Run `npm run msc:kill-dev-port` before retrying (port conflict).

## CI failures (GitHub Actions)

| Symptom | Fix |
|---------|-----|
| `npm ci` fails in `examples/nextjs-minimal` | Ensure `examples/nextjs-minimal/package-lock.json` is committed (required for CI). |
| Payload E2E 500 on `/admin` | Ensure `database/` directory exists; E2E uses `payload-e2e.db`. |
| Playwright browser missing | Run `npm run msc:e2e:install` locally; CI runs `npx playwright install --with-deps chromium firefox`. |

## Template Scaffolding CLI

- List blueprints: `npm run msc:template -- list`
- Health check: `npm run msc:template -- doctor`
- Apply requires `--name`; `--target` is optional (defaults to `../Dev-Projectz/<slugified-name>`):

```powershell
npm run msc:template -- apply frontend/portfolio --name="My App" --dry-run
npm run msc:template -- apply frontend/portfolio --name="My App"
```

- **`{{TOKEN}}` literals in output:** ensure file extension is covered by `template-engine.mjs` (includes `.tsx`/`.jsx`).
- **Seed writes nowhere:** pass `--template=<blueprint>`; optional `--target=../path`; fallback is `.sandbox/` at repo root.
- **Biome fails on template CSS:** expected — `templates/**` is excluded from Biome; do not remove the ignore without changing token syntax.
- **Never apply into repo root or `examples/*`** unless explicitly testing — use `../Dev-Projectz/` (default) or another sibling path via `--target`.

## Shield / UI Namespace

- Audit compliance: `npm run msc:shield:audit`
- Generate component: `npm run msc:new:component`
- Ingest HTML assets: `npm run msc:ingest`
- Token SSoT: `ui/msc-shield.css` only — see [studio-dark-shield.md](.cursor/skills/studio-dark-shield.md)

## Next.js Cache / Build

- Dev stopped first: `npm run clean:next`
- Safe rebuild with port cleanup: `npm run verify:next:safe`

## SQLite

- Repair: `npm run repair:sqlite`
- WAL purge before deploy copy: `npm run db:wal-purge`

See also [ARCHITECTURE.md](ARCHITECTURE.md), [REPAIR_PROTOCOLS.md](.cursor/docs/REPAIR_PROTOCOLS.md), and [TRUTH.md](TRUTH.md).
