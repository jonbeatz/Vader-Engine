import { execSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

describe('msc-forge.mjs shield', () => {
  it('blocks protected msc- namespace targets', () => {
    expect(() =>
      execSync('node scripts/msc-forge.mjs ui/msc-shield.css msc-accent msc-danger --dry-run', {
        encoding: 'utf8',
      }),
    ).toThrow();
  });
});
