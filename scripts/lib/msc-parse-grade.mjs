/**
 * Parse `npm run grade` stdout into structured JSON for the dashboard.
 */

const FINAL_GRADE_RE = /Final Grade:\s*(\d+)\/(\d+)/i;
const PASS_RE = /✅\s*\[PASS\]\s*(.+)/;
const FAIL_RE = /❌\s*\[FAIL\]\s*(.+)/;

/**
 * @param {string} stdout
 * @returns {{ passed: number; total: number; pct: number; checks: { name: string; ok: boolean }[]; ok: boolean }}
 */
export function msc_parseGradeOutput(stdout) {
  const checks = [];
  let passed = 0;
  let total = 0;

  for (const line of stdout.split(/\r?\n/)) {
    const pass = line.match(PASS_RE);
    if (pass) {
      checks.push({ name: pass[1].trim(), ok: true });
      continue;
    }
    const fail = line.match(FAIL_RE);
    if (fail) {
      checks.push({ name: fail[1].trim(), ok: false });
    }
  }

  const final = stdout.match(FINAL_GRADE_RE);
  if (final) {
    passed = Number(final[1]);
    total = Number(final[2]);
  } else {
    passed = checks.filter((c) => c.ok).length;
    total = checks.length;
  }

  const pct = total > 0 ? Math.round((passed / total) * 100) : 0;
  return {
    passed,
    total,
    pct,
    checks,
    ok: total > 0 && passed === total,
  };
}
