import * as prompts from '@clack/prompts';
import { experiences } from './experiences';

export type EnvVar = {
  blockExplorerApiKey: string;
  rpcUrl: string;
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
      selectedModules: () => {
        return prompts.multiselect({
          message:
            'Select Onchain App experiences (press space to remove an experience)',
          initialValues: experiences.map(({ value }) => value),
          options: experiences,
          required: false,
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

  const envVars = await prompts.group(
    {
      rpcUrl: () => {
        return prompts.text({
          message: 'Base RPC URL',
          placeholder:
            'Visit https://www.coinbase.com/developer-platform/products/base-node?utm_source=boat',
          validate: (value) => {
            if (value.length === 0) return;
            if (value.length < 79) return 'RPC must be at least 79 characters';
          },
        });
      },
      blockExplorerApiKey: () => {
        return prompts.text({
          message: 'Basescan Block Explorer API Key [optional]',
          placeholder: 'Visit https://docs.basescan.org/getting-started',
          validate: (value) => {
            if (value.length === 0) return;
            if (value.length < 34) return 'Key must be 34 characters';
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

  return { project, envVars };
}
