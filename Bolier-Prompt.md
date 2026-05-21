# Boilerplate v2 — Jedi-Master Agent Prompt

Use this prompt when driving the post-launch roadmap in Cursor Agent or Composer. Canonical specifications and code blocks live in [BOILERPLATE-V2-JEDI-ROADMAP.md](./BOILERPLATE-V2-JEDI-ROADMAP.md).

---

## Operating constraints

- You are implementing the **Boilerplate v2 Jedi-Master post-launch roadmap**.
- Work **exactly one step at a time**.
- **Halt and ask for confirmation** after each step completes.
- If any step fails, stop and report before continuing.
- After all steps, run `npm run grade` — must return **100%** (30/30 or higher).

---

## Step 1 — Optimize bootstrap redundancy

**Root `package.json`**

Set `bootstrap` to:

```json
"bootstrap": "npm run msc:kill-dev-port && node scripts/quickstart.mjs"
```

**`quickstart.mjs`**

Ensure it already calls `validate-env.mjs` internally — do not double-invoke validation from `bootstrap`.

---

## Step 2 — Deploy Node version lock

Create `.nvmrc` at the repository root with:

```
20
```

---

## Step 3 — Bump Next.js in minimal example

In `examples/nextjs-minimal/package.json`, set:

```json
"next": "^15.5.7"
```

Then run:

```bash
cd examples/nextjs-minimal && npm update
```

---

## Step 4 — Create GitHub Actions CI workflow

Create `.github/workflows/ci.yml` using the **exact YAML** from **Section 4.3** of the roadmap:

- Checkout
- Node 20 with npm cache
- `npm ci`
- `npm run msc:validate-env`
- `npm run grade`
- Nested Next.js minimal workspace: `npm ci` and `npm run test`

---

## Step 5 — Expand self-grade script

In `scripts/msc-grade-boilerplate.mjs`, add hard checks for:

| File | Requirement |
| --- | --- |
| `.nvmrc` | Must exist |
| `.github/workflows/ci.yml` | Must exist |

Missing files must cause a **non-zero exit code**.

---

## Step 6 — Create `msc:health` dashboard

1. Create `scripts/health.mjs` using the **exact code** from **Section 3.3** of the roadmap:
   - Socket probing on ports `3000`, `3001`, `8080`
   - Checks `.env.local` and `.nvmrc`
   - Supports `--json` flag
2. Add to root `package.json`:

```json
"msc:health": "node scripts/health.mjs"
```

---

## Step 7 — Create multi-workspace dependency updater

1. Create `scripts/msc-update.mjs` using the **exact code** from **Section 3.4** of the roadmap:
   - Scans `.`, `examples/nextjs-minimal`, `examples/nextjs-payload`
   - Runs `npx npm-check-updates -u` per target
2. Add to root `package.json`:

```json
"msc:update": "node scripts/msc-update.mjs"
```

---

## Step 8 — Create defensive re-brander with dry-run

1. Create `scripts/msc-forge.mjs` using the **exact code** from **Section 3.1** of the roadmap:
   - `protectedNamespaceRegex` blocklist for `.msc-`, `msc:`, `msc_`
   - Supports `--dry-run`
   - Safe file mutation only when not blocked
2. Add to root `package.json`:

```json
"msc:forge": "node scripts/msc-forge.mjs"
```

---

## Completion gate

```bash
npm run grade
```

Expected: **100%** pass. If the score is below 100%, halt and report which checks failed.

---

## Start instruction

**Start with Step 1.**
