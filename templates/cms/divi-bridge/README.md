# {{PROJECT_NAME}} — Divi Bridge Template

> **Vader Engine** · **Template blueprint** · WordPress / Divi 4 · PHP + `msc-` namespace isolation

WordPress/Divi consumer bridge with `ABSPATH` guards. Deploy to your WP host — not an npm dev server port in this blueprint.

## Setup

1. Copy template output into your WordPress theme/plugin tree per [consumer-bootstrap.md](../../.cursor/docs/consumer-bootstrap.md).
2. Register `core-Divi-Scriptz.js` via your theme `functions.php` or MSC bootstrap.
3. Enqueue Shield CSS with `msc-` prefixed classes only.

## Notes

- PHP files require `ABSPATH` guard at top
- Do not run `npm run forge` against `core/` or `ui/` paths
