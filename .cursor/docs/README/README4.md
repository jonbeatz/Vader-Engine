\# Boilerplate-vv2.1.0 — Jedi-Master Edition



\[!\[Grade](https://img.shields.io/badge/grade-52%2F52-brightgreen)](https://github.com/jonbeatz/Boilerplate-v1)

\[!\[CI](https://github.com/jonbeatz/Boilerplate-v1/actions/workflows/ci.yml/badge.svg)](https://github.com/jonbeatz/Boilerplate-v1/actions/workflows/ci.yml)

\[!\[Node](https://img.shields.io/badge/node-20%7C24-339933)](https://nodejs.org/)

\[!\[Cursor](https://img.shields.io/badge/Cursor-optimized-blueviolet)](https://cursor.sh/)

\[!\[License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)



\*\*v2.1.0 Gold Master\*\* — Production-ready, self-validating, Cursor-native development foundation.



\---



\## Overview



\*\*Boilerplate-v2\*\* is a highly disciplined, self-governing starter kit designed for rapid, high-quality full-stack development with Cursor. It combines deep AI integration, automated validation, strong security guardrails, and isolated sandboxes — allowing you to go from `git clone` to a working project in minutes.



\### Core Philosophy

\- \*\*Lean Boundary Rule\*\* — Root only orchestrates scripts. Frameworks and data live strictly in isolated sandboxes.

\- \*\*Self-Validating Infrastructure\*\* — 52-point automated integrity grader (`npm run grade`) with hard non-zero exits.

\- \*\*Vader Protocol Shield\*\* — Strict `msc-` namespace + Studio Dark design system for total isolation.

\- \*\*Cursor-First Design\*\* — Rich modular rules, skills, MCP configuration, and agent-friendly workflows.



\---



\## Stack Support



| Type                  | Technology                              | Location                          | Port  |

|-----------------------|-----------------------------------------|-----------------------------------|-------|

| \*\*Minimal Frontend\*\*  | Next.js 15.5.7 + TypeScript + Vitest    | `examples/nextjs-minimal/`        | 3000  |

| \*\*Full-Stack CMS\*\*    | Next.js 15.4.11 + Payload CMS v3 + SQLite | `examples/nextjs-payload/`     | 3001  |

| \*\*WordPress Shield\*\*  | PHP + Divi isolation                    | `core/msc-bootstrap.php`          | —     |



\---



\## What's New in v2.1.0 Gold Master



\### Major Upgrades

\- Self-grader expanded from 38 to \*\*52 checks\*\* with strict enforcement

\- Biome as unified linter + formatter (replaced Prettier)

\- Interactive onboarding wizard (`npm run msc:onboard`)

\- Advanced Shield System (`msc-shield-audit`, component generator, asset ingest parser)

\- Enhanced Payload sandbox with production secret guard and mock media pipeline

\- Node 20 \& 24 support with runtime guard

\- Comprehensive documentation suite (`ARCHITECTURE.md`, `TROUBLESHOOTING.md`, etc.)

\- Improved CI/CD with full sandbox testing

\- Docker Compose opt-in support for Postgres/Redis



\### Key Foundation Improvements

\- Portable MCP configuration using `${workspaceFolder}`

\- Defensive `msc:forge` with protected namespace guards

\- Real-time health dashboard (`npm run msc:health`)

\- Husky + lint-staged + pre-push grade enforcement

\- Zero secret leakage validation



\---



\## Quick Start (Recommended)



```bash

git clone https://github.com/jonbeatz/Boilerplate-v1.git my-project

cd my-project



\# Interactive guided setup (recommended)

npm run msc:onboard



Manual bootstrap:

npm run bootstrap

npm run msc:dev:example        # Minimal frontend on :3000

\# npm run msc:dev:payload      # Full-stack CMS on :3001





Command Reference

Command,Purpose

npm run msc:onboard,Interactive first-time setup

npm run bootstrap,Full workspace bootstrap

npm run msc:dev:example,Start minimal frontend (port 3000)

npm run msc:dev:payload,Start full-stack CMS (port 3001)

npm run grade,Run 52-point integrity check

npm run msc:lint,Biome lint + format

npm run msc:health,System diagnostics dashboard

npm run msc:shield:audit,Verify msc- namespace compliance

npm run msc:new:component,Generate Vader-compliant component

npm run msc:forge,Safe string replacement tool



Documentation

Audience,Primary Document

First-time users,START-HERE.md

AI Agents / Cursor,Code-Jedi.md

Contributors,CONTRIBUTING.md

Architecture,ARCHITECTURE.md

Troubleshooting,TROUBLESHOOTING.md



Security \& Compliance



Zero real secrets are ever committed

Automatic credential scanning on commit/push

Protected namespaces (msc-, msc:, msc\_)

ABSPATH guards on all PHP files

Lean Boundary Rule strictly enforced





Version Information



Current Version: v2.1.0 Gold Master

Grade: 52/52 (100%)

Release Date: May 23, 2026



Full changelog available in CHANGELOG.md.



Made with discipline. Built for velocity.

Happy coding!



















