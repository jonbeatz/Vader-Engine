# Install Module (Vader Engine convenience)

**Canonical guide for any project:** [.cursor/custom-scriptz/Prompt-Module.md](../custom-scriptz/Prompt-Module.md)

## Trigger

When the user says **`install module`**, **`install [module-name]`**, **`install google-api-proxy`**, **`install google-api module`**, **`install backup-system`**, or **`list modules`** in **this** repo.

## Agent action

1. Read and follow **Prompt-Module.md** (identify module, run `install.ps1`, follow `CURSOR.md`, run `verifyCommands` from manifest).
2. **Vader-only extras** (optional):
   - Merge `global.mdc.fragment` / `package-scripts.json` shortcuts into `.cursor/rules/global.mdc` if missing.
   - Mirror new shortcuts to Cheat Sheet and Operator Card per doc-sync rule in `global.mdc`.

Do **not** run `start-project:gate` unless the operator asked for a full Vader cold start.
