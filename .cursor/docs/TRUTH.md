# The Project Truth (Vader Engine v2.6.1)

> **Note:** This is the agent ritual constitution. For technical precedence and project governance, see root [`TRUTH.md`](../../TRUTH.md).

This document is the **agent-layer constitution** for Vader Engine. It consolidates session rituals, integrity gates, and operational law for Cursor agents.

**Precedence when documents conflict:**

1. **[`TRUTH.md`](../../TRUTH.md)** (repository root) — technical constitution
2. **This file** (`.cursor/docs/TRUTH.md`) — agent workflow + ritual bindings
3. **[`.cursor/rules/global.mdc`](../rules/global.mdc)** — always-on session rules
4. **[`Project-Bible.md`](./Project-Bible.md)** — command lexicon
5. **`package.json` scripts** — executable truth (never invent commands)

**Agent tooling:** Model Context Protocol servers are documented in **[`MCPs.md`](./MCPs.md)**. Live secrets never belong in committed `.cursor/mcp.json` — use `.env.local` / Cursor MCP UI. See **[`mcp-setup.md`](./mcp-setup.md)** for extended catalog.

**Shipped release:** Root **`package.json` → `version`** is **2.6.1**. Release tags: `v2.1.0` … `v2.6.1`. Product deltas: **[`UPDATE_LOG.md`](./UPDATE_LOG.md)**, **[`project-log.md`](./project-log.md)**. Branch history: **[`Checkpoint.md`](./Checkpoint.md)**.

---

## 1. Architectural integrity

- **Zero hardcoding:** Paths, URLs, database prefixes, and domains use env/config — never machine-specific drive letters in committed code.
- **Environment agnostic:** Logic under `scripts/`, `ui/`, `examples/`, and `templates/` is drop-in; consumers merge aliases from `config/npm-scripts-appendix.json`.
- **Modular prefixes:** Custom code uses `msc-`, `msc:`, or `msc_` consistently.
- **Scripts only in `/scripts`:** All automation entry points import `scripts/lib/msc-load-env.mjs` first (`.env.local` → `.env.example`, `override: false` on second pass).

## 2. The Vader Protocol (Studio Dark)

- **Background:** `#121212` · **Surface:** `#1c1c1c` · **Accent:** `#e02b20` · **Border:** `#2d2d2d` (see root TRUTH §4)
- **Token SSoT:** `ui/msc-shield.css` only — no stray hex in components
- **UI rules:** [studio-dark-ui.mdc](../rules/studio-dark-ui.mdc), [design-system-rules.mdc](../rules/design-system-rules.mdc)
- **Skill:** [studio-dark-shield.md](../skills/studio-dark-shield.md) — Path A (Shield) vs Path B (Tailwind/shadcn)

## 3. Integrity gate (61/61)

- **`npm run grade`** — 61 checks, hard non-zero exit; pre-push runs grade + root Vitest
- **`npm run start-project:gate`** — node check, env validate, lint, grade, root tests, LiteLLM status
- **`npm run start-project:smoke`** — lighter cold-start (node + example smoke)
- Agents **run** gates; do not assume success from start alone

## 4. Zero-leak security

| File | Committed | Purpose |
|------|-----------|---------|
| `.env.example` | Yes | Key names + safe placeholders |
| `.env.local` | **Never** | Live values (gitignored) |

- Discuss only **variable names** in chat — never paste API keys, PATs, or passwords
- MCP committed JSON may keep `YOUR_*` placeholders intentionally
- GCP service account: `config/gcp-service-account.json` (gitignored)

## 5. Fix local first

Reproduce on the operator machine before cloud deploy. On failure: `dev:recover` → port kill → smoke → escalate per **[`REPAIR_PROTOCOLS.md`](./REPAIR_PROTOCOLS.md)**.

**Port contract:**

| Service | Port(s) | Env / CLI |
|---------|---------|-----------|
| Minimal Next sandbox | **3000** | `MSC_DEV_PORT` |
| Payload sandbox | **3001** | Payload dev |
| Tailwind/shadcn sandbox | **3002** | Path B example |
| WordPress / services | **8080** | Reserved |
| LiteLLM AI proxy | **4000** (default) | `MSC_LITELLM_PORT`, `msc:kill -- 4000` |
| Ngrok inspector | **4040** | ngrok default |

## 6. Google API bridge (LiteLLM → Vertex)

Canonical runbook: **[`local-ai-proxy-setup.md`](./local-ai-proxy-setup.md)**.

**Start Project (agents):** Per **[`Start-Project.md`](../prompts/Start-Project.md)** and **[`start-project-ritual.mdc`](../rules/start-project-ritual.mdc)**:

1. Mandatory doc reads (Read tool)
2. **`npm run start-project:gate`** or smoke per prompt
3. **Do not** auto-start `msc:dev:example` / heavy UI unless operator asks
4. When using **`vader-3-flash`** in Cursor: **`start google-api`** → `npm run msc:litellm:start:ngrok`; verify with **`verify google-api`**

**Model alias:** `vader-3-flash` must match `config/litellm_config.yaml`. Cursor base URL: ngrok `https://…/v1` or `http://127.0.0.1:4000/v1`. API key: `MSC_LITELLM_MASTER_KEY` from `.env.local`.

**End Project:** `npm run msc:litellm:stop` + `msc:kill -- 4000` when proxy was started.

## 7. Session bindings

- **Open:** [task-planner.md](../prompts/task-planner.md) Phase 1–3 → operator confirmation before code
- **Cold start:** `@Start-Project.md` — mandatory reads listed there
- **Close:** `@End-Project.md` — bridge teardown, gate, handoff block

## 8. Doc map (operator + agent)

| Doc | Role |
|-----|------|
| `README.md`, `PROJECT_CONTEXT.md`, `START-HERE.md`, `DOCS.md` | Human control panel (keep as-is) |
| `.cursor/docs/TRUTH.md` | This file — agent constitution |
| `.cursor/docs/Project-Bible.md` | Commands + architecture |
| `.cursor/docs/REPAIR_PROTOCOLS.md` | Recovery runbooks |
| `.cursor/docs/MCPs.md` | MCP status + examples |
| `.cursor/docs/Vader-Engine-Cheat-Sheet.md` | Quick reference |

**Signature:** Powered by the MSC Media Engine · Vader Engine v2.6.1
