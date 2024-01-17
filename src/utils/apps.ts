import * as chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import { rimraf } from 'rimraf';

import { execSync } from 'child_process';

export const APPS_ENGINE_DIR = `temp-build-onchain-apps`;

export async function downloadAndExtractApps(): Promise<void> {
  // ensure the apps directory exists
  removeDownloadedApps(APPS_ENGINE_DIR);
  execSync(
    'git clone  https://github.com/coinbase/build-onchain-apps.git temp-build-onchain-apps',
    {
      stdio: 'ignore',
    }
  );
}

export const getAppDir = () => {
  return APPS_ENGINE_DIR + '/template';
};

export async function removeDownloadedApps(app: string) {
  try {
    await rimraf.sync(app);
  } catch (e) {
    console.error('Error while removing directories:', e);
  }
}

export const updatePackageJson = (
  projectDir: string,
  appName: string
): boolean => {
  const packageJsonPath = path.join(projectDir, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.name = appName;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    return true;
  } else {
    console.warn(chalk.yellow('package.json not found in the app.'));
    return false;
  }
};

export const displayFinalInstructions = (appName: string) => {
  console.log(chalk.green(`Onchain app '${appName}' created successfully! 🚀`));
  console.log(
    chalk.blue(`Type 'cd ${appName}' to navigate into your new onchain app.\n`)
  );
  console.log(chalk.blue(`Run 'yarn' to install dependencies.`));
  console.log(chalk.blue(`Run 'yarn dev' to start the development server.`));
};
