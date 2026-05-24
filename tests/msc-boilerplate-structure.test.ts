import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();

describe('MSC boilerplate structure', () => {
  it('package.json main is not PHP', () => {
    const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
    expect(pkg.main ?? '').not.toMatch(/\.php$/);
  });

  it('core-Divi-Scriptz.js uses exact casing', () => {
    expect(existsSync(join(root, 'core/core-Divi-Scriptz.js'))).toBe(true);
    expect(existsSync(join(root, 'core/coreDiviScriptz.js'))).toBe(false);
  });

  it('.env.example has no real secrets', () => {
    const content = readFileSync(join(root, '.env.example'), 'utf8');
    expect(content).not.toMatch(/^(sk-|ghp_|pk_live_|eyJ|AIza|xoxb-)/m);
  });
});
