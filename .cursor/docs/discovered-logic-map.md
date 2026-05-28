# Discovered Logic Map (Multi-Agent Synthesis)

Deep scan of pillar repositories vs Vader Engine. Items marked **ported** exist in this repo; **stub** require consumer wiring; **doc-only** are rituals documented but not executable here.

| Category | Capability | Source repo / file | Vader Engine status |
|----------|------------|-------------------|-------------------|
| **Data** | Dual `DATABASE_URI` + `DATABASE_URL` resolver | MSC-Projectz `lib/msc_payload_sqlite_push.ts` | **ported** → `core/msc-sqlite-path.ts`, `scripts/lib/msc-sqlite-path.mjs` |
| **Data** | Smart SQLite Drizzle push gating | MSC-Projectz `msc_payload_sqlite_push.ts` | **ported** → `core/msc-payload-sqlite-push.ts` |
| **Data** | Backup-first additive schema repair | MSC-Projectz `scripts/msc_sqlite_repair_vault_schema.mjs` | **ported** → `scripts/msc-sqlite-repair.mjs` + manifest |
| **Data** | WAL/SHM purge before deploy | MSC_Clean `pushit-live.ps1`, Node-Launcher `persistent-store.js` | **ported** → `scripts/msc-sqlite-wal-purge.mjs` |
| **Data** | Auth user delete preflight (prefs + locked docs) | MSC_Clean `lib/payload-auth-delete-preflight.ts` | **ported** → `core/msc-payload-auth-delete-preflight.ts` |
| **Data** | Admin rescue / lockout reset | MSC-Projectz `scripts/msc_rescue_admin.ts` | **stub** → `scripts/msc-rescue-admin.mjs` |
| **Data** | `writable_schema` orphan-index repair | MSC_Clean `fix-sqlite-bookings-table.py` | **doc-only** — consumer script from template in manifest doc |
| **Data** | Locked-docs FK rebuild | MSC_Clean `migrate-sqlite-locked-docs-hero-slides-fk.py` | **doc-only** |
| **Data** | Admin DB backup server action | MSC-Projectz `lib/msc_server_actions.ts` | **not ported** (consumer-only) |
| **Data** | Postgres adapter factory | — (not in siblings) | **not found** |
| **Data** | Query caching layer | — | **not found** |
| **UI** | Glass tiers + reduced-transparency | MSC_Clean `globals.css`, MSC-Projectz frost panels | **ported** → `ui/msc-shield-glass.css` |
| **UI** | Dark form inputs + focus discipline | MSC-Projectz `globals.css` | **ported** → `ui/msc-shield-forms.css` |
| **UI** | Motion + reduced-motion | MSC_Clean, Node-Launcher `globals.css` | **ported** → `ui/msc-shield-motion.css` |
| **UI** | Extended tokens + accent packs | MSC_Clean divi-theme-vars, Media-Pro hex map | **ported** → `ui/msc-shield-tokens-extended.css` |
| **UI** | A11y focus/scrollbar/selection | MSC_Clean, MSC-Projectz | **ported** → `ui/msc-shield-a11y.css` |
| **UI** | Buttons, badges, bento | MSC_Clean `globals.css` | **ported** → `ui/msc-components.css` (legacy alias: `msc-shield-components.css`) |
| **UI** | Layout/container/anchor | MSC_Clean `globals.css` | **ported** → `ui/msc-layout.css` (legacy alias: `msc-shield-layout.css`) |
| **UI** | Route-specific canvas gradients | MSC-Projectz clients/calendar | **skipped** (app-specific) |
| **DevOps** | `dev:recover` / kill + clean | MSC-Projectz, MSC_Clean | **ported** → `scripts/msc-dev-recover.mjs` |
| **DevOps** | `verify:next:safe` | MSC-Projectz, MSC_Clean | **ported** → `scripts/msc-verify-next-safe.mjs` |
| **DevOps** | `clean:next` deep wipe | MSC_Clean `clean-next-cache.mjs` | **ported** → `scripts/msc-clean-next-cache.mjs` |
| **DevOps** | Guard clean while dev | MSC_Clean `.cursor/hooks/guard-clean-while-dev.mjs` | **ported** → `.cursor/hooks/msc-guard-clean-while-dev.mjs` |
| **DevOps** | `start-project:smoke` | Node-Launcher `package.json` | **ported** → `scripts/msc-start-project-smoke.mjs` |
| **DevOps** | TRUTH constitution | Node-Launcher `TRUTH.md` (repo root) | **ported** (generic) → `TRUTH.md` (repo root) |
| **DevOps** | AST suspense repair | Node-Launcher `vader-fix-suspense.mjs` | **stub** → `scripts/repair/msc-fix-suspense.mjs` |
| **DevOps** | LiteLLM + ngrok (`start google-api`) | `scripts/msc-litellm-*.mjs`, `scripts/vpe-start-api.ps1`, `google-api/ngrok.exe` (local) | **active** — see `local-ai-proxy-setup.md` |
| **DevOps** | MCP catalog (CDP, global servers) | Node-Launcher `MCPs.md` | **partial** — `mcp-setup.md` + blueprint |
| **DevOps** | FTP deploy / FlightPro scripts | MSC-Projectz, MSC_Clean | **doc-only** — `spaceship-node-deployment.md` |
| **Media** | Multi-strategy hooks + sync | MSC-Projectz, MSC_Clean | **already ported** (prior session) |
| **MCP** | Project + blueprint servers | Node-Launcher | **already ported** |

## Deduplication notes

- Do not re-import branding, domain-specific MCP hosts, or hardcoded admin passwords from siblings.
- `msc-payload-bridge.ts` now delegates DB URL and push policy to shared modules (no duplicate resolver logic).
- UI extensions load only when `MSC_SHIELD_EXTENSIONS=1` to preserve shield core integrity.

## Agent roles (synthesis)

| Agent | Focus | Primary additions this pass |
|-------|--------|----------------------------|
| Alpha | Data & security | sqlite-path, push gating, repair, WAL purge, delete preflight |
| Beta | UI / tokens | shield extension CSS pack |
| Gamma | DevOps / MCP | recover, verify-next-safe, hooks, smoke, TRUTH, options matrix |
