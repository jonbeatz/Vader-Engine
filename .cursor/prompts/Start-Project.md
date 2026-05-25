---
Routing Protocol: Start Project
---

## 1. Task planner (mandatory before code)

Open `.cursor/prompts/task-planner.md` — complete Phase 1–3 matrix and get **explicit operator confirmation**. Do not write code until authorized.

## 2. Cold start (operator or agent — run from repo root)

```bash
npm run msc:check-node          # Node 20.x–24.x preflight (fails fast with fix hints)
npm run msc:onboard             # .env.local + sandbox choice + bootstrap (interactive)
# — or non-interactive —
npm run bootstrap
```

## 3. Start Project verification

```bash
npm run start-project           # check-node + MCP structure
npm run start-project:gate      # full baseline: validate-env · lint · grade 61/61 · tests 8/8
```

## 4. Optional dev

```bash
npm run msc:dev:example         # port 3000
npm run msc:dev:payload         # port 3001
```

**Docs:** [START-HERE.md](../../START-HERE.md) · [HOW-TO.md](../docs/HOW-TO.md) · [Code-Jedi.md](../docs/Code-Jedi.md)

**Node on Windows/Cursor:** If gates fail, see START-HERE → *Node runtime* or run `npm run msc:check-node`.
