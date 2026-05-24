#!/usr/bin/env node
/**
 * Strips Cursor agent co-author trailers from commit message files.
 * Invoked by .husky/prepare-commit-msg — JonBeatz-only commit policy.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const msgFile = process.argv[2];
if (!msgFile) process.exit(0);

const content = readFileSync(msgFile, 'utf8');
const cleaned = content
  .split(/\r?\n/)
  .filter((line) => !/^\s*Co-authored-by:\s*Cursor\s*<cursoragent@cursor\.com>\s*$/i.test(line))
  .join('\n')
  .replace(/\n{3,}/g, '\n\n')
  .trimEnd();

writeFileSync(msgFile, cleaned ? `${cleaned}\n` : '');
