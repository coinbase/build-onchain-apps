/**
 * Where is this application currently running?
 * This will be used to drive configurations for the application
 * based on the environment.
 */
export enum Environment {
  localhost = 'localhost', // Local Environment
  development = 'development', // Development & Testing Environment
  staging = 'staging', // Staging Environment which should mimic production
  production = 'production', // Production Environment
}

export enum EnvironmentKeys {
  environment = 'ENVIRONMENT',
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
