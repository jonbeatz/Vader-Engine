#!/usr/bin/env node
/**
 * AST repair stub — Suspense boundary surgeon pattern.
 * Enable with MSC_REPAIR_AST=1 and consumer-provided target globs.
 * See .cursor/docs/REPAIR_PROTOCOLS.md
 */
import '../lib/msc-load-env.mjs';

import process from 'node:process';

if (process.env.MSC_REPAIR_AST !== '1') {
  console.log(
    '[msc:repair-ast] set MSC_REPAIR_AST=1 and wire consumer glob in fork of this script',
  );
  process.exit(0);
}

console.log(
  '[msc:repair-ast] no default targets in template — copy from consumer repo scripts/repair/',
);
process.exit(0);
