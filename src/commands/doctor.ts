import * as fs from 'fs';
import { warn, error } from '../utils/print';
import { yellow, red, blue } from 'chalk';

function findKeyValue({ path, name }) {
  const content = fs.readFileSync(path, { encoding: 'utf8' });
  const line = content
    .split(/\r?\n/) // Split by new line
    .map((line) => {
      const [key, value] = line.split('=');
      return [key, value];
    })
    .find(([key]) => {
      return key === name;
    });

  if (line === undefined) {
    error(`Missing ${red(name)} in ${path}`);
    return [];
  }

  const [key, value] = line;
  return [key, value];
}

function checkEnvVariables(path: string, variables) {
  console.log(`\n${blue('[INFO]:')}`, `Checking ${path}`);

  if (!isFilePresent({ path })) return;

  variables.map(({ name, predicates }) => {
    const [key, value] = findKeyValue({ path, name });

    if (key !== undefined && value !== undefined) {
      predicates.every((p) => p({ key, value, path }));
    }
  });
}

function isConfigured(text: string = 'NOT_CONFIGURED') {
  return function ({ key, value }: { key: string; value: string }) {
    if (value === '') {
      warn(`${yellow(key)} is empty`);
      return false;
    }

    if (value === text) {
      warn(`${yellow(key)} is not configured`);
      return false;
    }

    return true;
  };
}

function isLength(length: number) {
  return function ({ key, value }: { key: string; value: string }) {
    if (value.length !== length) {
      error(`${red(key)} length must be 64`);
      return false;
    }

    return true;
  };
}

function isFilePresent({ path }) {
  if (!fs.existsSync(path)) {
    error(`${red(path)} does not exist.`);
    return false;
  }

  return true;
}

function isHex({ key, value }) {
  if (value.startsWith('0x')) {
    error(`${red(key)} must started with "0x"`);
    return false;
  }
}

export const doctor = async () => {
  checkEnvVariables('template/contracts/.env', [
    {
      name: 'PRIVATE_KEY',
      predicates: [isFilePresent, isConfigured(), isHex, isLength(66)],
    },
    {
      name: 'BLOCK_EXPLORER_API_KEY',
      predicates: [
        isFilePresent,
        isConfigured(
          `"Get an API key from https://docs.basescan.org/getting-started"`
        ),
        isLength(64),
      ],
    },
  ]);

  checkEnvVariables('template/web/.env.local', [
    {
      name: 'NEXT_PUBLIC_GOOGLE_ANALYTICS_ID',
      predicates: [isFilePresent, isConfigured(), isLength(64)],
    },
    {
      name: 'NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID',
      predicates: [isFilePresent, isConfigured(), isLength(32)],
    },
  ]);

  process.exit(0);
};
