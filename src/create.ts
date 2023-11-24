import * as chalk from 'chalk';
import * as fs from 'fs';
import * as inquirer from 'inquirer';
import {
  downloadAndExtractApps,
  getAppDir,
  updatePackageJson,
  displayFinalInstructions,
  removeDownloadedApps,
} from './utils/apps';
import { isRootDirWriteable, getProjectDir } from './utils/dir';

// Default location for all Onchain Applications
const APPS_DIR = 'apps/';

/**
 * Responsible for copying the
 * onchain app and create new project.
 */
export const createProject = async () => {
  // Check if the current directory is writeable
  // If not, exit the process
  if (!(await isRootDirWriteable())) {
    console.error(
      chalk.red(
        'The application path is not writable, please check folder permissions and try again.'
      )
    );
    console.error(
      chalk.white(
        'It is likely you do not have write permissions for this folder.'
      )
    );
    process.exit(1);
  }

  console.log(
    `${chalk.cyan(
      'Downloading files from base-org/build-onchain-apps. This might take a moment... \n'
    )}`
  );

  // Download the app from github.com/base-org/build-onchain-apps/apps and extract it
  await downloadAndExtractApps();
  const newAppNameAnswer = await inquirer.prompt([
    {
      type: 'input',
      name: 'newAppName',
      message: 'Enter the name for your new Onchain app:',
      validate: (input: string) => !!input || 'Onchain App name cannot be empty.',
    },
  ]);

  const newAppName = newAppNameAnswer.newAppName;
  const newAppDir = getProjectDir(APPS_DIR + newAppName);
  
  if (fs.existsSync(newAppDir)) {
    console.error(
      chalk.red('A directory with the App name already exists.')
    );
    removeDownloadedApps();
    process.exit(1);
  }

  fs.cpSync(getAppDir(APPS_DIR + '/build-onchain-apps'), newAppDir, { recursive: true });
  const isPackageJsonUpdated = updatePackageJson(newAppDir, newAppName);

  if (isPackageJsonUpdated) {
    displayFinalInstructions(newAppName);
  }
  removeDownloadedApps();
};
