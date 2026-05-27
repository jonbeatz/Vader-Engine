import { createRequire } from 'node:module';
import path from 'node:path';
import { msc_getRepoRoot } from './msc-repo-root';

type SpawnBridge = typeof import('../../../scripts/lib/msc-spawn-script.mjs');
type LogBridge = typeof import('../../../scripts/lib/msc-log-buffer.mjs');

function msc_requireAtRoot<T>(relativePath: string): T {
  const root = msc_getRepoRoot();
  const req = createRequire(path.join(root, 'package.json'));
  return req(path.join(root, relativePath)) as T;
}

function msc_loadSpawn(): SpawnBridge {
  return msc_requireAtRoot('scripts/lib/msc-spawn-script.mjs');
}

function msc_loadLog(): LogBridge {
  return msc_requireAtRoot('scripts/lib/msc-log-buffer.mjs');
}

export async function msc_bridgeHealth() {
  return msc_loadSpawn().msc_runHealthJson();
}

export async function msc_bridgeGrade() {
  return msc_loadSpawn().msc_runGrade();
}

export async function msc_bridgeRunScript(script: string, args: string[] = []) {
  return msc_loadSpawn().msc_runAllowedScript(script, args);
}

export async function msc_bridgeKillPort(port: number) {
  return msc_loadSpawn().msc_killPort(port);
}

export async function msc_bridgeLogSnapshot() {
  return msc_loadLog().msc_getLogSnapshot();
}

export async function msc_bridgeSubscribeLog(
  onLine: (entry: { ts: string; line: string; level: 'info' | 'error' }) => void,
) {
  return msc_loadLog().msc_subscribeLog(onLine);
}
