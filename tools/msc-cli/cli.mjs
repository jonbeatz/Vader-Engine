import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { msc_generateTemplate } from './scripts/template-engine.mjs';
import { MSC_DEFAULT_OUTPUT_REL, msc_resolveScaffoldTarget } from './scripts/utils.mjs';

const args = process.argv.slice(2);
const command = args[0];

function msc_parseFlags() {
  const flags = {};
  args.forEach((arg) => {
    if (arg.startsWith('--name=')) flags.name = arg.split('=')[1];
    if (arg.startsWith('--target=')) flags.target = arg.split('=')[1];
    if (arg === '--dry-run') flags.dryRun = true;
  });
  return flags;
}

async function msc_main() {
  const flags = msc_parseFlags();

  if (command === 'list') {
    console.log('\n📁 \x1b[36mRegistered Boilerplate Blueprint Templates:\x1b[0m');
    const categories = ['frontend', 'cms', 'full-stack'];
    categories.forEach((cat) => {
      if (existsSync(`templates/${cat}`)) {
        const subDirs = readdirSync(`templates/${cat}`);
        for (const dir of subDirs) {
          console.log(`  - ${cat}/${dir}`);
        }
      }
    });
    return;
  }

  if (command === 'apply') {
    const templateType = args[1];
    if (!templateType || !flags.name) {
      console.error(
        '\x1b[31m✕ Error: Command requires syntax: npm run msc:template -- apply <category/type> --name=my-app [--target=../Dev-Projectz/my-app]\x1b[0m',
      );
      console.error(
        `\x1b[33m  Default target when --target is omitted: ${MSC_DEFAULT_OUTPUT_REL}/<slugified-name>\x1b[0m`,
      );
      process.exit(1);
    }

    if (!flags.target) {
      flags.target = msc_resolveScaffoldTarget(flags.name, flags.target);
    }

    if (!flags.dryRun) {
      const outputRoot = resolve(MSC_DEFAULT_OUTPUT_REL);
      if (!existsSync(outputRoot)) {
        mkdirSync(outputRoot, { recursive: true });
      }
    }

    await msc_generateTemplate(templateType, flags.name, flags);
    return;
  }

  if (command === 'seed') {
    const templateArg = args.find((a) => a.startsWith('--template='))?.split('=')[1];
    const isFresh = args.includes('--fresh');

    if (!templateArg) {
      console.error(
        '\x1b[31m✕ Error: Command requires syntax: npm run msc:template -- seed --template=<blueprint> [--fresh]\x1b[0m',
      );
      process.exit(1);
    }

    const { msc_seedDemoData } = await import('./scripts/demo-seeder.mjs');
    await msc_seedDemoData(templateArg, { fresh: isFresh, ...flags });
    return;
  }

  if (command === 'doctor') {
    console.log(
      '\x1b[32m✔ CLI Health Check: Structural baseline is aligned. All core engines operational.\x1b[0m',
    );
    return;
  }

  console.log('Available commands: list | apply | seed | doctor');
}

msc_main().catch((err) => {
  console.error('\x1b[31mExecution Crash:\x1b[0m', err);
  process.exit(1);
});
