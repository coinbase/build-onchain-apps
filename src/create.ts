import * as chalk from 'chalk';
import * as fs from 'fs';
import * as inquirer from 'inquirer';
import {
  downloadAndExtractTemplates,
  getTemplateDir,
  getTemplateChoices,
  updatePackageJson,
  displayFinalInstructions,
  removeDownloadedTemplates,
} from './utils/templates';
import { isRootDirWriteable, getProjectDir } from './utils/dir';

/**
 * Responsible for copying the 
 * onchain template and create new project.
 */
export const createProject = async (templateName: string) => {
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

  // Download the template from github.com/base-org/build-onchain-apps/templates and extract it
  await downloadAndExtractTemplates();
  const templateChoices = getTemplateChoices();
  if (templateName && !templateChoices.includes(templateName)) {
    console.log(
      chalk.yellow(
        `${templateName} does not exists. Choose one of the following templates: \n`
      )
    );
  }

  if (!templateName || !templateChoices.includes(templateName)) {
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'templateName',
        message: 'Choose a template:',
        choices: templateChoices,
      },
    ]);
    templateName = answer.templateName;
  }

  const appNameAnswer = await inquirer.prompt([
    {
      type: 'input',
      name: 'appName',
      message: 'Enter the name for your new onchain app:',
      validate: (input: string) => !!input || 'Project name cannot be empty.',
    },
  ]);

  const appName = appNameAnswer.appName;
  const projectDir = getProjectDir(appName);

  if (fs.existsSync(projectDir)) {
    console.error(
      chalk.red('A directory with the project name already exists.')
    );
    removeDownloadedTemplates();
    process.exit(1);
  }

  fs.cpSync(getTemplateDir(templateName), projectDir, { recursive: true });
  const isPackageJsonUpdated = updatePackageJson(projectDir, appName);

  if (isPackageJsonUpdated) {
    displayFinalInstructions(appName);
  }

  removeDownloadedTemplates();
};
