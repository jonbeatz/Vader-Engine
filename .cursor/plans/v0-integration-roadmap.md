# v0 Core Integration Roadmap

**Branch:** `feat/v0-core-integration-v1` · **Port:** `3010` · **Baseline:** 61/61

## Goal

Transform v0 design mockups into fully functional dashboard components with live data.

## Phase 1 — Data layer (mostly complete)

- [x] Replace `useEffect` polling in `dashboard-home.tsx` with TanStack Query (`msc_useHealth`, `msc_useGrade`)
- [x] Connect metric cards to `/api/health` and `/api/grade`
- [x] Wire sandbox cards via `msc_useSandboxMutation` + `POST /api/run-script` (allowlisted scripts / kill port)
- [x] Activity feed from `GET /api/logs` (JSON snapshot; mock fallback when buffer empty)
- [ ] Connect support tickets to a real data source (still `MOCK_TICKETS`)

## Phase 2 — Component hardening (in progress)

- [x] Skeleton + Alert loading/error on dashboard home
- [x] Live pages: `/templates`, `/operations/ports`, `/operations/env`
- [x] Static curated `/protocols`; client prefs `/settings` (toast only, not persisted)
- [x] Operations hub + sidebar sub-nav for ops routes
- [ ] Error boundaries at route level
- [x] `MscLogEntry` and API response types in `lib/msc-api.ts`

## Phase 3 — Polish (open)

- [x] Sandbox mutations invalidate health query + Sonner toasts
- [ ] SSE activity feed (optional upgrade from 5s poll on `/api/logs`)
- [ ] Settings persistence (`localStorage` per v3-State-Data.md)
- [ ] Wire `/projects` page to `GET /api/projects`
- [ ] Wire `/operations/scripts` page to `GET /api/scripts`

## API endpoints

| Method | Route | Status |
|--------|-------|--------|
| GET | `/api/health` | Live — port diagnostics |
| GET | `/api/grade` | Live — 61-point grader parse |
| POST | `/api/run-script` | Live — allowlisted scripts + kill port |
| GET | `/api/logs` | Live — JSON snapshot (+ SSE when `Accept: text/event-stream`) |
| GET | `/api/templates` | Live — repo `templates/` scanner |
| GET | `/api/env` | Live — non-secret runtime info |
| GET | `/api/projects` | Live — `examples/*` + `ui/dashboard` |
| GET | `/api/scripts` | Live — root `package.json` + allowlist flags |

## Route inventory (2026-05-28)

| Route | Data |
|-------|------|
| `/` | Hybrid live (metrics, sandboxes, logs; tickets mock) |
| `/templates` | Live API |
| `/operations/ports` | Live API |
| `/operations/env` | Live API |
| `/operations` | Static hub |
| `/protocols`, `/settings` | Static / client-only |
| `/projects`, `/sandboxes`, `/operations/scripts` | Placeholder (APIs exist for projects/scripts) |
| `/integrity` | Manual `GET /api/grade` on button |

## Priority order (remaining)

1. Wire `/projects` + `/operations/scripts` UIs to new APIs
2. Support tickets backend or remove mock panel
3. SSE / polling polish for activity feed
