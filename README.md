# Vader Engine v2.6.0

> **In one line:** Production-hardened, Cursor-native development ecosystem with complete v0 UI/UX integration, live dashboard, and 61-point integrity grader.

[![Version](https://img.shields.io/badge/version-2.6.0-red)](https://github.com/jonbeatz/Vader-Engine/releases)
[![Grade](https://img.shields.io/badge/grade-61%2F61-brightgreen)](https://github.com/jonbeatz/Vader-Engine)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**v2.6.0 — Vader Protocol Locked.** Production-hardened, self-validating, Cursor-native foundation with complete v0 UI/UX integration, 7 new API endpoints, TanStack Query data layer, and 12+ routes passing E2E tests.

| **Field** | **Value** |
|-----------|-----------|
| **Version** | v2.6.0 |
| **Release date** | May 27, 2026 |
| **Ecosystem grade** | 61/61 (100%) — verified baseline |
| **Repository** | github.com/jonbeatz/Vader-Engine |
| **Node** | 20.x–24.x (.nvmrc pins 20.19.1 · CI uses 20) |
| **Package manager** | npm ≥ 10 |

## What's new in v2.6.0

### 🎨 Complete v0 UI/UX Integration
- Full dashboard rewrite with live data from 7 new API endpoints
- Vader Construct dashboard at `http://localhost:3010`
- Collapsible sidebar with Operations hub (8 sub-pages)
- Protocol Readiness cards for all routes

### 📡 New API Endpoints
- `GET /api/health` - Service and port health
- `GET /api/grade` - 61-point integrity grader
- `GET /api/logs` - Real-time activity logs (SSE-ready)
- `GET /api/projects` - Dynamic project discovery (examples/, core/)
- `GET /api/templates` - Template catalog from templates/ folder
- `GET /api/env` - Runtime environment info
- `GET /api/scripts` - Available npm scripts with allowlist

### ⚡ Performance & Data Layer
- TanStack Query for race-condition-free data fetching
- Skeleton loading states on all async components
- Error handling with retry buttons
- Cache invalidation for sandbox mutations

### 🧪 Testing & Quality
- E2E test suite (12+ routes passing)
- Dependency health checker (`npm run msc:check-deps`)
- Session telemetry logging (`npm run msc:log-session`)
- Biome linting with Tailwind directive support

### 🔧 Developer Experience
- Sandbox mutations (START/STOP/RESTART) with toast feedback
- Operations hub: Ports, Env, Scripts, Processes, Jobs, Metrics, Logs, Database
- Settings page with preference toggles
- Protocol documentation page

## Overview

Vader Engine is a highly disciplined, self-governing starter kit for rapid, production-grade development with Cursor. It provides:

- **61-point integrity grader** - Automated self-validation
- **Triple-sandbox architecture** - Minimal, Payload CMS, Tailwind/shadcn
- **Vader Protocol UI** - Studio Dark aesthetic, shadcn/ui components
- **MCP-ready** - 13 MCP servers pre-configured
- **Zero-leak security** - `.env.local` gitignored, placeholders only

## Quick Start

```bash
git clone https://github.com/jonbeatz/Vader-Engine.git
cd Vader-Engine
npm run bootstrap
npm run msc:dev:dashboard
# Open http://localhost:3010
```

## Documentation

- [START-HERE.md](START-HERE.md) - Agent/operator cold-start
- [DOCS.md](DOCS.md) - Complete documentation index
- [TRUTH.md](TRUTH.md) - Vader Protocol constitution
- [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) - Agent onboarding map

## Release Notes

Full notes: [docs/releases/RELEASE_v2.6.0.md](docs/releases/RELEASE_v2.6.0.md) · [CHANGELOG.md](CHANGELOG.md)

## License

MIT © Vader Engine
