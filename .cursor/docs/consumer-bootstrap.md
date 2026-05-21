# Consumer Bootstrap — Next.js 15 + Payload

One-page sequence to fork this boilerplate into a runnable application. The template repo stays unbranded; your **consumer app** owns `app/`, `payload.config.ts`, and dependencies.

---

## 1. Fork or copy the engine

```bash
git clone https://github.com/your-org/your-app.git
cd your-app
```

Copy (or submodule) these paths from Boilerplate-v1 into the consumer repo root:

| Source | Destination |
|--------|-------------|
| `core/` | `core/` |
| `scripts/` | `scripts/` |
| `ui/` | `ui/` |
| `config/` | `config/` |
| `.cursor/` | `.cursor/` (merge prompts/skills as needed) |
| `.env.example` | `.env.example` |
| `package.json` scripts block | merge into consumer `package.json` |

---

## 2. Scaffold Next.js 15 (App Router)

In the consumer repo (empty or existing):

```bash
npx create-next-app@latest . --typescript --app --no-src-dir --import-alias "@/*"
```

Install Payload stack (versions aligned to your target):

```bash
npm install payload @payloadcms/db-sqlite @payloadcms/richtext-lexical @payloadcms/next sharp
npm install -D @libsql/client typescript @types/node @types/react
```

Add boilerplate runtime helper:

```bash
npm install dotenv
```

---

## 3. Environment contract

```bash
cp .env.example .env.local
```

Set at minimum in `.env.local`:

| Variable | Example |
|----------|---------|
| `DATABASE_URI` | `file:./data/payload.sqlite` |
| `DATABASE_URL` | same as `DATABASE_URI` |
| `PAYLOAD_SECRET` | long random string |
| `MSC_PUBLIC_ORIGIN` | `http://127.0.0.1:3000` |
| `MSC_DEV_PORT` | `3000` |
| `MSC_MEDIA_STRATEGY` | `local` |

Run `npm install` so `scripts/lib/msc-load-env.mjs` can hydrate all automation scripts.

---

## 4. Wire Payload config

Create `payload.config.ts` at repo root:

```typescript
import {
  msc_createPayloadConfig,
  MscUsersCollection,
  MscMediaCollection,
  MscSubscribersCollection,
} from "./core/msc-payload-bridge"
import { MscPortfolioCollection } from "./core/msc-portfolio-collection"
import { preflightDeleteAuthUserRows } from "./core/msc-payload-auth-delete-preflight"

const usersWithPreflight = {
  ...MscUsersCollection,
  hooks: {
    ...MscUsersCollection.hooks,
    beforeDelete: [
      ...(MscUsersCollection.hooks?.beforeDelete ?? []),
      preflightDeleteAuthUserRows,
    ],
  },
}

export default msc_createPayloadConfig({
  collections: [
    usersWithPreflight,
    MscMediaCollection,
    MscSubscribersCollection,
    MscPortfolioCollection,
  ],
})
```

Add Next integration per Payload docs: `app/(payload)/admin/[[...segments]]/page.tsx`, `app/api/[...slug]/route.ts`, and `withPayload` in `next.config`.

---

## 5. Media hooks (optional strategies)

In the consumer Payload config or a `payload.hooks.ts` bridge file, register hooks from `core/msc-payload-media-hooks.ts` when `MSC_MEDIA_STRATEGY` is set (`local` | `multi-tenant` | `stream-cdn`). See [media-strategy-specs.md](./media-strategy-specs.md).

Create disk folder:

```bash
mkdir -p media data
```

---

## 6. Studio Dark UI

Import the Global Shield chain in root `app/layout.tsx` or global CSS:

```css
@import "../ui/msc-shield-load.css";
/* optional extensions (after load barrel): */
@import "../ui/msc-shield-extensions.css";
```

Or set `MSC_SHIELD_EXTENSIONS=1` when using WordPress `msc-assets.php` (enqueue order is automatic).

Use components: `ui/msc-project-manager.tsx`, `ui/msc-portfolio-viewer.tsx` inside `.msc-dashboard-container` + feature wrappers (`.msc-dashboard-wrapper`, `.msc-portfolio-wrapper`). New features: add `ui/msc-[feature].css` scoped to a unique wrapper class; tokens only in `msc-shield.css`.

---

## 7. package.json scripts (command registry)

Ensure consumer `package.json` includes the merged script block from the boilerplate (or `config/npm-scripts-appendix.json` reference). Minimum:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start-project": "npm run start-project:smoke",
    "start-project:smoke": "node scripts/msc-start-project-smoke.mjs",
    "end-project": "npm run msc:kill -- 3000 && npm run msc:smoke -- 3000",
    "msc:kill": "node scripts/msc-kill-dev-port.mjs",
    "msc:smoke": "node scripts/msc-local-http-smoke.mjs",
    "verify:mcp": "node scripts/msc-verify-mcp.mjs",
    "dev:recover": "node scripts/msc-dev-recover.mjs",
    "verify:next:safe": "node scripts/msc-verify-next-safe.mjs",
    "media:sync": "node scripts/msc-core-sync.mjs"
  }
}
```

---

## 8. Cold start verification

```bash
npm install
npm run start-project
npm run dev
```

In a second terminal (dev listening on **3000**):

```bash
npm run msc:kill -- 3000
npm run msc:smoke -- 3000
```

Template-only repo (no dev): `msc:smoke` exits **0** with baseline template bypass.

Strict mode when dev must be up: `MSC_SMOKE_STRICT=1 npm run msc:smoke -- 3000`

---

## 9. MCP & Cursor

1. Set `.cursor/mcp.json` `filesystem` path to your consumer repo absolute path.
2. Keep secrets in `.env.local` — not in committed `mcp.json`.
3. Run `npm run verify:mcp` — dual-pass confirms structure + hydrated keys.

---

## 10. Agent rituals

| When | Action |
|------|--------|
| Session open | `.cursor/prompts/task-planner.md` |
| Session close | `.cursor/prompts/session-handoff.md` → `npm run end-project` |
| Architecture | [system-architecture.md](./system-architecture.md) · [TRUTH.md](./TRUTH.md) |

---

## Troubleshooting

| Issue | Recovery |
|-------|----------|
| Port 3000 busy | `npm run dev:recover` |
| Stale `.next` | `npm run verify:next:safe` |
| SQLite drift | `npm run repair:sqlite` (install `@libsql/client`) |
| MCP keys | `.env.local` + `npm run verify:mcp` |
