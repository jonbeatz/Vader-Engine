import { cpSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { msc_findFreePort, msc_injectVariables, msc_slugify } from './utils.mjs';

/**
 * msc_generateTemplate: Clones blueprints and transforms metadata parameters safely
 */
export async function msc_generateTemplate(templateType, targetName, options = {}) {
  const sourceDir = resolve(`templates/${templateType}`);

  if (!existsSync(sourceDir)) {
    console.error(
      `\x1b[31m✕ Error: Selected template blueprint [templates/${templateType}] does not exist.\x1b[0m`,
    );
    process.exit(1);
  }

  const targetDir = resolve(options.target || '');

  if (options.dryRun) {
    console.log(`\n\x1b[33m[DRY-RUN] Scaffolding Strategy Planned:\x1b[0m`);
    console.log(`  - Source Blueprint: templates/${templateType}`);
    console.log(`  - Intended Target:  ${targetDir}`);
    console.log(`  - Dynamic Port Injection Enabled (Base 3002)`);
    return;
  }

  cpSync(sourceDir, targetDir, { recursive: true });

  const assignedPort = await msc_findFreePort(3002);

  const variableMap = {
    PROJECT_NAME: targetName,
    PROJECT_SLUG: msc_slugify(targetName),
    MSC_VERSION: '2.5.0',
    PORT: assignedPort.toString(),
    VADER_BG: '#121212',
    VADER_SURFACE: '#1c1c1c',
  };

  const walkAndInject = (dir) => {
    const files = readdirSync(dir);
    for (const file of files) {
      const fullPath = join(dir, file);
      if (statSync(fullPath).isDirectory()) {
        if (!file.includes('node_modules') && !file.includes('.git')) {
          walkAndInject(fullPath);
        }
      } else if (
        /\.(ts|js|mjs|tsx|jsx|json|md|yml|yaml|css|env|php)$/i.test(file) ||
        file.startsWith('.env')
      ) {
        msc_injectVariables(fullPath, variableMap);
      }
    }
  };

  walkAndInject(targetDir);
  console.log(
    `\x1b[32m✔ Success: Scaffolding routine executed cleanly at ${targetDir} (Assigned Port: ${assignedPort})\x1b[0m`,
  );
}
