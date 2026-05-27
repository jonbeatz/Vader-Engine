# Vader Protocol — State & Data Strategy

**Module:** `v3-State-Data.md`  
**Goal:** Define post-v0 wiring model and keep UI/logic boundaries clean.

## Architecture boundary

- UI shell generated in v0
- operational logic wired in Cursor
- no duplicate grader/health logic in frontend

## Core API contracts

- `GET /api/health` → service and port health
- `GET /api/grade` → parsed grader summary
- `POST /api/run-script` → run whitelisted repo scripts
- `GET /api/logs` (SSE) → stream process output

## State model

### Server state (TanStack Query)
- health
- grade
- templates
- env validation status

### Client state (Zustand)
- shell UI (nav, theme, palette open/close)
- log drawer
- command history
- selected sandbox

## Persistence rules

- `localStorage`: UI prefs, recent commands, recent projects
- never persist secrets
- keep `.env.local` filesystem-only

## Error and loading behavior

- every async panel has `Skeleton` loading state
- operational failures show actionable `Alert`
- destructive flows route through `AlertDialog`

## Testing hook points

All stateful controls should expose deterministic `data-testid` values to support Playwright flows and regression checks.
