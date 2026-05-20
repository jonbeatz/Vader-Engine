# Rules: Studio Dark / Vader Protocol UI System

Any time a UI component, dashboard panel, or layout widget is generated, strictly adhere to these decoupled design properties. Do not hardcode these directly into component elements; use CSS variables or an overridable stylesheet configuration.

## Design Tokens
- `--msc-bg-main`: `#121212` (Deep Obsidian dark background)
- `--msc-bg-surface`: `#1c1c1c` (Slightly raised panel background)
- `--msc-bg-surface-hover`: `#252525`
- `--msc-accent`: `#e02b20` (High-contrast crimson accent)
- `--msc-text-primary`: `#ffffff`
- `--msc-text-secondary`: `#b3b3b3`
- `--msc-border-color`: `#2d2d2d`

## Style Implementation Guardrail
- Wrap all markup layouts inside a parent block containing an isolated class namespace: `.msc-viewport-shield` or `.msc-dashboard-container`.
- Ensure all custom button or component accents fade smoothly using a transition property: `all 0.25s ease-in-out`.
- All layout/CSS blocks use the **`msc-`** prefix (never unprefixed utility classes on shared surfaces).

