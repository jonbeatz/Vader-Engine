#!/usr/bin/env node
/**
 * MSC Shield audit — enforce msc- class namespace in ui/*.css
 * Powered by the MSC Media Engine
 */
import './lib/msc-load-env.mjs';
import './lib/msc-node-version-guard.mjs';

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { MSC_PROJECT_ROOT } from './lib/msc-load-env.mjs';

const UI_DIR = join(MSC_PROJECT_ROOT, 'ui');
const SKIP_SELECTORS = new Set(['root', 'host', 'global']);

/** @param {string} css */
function extractClassNames(css) {
  let stripped = css.replace(/\/\*[\s\S]*?\*\//g, '');
  stripped = stripped.replace(/@import[^;]+;/g, '');
  stripped = stripped.replace(/url\([^)]*\)/gi, '');
  const names = new Set();
  const re = /\.([a-zA-Z_-][a-zA-Z0-9_-]*)/g;
  let match = re.exec(stripped);
  while (match !== null) {
    names.add(match[1]);
    match = re.exec(stripped);
  }
  return [...names];
}

const cssFiles = readdirSync(UI_DIR).filter((f) => f.endsWith('.css'));
const violations = [];

for (const file of cssFiles) {
  const content = readFileSync(join(UI_DIR, file), 'utf8');
  for (const className of extractClassNames(content)) {
    if (SKIP_SELECTORS.has(className)) continue;
    if (!className.startsWith('msc-')) {
      violations.push({ file, className });
    }
  }
}

if (violations.length === 0) {
  console.log(
    `[PASS] Shield namespace audit — ${cssFiles.length} CSS file(s), all classes use msc- prefix`,
  );
  process.exit(0);
}

console.error('[FAIL] Shield namespace violations (classes must start with msc-):');
for (const { file, className } of violations) {
  console.error(`  ui/${file} → .${className}`);
}
process.exit(1);
