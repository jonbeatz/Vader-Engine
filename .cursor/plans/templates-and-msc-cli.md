# Next Session Plan — Templates + `msc-cli` Tooling

**Status:** ✅ Shipped — v2.2.0 · tag `v2.2.0` · commit `22ed024` · 52/52 · CI green  
**Baseline:** Boilerplate-v2.2.0 · `main` · 52/52 · CI green  
**Operator intent:** Add user-facing template blueprints + internal CLI for scaffolding/seeding

---

## Target Objective

Introduce a **read-only template library** under `templates/` and an **ESM-native internal CLI** under `tools/msc-cli/` that copies, transforms, and seeds those blueprints into consumer sandboxes or new project paths — without polluting the Lean Boundary root.

---

## Proposed Directory Layout

```text
Boilerplate-v2/
├── templates/                      # User-facing blueprints (READ-ONLY in repo)
│   ├── frontend/
│   │   └── portfolio/              # Vader Protocol compliant (Path A Shield)
│   ├── cms/
│   │   └── divi-bridge/            # ABSPATH guardrails + core-Divi-Scriptz.js wiring
│   └── full-stack/
│       └── task-manager/           # CRM schema foundation (Payload collections baseline)
└── tools/
    └── msc-cli/                    # Internal automation (ESM-native, scoped package)
        ├── scripts/
        │   ├── template-engine.ts  # Cross-platform copy/transform pipeline
        │   ├── demo-seeder.ts      # Injection + database seeding hooks
        │   └── utils.ts            # Port detection, path safety, string processing
        └── cli.ts                  # Command router (subcommands)
```

---

## Architectural Constraints (from TRUTH / Lean Boundary)

| Rule | Application |
|------|-------------|
| **Lean Boundary** | Templates stay static; runtime mutation only in target consumer path or `examples/*` — never rewrite `templates/` in place |
| **Command authority** | Expose operator entry via root `package.json` alias (e.g. `msc:template`, `msc:seed`) that delegates to `tools/msc-cli` |
| **Env ingestion** | CLI scripts import/env-hydrate per `scripts/lib/msc-load-env.mjs` pattern or equivalent in `tools/msc-cli` |
| **Namespace** | All generated assets remain `msc-` / `MSC_` compliant; forge shield blocks protected paths |
| **Read-only templates** | Document + enforce: templates are source blueprints; `template-engine` writes to `--target` only |
| **Grader** | New checks likely needed: `templates/` tree exists, `tools/msc-cli/package.json`, CLI smoke test |

---

## Template Inventory (v1 scope)

### 1. `templates/frontend/portfolio/`

- Studio Dark Shield wrapper (`.msc-viewport-shield`)
- Sample page/section components using satellite CSS pattern
- Vitest smoke stub aligned with `examples/nextjs-minimal` conventions
- **Path:** Path A (Shield-only)

### 2. `templates/cms/divi-bridge/`

- PHP snippet with ABSPATH guard (mirror `core/msc-bootstrap.php` pattern)
- Divi consumer bridge reference: `core/core-Divi-Scriptz.js` (exact casing)
- Enqueue / shield load instructions (not a full WordPress install)
- **Path:** WordPress Shield layer

### 3. `templates/full-stack/task-manager/`

- Payload collection stubs (Users extension, Tasks/Projects baseline)
- SQLite-safe schema notes (`DATABASE_URI`, `PAYLOAD_DB_PUSH`)
- Next.js app route skeleton for admin + minimal dashboard page
- **Path:** Payload sandbox parity with `examples/nextjs-payload`

---

## `tools/msc-cli` — Command Surface (draft)

| Subcommand | Purpose |
|------------|---------|
| `list` | Enumerate available templates under `templates/` |
| `apply <template> --target <path>` | Copy + token replace into target (dry-run flag) |
| `seed <template> --target <path>` | Run `demo-seeder` (SQLite/Payload mock data where applicable) |
| `doctor` | Port check, lockfile, env placeholder sanity |

**Implementation notes:**

- ESM-only (`"type": "module"`), TypeScript compiled or run via `tsx` — match repo Node 20/24 guard
- Reuse port logic from `scripts/msc-kill-dev-port.mjs` / health patterns where possible (avoid duplicate "fighting code")
- `template-engine.ts`: cross-platform paths (`node:path`), forge-compatible replace rules, `--dry-run`
- `demo-seeder.ts`: optional; gate behind env / explicit flag (no forced DB mutations)

---

## Phase 1 Matrix (pre-fill for task-planner.md)

**Target Objective:** Template library + `msc-cli` scaffolding tool  
**Pillar references:** `TRUTH.md`, `Code-Jedi.md`, `consumer-bootstrap.md`, `studio-dark-shield.md`, `env-ingestion-compliance.mdc`  
**Anti-conflict check:** Compare with `msc:new:component`, `msc:forge`, `msc:ingest`, `examples/*` — CLI should orchestrate, not duplicate

**Proposed file touches (Create):**

- `templates/frontend/portfolio/**`
- `templates/cms/divi-bridge/**`
- `templates/full-stack/task-manager/**`
- `tools/msc-cli/package.json`, `cli.ts`, `scripts/*.ts`
- Root `package.json` script aliases
- Grader checks in `scripts/msc-grade-boilerplate.mjs` (if templates are grade-gated)
- Docs: `ARCHITECTURE.md`, `HOW-TO.md`, `Code-Jedi.md`, `DOCS.md`

**Dependency impact:** No changes to protected `core/msc-bootstrap.php` guard-only zones without explicit approval

**Verification plan:**

1. `npm run grade` — still 52/52 (or expanded count documented)
2. `msc-cli list` / `apply --dry-run` smoke
3. Apply portfolio template into temp dir or `examples/nextjs-minimal` branch path
4. `npm run msc:e2e` unchanged (no regression)
5. Update `project-log.md`

---

## Open Questions for Operator (confirm at Start Project)

1. Should `tools/msc-cli` be a **workspace package** (nested `package.json`) or invoked via root `tsx tools/msc-cli/cli.ts`?
2. Should template apply default to **`examples/nextjs-minimal`** / **`examples/nextjs-payload`** or always require explicit `--target`?
3. Include **Tailwind/shadcn portfolio variant** (Path B) in v1 or Shield-only first?
4. Expand grader from 52 → N checks for template tree, or keep templates optional until v2.2?

---

## Start Project Ritual (tomorrow)

1. Say **Start Project** → open `.cursor/prompts/task-planner.md`
2. Load this plan: `.cursor/plans/templates-and-msc-cli.md`
3. Complete Phase 1–3 matrix; get explicit approval before any file writes
4. Implement in order: `tools/msc-cli` skeleton → one template (portfolio) → grader/docs → remaining templates

---

*Queued by operator session closeout — 2026-05-24*
