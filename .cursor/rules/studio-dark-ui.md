# Rules: Studio Dark / Vader Protocol UI System

Any time a UI component, dashboard panel, or layout widget is generated, follow the **Global Shield** Core-to-Satellite CSS architecture. Do not write styles inside React/TSX components or ad-hoc `.css` files outside `ui/`.

**Companion rules:** [design-system-rules.mdc](./design-system-rules.mdc) (tokens first) · [tailwind-shadcn-bridge.mdc](./tailwind-shadcn-bridge.mdc) (Path B only) · index [rules/README.md](./README.md).

## Design tokens (defined only in `ui/msc-shield.css`)

- `--msc-bg-main`: `#121212`
- `--msc-bg-surface`: `#1c1c1c`
- `--msc-bg-surface-hover`: `#252525`
- `--msc-accent`: `#e02b20`
- `--msc-text-primary`: `#ffffff`
- `--msc-text-secondary`: `#b3b3b3`
- `--msc-border-color`: `#2d2d2d`
- `--msc-radius`, `--msc-transition`, `--msc-gap-sm|md|lg`

## CSS architecture (mandatory)

| Layer | File | Responsibility |
|-------|------|----------------|
| **Shield** | `ui/msc-shield.css` | Tokens + scoped resets on `.msc-viewport-shield` / `.msc-dashboard-container` only |
| **Layout** | `ui/msc-layout.css` | Grid, flex, containers — no feature chrome |
| **Components** | `ui/msc-components.css` | Shared cards, buttons, badges (namespace-scoped) |
| **Features** | `ui/msc-[feature].css` | One file per domain (`msc-portfolio.css`, `msc-dashboard.css`, `msc-auth.css`, …) |
| **Extensions** | `ui/msc-shield-extensions.css` | Optional (`MSC_SHIELD_EXTENSIONS=1`): glass, forms, motion, extra tokens |

**Load order:** Shield → Layout → Components → Features → (optional) Extensions.

**Consumer barrel:** `ui/msc-shield-load.css` or `core/msc-assets.php` (`msc_enqueue_shield_satellite_chain`).

### Agent rule

Before creating a new style, check `ui/msc-shield.css` for an existing variable. If missing, add the variable to the Shield—not the satellite file. New styles must live in a satellite file prefixed with `msc-` and scoped to a **unique wrapper class** (e.g. `.msc-portfolio-wrapper`, `.msc-dashboard-wrapper`).

### Namespace wrapper pattern

- Never style bare tags (`div`, `p`, `button`) at global scope.
- Wrap feature markup in an isolation namespace: `.msc-portfolio-wrapper`, `.msc-dashboard-wrapper`, `.msc-auth-wrapper`.
- Never hardcode colors or spacing in satellites; use `var(--msc-*)`. Use modifier variables on the wrapper for one-off tuning.

## TSX guardrails

- Wrap layouts in `.msc-viewport-shield` or `.msc-dashboard-container`, then the feature wrapper.
- Use `className` + satellite CSS; avoid inline `style` for layout, color, or spacing.
- All classes use the **`msc-`** prefix.

## Optional extensions

Set `MSC_SHIELD_EXTENSIONS=1` for glass, forms, a11y, motion, and extended tokens (`msc-shield-tokens-extended.css`).

## Hybrid consumers (Next.js + shadcn)

Path B only: [tailwind-shadcn-bridge.mdc](./tailwind-shadcn-bridge.mdc) and skill [studio-dark-shield.md](../skills/studio-dark-shield.md). Shield token rules in this file still apply; Tailwind maps `var(--msc-*)` from `msc-shield.css`.
