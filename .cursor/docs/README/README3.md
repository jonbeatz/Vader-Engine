# Boilerplate-v2.1.0 — Jedi-Master Edition

[![Grade](https://img.shields.io/badge/grade-52%2F52-brightgreen)](https://github.com/jonbeatz/Boilerplate-v1)
[![CI](https://github.com/jonbeatz/Boilerplate-v1/actions/workflows/ci.yml/badge.svg)](https://github.com/jonbeatz/Boilerplate-v1/actions/workflows/ci.yml)
[![Node](https://img.shields.io/badge/node-20%7C24-339933)](https://nodejs.org/)
[![Cursor](https://img.shields.io/badge/Cursor-optimized-blueviolet)](https://cursor.sh/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**v2.1.0 Gold Master** — Production-ready, self-validating, Cursor-native development foundation.

---

## Overview

**Boilerplate-v2** is a highly disciplined, self-governing starter kit designed for rapid, high-quality development with Cursor. It combines deep AI integration, automated validation, security guardrails, and isolated sandboxes so you can go from `git clone` to a working project in minutes.

### Core Principles
- **Lean Boundary Rule** — Root only orchestrates; frameworks and data live in isolated sandboxes.
- **Self-Validating** — 52-point automated integrity grader (`npm run grade`).
- **Vader Protocol** — Strict `msc-` namespace + Studio Dark design system for total isolation.
- **Cursor-First** — Rich rules, skills, MCP config, and agent-friendly workflows.

---

## Stack Support

| Type                  | Technology                              | Location                          | Port  |
|-----------------------|-----------------------------------------|-----------------------------------|-------|
| **Minimal Frontend**  | Next.js 15.5.7 + TypeScript + Vitest    | `examples/nextjs-minimal/`        | 3000  |
| **Full-Stack CMS**    | Next.js 15.4.11 + Payload CMS v3 + SQLite | `examples/nextjs-payload/`     | 3001  |
| **WordPress Shield**  | PHP + Divi isolation                    | `core/msc-bootstrap.php`          | —     |

---

## What's New in v2.1.0 Gold Master

- Self-grader expanded to **52 checks** with strict enforcement
- Biome as unified linter + formatter
- Interactive onboarding (`npm run msc:onboard`)
- Advanced Shield System (`msc-shield-audit`, component generator, asset ingest)
- Enhanced Payload sandbox with production guards and mock media
- Node 20 & 24 support with runtime guard
- Comprehensive documentation + architecture diagrams
- Improved CI/CD with full sandbox testing
- Docker Compose opt-in support

---

## Quick Start (Recommended)

```bash
git clone https://github.com/jonbeatz/Boilerplate-v1.git my-project
cd my-project

# Interactive setup (recommended)
npm run msc:onboard


Manual option:
npm run bootstrap
npm run msc:dev:example

Command Reference
Command,Purpose
npm run msc:onboard,Interactive first-time setup
npm run bootstrap,Full workspace bootstrap
npm run msc:dev:example,Start minimal frontend (3000)
npm run msc:dev:payload,Start full-stack CMS (3001)
npm run grade,Run 52-point integrity check
npm run msc:lint,Biome lint + format
npm run msc:health,System diagnostics
npm run msc:shield:audit,Verify msc- namespace
npm run msc:new:component,Generate new component

Documentation
Audience,Primary Document
First-time users,START-HERE.md
AI Agents / Cursor,Code-Jedi.md
Contributors,CONTRIBUTING.md
Architecture,ARCHITECTURE.md
Troubleshooting,TROUBLESHOOTING.md

ecurity & Compliance

Zero real secrets committed
Automatic credential scanning
Protected namespaces (msc-, msc:, msc_)
ABSPATH guards on all PHP files
Lean Boundary Rule strictly enforced


Version Information

Current Version: v2.1.0 Gold Master
Grade: 52/52 (100%)
Release Date: May 23, 2026

Full changelog available in CHANGELOG.md.

Made with discipline. Built for velocity.
Happy building!

























