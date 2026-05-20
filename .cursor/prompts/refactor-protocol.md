# Refactor Execution Protocol

Use this blueprint before restructuring modules, renaming prefixes, or migrating frameworks. **Additive** to `task-planner.md` — complete the task planner matrix **first**, then apply this protocol for refactor-class work.



---

## 0. Scope gate

**Refactor** = same behavior, improved structure — not a new feature.

- If behavior changes → treat as feature work in task planner Phase 2.
- If emergency repair → switch to `incident-response.md`.

---

## 1. Pre-flight (no code until confirmed)

1. **Operator confirmation** — task planner matrix approved.
2. **Anti-conflict scan** — no duplicate utilities; one capability per file in `core/`, `scripts/`, `ui/`.
3. **Restore point** — note branch + commit in `.cursor/docs/project-log.md` or project Restore-Points doc before large diffs.
4. **Plan artifact** — scoped file list in `.cursor/plans/` when the refactor spans multiple sessions.
5. **Naming contract** — PHP `msc_`, CSS/UI `msc-`, env-only origins (`MSC_PUBLIC_ORIGIN`, `DATABASE_URI`).

---

## 2. Isolation rules

| Rule | Requirement |
|------|-------------|
| Smallest subtree | Touch only files required for the refactor goal |
| No fighting code | Do not leave parallel implementations |
| Zero hardcoding | Paths, domains, credentials via env or constants |
| UI scope | Studio Dark tokens via `msc-shield.css` / `.cursor/rules/studio-dark-ui.md` |
| Bootstrap | Do not auto-load new TS modules from `msc-bootstrap.php` unless explicitly requested |

---

## 3. Execution phases

### Phase A — Read authority

- `.cursorrules` + relevant skill node (1–7)
- `package.json` scripts that will be used
- Consumer `payload.config` if CMS collections change

### Phase B — Structural changes

- Match existing patterns in target files
- Prefer extending `msc_buildMediaCollection`, `msc_createPayloadConfig`, etc., over forks
- AST/bulk transforms: **backup beside source** (never in `media/` or vault paths)

### Phase C — Integration wiring

- Register hooks via factories (`msc-payload-media-hooks.ts`, `msc-media-engine.ts`) in consumer config
- PHP stacks: keep mail on `msc_send_mail()` — do not duplicate SMTP

### Phase D — Verification gate (mandatory)

```bash
node scripts/msc-kill-dev-port.mjs 3000
# npm run build / verify:next — project script until exit 0
node scripts/msc-local-http-smoke.mjs 3000
```

- Restart dev if port free after verify
- Report status codes — do not mark complete on failed build or smoke

### Phase E — Documentation sync

Update in the **same session**:

- `package.json` script tables in docs (if commands changed)
- `.cursor/docs/project-log.md` changelog row
- Skill/doc pointers only where behavior changed — avoid duplicating Node 2 gate prose

---

## 4. Safe transform checklist

- [ ] Backup created for automated transforms
- [ ] Diff reviewed for unintended path or secret leakage
- [ ] `msc_` / `msc-` prefixes consistent
- [ ] No machine paths (`D:\`, `/home/user/...`) in diff
- [ ] Payload admin import map regen if admin components moved (consumer step)

---

## 5. Milestone checkpoint template

```text
| RP-YYYY-MM-DD-short-name | YYYY-MM-DD | What worked. Branch/commit: <ref>. Restore: <git commands>. Caveats: <deps/env>. |
```

---

## 6. Abort conditions

Stop and ask the operator if:

- Build gate fails twice after standard recovery
- Schema repair would delete data
- Refactor requires renaming production collection slugs without migration plan
- Live deploy requested mid-refactor — finish local verify first

---

## 7. Session close

Run **`.cursor/prompts/session-handoff.md`** with refactor summary in the Handoff Block (files touched, verify exit codes, next agent first step).

