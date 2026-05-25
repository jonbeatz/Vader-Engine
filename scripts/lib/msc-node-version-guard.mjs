import process from 'node:process';

const major = Number(process.versions.node.split('.')[0]);
if (major < 20 || major >= 25) {
  console.error(
    `[msc:node-guard] Node ${process.versions.node} not supported — use 20.x–24.x (package.json engines)`,
  );
  console.error('[msc:node-guard] Run: npm run msc:check-node');
  process.exit(1);
}
