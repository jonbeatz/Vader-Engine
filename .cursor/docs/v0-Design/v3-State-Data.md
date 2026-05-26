# Vader Protocol — State & Data Strategy

**Module:** `v3-State-Data.md`  
**Product:** Vader Protocol · API: `/api/health` · `/api/grade` · `/api/run-script`

**Blueprint modules:** [v1 Overview](v1-Overview.md) · [v2 Layout & Components](v2-Layout-Components.md) · [v3 State & Data](v3-State-Data.md) · [v4 Operations](v4-Operations.md) · [v5 Implementation](v5-Implementation.md) · [v6 Master Prompt](v6-Master-Prompt.md)

**Role:** TanStack Query, Zustand, persistence, SSE logs, error/loading UX.  
**Scripts:** [v4-Operations.md](v4-Operations.md) §8 · **Boundary:** [v5-Implementation.md](v5-Implementation.md) §4

---

## 3. State & Data Strategy

### 3.1 Architecture principle

```
┌──────────────────┐     API Routes (App Router)      ┌─────────────────┐
│  React UI        │ ──► child_process spawn ───────►│  msc:* scripts  │
│  (Vader Protocol)│ ◄── SSE stdout / JSON ─────────│  (repo root)    │
└──────────────────┘     POST /api/run-script         └─────────────────┘
```

- **Do not reimplement** grader, health, or template logic in the dashboard.
- Spawn with `cwd` = repo root · env from hydrated `process.env` (`.env.local` via loader pattern).

### 3.2 TanStack Query (server state)

| Query key | Source | Poll interval | Purpose |
| --- | --- | --- | --- |
| `health` | `npm run msc:health -- --json` | 5s | Ports 3000–3002, **3010**, 8080 |
| `grade` | parse `npm run grade` | on-demand + post-mutation | 61/61 score |
| `grade-detail` | extended parse | on-demand (P1 full 61 rows) | Per-check list |
| `templates` | `msc:template -- list` | 5m | Template gallery |
| `validate-env` | `msc:validate-env` | on-demand | Env status (read-only P0) |
| `node-info` | health JSON / node -v | 60s | Header metadata |

**Mutations** (invalidate `health` / `grade` on success):

- `startSandbox` → `msc:dev:*`
- `killPorts` → `msc:kill-dev-port` (after `AlertDialog`)
- `runScript` → `npm run …` via POST `/api/run-script`
- `scaffold` → `msc:template apply` (+ optional seed)

### 3.3 Zustand (UI state)

| Store slice | State |
| --- | --- |
| `shell` | sidebar collapsed · active route · **`theme: 'dark' \| 'oled'`** |
| `logs` | drawer open · stream buffer · auto-scroll |
| `sandbox` | selected sandbox id · per-sandbox log buffer |
| `scriptRunner` | selected script · running job id (abort P1) |
| `commandPalette` | open · query · recent commands[] |

> **Theme:** Persist `theme` in `localStorage`. Default `'dark'`. Applying `'oled'` sets `data-theme="oled"` on `document.documentElement` and swaps canvas/surface CSS variables per [v1-Overview.md](v1-Overview.md) §1.2. No light mode in P0.

### 3.4 Persistence (local only)

| Data | Storage | Purpose |
| --- | --- | --- |
| Recent scaffolds / projects | `localStorage` JSON | **Projects** page |
| UI preferences | `localStorage` | sidebar · theme |
| Command history | `localStorage` | Palette recent commands |
| Grade history | file P1 | Trend chart |

**Never persist secrets** — `.env.local` stays filesystem-only.

### 3.5 Real-time logs

- **P0:** Server-Sent Events (SSE) from API route streaming `child_process` stdout/stderr.
- **Command input:** **POST** `/api/run-script` — spawn script, optional stdin for interactive tools (P1: `rs` restart hints).
- P0 line-prefix coloring: `[PASS]` · `[OK]` · `[FAIL]`; full ANSI P1.

### 3.6 Error & loading UX (P0 required)

| Scenario | UI pattern |
| --- | --- |
| Health polling | Metric + sandbox **`Skeleton`** shimmer |
| Grade running | `RunGraderButton` loading + hero skeleton |
| Port conflict | Inline error + **`AlertDialog`** ([v2-Layout-Components.md](v2-Layout-Components.md) §1.3) |
| Script exit ≠ 0 | `Alert` destructive in terminal + toast |
| Grader timeout | Retry CTA + log drawer auto-open |
| Template list fetch | Card grid skeletons |

---

*Module 3 of 6 · Scope & nav → [v4-Operations.md](v4-Operations.md)*
