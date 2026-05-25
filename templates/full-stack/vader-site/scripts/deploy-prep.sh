#!/usr/bin/env bash
# Hostinger VPS static deploy prep — strips Payload CMS artifacts from the tree.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "[deploy-prep] VaderLabz static production prep"

# Remove dev-only / boilerplate artifacts
rm -rf .deploy-stash .next node_modules/.cache 2>/dev/null || true
rm -f payload-types.ts 2>/dev/null || true

for path in \
  "scripts/seed-demo-data.mjs" \
  "scripts/postinstall.mjs" \
  "database" \
  ".env.local" \
  ".env.example"
do
  if [[ -e "$path" ]]; then
    rm -rf "$path"
    echo "[deploy-prep] removed $path"
  fi
done

# Stash and remove Payload from the build tree
export ENABLE_PAYLOAD=false
node scripts/prebuild-static.mjs

# Production env contract (operator fills secrets on VPS)
cat > .env.production <<'EOF'
# VaderLabz production — static site (no CMS / no database)
NODE_ENV=production
ENABLE_PAYLOAD=false
PORT=3003
HOSTNAME=0.0.0.0
MSC_PUBLIC_ORIGIN=https://vaderlabz.com
EOF

echo "[deploy-prep] wrote .env.production (ENABLE_PAYLOAD=false)"
echo "[deploy-prep] next: npm ci --omit=dev && ENABLE_PAYLOAD=false npm run build"
echo "[deploy-prep] then: pm2 start pm2.config.js"
