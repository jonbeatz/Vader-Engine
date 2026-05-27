/**
 * In-memory ring buffer for dashboard activity / SSE log streaming.
 */

const MAX_LINES = 500;
/** @type {{ ts: string; line: string; level: 'info' | 'error' }[]} */
let buffer = [];
/** @type {Set<(entry: { ts: string; line: string; level: 'info' | 'error' }) => void>} */
const listeners = new Set();

/**
 * @param {string} line
 * @param {'info' | 'error'} [level]
 */
export function msc_appendLog(line, level = 'info') {
  const entry = { ts: new Date().toISOString(), line: String(line).trimEnd(), level };
  buffer.push(entry);
  if (buffer.length > MAX_LINES) buffer = buffer.slice(-MAX_LINES);
  for (const fn of listeners) {
    try {
      fn(entry);
    } catch {
      /* listener fault isolation */
    }
  }
}

/** @returns {typeof buffer} */
export function msc_getLogSnapshot() {
  return [...buffer];
}

/**
 * @param {(entry: { ts: string; line: string; level: 'info' | 'error' }) => void} fn
 * @returns {() => void}
 */
export function msc_subscribeLog(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function msc_clearLogs() {
  buffer = [];
}
