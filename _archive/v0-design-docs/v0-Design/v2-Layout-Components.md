# Vader Protocol — Layout & Components

**Module:** `v2-Layout-Components.md`  
**Goal:** Define strict IA and component contracts for v0 generation.

## Shell contract (must persist across routes)

- Sidebar: fixed, 220px
- Header: fixed, 48px
- Footer (fixed): `Powered by Vader Engine`
- Command bar (fixed, above footer): `Type / for commands`
- Command palette opens via command bar click and `Cmd/Ctrl + K`

## Canonical navigation

Dashboard → Projects → Templates → Sandboxes → Integrity → Operations → Protocols → Settings

## Dashboard grid (strict)

### Row 1
- Vader Velocity
- Engine Capacity
- Integrity (61/61)

### Row 2
- Sandbox card `:3000`
- Sandbox card `:3001`
- Sandbox card `:3002`

Each sandbox card:
- status indicator
- START
- STOP (AlertDialog)
- OPEN

### Row 3
- Activity feed (2/3 width) with relative timestamps
- Support tickets (1/3 width) with status badges

## Placeholder route pattern

Each non-dashboard page must include a meaningful **Protocol Readiness** card containing:
- title
- status badge
- short operational metric
- actionable CTA

## Required shadcn building blocks

- `Card`, `Button`, `Badge`, `Table`, `Dialog`, `AlertDialog`
- `Command`, `Sheet`, `Accordion`, `Progress`, `Skeleton`, `Tooltip`, `Alert`

## Global UX rules

- Destructive actions always gated by `AlertDialog`
- Async sections always show skeleton states
- Error copy must be actionable, not generic
- All nav/actions must have stable `data-testid`
