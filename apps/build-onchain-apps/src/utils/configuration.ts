import { Environment } from './environment';

export enum EnvironmentKeys {
  environment = 'ENVIRONMENT',
  signatureMintPrivateKey = 'SIGNATURE_MINT_PRIVATE_KEY',
}

export function getCurrentEnvironment(): Environment {
  const stage: string | undefined = process.env[EnvironmentKeys.environment];

  if (stage === undefined) {
    return Environment.localhost;
  }

  // Convert string to ReleaseStage enum value
  const releaseStageValue = Object.values(Environment).find((value) => value === stage);

  return releaseStageValue ?? Environment.localhost;
}


export function getSignatureMintPrivateKey(): string {
  let key: string | undefined = process.env[EnvironmentKeys.signatureMintPrivateKey];

  if (!key) {
    key = "";
  }

  return key;
}