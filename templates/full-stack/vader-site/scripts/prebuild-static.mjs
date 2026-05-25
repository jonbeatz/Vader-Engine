/**
 * Swaps Payload routes/config and the site-data loader before build.
 */
import { cpSync, existsSync, mkdirSync, rmSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const STASH_ROOT = path.join(ROOT, '.deploy-stash');
const enabled = process.env.ENABLE_PAYLOAD === 'true';

const STASH_TARGETS = [
  { rel: path.join('app', '(payload)'), isDir: true },
  { rel: 'payload.config.ts', isDir: false },
  { rel: 'collections.ts', isDir: false },
  { rel: path.join('lib', 'get-payload.ts'), isDir: false },
  { rel: path.join('lib', 'load-site-data.full.ts'), isDir: false },
];

const LOADER_STATIC = path.join(ROOT, 'lib', 'load-site-data.static.ts');
const LOADER_OUT = path.join(ROOT, 'lib', 'load-site-data.ts');

function writeLoader(mode) {
  if (mode === 'static') {
    writeFileSync(
      LOADER_OUT,
      `export type { SiteData, SiteProject, SiteStackItem } from './static-site-data';\nexport { loadSiteData } from './load-site-data.static';\n`,
      'utf8',
    );
  } else {
    writeFileSync(
      LOADER_OUT,
      `export type { SiteData, SiteProject, SiteStackItem } from './static-site-data';\nexport { loadSiteData } from './load-site-data.full';\n`,
      'utf8',
    );
  }
}

function stashOne(rel, isDir) {
  const src = path.join(ROOT, rel);
  const dest = path.join(STASH_ROOT, rel);
  if (!existsSync(src)) return;
  mkdirSync(path.dirname(dest), { recursive: true });
  if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });
  cpSync(src, dest, { recursive: isDir });
  rmSync(src, { recursive: true, force: true });
}

function restoreOne(rel, isDir) {
  const src = path.join(STASH_ROOT, rel);
  const dest = path.join(ROOT, rel);
  if (!existsSync(src)) return;
  if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });
  mkdirSync(path.dirname(dest), { recursive: true });
  cpSync(src, dest, { recursive: isDir });
}

if (enabled) {
  for (const { rel, isDir } of STASH_TARGETS) {
    restoreOne(rel, isDir);
  }
  writeLoader('full');
  console.log('[msc:prebuild] ENABLE_PAYLOAD=true — Payload CMS enabled');
} else {
  for (const { rel, isDir } of STASH_TARGETS) {
    stashOne(rel, isDir);
  }
  writeLoader('static');
  const payloadTypes = path.join(ROOT, 'payload-types.ts');
  if (existsSync(payloadTypes)) rmSync(payloadTypes, { force: true });
  console.log('[msc:prebuild] ENABLE_PAYLOAD≠true — static site only (no database)');
}
