import { readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { join } from 'node:path';

/** Default sibling output root for `msc:template apply` (repo-relative). */
export const MSC_DEFAULT_OUTPUT_REL = '../Dev-Projectz';

/**
 * msc_findFreePort: Dynamically checks for available system ports starting from a baseline
 */
export async function msc_findFreePort(startPort) {
  let port = startPort;
  while (port < startPort + 100) {
    const isFree = await new Promise((resolve) => {
      const server = createServer()
        .once('error', () => resolve(false))
        .once('listening', () => {
          server.close();
          resolve(true);
        })
        .listen(port);
    });
    if (isFree) return port;
    port++;
  }
  throw new Error(`No free system port discovered near baseline: ${startPort}`);
}

/**
 * msc_slugify: Safe kebab-case string normalizer
 */
export function msc_slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Resolves scaffold target: explicit --target or ../Dev-Projectz/<slugified-name>.
 */
export function msc_resolveScaffoldTarget(projectName, explicitTarget) {
  if (explicitTarget) return explicitTarget;
  return join(MSC_DEFAULT_OUTPUT_REL, msc_slugify(projectName));
}

/**
 * msc_injectVariables: Safely transforms blueprint files using regex-escaped double-brace tokens
 */
export function msc_injectVariables(filePath, variables) {
  let content = readFileSync(filePath, 'utf8');

  for (const [key, value] of Object.entries(variables)) {
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const placeholder = new RegExp(`{{${escapedKey}}}`, 'g');
    content = content.replace(placeholder, value);
  }

  writeFileSync(filePath, content, 'utf8');
}
