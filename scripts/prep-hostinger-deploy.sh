#!/usr/bin/env bash
# Builds a GitHub-ready Hostinger Node.js deploy tree from Dev-Projectz/vader-site.
# Does not modify the live VaderLabz repo or vaderlabz.com deployment.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="${MSC_VADER_SITE_SRC:-$REPO_ROOT/../Dev-Projectz/vader-site}"
DEST="$REPO_ROOT/vader-site-deploy"

echo "[prep-hostinger] Boilerplate root: $REPO_ROOT"
echo "[prep-hostinger] Source:          $SRC"
echo "[prep-hostinger] Output:          $DEST"

if [[ ! -d "$SRC" ]]; then
  echo "[prep-hostinger] ERROR: source not found: $SRC" >&2
  exit 1
fi

if [[ ! -f "$SRC/package.json" ]]; then
  echo "[prep-hostinger] ERROR: package.json missing in source" >&2
  exit 1
fi

# Fresh output tree
rm -rf "$DEST"
mkdir -p "$DEST"

copy_tree() {
  if command -v rsync >/dev/null 2>&1; then
    rsync -a \
      --exclude 'node_modules' \
      --exclude '.next' \
      --exclude '.deploy-stash' \
      --exclude '.git' \
      "$SRC/" "$DEST/"
  else
    echo "[prep-hostinger] rsync not found — using tar copy"
    (
      cd "$SRC"
      tar -cf - \
        --exclude='node_modules' \
        --exclude='.next' \
        --exclude='.deploy-stash' \
        --exclude='.git' \
        .
    ) | (cd "$DEST" && tar -xf -)
  fi
}

copy_tree

cd "$DEST"

# Static production layout (no Payload routes in build)
export ENABLE_PAYLOAD=false
if [[ -f scripts/prebuild-static.mjs ]]; then
  node scripts/prebuild-static.mjs
else
  echo "[prep-hostinger] WARN: scripts/prebuild-static.mjs missing — ensure static loader is active" >&2
fi

# Dev-only artifacts (not for GitHub / Hostinger build)
rm -rf \
  node_modules \
  .next \
  .deploy-stash \
  database \
  .env.local \
  .env.example \
  payload-types.ts \
  pm2.config.js \
  2>/dev/null || true

for f in \
  scripts/seed-demo-data.mjs \
  scripts/postinstall.mjs \
  scripts/deploy-prep.sh \
  scripts/prebuild-static.mjs
do
  [[ -e "$f" ]] && rm -f "$f" && echo "[prep-hostinger] removed $f"
done

# Production env (Hostinger injects PORT; default static CMS-off)
cat > .env.production <<'EOF'
NODE_ENV=production
ENABLE_PAYLOAD=false
PORT=3000
HOSTNAME=0.0.0.0
MSC_PUBLIC_ORIGIN=https://vaderlabz.com
EOF

# Deploy .gitignore
cat > .gitignore <<'EOF'
node_modules/
.next/
.env.local
.deploy-stash/
database/
payload-types.ts
*.log
.DS_Store
EOF

# Patch package.json for Hostinger (next in dependencies; exact build/start scripts)
node <<'NODE'
const fs = require('node:fs');
const path = require('node:path');

const pkgPath = path.join(process.cwd(), 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

pkg.private = true;
pkg.name = pkg.name || 'vader-site';
pkg.description = 'VaderLabz marketing site — static Next.js (Hostinger)';

// Hostinger production build must resolve `next` from dependencies
pkg.dependencies = pkg.dependencies || {};
if (pkg.devDependencies?.next) {
  pkg.dependencies.next = pkg.devDependencies.next;
  delete pkg.devDependencies.next;
  console.log('[prep-hostinger] moved next from devDependencies → dependencies');
}
if (!pkg.dependencies.next) {
  console.error('[prep-hostinger] ERROR: next is not listed under dependencies');
  process.exit(1);
}

// Drop optional Payload packages from deploy artifact
delete pkg.optionalDependencies;

// Hostinger Node.js GitHub workflow expects these exact scripts
pkg.scripts = {
  build: 'next build',
  start: 'next start -p ${PORT:-3000}',
};

// Keep devDependencies needed for `next build` (TypeScript, types)
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
NODE

echo "[prep-hostinger] package.json scripts:"
node -e "const p=require('./package.json'); console.log('  build:', p.scripts.build); console.log('  start:', p.scripts.start); console.log('  next in dependencies:', Boolean(p.dependencies?.next));"

# GitHub-readiness checks
fail=0
for required in \
  package.json \
  next.config.mjs \
  "app/(app)/page.tsx" \
  "app/(app)/layout.tsx" \
  lib/static-site-data.ts \
  .env.production \
  .gitignore
do
  if [[ ! -e "$required" ]]; then
    echo "[prep-hostinger] FAIL missing: $required" >&2
    fail=1
  fi
done

if [[ -d "app/(payload)" ]]; then
  echo "[prep-hostinger] FAIL: app/(payload) still present — static strip incomplete" >&2
  fail=1
fi

if [[ -f payload.config.ts ]]; then
  echo "[prep-hostinger] FAIL: payload.config.ts still present" >&2
  fail=1
fi

if [[ -d node_modules ]] || [[ -d .next ]]; then
  echo "[prep-hostinger] FAIL: node_modules or .next still present" >&2
  fail=1
fi

if [[ "$fail" -ne 0 ]]; then
  echo "[prep-hostinger] Deploy tree validation failed." >&2
  exit 1
fi

echo ""
echo "[prep-hostinger] SUCCESS — GitHub-ready tree at:"
echo "  $DEST"
echo ""
echo "Next steps:"
echo "  cd $DEST"
echo "  git init && git add . && git commit -m \"Hostinger static deploy\""
echo "  git remote add origin <your-new-github-repo-url>"
echo "  git push -u origin main"
echo ""
echo "See DEPLOY_TO_HOSTINGER.md for Hostinger hPanel Node.js + GitHub setup."
