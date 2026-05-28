<p align="center">
  <img src="media/readme/vaderlabz-hero-reference.jpg" alt="Vader Engine Dashboard" width="850">
</p>

<h1 align="center">Vader Engine</h1>

<p align="center">
  <strong>The production-hardened development factory for Cursor agents.</strong><br>
  <strong>Build production-ready applications with a visual command center,<br>
  61-point integrity verification, and triple-sandbox development environments.</strong>
</p>

<p align="center">
  <a href="https://github.com/jonbeatz/Vader-Engine/actions">
    <img src="https://github.com/jonbeatz/Vader-Engine/actions/workflows/ci.yml/badge.svg" alt="CI">
  </a>
  <a href="https://github.com/jonbeatz/Vader-Engine/releases">
    <img src="https://img.shields.io/badge/version-2.6.0-red" alt="Version">
  </a>
  <a href="https://vaderlabz.com">
    <img src="https://img.shields.io/badge/demo-vaderlabz.com-blue" alt="Live Demo">
  </a>
  <a href="https://github.com/jonbeatz/Vader-Engine">
    <img src="https://img.shields.io/badge/grade-61%2F61-brightgreen" alt="Grade">
  </a>
  <a href="https://github.com/jonbeatz/Vader-Engine">
    <img src="https://img.shields.io/github/stars/jonbeatz/Vader-Engine?style=social" alt="GitHub stars">
  </a>
  <a href="https://github.com/jonbeatz/Vader-Engine/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License">
  </a>
  <a href="https://cursor.sh">
    <img src="https://img.shields.io/badge/Cursor-optimized-purple" alt="Cursor">
  </a>
</p>

---

## 📊 Current Status

| Metric | Value |
|--------|-------|
| **Version** | v2.6.0 |
| **Integrity Grade** | 61/61 (100%) |
| **Dashboard** | ✅ Complete + Live |
| **API Layer** | ✅ 7 Endpoints |
| **Sandboxes** | ✅ 3 Isolated Environments (3000-3002) |
| **E2E Tests** | ✅ 12+ Routes Passing |
| **Status** | 🟢 Production Ready |

---

## 🚀 Why Vader Engine?

Most boilerplates give you files. **Vader Engine gives you a complete development operating system.**

| Capability | Vader Engine | Typical Boilerplate |
|------------|--------------|---------------------|
| Visual Command Dashboard | ✅ | ❌ |
| 61-Point Integrity Grader | ✅ | ❌ |
| Real-time Operations Hub | ✅ | ❌ |
| Triple Sandbox Architecture | ✅ | ❌ |
| Built-in Template Engine | ✅ | ❌ |
| MCP-Ready (13 servers) | ✅ | ❌ |
| Zero-Leak Security Protocol | ✅ | ❌ |

---

## 🖼️ Screenshots

### Vader Construct Dashboard
<p align="center">
  <img src="media/readme/Vader-Engine-Dashboard.jpg" alt="Dashboard" width="800">
  <br>
  <em>Real-time metrics, sandbox controls, and activity feed</em>
</p>

### System Metrics
<p align="center">
  <img src="media/readme/Vader-Engine-Metrics.jpg" alt="Metrics" width="800">
  <br>
  <em>CPU, memory, disk I/O, and request latency monitoring</em>
</p>

### Process Manager
<p align="center">
  <img src="media/readme/Vader-Engine-Processes.jpg" alt="Processes" width="800">
  <br>
  <em>Active process monitoring with PID, CPU, and memory usage</em>
</p>

---

## 🚀 Quick Start

```bash
git clone https://github.com/jonbeatz/Vader-Engine.git
cd Vader-Engine
npm run bootstrap
npm run msc:dev:dashboard
```

**Open `http://localhost:3010`** — you'll see the live Vader Construct dashboard.

> **Requirements:** Node 20.x–24.x (`.nvmrc` pins 20.19.1) · npm ≥ 10

---

## ✨ What's New in v2.6.0

| Feature | Description |
|---------|-------------|
| 🎨 **Complete v0 UI/UX** | Full dashboard rewrite with live data |
| 📡 **7 New API Endpoints** | Health, grade, logs, projects, templates, env, scripts |
| ⚡ **TanStack Query** | Race-condition-free data fetching + skeletons |
| 🧪 **E2E Test Suite** | 12+ routes passing with Playwright |
| 🔧 **Operations Hub** | Ports, Logs, Processes, Metrics, Env, Scripts |

**Full release notes:** [RELEASE_v2.6.0.md](docs/releases/RELEASE_v2.6.0.md)

---

## 🏗️ Architecture

```
Vader Engine
├── Dashboard (port 3010)    # Vader Construct UI
├── Integrity Center         # 61-point grader
├── Sandbox Manager          # 3 isolated environments (3000-3002)
├── Template Engine          # Blueprint scaffolding
├── Operations Hub           # Ports, logs, processes, metrics
└── CLI Engine               # msc:* script system
```

---

## 📂 Project Structure

```
Vader-Engine/
├── ui/dashboard/          # Vader Construct dashboard
├── examples/              # Triple sandboxes
│   ├── nextjs-minimal/    # Port 3000
│   ├── nextjs-payload/    # Port 3001
│   └── nextjs-tailwind/   # Port 3002
├── templates/             # Reusable blueprints
├── scripts/               # Automation & tooling
├── core/                  # Shared bridge code
├── e2e/                   # Playwright test suite
└── docs/                  # Documentation (TRUTH.md, PROJECT_CONTEXT.md, etc.)
```

---

## 📡 API Endpoints

| Endpoint | Purpose |
|----------|---------|
| `GET /api/health` | Service and port health |
| `GET /api/grade` | 61-point integrity grader |
| `GET /api/logs` | Real-time activity logs |
| `GET /api/projects` | Dynamic project discovery |
| `GET /api/templates` | Template catalog |
| `GET /api/env` | Runtime environment info |
| `GET /api/scripts` | Available npm scripts |

---

## 🔧 Development Commands

```bash
npm run grade               # Run 61-point integrity check
npm run msc:dev:dashboard   # Start dashboard on :3010
npm run msc:e2e             # Run E2E tests
npm run msc:check-deps      # Check for outdated dependencies
npm run msc:log-session     # Capture session telemetry
npm run msc:template        # Scaffold from templates
```

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [START-HERE.md](START-HERE.md) | Agent/operator cold-start guide |
| [TRUTH.md](TRUTH.md) | The Vader Protocol constitution |
| [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) | Architecture & onboarding map |
| [DOCS.md](DOCS.md) | Complete documentation index |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System architecture deep dive |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Common issues & solutions |

> **Security Note:** This repository uses a `.env.local` gitignore policy. Never commit secrets. Use the Ops Hub for environment management.

---

## 🗺️ Roadmap

### v2.7 (Next)
- Enhanced Metrics Dashboard
- Activity Timeline View
- Project Manager improvements

### v3.0 (Future)
- Boilerplate Studio visual editor
- AI Project Builder
- Tauri Desktop App

---

## 🤝 Contributing

We welcome contributions that respect the Vader Protocol.

1. Fork the repository
2. Create a feature branch (`feat/your-feature`)
3. Ensure `npm run grade` passes (61/61)
4. Commit your changes
5. Push and open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines.

---

## 📄 License

MIT © [Vader Engine](https://github.com/jonbeatz/Vader-Engine)

---

<p align="center">
  <sub>Built with ☕ and <a href="https://cursor.sh">Cursor</a> • Powered by the MSC Media Engine</sub>
</p>