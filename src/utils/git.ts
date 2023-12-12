import { execSync } from 'child_process';

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
    execSync('git add -A', { cwd: appDir, stdio: 'ignore' });
    execSync('git commit -m "Initial commit from Create Onchain App"', {
      cwd: appDir,
      stdio: 'ignore',
    });
    return true;
  } catch (e) {
    return false;
  }
}
