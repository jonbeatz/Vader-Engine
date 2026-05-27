#!/usr/bin/env node
/**
 * Dependency freshness check across Lean Boundary package.json surfaces.
 * Usage: npm run msc:check-deps
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { MSC_PROJECT_ROOT } from './lib/msc-load-env.mjs';

const BANNER = '[msc:check-deps]';

/** Never fail the gate for these (intentional cross-sandbox pins). */
const EXEMPT_FAIL_NAMES = new Set(['next', 'react', 'react-dom']);

const PACKAGE_ROOTS = [
  '.',
  'ui/dashboard',
  'examples/nextjs-minimal',
  'examples/nextjs-payload',
  'examples/nextjs-tailwind',
  'templates/full-stack/vader-site',
];

/**
 * @param {string} relRoot
 */
function msc_resolvePackageDir(relRoot) {
  return path.join(MSC_PROJECT_ROOT, relRoot);
}

/**
 * @param {string} absDir
 */
function msc_relLabel(absDir) {
  const rel = path.relative(MSC_PROJECT_ROOT, absDir);
  return rel === '' ? '.' : rel.replace(/\\/g, '/');
}

/**
 * Production-only exemptions (intentional cross-sandbox pins).
 * @param {string} name
 */
function msc_isExemptFromFail(name) {
  return EXEMPT_FAIL_NAMES.has(name);
}

/**
 * @param {string} absDir
 * @returns {Record<string, { current?: string; wanted?: string; latest?: string }>}
 */
function msc_runOutdated(absDir) {
  const result = spawnSync('npm', ['outdated', '--json'], {
    cwd: absDir,
    encoding: 'utf8',
    shell: process.platform === 'win32',
    env: process.env,
  });

  const raw = (result.stdout ?? '').trim();
  if (!raw) return {};

  try {
    return JSON.parse(raw);
  } catch {
    console.error(`${BANNER} WARN — could not parse npm outdated JSON in ${msc_relLabel(absDir)}`);
    if (result.stderr) console.error(result.stderr.trim());
    return {};
  }
}

/**
 * @param {string} pkgJsonPath
 */
function msc_loadDepSections(pkgJsonPath) {
  const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
  /** @type {Map<string, 'dependencies' | 'devDependencies'>} */
  const map = new Map();
  for (const name of Object.keys(pkg.dependencies ?? {})) {
    map.set(name, 'dependencies');
  }
  for (const name of Object.keys(pkg.devDependencies ?? {})) {
    map.set(name, 'devDependencies');
  }
  return map;
}

/**
 * @param {string | undefined} v
 */
function msc_fmt(v) {
  return v ?? '—';
}

function main() {
  let hasFailure = false;
  let checked = 0;

  for (const rel of PACKAGE_ROOTS) {
    const absDir = msc_resolvePackageDir(rel);
    const pkgPath = path.join(absDir, 'package.json');
    if (!fs.existsSync(pkgPath)) continue;

    checked += 1;
    const label = msc_relLabel(absDir);
    console.log(`\n📦 Checking dependencies in: ${label}`);

    const sections = msc_loadDepSections(pkgPath);
    const outdated = msc_runOutdated(absDir);
    const names = Object.keys(outdated).sort();

    if (names.length === 0) {
      console.log('✅ All up to date');
      continue;
    }

    const blocking = [];
    const devLines = [];
    const exemptLines = [];

    for (const name of names) {
      const entry = outdated[name];
      const section = sections.get(name) ?? 'dependencies';
      const line = `  - ${name}: ${msc_fmt(entry.current)} → ${msc_fmt(entry.wanted)} → ${msc_fmt(entry.latest)}`;

      if (section === 'devDependencies') {
        devLines.push(line);
        continue;
      }
      if (msc_isExemptFromFail(name)) {
        exemptLines.push(line);
        continue;
      }
      blocking.push(line);
      hasFailure = true;
    }

    if (blocking.length > 0) {
      console.log('⚠️ Outdated:');
      for (const line of blocking) console.log(line);
    } else {
      console.log('✅ All up to date');
    }
    if (devLines.length > 0) {
      console.log('ℹ️ Outdated (dev — informational):');
      for (const line of devLines) console.log(line);
    }
    if (exemptLines.length > 0) {
      console.log('ℹ️ Outdated (exempt — next / react / react-dom):');
      for (const line of exemptLines) console.log(line);
    }
  }

  console.log(`\n${BANNER} checked ${checked} package.json surface(s)`);

  if (hasFailure) {
    console.log(`\n${BANNER} FAIL — outdated production dependencies found (see above)`);
    process.exit(1);
  }

  console.log(`${BANNER} PASS — no blocking outdated production dependencies`);
  process.exit(0);
}

main();
