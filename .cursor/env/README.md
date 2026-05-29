# env — Personal environment reference

**Purpose:** Offline env contracts and a **generated** personal secrets vault. Not wired into Vader-Engine runtime (repo root `.env.example` + `.env.local` are canonical).

| Field | Value |
|-------|-------|
| **Version** | v2.6.1 |
| **Last doc sync** | 2026-05-29 |

---

## File map

| File | Role | Committed |
|------|------|-----------|
| `master.env.example` | Merged key **contract** (placeholders) — copy to new projects | Optional (reference) |
| `master.env.local.example` | Template for `.env.local` overrides | Optional (reference) |
| `Personal-Secrets-Vault.md` | **Generated** — all live keys (dropdown layout) | **No** (gitignored) |
| `backups/1` … `backups/6` | Optional per-project env snapshots | **No** (live files gitignored) |

---

## Regenerate personal vault

From repo root (hydrates `.env.local` first):

```bash
node scripts/msc-build-personal-secrets-vault.mjs
```

**Sources scanned:**

- Repo-root `.env.local`
- `.cursor/mcp.json`, `.cursor/mcp-blueprint.json`, `~/.cursor/mcp.json`
- `config/litellm_config.yaml`, `google-api/litellm_config.yaml`
- `config/gcp-service-account.json` (email + project id only)
- `env/backups/1` … `env/backups/6` when present

**Output:** `.cursor/env/Personal-Secrets-Vault.md`

---

## Optional backups layout

To archive env files from other projects:

```
.cursor/env/backups/
├── 1/   ← .env, .env.local, .env.example, …
├── 2/
└── …
```

The vault script skips empty backup folders automatically.

---

## Security

- Store vault files on an **encrypted backup drive** (e.g. G:/) — never push to GitHub.
- Never paste vault contents into chat.
- Committed files here should use **placeholders only** (`YOUR_*`, `your_*`).
- Live keys belong in repo-root `.env.local` and gitignored backup folders only.

---

## Related docs

| Doc | Purpose |
|-----|---------|
| [Vader-Credentials.md](../docs/Vader-Credentials.md) | LiteLLM / Cursor / GCP operator card |
| [mcp-setup.md](../docs/mcp-setup.md) | MCP servers and env key names |
| [mcp-env-token-map.md](../docs/mcp-env-token-map.md) | MCP ↔ `.env.example` mapping |
| [START-HERE.md](../../START-HERE.md) | Phase 2 env ingestion |
| Root `.env.example` | Repo canonical env contract |
