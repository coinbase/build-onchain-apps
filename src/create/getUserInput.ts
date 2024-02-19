import * as prompts from '@clack/prompts';

export type EnvVar = {
  walletConnectProjectID: string;
  blockExplorerApiKey: string;
};

function kebabcase(str: string) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export async function getUserInput() {
  const project = await prompts.group(
    {
      name: () => {
        return prompts.text({
          message: 'Enter the name of your project',
          validate(value) {
            if (!value) return 'Please enter a name.';
            return;
          },
        });
      },
      setupEnvironmentVariables: () => {
        return prompts.confirm({
          message: 'Configure environment variables?',
          initialValue: true,
        });
      },
    },
    {
      onCancel: () => {
        prompts.cancel('Cancelled');
        process.exit(0);
      },
    }
  );

  project.name = kebabcase(project.name);

  let envVars = {} as EnvVar;
  if (project.setupEnvironmentVariables) {
    envVars = await prompts.group(
      {
        walletConnectProjectID: () => {
          return prompts.text({
            message: 'WalletConnect Project ID [optional]',
            placeholder: 'Visit https://cloud.walletconnect.com',
            validate: (value) => {
              if (value.length === 0) return;
              if (value.length < 32) return 'Key must be 32 characters';
            },
          });
        },
        blockExplorerApiKey: () => {
          return prompts.text({
            message: 'Basescan Block Explorer API Key [optional]',
            placeholder: 'Visit https://docs.basescan.org/getting-started',
            validate: (value) => {
              if (value.length === 0) return;
              if (value.length < 64) return 'Key must be 64 characters';
            },
          });
        },
      },
      {
        onCancel: () => {
          prompts.cancel('Cancelled');
          process.exit(0);
        },
      }
    );
  }

  return { project, envVars };
}
