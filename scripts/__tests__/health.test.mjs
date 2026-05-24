import { execSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

describe('health.mjs', () => {
  it('returns JSON diagnostics with ports array', () => {
    const out = execSync('node scripts/health.mjs --json', { encoding: 'utf8' });
    const data = JSON.parse(out);
    expect(Array.isArray(data.diagnostics.ports)).toBe(true);
    expect(data.diagnostics.ports).toHaveLength(3);
  });
});
