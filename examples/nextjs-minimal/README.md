# nextjs-minimal — Frontend Sandbox

> **MSC Boilerplate** · **Sandbox** · Port **3000** · Next.js 15.5.7 + TypeScript + Vitest

Minimal App Router baseline for Shield UI and frontend smoke tests. Parent index: [examples/README.md](../README.md).

## Setup

```bash
# From repo root
npm run msc:dev:example

# Or inside this folder
cp .env.example .env.local      # optional — or use root .env.local for MSC_DEV_PORT
npm ci
npm run dev
```

Default URL: `http://127.0.0.1:3000` (override with `MSC_DEV_PORT` in root `.env.local`).

## Verify

```bash
npm run test
```
