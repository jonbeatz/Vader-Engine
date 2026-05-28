#!/usr/bin/env node
/**
 * Vader Engine v2.5.0-Engine structural grading utility (61-point audit).
 * Usage: npm run grade
 */
import './lib/msc-load-env.mjs';
import './lib/msc-node-version-guard.mjs';

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { MSC_PROJECT_ROOT } from './lib/msc-load-env.mjs';

const EXPECTED_MCP_SERVERS = [
  'payload',
  'github',
  'playwright',
  'filesystem',
  'fetch',
  'tavily',
  'firecrawl',
  'resend',
  'sequential-thinking',
  'wordpress-local',
  'neon-postgres',
  'shadcn',
  'context7',
];

const score = { total: 0, passed: 0, failures: [] };

function report(name, condition) {
  score.total += 1;
  if (condition) {
    score.passed += 1;
    console.log(`✅ [PASS] ${name}`);
  } else {
    score.failures.push(name);
    console.error(`❌ [FAIL] ${name}`);
  }
}

function pathExists(rel) {
  return existsSync(join(MSC_PROJECT_ROOT, rel));
}

console.log('--- 📊 Grading Vader Engine v2.5.0-Engine (61-point) ---\n');

if (process.env.MSC_GRADE_MOCK_FAIL === '1') {
  report('mock failure injection test', false);
}

// 1. Documentation SSoT
report('HOW-TO.md exists', pathExists('.cursor/docs/HOW-TO.md'));
report('Code-Jedi.md exists', pathExists('.cursor/docs/Code-Jedi.md'));
report('TRUTH.md exists', pathExists('TRUTH.md'));
report('DOCS.md exists (v2 index)', pathExists('DOCS.md'));
report('system-architecture.md exists', pathExists('.cursor/docs/system-architecture.md'));
report('consumer-bootstrap.md exists', pathExists('.cursor/docs/consumer-bootstrap.md'));

// 2. Rules & skills
report('studio-dark-ui.mdc exists', pathExists('.cursor/rules/studio-dark-ui.mdc'));
report('tailwind-shadcn-bridge.mdc exists', pathExists('.cursor/rules/tailwind-shadcn-bridge.mdc'));
report('design-system-rules.mdc exists', pathExists('.cursor/rules/design-system-rules.mdc'));
report('Skills README exists', pathExists('.cursor/skills/README.md'));
report('studio-dark-shield skill exists', pathExists('.cursor/skills/studio-dark-shield.md'));

// 3. MCP registry
try {
  const mcp = JSON.parse(readFileSync(join(MSC_PROJECT_ROOT, '.cursor/mcp.json'), 'utf8'));
  const servers = Object.keys(mcp.mcpServers ?? {});
  report(`MCP registry has 13 servers (found: ${servers.length})`, servers.length === 13);
  const missing = EXPECTED_MCP_SERVERS.filter((s) => !servers.includes(s));
  report(
    missing.length === 0
      ? 'All expected MCP server IDs registered'
      : `Missing MCP servers: ${missing.join(', ')}`,
    missing.length === 0,
  );
} catch {
  report('MCP registry valid JSON', false);
}

// 4. UI Shield chain
report('msc-shield.css exists', pathExists('ui/msc-shield.css'));
report('ui/studio-dark-shield.css exists (v2)', pathExists('ui/studio-dark-shield.css'));
report('msc-shield-load.css exists', pathExists('ui/msc-shield-load.css'));
report('msc-layout.css exists', pathExists('ui/msc-layout.css'));
report('msc-components.css exists', pathExists('ui/msc-components.css'));

// 4b. v2 example scaffold
report(
  'examples/nextjs-minimal/package.json exists',
  pathExists('examples/nextjs-minimal/package.json'),
);
report(
  'examples/nextjs-payload/package.json exists',
  pathExists('examples/nextjs-payload/package.json'),
);
report(
  'examples/nextjs-tailwind/package.json exists',
  pathExists('examples/nextjs-tailwind/package.json'),
);
report(
  'examples/nextjs-payload payload.config exists',
  pathExists('examples/nextjs-payload/src/payload.config.ts'),
);
report(
  'examples/nextjs-payload MediaVault exists',
  pathExists('examples/nextjs-payload/src/collections/MediaVault.ts'),
);
report('.devcontainer/devcontainer.json exists', pathExists('.devcontainer/devcontainer.json'));

// 4c. Jedi roadmap P0 guardrails
report('.nvmrc exists (Node 20 lock)', pathExists('.nvmrc'));
report('.github/workflows/ci.yml exists', pathExists('.github/workflows/ci.yml'));
report('health.mjs exists', pathExists('scripts/health.mjs'));
report('msc-update.mjs exists', pathExists('scripts/msc-update.mjs'));
report('msc-forge.mjs exists', pathExists('scripts/msc-forge.mjs'));

// 5. Automation & lifecycle
report('Husky pre-commit exists', pathExists('.husky/pre-commit'));
if (pathExists('.husky/pre-commit')) {
  const hook = readFileSync(join(MSC_PROJECT_ROOT, '.husky/pre-commit'), 'utf8');
  report('pre-commit runs verify:mcp', /verify:mcp/.test(hook));
  report('pre-commit runs msc:validate-env', /msc:validate-env/.test(hook));
}
report('quickstart.mjs exists', pathExists('scripts/quickstart.mjs'));
report('validate-env.mjs exists', pathExists('scripts/validate-env.mjs'));
report('msc-kill-all-dev-ports.mjs exists', pathExists('scripts/msc-kill-all-dev-ports.mjs'));
report('msc-log-event.mjs exists', pathExists('scripts/msc-log-event.mjs'));
report('msc-generate-inventory.mjs exists', pathExists('scripts/msc-generate-inventory.mjs'));
report('msc-verify-mcp.mjs exists', pathExists('scripts/msc-verify-mcp.mjs'));

try {
  const pkg = JSON.parse(readFileSync(join(MSC_PROJECT_ROOT, 'package.json'), 'utf8'));
  const required = [
    'bootstrap',
    'msc:quickstart',
    'msc:validate-env',
    'msc:kill-dev-port',
    'msc:dev:example',
    'msc:health',
    'msc:update',
    'msc:forge',
    'verify:mcp',
    'verify:local',
    'log',
    'inventory',
    'grade',
    'check:all',
    'test:integration',
  ];
  const missingScripts = required.filter((s) => !pkg.scripts?.[s]);
  report(
    missingScripts.length === 0
      ? 'package.json lifecycle scripts present'
      : `Missing scripts: ${missingScripts.join(', ')}`,
    missingScripts.length === 0,
  );
  report('package.json main is not PHP', !/\.php$/.test(pkg.main ?? ''));
  report('packageManager field present', Boolean(pkg.packageManager));
  report(
    'engines.node locks to 20.x–24.x range',
    />=20/.test(pkg.engines?.node ?? '') && /<25/.test(pkg.engines?.node ?? ''),
  );
  report('license is MIT', pkg.license === 'MIT');
} catch {
  report('package.json expanded checks readable', false);
}

report('.env.example exists at root', pathExists('.env.example'));
report('LICENSE exists', pathExists('LICENSE'));
report('docs/TROUBLESHOOTING.md exists', pathExists('docs/TROUBLESHOOTING.md'));
report('docs/ARCHITECTURE.md exists', pathExists('docs/ARCHITECTURE.md'));
report('CHANGELOG.md exists', pathExists('CHANGELOG.md'));
report('docs/CONTRIBUTING.md exists', pathExists('docs/CONTRIBUTING.md'));
report('biome.json exists', pathExists('biome.json'));
report('.husky/pre-push exists', pathExists('.husky/pre-push'));
report('global.mdc rules migrated', pathExists('.cursor/rules/global.mdc'));

const diviCanonical = 'core/core-Divi-Scriptz.js';
const diviLegacy = 'core/coreDiviScriptz.js';
report(
  'core/core-Divi-Scriptz.js exact casing',
  pathExists(diviCanonical) && !pathExists(diviLegacy),
);

// 6. Vader template factory (v2.3+)
report(
  'templates/full-stack/vader-site vader.css exists',
  pathExists('templates/full-stack/vader-site/app/(app)/vader.css'),
);
report('vader_protocol_skill.md exists', pathExists('.cursor/skills/vader_protocol_skill.md'));
report('vader_animations_skill.md exists', pathExists('.cursor/skills/vader_animations_skill.md'));
let releaseMatchesVersion = false;
try {
  const pkgVer = JSON.parse(readFileSync(join(MSC_PROJECT_ROOT, 'package.json'), 'utf8')).version;
  releaseMatchesVersion = pathExists(`docs/releases/RELEASE_v${pkgVer}.md`);
} catch {
  releaseMatchesVersion = false;
}
report('docs/releases/RELEASE_v*.md matches package.json version', releaseMatchesVersion);
report('docs/DEPLOY_TO_HOSTINGER.md exists', pathExists('docs/DEPLOY_TO_HOSTINGER.md'));
let vaderEnvStaticFirst = false;
try {
  const vaderEnv = readFileSync(
    join(MSC_PROJECT_ROOT, 'templates/full-stack/vader-site/.env.example'),
    'utf8',
  );
  vaderEnvStaticFirst = /ENABLE_PAYLOAD=false/.test(vaderEnv);
} catch {
  vaderEnvStaticFirst = false;
}
report('vader-site .env.example ENABLE_PAYLOAD=false default', vaderEnvStaticFirst);
report(
  'no page.module.css in vader-site template',
  !pathExists('templates/full-stack/vader-site/app/(app)/page.module.css') &&
    !pathExists('templates/full-stack/vader-site/app/(app)/BackToTop.module.css'),
);
let biomeNoDeprecatedTemplateGlob = false;
try {
  const biomeRaw = readFileSync(join(MSC_PROJECT_ROOT, 'biome.json'), 'utf8');
  biomeNoDeprecatedTemplateGlob = !biomeRaw.includes('!templates/**');
} catch {
  biomeNoDeprecatedTemplateGlob = false;
}
report('biome.json avoids deprecated !templates/** ignore', biomeNoDeprecatedTemplateGlob);

const pct = score.total > 0 ? ((score.passed / score.total) * 100).toFixed(0) : '0';
console.log(`\n--- 🏁 Final Grade: ${score.passed}/${score.total} (${pct}%) ---`);
if (score.failures.length > 0) {
  console.error('\nFailures:');
  for (const f of score.failures) {
    console.error(`  - FAILED CHECK: ${f}`);
  }
}
process.exit(score.passed === score.total ? 0 : 1);
