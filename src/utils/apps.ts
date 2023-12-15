import got from 'got';
import * as fs from 'fs';
import * as path from 'path';
import * as chalk from 'chalk';
import { Stream } from 'stream';
import { promisify } from 'util';
import { extract } from 'tar';
import { makeDir } from './dir';
import { rimraf } from 'rimraf';

import { ROOT_DIR } from './dir';

export const APPS_ENGINE_DIR = `${ROOT_DIR}/.build-onchain-apps`;
export const APPS_DIR = `${APPS_ENGINE_DIR}/apps`;

const pipeline = promisify(Stream.pipeline);

export async function downloadAndExtractApps(): Promise<void> {
  // ensure the apps directory exists
  await makeDir(APPS_DIR);

  return pipeline(
    got.stream(
      'https://codeload.github.com/coinbase/build-onchain-apps/tar.gz/main'
    ),
    extract({ cwd: APPS_ENGINE_DIR, strip: 1 })
  );
}

export const getAppDir = (appName: string) => {
  return path.join(APPS_DIR, appName);
};

export async function removeDownloadedApps() {
  try {
    await rimraf.sync(APPS_ENGINE_DIR);
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
    chalk.blue(
      `Type 'cd apps/${appName}' to navigate into your new onchain app.\n`
    )
  );
  console.log(chalk.blue(`Run 'yarn' to install dependencies.`));
  console.log(chalk.blue(`Run 'yarn dev' to start the development server.`));
};
