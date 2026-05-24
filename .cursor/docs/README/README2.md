# Boilerplate (v2.1.0 Gold Master)

[![Grade](https://img.shields.io/badge/grade-52%2F52-brightgreen)](https://github.com/jonbeatz/Boilerplate-v1)
[![CI](https://github.com/jonbeatz/Boilerplate-v1/actions/workflows/ci.yml/badge.svg)](https://github.com/jonbeatz/Boilerplate-v1/actions/workflows/ci.yml)
[![Node](https://img.shields.io/badge/node-20%7C24-339933)](https://nodejs.org/)
[![Cursor](https://img.shields.io/badge/Cursor-optimized-blueviolet)](https://cursor.sh/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**v2.1.0 Gold Master** — Production-ready, self-validating, Cursor-native boilerplate orchestration ecosystem.

---

## 🪐 Overview

**Boilerplate-v1** is a highly opinionated, defensive, and self-governing starting point for modern full-stack development. It combines deep Cursor integration, automated validation, security guardrails, and isolated sandboxes so you can clone, bootstrap, and start building in under 5 minutes.

### Core Philosophy
*   **Lean Boundary Rule** — Root contains only orchestration scripts. Frameworks live strictly in isolated sandboxes.
*   **Self-Grading Infrastructure** — 52-point automated integrity checker (`npm run grade`) enforcing a 100% green standard.
*   **Vader Protocol Shield** — Strict `msc-` namespace and CSS isolation layer to prevent framework and theme collisions.
*   **Cursor-First Design** — Rich modular rules, skills, MCP configuration, and agent-friendly workflows.

---

## 💻 Stack Support

| Type | Technology | Location | Port |
| :--- | :--- | :--- | :--- |
| **Minimal Frontend** | Next.js 15.5.7 + TypeScript + Vitest | `examples/nextjs-minimal/` | `3000` |
| **Full-Stack CMS** | Next.js 15.4.11 + Payload CMS v3 + SQLite | `examples/nextjs-payload/` | `3001` |
| **WordPress Shield** | PHP + Divi Isolation Layer | `core/msc-bootstrap.php` | — |

---

## ⚡ What's New in v2.1.0 Gold Master

### Major Upgrades
*   **Self-Grader expanded to 52 checks** with strict non-zero exit code gates on failure.
*   **Biome Integration** introduced as a unified linter and formatter, cleanly replacing Prettier.
*   **Interactive Onboarding** via an automated terminal wizard (`npm run msc:onboard`).
*   **Advanced Shield System** featuring `msc-shield-audit`, a component generator, and an asset ingest parser.
*   **Enhanced Payload Sandbox** engineered with production secret guards, improved isolation, and a mock media pipeline.
*   **Node 20 & 24 Support** fully optimized with native environment runtime guards.
*   **Comprehensive Documentation Suite** mapping out standalone ARCHITECTURE, TROUBLESHOOTING, and CONTRIBUTING architectures.
*   **Docker Compose Expansion** featuring opt-in support for Postgres/Redis service mirroring.

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone [https://github.com/jonbeatz/Boilerplate-v1.git](https://github.com/jonbeatz/Boilerplate-v1.git) my-project
cd my-project

# 2. Run the interactive guided setup (Recommended)
npm run msc:onboard

# Alternative: Manual bootstrap if preferred
npm run bootstrap

# 3. Spin up your target sandbox environment
npm run msc:dev:example   # Launches minimal frontend on port 3000
npm run msc:dev:payload   # Launches full-stack CMS on port 3001


🛠️ Command Reference
Command,Purpose
npm run msc:onboard,Interactive guided first-time setup wizard
npm run bootstrap,Installs dependencies and bootstraps full workspace workspace
npm run msc:dev:example,Boots minimal Next.js frontend (Port 3000)
npm run msc:dev:payload,Boots full-stack Payload CMS environment (Port 3001)
npm run grade,Executes the 52-point strict system integrity check
npm run msc:test:all,Runs full test suites across root and sandboxes silently
npm run msc:lint,Executes Biome fast linting and formatting validation
npm run msc:health,Prints the system diagnostics dashboard
npm run msc:shield:audit,Verifies full layout namespace compliance
npm run msc:new:component,"Automatically generates a Vader-compliant, encapsulated UI component"
npm run msc:forge,Safe string replacement tool with custom protected namespace guards

📖 Documentation Map
Target Audience,Primary Document,Secondary Reference
First-Time Users,START-HERE.md,DOCS.md
AI Agents / Cursor,Code-Jedi.md,TRUTH.md
Developers,CONTRIBUTING.md,ARCHITECTURE.md
System Debugging,TROUBLESHOOTING.md,—

🏗️ Architecture & Style Highlights
Lean Boundary Rule: Root acts as a script orchestrator only. No core code spill.
UI Shield: Total msc- prefix isolation.
Studio Dark Color Palette: Standardized token environment utilizing background #121212 and surface #1c1c1c.
Validation Depth: Multi-layered framework screening (environment scanning, workspace MCP token verification, naming compliance audit, grader integration).
[!NOTE] Detailed architecture layout diagrams and dependency flowcharts are actively available inside ARCHITECTURE.md.

🔒 Security & Compliance
Zero active or structural secrets are ever committed to version control.
Automatic credential and pattern matching scanning triggered natively on pre-push gates.
Enforced protected code namespaces (msc-, msc:, msc_).
Strict ABSPATH access execution guards pinned to the top of all PHP core modules.

📦 Release Metadata
Current Version: v2.1.0 Gold Master
Grade: 52/52 (100%)
Release Date: May 2026
Repository Tracking: https://github.com/jonbeatz/Boilerplate-v1
Made with discipline. Built for velocity.

Happy coding!

