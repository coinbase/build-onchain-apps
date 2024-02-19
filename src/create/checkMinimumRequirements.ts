import * as color from 'picocolors';
import { isRootDirWriteable } from '../utils/dir';
import { isGitInstalled } from '../utils/git';

export async function checkMinimumRequirements() {
  if (!(await isRootDirWriteable())) {
    console.error(
      color.red(
        'The application path is not writable, please check folder permissions and try again.'
      )
    );
    console.error(
      color.white(
        'It is likely you do not have write permissions for this folder.'
      )
    );
    process.exit(1);
  }

  if (!isGitInstalled()) {
    console.error(color.white('Please install git and then continue'));
    process.exit(1);
  }
}
