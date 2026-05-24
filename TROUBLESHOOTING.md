# Troubleshooting

Operational recovery paths for the MSC boilerplate workspace.

## Bootstrap Failures

- Run `npm run msc:onboard` or `npm run bootstrap` from repo root with Node **20.x or 24.x**.
- Ensure `.env.local` exists (copied from `.env.example` on first quickstart).
- Run `npm run msc:validate-env` — fix any `YOUR_*` placeholder violations in committed files.

## Port Conflicts

Free the dev port before restart:

```powershell
npm run msc:kill -- 3000
npm run msc:health -- --json
```

For all default dev ports: `npm run msc:kill-dev-port`.

## Payload Sandbox

- Copy template: `examples/nextjs-payload/.env.example` → `.env.local`
- Set `PAYLOAD_SECRET` locally (never commit).
- Install and build: `npm ci --prefix examples/nextjs-payload` then `npm run build --prefix examples/nextjs-payload`

## Credential Scan

- `npm run msc:validate-env` scans `.env.example` and `.cursor/mcp.json` for live secret patterns.
- MCP token map: `.cursor/docs/mcp-env-token-map.md`

## MCP Failures

- Structure check: `npm run verify:mcp`
- Optional registry probe: `npm run verify:mcp:probe`
- Hydrate keys in `.env.local` per `.env.example` contract.

## Grade / CI Drift

- Local grade: `npm run grade` (must show 100%).
- Lint: `npm run msc:lint`
- Root tests: `npm run msc:test:root`
- On failure, read stderr `FAILED CHECK:` lines and fix the named artifact.

See also [ARCHITECTURE.md](ARCHITECTURE.md) and [TRUTH.md](TRUTH.md).
