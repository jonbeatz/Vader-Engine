/**
 * Whitelist for dashboard → repo script dispatch (Phase 2).
 * Never allow arbitrary shell — npm script names from root package.json only.
 */

/** @type {ReadonlySet<string>} */
export const MSC_SCRIPT_ALLOWLIST = new Set([
  'grade',
  'msc:lint',
  'msc:health',
  'msc:health:json',
  'msc:dev:example',
  'msc:dev:payload',
  'msc:dev:tailwind',
  'msc:kill',
  'start-project:gate',
  'msc:check-node',
  'msc:validate-env',
]);

/** @type {ReadonlySet<number>} */
export const MSC_KILL_PORT_ALLOWLIST = new Set([3000, 3001, 3002, 3010, 8080]);

/**
 * @param {string} script
 * @returns {boolean}
 */
export function msc_isScriptAllowed(script) {
  return typeof script === 'string' && MSC_SCRIPT_ALLOWLIST.has(script.trim());
}

/**
 * @param {unknown} port
 * @returns {number | null}
 */
export function msc_normalizeKillPort(port) {
  const n = Number(port);
  if (!Number.isInteger(n) || !MSC_KILL_PORT_ALLOWLIST.has(n)) return null;
  return n;
}
