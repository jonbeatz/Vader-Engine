/**
 * Sync GitHub repository About + merge settings via authenticated `gh` CLI.
 * Repo slug resolved from root package.json `repository.url`.
 */
import '../../../scripts/lib/msc-load-env.mjs';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const MSC_REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');

const MSC_GITHUB_DESCRIPTION =
  process.env.MSC_GITHUB_DESCRIPTION ??
  'Cursor-native Vader Engine — 61-point grader, Vader Protocol templates, Next.js/Payload sandboxes, MCP-ready. Documentation: https://github.com/jonbeatz/Vader-Engine#documentation-map';

const MSC_GITHUB_HOMEPAGE = process.env.MSC_GITHUB_HOMEPAGE ?? 'https://vaderlabz.com';

function msc_resolveGithubRepo() {
  const pkgPath = resolve(MSC_REPO_ROOT, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  const url = pkg?.repository?.url ?? '';
  const match = url.match(/github\.com[:/]+([^/]+\/[^/]+?)(?:\.git)?\/?$/i);
  if (!match) {
    throw new Error(
      `[msc:github:sync] Cannot parse owner/repo from package.json repository.url: ${url || '(missing)'}`,
    );
  }
  return match[1];
}

function msc_runStep(label, fn) {
  process.stdout.write(`\n▶ ${label}…\n`);
  try {
    fn();
    console.log(`\x1b[32m✔ ${label} — OK\x1b[0m`);
    return true;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`\x1b[31m✕ ${label} — FAILED\x1b[0m`);
    if (msg) console.error(`  ${msg}`);
    return false;
  }
}

function msc_execGh(args) {
  execSync('gh', args, { stdio: 'inherit', cwd: MSC_REPO_ROOT });
}

export function msc_githubSync() {
  console.log('\n\x1b[36m[msc:github:sync]\x1b[0m GitHub repository settings sync\n');

  const ghOk = msc_runStep('Check GitHub CLI (`gh --version`)', () => {
    execSync('gh --version', { stdio: 'inherit', cwd: MSC_REPO_ROOT, shell: true });
  });

  if (!ghOk) {
    console.error(`
\x1b[33mInstall GitHub CLI:\x1b[0m
  Windows: winget install GitHub.cli
  macOS:   brew install gh
  Linux:   https://cli.github.com/

Then authenticate: \x1b[36mgh auth login\x1b[0m
`);
    process.exit(1);
  }

  const repo = msc_resolveGithubRepo();
  console.log(`Repository: \x1b[36m${repo}\x1b[0m`);

  const results = [];

  results.push(
    msc_runStep('Update repository description and homepage (`gh repo edit`)', () => {
      msc_execGh([
        'repo',
        'edit',
        repo,
        '--description',
        MSC_GITHUB_DESCRIPTION,
        '--homepage',
        MSC_GITHUB_HOMEPAGE,
      ]);
    }),
  );

  results.push(
    msc_runStep('Enable delete head branch on merge (`gh api`)', () => {
      msc_execGh(['api', `repos/${repo}`, '-f', 'delete_branch_on_merge=true']);
    }),
  );

  const failed = results.filter((r) => !r).length;
  console.log('\n--- Summary ---');
  console.log(`  Passed: ${results.length - failed}/${results.length}`);

  if (failed > 0) {
    console.error(
      '\x1b[31m[msc:github:sync] One or more steps failed. Ensure `gh auth login` has repo admin scope.\x1b[0m',
    );
    process.exit(1);
  }

  console.log('\x1b[32m[msc:github:sync] All GitHub settings synced.\x1b[0m\n');
}
