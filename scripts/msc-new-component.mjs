#!/usr/bin/env node
/**
 * MSC Vader-compliant component scaffolder
 * Usage: npm run msc:new:component -- msc-button [nextjs-minimal]
 * Powered by the MSC Media Engine
 */
import './lib/msc-load-env.mjs';
import './lib/msc-node-version-guard.mjs';

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { MSC_PROJECT_ROOT } from './lib/msc-load-env.mjs';

const [, , name, sandbox = 'nextjs-minimal'] = process.argv;
const NAME_PATTERN = /^msc-[a-z0-9-]+$/;

if (!name) {
  console.error('Usage: npm run msc:new:component -- msc-button [nextjs-minimal]');
  process.exit(1);
}

if (!NAME_PATTERN.test(name)) {
  console.error(`[FAIL] Component name must match ${NAME_PATTERN} (got "${name}")`);
  process.exit(1);
}

const pascalCase = name
  .replace(/^msc-/, '')
  .split('-')
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .join('');
const exportName = `Msc${pascalCase}`;

const sandboxRoots = {
  'nextjs-minimal': join(MSC_PROJECT_ROOT, 'examples/nextjs-minimal/components'),
};

const targetRoot = sandboxRoots[sandbox];
if (!targetRoot) {
  console.error(
    `[FAIL] Unknown sandbox "${sandbox}". Supported: ${Object.keys(sandboxRoots).join(', ')}`,
  );
  process.exit(1);
}

const componentDir = join(targetRoot, name);
mkdirSync(componentDir, { recursive: true });

writeFileSync(
  join(componentDir, 'index.tsx'),
  `import type { ReactNode } from 'react';
import './styles.css';

export interface ${exportName}Props {
  className?: string;
  children?: ReactNode;
}

/** Studio Dark: use var(--msc-*) tokens via msc- classes — never hardcode hex in TSX */
export function ${exportName}({ className, children }: ${exportName}Props) {
  return (
    <div className={['${name}', className].filter(Boolean).join(' ')}>
      {children ?? '${exportName}'}
    </div>
  );
}
`,
);

writeFileSync(
  join(componentDir, 'styles.css'),
  `/**
 * ${name} — Studio Dark token contract
 * Background: var(--msc-bg-main) | Surface: var(--msc-bg-surface)
 */
.${name} {
  background-color: var(--msc-bg-surface);
  color: var(--msc-text-primary);
  border: 1px solid var(--msc-border-color);
  border-radius: var(--msc-radius);
  padding: var(--msc-gap-md);
}
`,
);

writeFileSync(
  join(componentDir, `${name}.test.tsx`),
  `import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ${exportName} } from './index';

describe('${exportName}', () => {
  it('renders with msc- namespace class', () => {
    render(<${exportName} />);
    expect(document.querySelector('.${name}')).toBeTruthy();
  });

  it('renders children', () => {
    render(<${exportName}>Child content</${exportName}>);
    expect(screen.getByText('Child content')).toBeDefined();
  });
});
`,
);

writeFileSync(
  join(componentDir, 'README.md'),
  `# ${name}

Vader-compliant MSC component scaffold.

## Studio Dark tokens

- Canvas: \`var(--msc-bg-main)\` (#121212 via shield)
- Surface: \`var(--msc-bg-surface)\` (#1c1c1c via shield)
- Text: \`var(--msc-text-primary)\`, \`var(--msc-text-secondary)\`
- Accent: \`var(--msc-accent)\`

Never hardcode hex in TSX — use \`msc-\` classes and CSS variables from \`ui/msc-shield.css\`.
`,
);

console.log(`✅ Created component: ${componentDir.replace(/\\/g, '/')}`);
