import * as prompts from '@clack/prompts';

import { getProjectDir } from './utils/dir';

import { checkMinimumRequirements } from './create/checkMinimumRequirements';
import { checkProjectDir } from './create/checkProjectDir';
import { getUserInput } from './create/getUserInput';
import { setupEnvFiles } from './create/setupEnvFiles';
import { setupProject } from './create/setupProject';
import { outro } from './create/outro';

export const createProject = async () => {
  await checkMinimumRequirements();

  prompts.intro('Welcome aboard to BOAT (Build Onchain Apps Template)! ⛵️');

  const { project, envVars } = await getUserInput();
  
  const projectDir = getProjectDir(project.name);
  checkProjectDir(projectDir);
  
  await setupProject(projectDir, project);

  setupEnvFiles(projectDir, envVars);

  outro(project.name);

  process.exit(0);
};
