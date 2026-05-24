# Troubleshooting

Operational recovery paths for the **MSC v2.1.0 Gold Master** workspace.

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
- On failure, read stderr `FAILED CHECK:` lines and fix the named artifact.

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
