#!/usr/bin/env node
/**
 * Boilerplate-v1 Gold Master structural grading utility.
 * Usage: npm run grade
 */
import './lib/msc-load-env.mjs'

import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { MSC_PROJECT_ROOT } from './lib/msc-load-env.mjs'

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
]

const score = { total: 0, passed: 0, failures: [] }

function report(name, condition) {
  score.total += 1
  if (condition) {
    score.passed += 1
    console.log(`✅ [PASS] ${name}`)
  }
  else {
    score.failures.push(name)
    console.error(`❌ [FAIL] ${name}`)
  }
}

function pathExists(rel) {
  return existsSync(join(MSC_PROJECT_ROOT, rel))
}

console.log('--- 📊 Grading Boilerplate-v1 (Gold Master) ---\n')

// 1. Documentation SSoT
report('Code-Jedi.md exists', pathExists('.cursor/docs/Code-Jedi.md'))
report('TRUTH.md exists', pathExists('.cursor/docs/TRUTH.md'))
report('system-architecture.md exists', pathExists('.cursor/docs/system-architecture.md'))
report('consumer-bootstrap.md exists', pathExists('.cursor/docs/consumer-bootstrap.md'))

// 2. Rules & skills
report('studio-dark-ui.mdc exists', pathExists('.cursor/rules/studio-dark-ui.mdc'))
report('tailwind-shadcn-bridge.mdc exists', pathExists('.cursor/rules/tailwind-shadcn-bridge.mdc'))
report('design-system-rules.mdc exists', pathExists('.cursor/rules/design-system-rules.mdc'))
report('Skills README exists', pathExists('.cursor/skills/README.md'))
report('studio-dark-shield skill exists', pathExists('.cursor/skills/studio-dark-shield.md'))

// 3. MCP registry
try {
  const mcp = JSON.parse(readFileSync(join(MSC_PROJECT_ROOT, '.cursor/mcp.json'), 'utf8'))
  const servers = Object.keys(mcp.mcpServers ?? {})
  report(`MCP registry has 13 servers (found: ${servers.length})`, servers.length === 13)
  const missing = EXPECTED_MCP_SERVERS.filter((s) => !servers.includes(s))
  report(
    missing.length === 0
      ? 'All expected MCP server IDs registered'
      : `Missing MCP servers: ${missing.join(', ')}`,
    missing.length === 0,
  )
}
catch {
  report('MCP registry valid JSON', false)
}

// 4. UI Shield chain
report('msc-shield.css exists', pathExists('ui/msc-shield.css'))
report('msc-shield-load.css exists', pathExists('ui/msc-shield-load.css'))
report('msc-layout.css exists', pathExists('ui/msc-layout.css'))
report('msc-components.css exists', pathExists('ui/msc-components.css'))

// 5. Automation & lifecycle
report('Husky pre-commit exists', pathExists('.husky/pre-commit'))
if (pathExists('.husky/pre-commit')) {
  const hook = readFileSync(join(MSC_PROJECT_ROOT, '.husky/pre-commit'), 'utf8')
  report('pre-commit runs verify:mcp', /verify:mcp/.test(hook))
}
report('msc-log-event.mjs exists', pathExists('scripts/msc-log-event.mjs'))
report('msc-generate-inventory.mjs exists', pathExists('scripts/msc-generate-inventory.mjs'))
report('msc-verify-mcp.mjs exists', pathExists('scripts/msc-verify-mcp.mjs'))

try {
  const pkg = JSON.parse(readFileSync(join(MSC_PROJECT_ROOT, 'package.json'), 'utf8'))
  const required = [
    'verify:mcp',
    'verify:local',
    'log',
    'inventory',
    'grade',
    'check:all',
    'test:integration',
  ]
  const missingScripts = required.filter((s) => !pkg.scripts?.[s])
  report(
    missingScripts.length === 0
      ? 'package.json lifecycle scripts present'
      : `Missing scripts: ${missingScripts.join(', ')}`,
    missingScripts.length === 0,
  )
}
catch {
  report('package.json readable', false)
}

const pct = score.total > 0 ? ((score.passed / score.total) * 100).toFixed(0) : '0'
console.log(`\n--- 🏁 Final Grade: ${score.passed}/${score.total} (${pct}%) ---`)
if (score.failures.length > 0) {
  console.error('\nFailures:')
  for (const f of score.failures) {
    console.error(`  - ${f}`)
  }
}
process.exit(score.passed === score.total ? 0 : 1)
