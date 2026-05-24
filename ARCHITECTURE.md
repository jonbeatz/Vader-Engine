# Architecture

High-level layout of the MSC Gold Master boilerplate.

```mermaid
flowchart TB
  Root[Repository Root]
  Cursor[".cursor/ rules · skills · MCP"]
  Scripts["scripts/ automation"]
  UI["ui/ Studio Dark Shield"]
  Minimal["examples/nextjs-minimal<br/>Next.js 15.5.7 · :3000"]
  Payload["examples/nextjs-payload<br/>Next.js 15.4.11 · :3001"]
  Core["core/ PHP bridge + JS barrel"]

  Root --> Cursor
  Root --> Scripts
  Root --> UI
  Root --> Minimal
  Root --> Payload
  Root --> Core
  Scripts --> Minimal
  Scripts --> Payload
  UI --> Minimal
  Core --> UI
```

## Lean Boundary

Root `package.json` orchestrates scripts only. Framework dependencies live in `examples/*` sandboxes.

## WordPress Shield

PHP entry: `core/msc-bootstrap.php`. Divi consumer bridge: `core/core-Divi-Scriptz.js` (exact casing).

## Command Authority

All npm scripts are defined in root `package.json`. See [CONTRIBUTING.md](CONTRIBUTING.md) for conventions.
