# Cursor Rules Index

Always-on and scoped rules for Boilerplate-v1. Precedence: [TRUTH.md](../docs/TRUTH.md) → `.cursorrules` → this folder.

| Rule | Scope | When it applies |
|------|--------|-----------------|
| [env-ingestion-compliance.mdc](./env-ingestion-compliance.mdc) | `**/*` · **alwaysApply** | Every session — `.env.local` vs `.env.example`, no secret paste in chat |
| [studio-dark-ui.md](./studio-dark-ui.md) | Studio Dark / Shield | Path A dashboards, WordPress, Payload admin chrome |
| [design-system-rules.mdc](./design-system-rules.mdc) | `ui/**`, `*.tsx`, `*.css` | Tokens-first edits; new colors only in `msc-shield.css` |
| [tailwind-shadcn-bridge.mdc](./tailwind-shadcn-bridge.mdc) | Tailwind/shadcn paths | Path B Next.js consumers — bridge `--msc-*` to Tailwind |
| [local-runtime-recovery.mdc](./local-runtime-recovery.mdc) | On demand | Port conflicts, `.next` cache, smoke failures |

**Skills (procedural):** [studio-dark-shield.md](../skills/studio-dark-shield.md) — Path A vs Path B decision matrix.

**No contradictions:** Shield token SSoT is always `ui/msc-shield.css`. Tailwind/shadcn does not replace satellites on Path A surfaces.
