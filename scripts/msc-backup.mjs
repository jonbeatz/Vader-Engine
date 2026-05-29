#!/usr/bin/env node

import './lib/msc-load-env.mjs';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const DEFAULT_BACKUP_ROOT = 'G:\\Cursor_Project_BackUpz';
const STANDARD_DIRS = ['node_modules', '.next', 'logs', 'test-results', 'vader-site-deploy'];

const args = process.argv.slice(2);
const isFullBackup = args.includes('--full') || args.includes('-f');
const isStandardBackup = args.includes('--standard') || args.includes('-s');
const skipConfirm = args.includes('--yes') || args.includes('-y');
const customName = args.find((a) => !a.startsWith('-')) || null;

function getProjectName() {
  try {
    const pkgPath = path.join(REPO_ROOT, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      if (pkg.name && typeof pkg.name === 'string') {
        return pkg.name.replace(/^@/, '').replace(/\//g, '-');
      }
    }
  } catch {
    /* use folder name */
  }
  return path.basename(REPO_ROOT);
}

function defaultBackupFolder(projectName) {
  const stamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  return `${projectName}-backup-${stamp}`;
}

function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

function createReadline() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

async function resolveBackupPlan(rl) {
  const projectName = getProjectName();
  const suggestedFolder = customName || defaultBackupFolder(projectName);

  let backupRoot = process.env.MSC_BACKUP_ROOT?.trim() || '';
  let backupFolder = customName || '';
  const interactive = process.stdin.isTTY;

  console.log(`
╔══════════════════════════════════════════════════════════════╗
║  📦 Portable Backup System                                   ║
╚══════════════════════════════════════════════════════════════╝

Current project: ${projectName}
Source: ${REPO_ROOT}
`);

  if (interactive) {
    if (!backupRoot) {
      const answer = await askQuestion(rl, `Backup drive/folder [${DEFAULT_BACKUP_ROOT}]: `);
      backupRoot = answer.trim() || DEFAULT_BACKUP_ROOT;
    } else {
      console.log(`Backup root (from MSC_BACKUP_ROOT): ${backupRoot}`);
    }

    if (!backupFolder) {
      const folderAnswer = await askQuestion(rl, `Backup folder name [${suggestedFolder}]: `);
      backupFolder = folderAnswer.trim() || suggestedFolder;
    }
  } else {
    backupRoot = backupRoot || DEFAULT_BACKUP_ROOT;
    backupFolder = backupFolder || suggestedFolder;
    console.log(`Backup root: ${backupRoot}`);
    console.log(`Backup folder: ${backupFolder}`);
  }

  const fullBackupPath = path.join(backupRoot, backupFolder);
  const backupType = isFullBackup ? 'FULL' : 'STANDARD';

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📂 Source:      ${REPO_ROOT}
📂 Destination: ${fullBackupPath}
📦 Type:        ${backupType}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

  if (interactive && !skipConfirm) {
    const confirm = await askQuestion(rl, 'Proceed with backup? (y/n): ');
    if (confirm.trim().toLowerCase() !== 'y') {
      console.log('\n❌ Backup cancelled.');
      return null;
    }
  } else if (!interactive && !skipConfirm) {
    console.log('\nNon-interactive session: add --yes to run, or run from a terminal for prompts.');
    return null;
  }

  return { fullBackupPath, backupFolder, backupType };
}

async function main() {
  const rl = createReadline();

  try {
    const plan = await resolveBackupPlan(rl);
    if (!plan) {
      return;
    }

    const { fullBackupPath, backupFolder, backupType } = plan;

    if (!fs.existsSync(fullBackupPath)) {
      fs.mkdirSync(fullBackupPath, { recursive: true });
    }

    let cmd = `robocopy "${REPO_ROOT}" "${fullBackupPath}" /MIR`;

    if (isStandardBackup || (!isFullBackup && !isStandardBackup)) {
      cmd += ` /XD ${STANDARD_DIRS.join(' ')} /XF .env.local`;
      console.log(
        'ℹ️  Standard skips: node_modules, .next, logs, test-results, vader-site-deploy, .env.local\n',
      );
    } else {
      console.log('ℹ️  Full backup: no directory skips (includes node_modules, .next)\n');
    }

    console.log('📦 Creating backup...\n');

    try {
      execSync(cmd, { stdio: 'inherit', shell: 'powershell.exe' });
      console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Backup complete!
📂 Location: ${fullBackupPath}
📦 Type: ${backupType}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
    } catch (error) {
      if (error.status === 1) {
        console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Backup complete!
📂 Location: ${fullBackupPath}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
      } else {
        console.error(`\n❌ Backup failed: ${error.message}`);
        process.exit(1);
      }
    }

    console.log(`Folder: ${backupFolder}`);
  } finally {
    rl.close();
  }
}

main();
