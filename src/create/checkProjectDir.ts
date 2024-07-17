import * as fs from 'fs';
import * as prompts from '@clack/prompts';
import * as color from 'picocolors';
import { APPS_ENGINE_DIR, removeDownloadedApps } from '../utils/apps';

export function checkProjectDir(projectDir: string) {
  if (fs.existsSync(projectDir)) {
    if (projectDir === '.') {
      const files = fs.readdirSync(projectDir);
      if (files.length > 0) {
        prompts.log.error(color.red(`The directory ${projectDir} is not empty.`));
        removeDownloadedApps(APPS_ENGINE_DIR);
        process.exit(1);
      }
    } else {
      prompts.log.error(color.red(`Directory ${projectDir} already exists.`));
      removeDownloadedApps(APPS_ENGINE_DIR);
      process.exit(1);
    }
  }
}