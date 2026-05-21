#!/usr/bin/env node
/**
 * MSC defensive re-brander — project cloning asset (Roadmap §3.1)
 * Protected namespace gate + --dry-run simulation
 * Powered by the MSC Media Engine
 */
import './lib/msc-load-env.mjs'

import fs from 'node:fs'
import path from 'node:path'
import { MSC_PROJECT_ROOT } from './lib/msc-load-env.mjs'

// Strict pattern matching required under the Vader Protocol
const protectedNamespaceRegex = /(?:\.msc-|^msc:|^msc_)/i
const isDryRun = process.argv.includes('--dry-run')

function processFileMutation(filePath, searchStr, replaceStr) {
  let content = fs.readFileSync(filePath, 'utf8')

  if (protectedNamespaceRegex.test(searchStr) || protectedNamespaceRegex.test(filePath)) {
    console.log(`\x1b[31m[SHIELD ACTIVE] Prevented mutation on protected target: ${filePath}\x1b[0m`)
    return false
  }

  const updatedContent = content.replaceAll(searchStr, replaceStr)

  if (content !== updatedContent) {
    if (isDryRun) {
      console.log(`\x1b[33m[DRY RUN] Would mutate file: ${filePath}\x1b[0m`)
    }
    else {
      fs.writeFileSync(filePath, updatedContent, 'utf8')
      console.log(`\x1b[32m[MUTATED] Updated entries in file: ${filePath}\x1b[0m`)
    }
    return true
  }

  return false
}

const positional = process.argv.slice(2).filter((a) => a !== '--dry-run')
if (positional.length < 3) {
  console.log('Usage: npm run msc:forge -- <file> <search> <replace> [--dry-run]')
  console.log('Example: npm run msc:forge -- README.md "Boilerplate-v1" "MyApp" --dry-run')
  process.exit(1)
}

const [relFile, searchStr, replaceStr] = positional
const filePath = path.resolve(MSC_PROJECT_ROOT, relFile)

if (!fs.existsSync(filePath)) {
  console.error(`[msc:forge] File not found: ${filePath}`)
  process.exit(1)
}

processFileMutation(filePath, searchStr, replaceStr)
