# v0 Core Integration Roadmap

## Goal
Transform v0 design mockups into fully functional dashboard components with live data.

## Phases

### Phase 1: Data Layer (Current)
- [ ] Replace mock data in dashboard-home.tsx with real API calls
- [ ] Connect metric cards to `/api/health` and `/api/grade`
- [ ] Wire sandbox cards to real process manager
- [ ] Connect support tickets to real data source

### Phase 2: Component Hardening
- [ ] Add loading states to all data-fetching components
- [ ] Add error boundaries and fallback UI
- [ ] Implement proper TypeScript types for all API responses

### Phase 3: Polish
- [ ] Add optimistic UI updates
- [ ] Implement polling for real-time updates
- [ ] Add refetch buttons and cache invalidation

## Priority Order
1. Metric cards (easiest - static data)
2. Sandbox cards (needs process manager API)
3. Activity feed (needs event source)
4. Support tickets (needs backend)

## API Endpoints Available
- `GET /api/health` - System health and port status
- `GET /api/grade` - Integrity score and details
- `GET /api/run-script` - Trigger scripts (post only)
- `/api/logs` - SSE stream for real-time logs (to implement)
