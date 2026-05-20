# Master Task Planner & Execution Gate

You must completely fill out this planning matrix and present it to the operator for explicit confirmation before writing, modifying, or deleting any code files in this workspace.

## 🧠 Phase 1: Context Isolation & Source of Truth

- **Target Objective:** [What feature, repair, or optimization are we executing?]
- **Pillar File References:** [List the exact files, rules, or schema specs from `.cursor/` docs or skills that govern this task]
- **Anti-Conflict Check:** Scan the workspace. Are there any existing utilities, helper functions, or components that perform similar logic? (Ensure zero "fighting code".)

## 🛠️ Phase 2: Structural Execution Map

- **Proposed File Touches:**
  - `[Create/Modify]` -> `path/to/file` (Brief role description)
- **Dependency Impact:** Will these modifications break or alter any core PHP bootstrap modules or frontend TypeScript configurations?
- **Port/Environment Integrity:** Will this action require local servers? Ports: web **3000** (`MSC_DEV_PORT`), AI proxy **4000**/**8000** (`MSC_LITELLM_PORT`). If hung, run the **Local Script Gate Sequence** (Node 2): `msc-kill-dev-port.mjs` → `msc-local-http-smoke.mjs`.

## 🧪 Phase 3: Verification & Smoke Testing Gates

- **Local Validation Plan:** [Detail the precise steps to test this addition locally]
- **Automation Sequence (canonical order):**
  1. `node scripts/msc-kill-dev-port.mjs [port]` — use **3000** for web dev; **4000** or **8000** for LiteLLM proxy only
  2. `node scripts/msc-local-http-smoke.mjs [port]` — web gate on **3000** after dev server is up (see Node 2 / Node 6 docs)
- **Documentation Sync:** List the specific files in `.cursor/docs/` (e.g., `project-log.md` or `incident-log.md`) that will be updated upon successful verification.

