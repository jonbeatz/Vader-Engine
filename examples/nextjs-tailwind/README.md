# nextjs-tailwind — Path B Sandbox

> **MSC Boilerplate** · **Sandbox** · Port **3002** · Next.js 15.5.7 + Tailwind 3 + shadcn-style components

Hybrid **Path B** reference: Tailwind utilities and shadcn primitives bridged to Vader Protocol tokens in `ui/msc-shield.css`. Parent index: [examples/README.md](../README.md).

## Lean Boundary

- All npm deps stay in this folder — **never** in root `package.json`
- No `*.module.css`, no inline `style={{}}` in TSX
- `components.json` holds registry paths only (no API keys)

## Setup

```bash
# From repo root
npm run msc:dev:tailwind

# Or inside this folder
cp .env.example .env.local
npm ci
npm run dev
```

Default URL: `http://127.0.0.1:3002`

## Verify

```bash
npm run build
```

Bridge rules: [.cursor/rules/tailwind-shadcn-bridge.mdc](../../.cursor/rules/tailwind-shadcn-bridge.mdc)
