import { execSync } from 'child_process';
import { removeDownloadedApps } from './apps';

export function isGitInstalled() {
  try {
    execSync('git --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

export function initGit(appDir: string) {
  try {
    execSync('git init', { cwd: appDir, stdio: 'ignore' });
    removeDownloadedApps(appDir + '/contracts/lib/openzeppelin-contracts');
    removeDownloadedApps(appDir + '/contracts/lib/forge-std');

    execSync(
      'git submodule add https://github.com/openzeppelin/openzeppelin-contracts template/contracts/lib/openzeppelin-contracts',
      {
        cwd: appDir,
      }
    );
    execSync(
      'git submodule add https://github.com/foundry-rs/forge-std template/contracts/lib/forge-std',
      {
        cwd: appDir,
      }
    );
    execSync(
      'git submodule add https://github.com/chiru-labs/ERC721A template/contracts/lib/ERC721A',
      {
        cwd: appDir,
      }
    );
    execSync(
      'git submodule add https://github.com/vectorized/solady template/contracts/lib/solady',
      {
        cwd: appDir,
      }
    );
    execSync(
      'git submodule add https://github.com/dmfxyz/murky template/contracts/lib/murky',
      {
        cwd: appDir,
      }
    );
    return true;
  } catch (e) {
    return false;
  }
}
