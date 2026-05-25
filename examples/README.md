# Examples — Living Sandboxes

> **MSC Boilerplate** · **Sandbox** (not scaffold output) · Runs inside this repo under `examples/`

Isolated Next.js workspaces for development and CI. They are **not** copied by `msc:template apply` — use **`templates/`** blueprints to scaffold new projects to a sibling directory (default `../Dev-Projectz/<slug>`).

| Sandbox | Port | Stack | README |
| --- | --- | --- | --- |
| [nextjs-minimal](nextjs-minimal/) | **3000** | Next.js 15.5.7 + TypeScript + Vitest | [README](nextjs-minimal/README.md) |
| [nextjs-payload](nextjs-payload/) | **3001** | Next.js 15.4.11 + Payload CMS v3 + SQLite | [README](nextjs-payload/README.md) |
| [nextjs-tailwind](nextjs-tailwind/) | **3002** | Next.js 15.5.7 + Tailwind 3 + shadcn (Path B) | [README](nextjs-tailwind/README.md) |

## Setup (from repo root)

```bash
npm run bootstrap
npm run msc:dev:example    # minimal → http://127.0.0.1:3000
npm run msc:dev:payload    # full-stack CMS → http://127.0.0.1:3001
npm run msc:dev:tailwind   # Tailwind/shadcn → http://127.0.0.1:3002
```

Payload sandbox: copy `examples/nextjs-payload/.env.example` → `.env.local` and set `PAYLOAD_SECRET` before first CMS dev session.

## vs `templates/`

| | `examples/*` | `templates/*` |
| --- | --- | --- |
| Purpose | Reference implementations in-repo | Read-only blueprints for `msc:template apply` |
| Output | Stays in `examples/` | Cloned to `--target` with `{{TOKEN}}` substitution |
| Lint | Fully checked by Biome | Excluded via `biome.json` → `!templates` |

List blueprints: `npm run msc:template -- list`
