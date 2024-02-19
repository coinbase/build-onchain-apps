import * as color from 'picocolors';
import * as prompts from '@clack/prompts';
import { note } from './note';

export function outro(projectName: string) {
  note(
    `Run ${color.blue(
      `cd ${projectName}/web`
    )} to navigate into your new onchain app.

Run ${color.blue('yarn')} to install dependencies.

Run ${color.blue('yarn dev')} to start the development server.`,
    'Next steps'
  );

  prompts.outro(
    `Problems? ${color.underline(
      color.cyan('https://github.com/coinbase/build-onchain-apps/issues')
    )}`
  );
}
