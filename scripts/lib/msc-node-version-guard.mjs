import process from 'node:process';

const major = Number(process.versions.node.split('.')[0]);
if (major < 20 || (major !== 20 && major !== 24)) {
  console.error(`[msc:node-guard] Node 20.x or 24.x required; found ${process.versions.node}`);
  process.exit(1);
}
