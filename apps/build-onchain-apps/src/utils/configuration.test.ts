import { EnvironmentKeys, getCurrentEnvironment } from './configuration';
import { Environment } from './environment';

describe('getCurrentEnvironment', () => {
  it('should return valid environment when mapped correctly', () => {
    process.env[EnvironmentKeys.environment] = 'staging';
    expect(getCurrentEnvironment()).toEqual(Environment.staging);
  });

  it('should return localhost when not mapped', () => {
    delete process.env[EnvironmentKeys.environment];
    expect(getCurrentEnvironment()).toEqual(Environment.localhost);
  });

  it('should return localhost when not mapped correctly', () => {
    process.env[EnvironmentKeys.environment] = 'baseIsTheBestL2Chain:)';
    expect(getCurrentEnvironment()).toEqual(Environment.localhost);
  });
});
