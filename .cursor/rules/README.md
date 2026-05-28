# Cursor Rules Index

Always-on and scoped rules for **Vader Engine v2.6.0**. Precedence: [TRUTH.md](../../TRUTH.md) → [global.mdc](./global.mdc) → this folder.

| Rule | Scope | When it applies |
|------|--------|-----------------|
| [global.mdc](./global.mdc) | `**/*` · **alwaysApply** | Session open/close, command authority, Fix-Local-First, zero-leak |
| [start-project-ritual.mdc](./start-project-ritual.mdc) | `**/*` · **alwaysApply** | Cold start: mandatory doc reads, gate, no dev server by default |
| [vader-repair-ast.mdc](./vader-repair-ast.mdc) | examples, `scripts/repair/**` | Suspense AST repair lifecycle |
| [env-ingestion-compliance.mdc](./env-ingestion-compliance.mdc) | Scripts / env | `.env.local` vs `.env.example`, no secret paste in chat |
| [studio-dark-ui.mdc](./studio-dark-ui.mdc) | `ui/**`, `*.tsx`, `*.css` | Studio Dark / Shield — Path A dashboards, WordPress, Payload admin |
| [design-system-rules.mdc](./design-system-rules.mdc) | `ui/**`, `*.tsx`, `*.css` | Tokens-first edits; new colors only in `msc-shield.css` |
| [tailwind-shadcn-bridge.mdc](./tailwind-shadcn-bridge.mdc) | Tailwind/shadcn paths | Path B Next.js consumers — bridge `--msc-*` to Tailwind |
| [local-runtime-recovery.mdc](./local-runtime-recovery.mdc) | On demand | Port conflicts, `.next` cache, smoke failures |
| [error-handling.mdc](./error-handling.mdc) | On demand | Boundary discipline, logging, user feedback patterns |
| [terminal-discipline.mdc](./terminal-discipline.mdc) | On demand | Shell hygiene, background processes, port cleanup |

**Skills (procedural):** [studio-dark-shield.md](../skills/studio-dark-shield.md) — Path A vs Path B decision matrix.

**No contradictions:** Shield token SSoT is always `ui/msc-shield.css`. Tailwind/shadcn does not replace satellites on Path A surfaces.

**Deprecated:** Root `.cursorrules` — do not edit; use `global.mdc`.
