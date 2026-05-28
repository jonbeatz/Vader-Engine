# Repair Protocols (Vader Engine v2.6.1)

Runbooks for **local recovery**, **Next.js cache**, **SQLite**, and **AST Suspense** fixes. **Canonical commands:** [Project-Bible.md](./Project-Bible.md) §5.

---

## 1. Quick recovery (first move)

When localhost refuses connection, white screen, missing chunks, or port conflicts:

1. **`npm run dev:recover`** — project one-shot recover script
2. **`npm run msc:kill-dev-port`** — free **3000, 3001, 3002, 8080**
3. **`node scripts/msc-local-http-smoke.mjs 3000`** (or target port)
4. If still broken → **§2** (cache) or **§3** (dependencies)

**Do not** purge `node_modules` while a dev server is actively using build output.

---

## 2. Next.js cache & build output

| Step | Command |
|------|---------|
| Stop dev | `npm run msc:kill-dev-port` |
| Clear Next cache | `npm run clean:next` |
| Re-smoke | `npm run msc:smoke` or example dev |

**Symptom → fix:**

- **Stale `.next` / vendor chunk missing** → `clean:next` then restart sandbox dev
- **Port EADDRINUSE** → `msc:kill -- <port>` then retry

---

## 3. Environment nuke (dependency tree)

When `node_modules` or lockfiles are corrupted (no Electron vault in this repo):

1. **Stop listeners:** `npm run msc:kill-dev-port` and `npm run msc:kill -- 4000` if LiteLLM ran
2. **Manual nuke (Windows):** Remove `node_modules`, example `.next` folders, reinstall per example README
3. **Prefer scoped reinstall:** `cd examples/nextjs-minimal && npm install` before wiping entire monorepo
4. **Re-gate:** `npm run start-project:gate`

> Nova Launcher’s `vpe:nuke-install` does **not** apply here — see archived reference in `_archive/old-workflow-reference/`.

---

## 4. SQLite repair

- **Before schema repair:** backup DB file (operator machine)
- **Run:** `npm run repair:sqlite`
- **WAL deploy copy:** `scripts/msc-sqlite-wal-purge.mjs` before FTP/upload
- **Rule:** `DATABASE_URI` and `DATABASE_URL` must reference the same SQLite file in dev (root TRUTH §5)

---

## 5. AST repair (Next.js 15 Suspense)

When build errors mention CSR bailout / `useSearchParams` / `useParams`:

1. **Run:** `npm run repair:ast` (`scripts/repair/msc-fix-suspense.mjs`)
2. **Rule:** Wrap the **smallest** subtree in `<Suspense>` — see [vader-repair-ast.mdc](../rules/vader-repair-ast.mdc)
3. **Interactive flows:** show diff before apply; backup `.vader-backup` next to source

**Activation phrases:** repair, patch, fix suspense, CSR bailout

---

## 6. LiteLLM / proxy recovery

| Symptom | Action |
|---------|--------|
| Port 4000 in use | `npm run msc:litellm:stop` then `msc:kill -- 4000` |
| Prisma / DATABASE_URL error | Confirm `msc-litellm-env.mjs` strips Payload URL; optional `MSC_LITELLM_DATABASE_URL` |
| Provider Error in Cursor | `start google-api` → `verify google-api`; model must be **`vader-3-flash`** |
| Missing Python deps | `npm run msc:litellm:install-deps` |

Full matrix: [local-ai-proxy-setup.md](./local-ai-proxy-setup.md) · [TROUBLESHOOTING.md](../../TROUBLESHOOTING.md)

---

## 7. MCP / env failures

- **Structure only:** `npm run verify:mcp`
- **Live tokens:** `.env.local` or Cursor Settings → MCP — never commit `YOUR_*` replacements
- **Hydration:** all `scripts/*.mjs` import `msc-load-env.mjs` first

---

## 8. Severe breakage escalation

1. `dev:recover` + `clean:next` + port kill
2. `npm run grade` — fix until **61/61**
3. `npm run start-project:gate`
4. Log incident in [incident-log.md](./incident-log.md) if novel

**Signature:** Vader Engine v2.6.1
