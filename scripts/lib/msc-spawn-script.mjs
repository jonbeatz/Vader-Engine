/**
 * Safe npm script spawn from repo root (dashboard API layer).
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import { MSC_PROJECT_ROOT } from './msc-load-env.mjs';
import { msc_appendLog } from './msc-log-buffer.mjs';
import { msc_isScriptAllowed, msc_normalizeKillPort } from './msc-script-allowlist.mjs';

/**
 * @param {string} script
 * @param {string[]} [args]
 * @returns {Promise<{ code: number | null; stdout: string; stderr: string }>}
 */
export function msc_spawnNpmScript(script, args = []) {
  if (!msc_isScriptAllowed(script)) {
    return Promise.reject(new Error(`Script not allowlisted: ${script}`));
  }

  const npmArgs = ['run', script];
  if (args.length > 0) npmArgs.push('--', ...args);

  msc_appendLog(`$ npm ${npmArgs.join(' ')}`, 'info');

  return new Promise((resolve, reject) => {
    const child = spawn('npm', npmArgs, {
      cwd: MSC_PROJECT_ROOT,
      env: process.env,
      shell: process.platform === 'win32',
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    child.stdout?.on('data', (chunk) => {
      const text = chunk.toString();
      stdout += text;
      for (const line of text.split(/\r?\n/)) {
        if (line.trim()) msc_appendLog(line, 'info');
      }
    });

    child.stderr?.on('data', (chunk) => {
      const text = chunk.toString();
      stderr += text;
      for (const line of text.split(/\r?\n/)) {
        if (line.trim()) msc_appendLog(line, 'error');
      }
    });

    child.on('error', reject);
    child.on('close', (code) => {
      resolve({ code, stdout, stderr });
    });
  });
}

/**
 * @param {number} port
 */
export function msc_killPort(port) {
  const normalized = msc_normalizeKillPort(port);
  if (normalized === null) {
    return Promise.reject(new Error(`Port not allowlisted: ${port}`));
  }
  return msc_spawnNpmScript('msc:kill', [String(normalized)]);
}

/**
 * Run grade and return parsed + raw output.
 */
export async function msc_runGrade() {
  const { msc_parseGradeOutput } = await import('./msc-parse-grade.mjs');
  const result = await msc_spawnNpmScript('grade');
  const parsed = msc_parseGradeOutput(result.stdout + result.stderr);
  return { ...result, parsed };
}

/**
 * Extract first JSON object from npm stdout (may include npm banner lines).
 * @param {string} stdout
 */
function msc_extractJsonFromStdout(stdout) {
  const start = stdout.indexOf('{');
  const end = stdout.lastIndexOf('}');
  if (start === -1 || end <= start) return null;
  try {
    return JSON.parse(stdout.slice(start, end + 1));
  } catch {
    return null;
  }
}

/**
 * Health diagnostics JSON (reuses health.mjs logic via subprocess).
 */
export async function msc_runHealthJson() {
  const result = await msc_spawnNpmScript('msc:health:json');
  const json = msc_extractJsonFromStdout(result.stdout);
  return { ...result, diagnostics: json, parseError: json === null };
}

/**
 * @param {string} script
 * @param {string[]} [args]
 */
export async function msc_runAllowedScript(script, args = []) {
  if (script === 'msc:kill' && args.length === 1) {
    const port = msc_normalizeKillPort(args[0]);
    if (port === null) throw new Error(`Invalid kill port: ${args[0]}`);
    return msc_killPort(port);
  }
  return msc_spawnNpmScript(script, args);
}

export { MSC_PROJECT_ROOT };
export const msc_dashboardPackageRoot = path.join(MSC_PROJECT_ROOT, 'ui', 'dashboard');
