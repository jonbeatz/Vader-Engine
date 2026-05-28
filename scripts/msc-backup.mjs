#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const SOURCE = 'D:\\Cursor_Projectz\\Vader-Engine';
const BACKUP_ROOT = 'G:\\Cursor_Project_BackUpz\\Vader-Engine';

// Parse command line arguments
const args = process.argv.slice(2);
const isFullBackup = args.includes('--full') || args.includes('-f');
const isStandardBackup = args.includes('--standard') || args.includes('-s');
const customName = args.find((a) => !a.startsWith('-')) || null;

// Find latest backup folder
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

// Increment version
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

// Run backup
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
