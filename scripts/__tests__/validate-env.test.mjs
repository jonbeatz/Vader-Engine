import { execSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

describe('validate-env.mjs', () => {
  it('exits 0 on compliant placeholder surfaces', () => {
    const out = execSync('node scripts/validate-env.mjs', { encoding: 'utf8' });
    expect(out).toMatch(/PASS/);
  });
});
