# SQLite Repair Manifest

Use with `scripts/msc-sqlite-repair.mjs` when Drizzle `push` is blocked (TTY/CI) or polymorphic `payload_locked_documents_rels` columns drift.

## Setup

1. Copy `config/sqlite-repair-manifest.example.json` to your consumer config path.
2. Set `MSC_SQLITE_REPAIR_MANIFEST=config/your-manifest.json`
3. Dry-run: `MSC_SQLITE_REPAIR_DRY_RUN=1 node scripts/msc-sqlite-repair.mjs`
4. Execute: `node scripts/msc-sqlite-repair.mjs` (creates `*.bak.<timestamp>` first)

## Manifest schema

```json
{
  "addColumns": [
    { "table": "users", "column": "role", "definition": "TEXT DEFAULT 'editor'" }
  ],
  "addIndexes": [
    { "name": "users_email_idx", "sql": "CREATE INDEX users_email_idx ON users (email)" }
  ]
}
```

## Consumer checklist

- Add one `*_id` column per collection slug on `payload_locked_documents_rels` when Payload reports missing FK targets.
- Never delete rows in the generic repair script — additive only.
- For orphan indexes without tables, use a dedicated consumer script (writable_schema pattern from MSC_Clean) — not included in the generic runner.

## Related env

| Variable | Purpose |
|----------|---------|
| `DATABASE_URI` | DB file location |
| `PAYLOAD_SQLITE_PUSH=false` | Run repair while push disabled |
| `PAYLOAD_MIGRATING=true` | Migration scripts |

Source inspiration: MSC-Projectz `msc_sqlite_repair_vault_schema.mjs` (project-specific columns stripped for manifest-driven port).
