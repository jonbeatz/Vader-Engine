import { execSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

describe('msc-grade-boilerplate.mjs self-tests', () => {
  it('exits 0 when repo is compliant', () => {
    const out = execSync('node scripts/msc-grade-boilerplate.mjs', { encoding: 'utf8' });
    expect(out).toMatch(/Final Grade: \d+\/\d+/);
  });

  it('prints FAILED CHECK on failure paths', () => {
    try {
      execSync('node scripts/msc-grade-boilerplate.mjs', {
        encoding: 'utf8',
        env: { ...process.env, MSC_GRADE_MOCK_FAIL: '1' },
      });
      expect.unreachable('expected grade to fail under MSC_GRADE_MOCK_FAIL');
    } catch (e) {
      const err = /** @type {{ stderr?: string; stdout?: string }} */ (e);
      expect(String(err.stderr ?? err.stdout)).toMatch(/FAIL|FAILED CHECK/);
    }
  });
});
