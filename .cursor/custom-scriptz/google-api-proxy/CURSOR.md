# CURSOR — Install `google-api-proxy`

## When to use

Operator says **`install google-api module`**, or copying LiteLLM/ngrok tooling into another repo.

## Agent steps

1. **Preflight:** Target repo has `scripts/lib/msc-load-env.mjs` and root `package.json`. If missing, stop and report.
2. **Run installer** from repo root:

   ```powershell
   .\.cursor\custom-scriptz\google-api-proxy\install.ps1
   ```

3. **ngrok binary:** Module does **not** ship `ngrok.exe` in Git (~31 MB, third-party). For portable packs, operator copies `ngrok.exe` into `.cursor/custom-scriptz/google-api-proxy/google-api/` before `install.ps1`, or relies on PATH / `MSC_NGROK_BIN`. Warn if missing before `start google-api`.
4. **Env contract:** Merge keys from `env.example.fragment` into `.env.example` (placeholders only). Operator sets live values in `.env.local` — never paste secrets in chat.
5. **Config:** If `config/litellm_config.yaml` was created from example, remind operator to set `vertex_project` and `master_key`.
6. **Shortcuts:** Append `package-scripts.json` → `shortcuts` block to `.cursor/rules/global.mdc` (Natural Language Commands table) if not present.
7. **Verify:**

   ```bash
   npm run msc:litellm:preflight
   npm run msc:google-api:start
   ```

   In a second step (or after READY): `npm run msc:litellm:test:ngrok`

## Do not

- Commit `gcp_key.json`, `.env.local`, or real `master_key` values
- Replace placeholders in `.cursor/mcp.json` with live tokens

## Report

```
✅ google-api-proxy installed
📂 Scripts → scripts/ + scripts/lib/
📂 Config  → config/litellm_config.yaml (if new)
📦 npm scripts merged from package-scripts.json
```
