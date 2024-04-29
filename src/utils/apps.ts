import * as color from 'picocolors';
import * as fs from 'fs';
import * as path from 'path';
import { rimraf } from 'rimraf';

export const APPS_ENGINE_DIR = `temp-build-onchain-apps`;

export const getAppDir = () => {
  return APPS_ENGINE_DIR + '/template';
};

export async function removeDownloadedApps(app: string) {
  try {
    rimraf.sync(app);
  } catch (e) {
    console.error('Error while removing directories:', e);
  }
}

export async function renameDownloadedFile(oldName: string, newName: string) {
  try {
    fs.renameSync(oldName, newName);
  } catch (e) {
    console.error('Error while renaming directories:', e);
  }
}

export const updatePackageJson = (
  projectDir: string,
  projectName: string
): boolean => {
  const packageJsonPath = path.join(projectDir, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.name = projectName;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    return true;
  } else {
    console.warn(color.yellow('package.json not found in the app.'));
    return false;
  }
};
