#!/usr/bin/env node

import './lib/msc-load-env.mjs';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const BACKUP_ROOT = process.env.MSC_BACKUP_ROOT || 'G:\\Cursor_Project_BackUpz\\Vader-Engine';
const SOURCE = REPO_ROOT;

const args = process.argv.slice(2);
const isFullBackup = args.includes('--full') || args.includes('-f');
const isStandardBackup = args.includes('--standard') || args.includes('-s');
const customName = args.find((a) => !a.startsWith('-')) || null;

function getLatestBackup() {
  if (!fs.existsSync(BACKUP_ROOT)) return null;
  const folders = fs
    .readdirSync(BACKUP_ROOT)
    .filter(
      (f) => f.startsWith('Vader-Engine-v') && fs.statSync(path.join(BACKUP_ROOT, f)).isDirectory(),
    )
    .sort();
  return folders.length ? folders[folders.length - 1] : null;
}

function incrementVersion(folderName) {
  const match = folderName.match(/Vader-Engine-v(\d+)(?:-([a-z]))?/);
  if (!match) return 'Vader-Engine-v1-a';
  const num = parseInt(match[1], 10);
  const letter = match[2];
  if (letter) {
    const nextLetter = String.fromCharCode(letter.charCodeAt(0) + 1);
    if (nextLetter <= 'z') return `Vader-Engine-v${num}-${nextLetter}`;
    return `Vader-Engine-v${num + 1}-a`;
  }
  return `Vader-Engine-v${num + 1}`;
}

async function main() {
  const latest = getLatestBackup();
  const suggested = latest ? incrementVersion(latest) : 'Vader-Engine-v1-a';
  const destName = customName || suggested;
  const fullDestPath = path.join(BACKUP_ROOT, destName);

  const backupType = isFullBackup ? 'FULL' : 'STANDARD';

  console.log(`\n📂 Source: ${SOURCE}`);
  console.log(`📂 Destination: ${fullDestPath}`);
  console.log(`📦 Type: ${backupType}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  if (!fs.existsSync(fullDestPath)) {
    fs.mkdirSync(fullDestPath, { recursive: true });
  }

  let cmd = `robocopy "${SOURCE}" "${fullDestPath}" /MIR`;

  if (isStandardBackup || (!isFullBackup && !isStandardBackup)) {
    cmd += ' /XD node_modules .next logs test-results vader-site-deploy';
    cmd += ' /XF .env.local';
  }

  try {
    execSync(cmd, { stdio: 'inherit', shell: 'powershell.exe' });
    console.log(`\n✅ Backup complete: ${destName}`);
  } catch (error) {
    if (error.status === 1) {
      console.log(`\n✅ Backup complete: ${destName}`);
    } else {
      console.error(`\n❌ Backup failed: ${error.message}`);
      process.exit(1);
    }
  }
}

main();
