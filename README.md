# Boilerplate-v1 (Universal Framework Baseline)

A pristine, unbranded, highly defensive software baseline and automation framework built to eliminate setup overhead across modern multi-language tech stacks. This boilerplate couples an isolated, scope-shielded design token system with a modular application layer, robust database reconciliation utilities, and an integrated local AI execution context.

The codebase is engineered around strict **Fix-Local-First** principles, providing runtime port protection, automated asset optimization, and defensive structural validation gates before deployment.

**Cold start:** Read [START-HERE.md](START-HERE.md) first. **Agent compass:** [.cursor/docs/Code-Jedi.md](.cursor/docs/Code-Jedi.md).

---

## System Architecture

The architecture is explicitly decoupled into clear, isolated layers so frontend frameworks, headless APIs, and backend servers can interlock without leaking scopes or fighting globals:

```text
Boilerplate-v1/
├── START-HERE.md                 ◄ Universal cold-start runbook
├── package.json                  ◄ Command registry (verify, kill, smoke, media)
├── .env.example                  ◄ Strategy environment configuration contract
├── .cursorrules                  ◄ Session bindings (task-planner / session-handoff)
├── .cursor/
│   ├── mcp.json                  ◄ Project-scoped MCP connectors
│   ├── mcp-blueprint.json        ◄ Optional server catalog (sanitized)
│   ├── hooks.json                ◄ Optional: block clean:next while dev is live
│   ├── prompts/                  ◄ Operational gates (task-planner, session-handoff, …)
│   ├── skills/                   ◄ 8-node competency index (README.md)
│   ├── rules/                    ◄ Env compliance, Studio Dark, design-system, Tailwind bridge
│   └── docs/                     ◄ TRUTH, options matrix, repair, MCP, media, deploy
├── core/                         ◄ PHP bootstrappers & headless TS contracts
├── config/                       ◄ LiteLLM mapping, npm appendix, SQLite repair manifest
├── scripts/                      ◄ Terminal automation, repair gates, MCP verify
└── ui/                           ◄ Scope-isolated CSS shields & layout primitives
```

Technical precedence and env strategies: [`.cursor/docs/TRUTH.md`](.cursor/docs/TRUTH.md) · [`.cursor/docs/ecosystem-options-matrix.md`](.cursor/docs/ecosystem-options-matrix.md)

---

## Layer Responsibilities

| Layer | Role |
|-------|------|
| **`.cursor/`** | Agent rituals, skills, MCP wiring, incident/refactor prompts, optional Cursor hooks |
| **`core/`** | `msc-bootstrap.php`, Payload bridge, SQLite path/push helpers, media hooks, portfolio schema, auth preflight |
| **`config/`** | Proxy config (`litellm_config.yaml`), consumer `npm-scripts-appendix.json`, repair manifest example |
| **`scripts/`** | Port kill, HTTP smoke, MCP verify, dev recover, SQLite repair/WAL purge, media sync, safe Next prep |
| **`ui/`** | Global Shield chain: `msc-shield-load.css` → satellites (`msc-layout`, `msc-components`, `msc-[feature].css`) + optional extensions |

---

## Local Script Gate Sequence

Canonical order before web smoke or after a hung port:

```bash
node scripts/msc-kill-dev-port.mjs 3000
node scripts/msc-local-http-smoke.mjs 3000
```

| Port | Role |
|------|------|
| **3000** | Web dev / HTTP smoke (`MSC_DEV_PORT`) |
| **4000** / **8000** | LiteLLM AI proxy (`MSC_LITELLM_PORT`) — see [local-ai-proxy-setup.md](.cursor/docs/local-ai-proxy-setup.md) |

**Session rituals:** Open with [task-planner.md](.cursor/prompts/task-planner.md) · close with [session-handoff.md](.cursor/prompts/session-handoff.md). Routing index: [skills/README.md](.cursor/skills/README.md).

**MCP & secrets:** Copy `.env.example` → `.env.local`. Configure [`.cursor/mcp.json`](.cursor/mcp.json) (filesystem path to your workspace). See [mcp-setup.md](.cursor/docs/mcp-setup.md). Run `node scripts/msc-verify-mcp.mjs`.

**Consumer npm aliases:** Merge [config/npm-scripts-appendix.json](config/npm-scripts-appendix.json) into your app `package.json` (`dev:recover`, `verify:next:safe`, `repair:sqlite`, `start-project:smoke`, …).

---

## Selectable Strategies (env-driven)

All new capabilities are **opt-in** — no forced defaults. Highlights:

| Strategy | Env | Doc |
|----------|-----|-----|
| Media pipeline | `MSC_MEDIA_STRATEGY=local\|multi-tenant\|stream-cdn` | [media-strategy-specs.md](.cursor/docs/media-strategy-specs.md) |
| SQLite push gating | `PAYLOAD_SQLITE_PUSH`, `PAYLOAD_MIGRATING` | [ecosystem-options-matrix.md](.cursor/docs/ecosystem-options-matrix.md) |
| Schema repair | `MSC_SQLITE_REPAIR_MANIFEST` | [sqlite-repair-manifest.md](.cursor/docs/sqlite-repair-manifest.md) |
| UI extensions | `MSC_SHIELD_EXTENSIONS=1` | [studio-dark-ui.md](.cursor/rules/studio-dark-ui.md) · hybrid §6 [consumer-bootstrap.md](.cursor/docs/consumer-bootstrap.md) |
| UI Path B (Tailwind/shadcn) | Consumer `components.json` + MCP `shadcn`, `context7` | [tailwind-shadcn-bridge.mdc](.cursor/rules/tailwind-shadcn-bridge.mdc) |

Full matrix: [discovered-logic-map.md](.cursor/docs/discovered-logic-map.md) (pillar-repo port audit).

---

## PHP Quick Start

Pull the core engine into any theme, plugin, or backend app:

```php
if (file_exists(__DIR__ . '/core/msc-bootstrap.php')) {
    require_once __DIR__ . '/core/msc-bootstrap.php';
}
```

Visual shield: `msc_enqueue_shield_satellite_chain()` in `core/msc-assets.php` (Shield → Layout → Components → Features → optional Extensions). See [studio-dark-shield.md](.cursor/skills/studio-dark-shield.md).

---

## TypeScript / Payload Consumer

Copy `core/msc-payload-bridge.ts` and related modules into a Next.js + Payload project. Install Payload dependencies in the **consumer** repo — this template ships contracts and scripts, not a full app runtime.

```ts
import { msc_createPayloadConfig } from "./core/msc-payload-bridge"
export default msc_createPayloadConfig({ /* collections */ })
```

---

## WordPress / Divi

Use `msc_` PHP prefixes and `msc-` CSS classes per [wordpress-divi-engineering.md](.cursor/skills/wordpress-divi-engineering.md). Asset enqueue: `core/msc-assets.php` (full satellite chain — Path A).
