import * as fs from 'fs';
import * as path from 'path';

export const ROOT_DIR = process.cwd();

export function makeDir(root: string, options = { recursive: true }) {
  return fs.promises.mkdir(root, options);
}

export async function isWriteable(root: string) {
  try {
    await fs.promises.access(root, (fs.constants || fs).W_OK);
    return true;
  } catch (err) {
    return false;
  }
}

export async function isRootDirWriteable() {
  return isWriteable(ROOT_DIR);
}

export function getProjectDir(appName: string) {
  return path.join(ROOT_DIR, appName);
}
