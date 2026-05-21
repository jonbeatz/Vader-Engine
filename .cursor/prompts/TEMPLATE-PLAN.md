# Feature Plan Template

**Agents:** All new feature work must begin by populating this plan and gaining **explicit operator approval** before writing, modifying, or deleting code. Copy this file to `.cursor/plans/<feature-slug>.md` or present the completed sections in chat.

Do not paste secrets, API keys, or passwords. Reference env keys by name only (`.env.example` / `.env.local`).

---

## Phase 1 — Scope & Intent

**What are we building and why?**

- **Objective:**
- **User / operator outcome:**
- **In-scope modules** (paths under `core/`, `scripts/`, `ui/`):
- **Out of scope:**

---

## Phase 2 — Risk & Boundary

**What could break? Where are the security and environment boundaries?**

| Risk | Mitigation |
|------|------------|
| | |

- **Ports affected:** Web `MSC_DEV_PORT` (default **3000**) · Proxy `MSC_LITELLM_PORT` (**4000** / **8000**)
- **Env keys touched** (names only):
- **Database / SQLite impact:** Yes / No — backup-first required?
- **Namespace compliance:** `msc-` / `MSC_` / `MSC-Core-*` file convention preserved?
- **Anti-conflict check:** Existing utilities that overlap?

---

## Phase 3 — Execution Steps

**Step-by-step technical implementation plan.**

1.
2.
3.

### Verification gates (canonical)

- [ ] `npm run start-project` (or `start-project:smoke`)
- [ ] Feature-specific smoke / build steps
- [ ] `npm run msc:kill -- <port>` → `npm run msc:smoke -- <port>` (when dev server required)
- [ ] `npm run check:all` (CI-safe: MCP probe + `--no-strict` smoke)
- [ ] Docs updated: `project-log.md` · relevant `.cursor/docs/` · `Code-Jedi.md` if routing changes

### Approval

- [ ] Operator approved this plan (date / initials):

---

*After approval, open implementation with [task-planner.md](./task-planner.md) Phase alignment or proceed per operator direction.*
