# Security

Vader Engine v2.7.0 enforces a **zero-leak** environment contract: live credentials never belong in committed files or public issues.

## Reporting a vulnerability

**Do not** open a public GitHub issue for security vulnerabilities.

Use a **[private security advisory](https://github.com/jonbeatz/Vader-Engine/security/advisories/new)** on this repository. That channel keeps details confidential until a fix is ready.

We will acknowledge receipt and work on remediation. Please allow reasonable time before public disclosure.

## Environment security

| Rule | Detail |
| --- | --- |
| Live secrets | Only in untracked `.env.local` (gitignored) at repo root and sandbox paths |
| Committed contract | `.env.example` and MCP placeholders (`YOUR_*`, `CHANGE_ME`) — never real tokens |
| Script hydration | All `scripts/*.mjs` import `scripts/lib/msc-load-env.mjs` first (`.env.local` → `.env.example`) |
| Pre-commit | `msc:validate-env` and `verify:mcp` run on every commit (Husky) |
| MCP portability | `.cursor/mcp.json` uses `"${workspaceFolder}"` — no machine-specific paths in Git |

Agents and operators must reference **variable names** only in chat and logs — never paste API keys, passwords, or PATs into issues or pull requests.

## Supported versions

Security fixes are applied on the current **v2.x** line on `main`. Tagged releases: [releases](https://github.com/jonbeatz/Vader-Engine/releases).

## Further reading

- [README — Security & compliance](../README.md#security--compliance)
- [TRUTH.md](../TRUTH.md) — zero-leak and MCP rules
- [env-ingestion-compliance](../.cursor/rules/env-ingestion-compliance.mdc)
- [CONTRIBUTING.md — Dependabot and security](./CONTRIBUTING.md#dependabot-and-security)
