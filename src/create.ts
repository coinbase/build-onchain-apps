import * as chalk from 'chalk';
import * as fs from 'fs';
import * as inquirer from 'inquirer';
import {
  downloadAndExtractApps,
  getAppDir,
  updatePackageJson,
  displayFinalInstructions,
  removeDownloadedApps,
  APPS_ENGINE_DIR,
} from './utils/apps';
import { isRootDirWriteable, getProjectDir } from './utils/dir';
import { initGit, isGitInstalled } from './utils/git';

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

  if (!isGitInstalled()) {
    console.error(chalk.white('Please install git and then continue'));
    process.exit(1);
  }

  console.log(
    `${chalk.cyan(
      'Downloading files from coinbase/build-onchain-apps. This might take a moment... \n'
    )}`
  );

  // Download the app from github.com/coinbase/build-onchain-apps/apps and extract it
  await downloadAndExtractApps();
  const newAppNameAnswer = await inquirer.prompt([
    {
      type: 'input',
      name: 'newAppName',
      message: 'Enter the name for your new onchain app:',
      validate: (input: string) =>
        !!input || 'onchain app name cannot be empty.',
    },
  ]);

  const newAppName = newAppNameAnswer.newAppName;
  const newAppDir = getProjectDir(newAppName);

  if (fs.existsSync(newAppDir)) {
    console.error(chalk.red('A directory with the App name already exists.'));
    removeDownloadedApps(APPS_ENGINE_DIR);
    process.exit(1);
  }

  fs.cpSync(getAppDir(), newAppDir, {
    recursive: true,
  });

  const isPackageJsonUpdated = updatePackageJson(newAppDir, newAppName);
  const isWebPackageJsonUpdated = updatePackageJson(
    newAppDir + '/web',
    newAppName
  );

  if (isPackageJsonUpdated && isWebPackageJsonUpdated) {
    console.log(chalk.green(`Initializing Git and Foundry... \n`));
  }
  if (!initGit(newAppDir)) {
    console.error(chalk.white('Error initializing Git and Foundry'));
    process.exit(1);
  }
  displayFinalInstructions(newAppName);

  removeDownloadedApps(APPS_ENGINE_DIR);
};
