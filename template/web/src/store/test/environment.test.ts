import { Environment, EnvironmentKeys, getCurrentEnvironment } from '../environment';

describe('environment', () => {
  describe('Environment', () => {
    it('should have the correct values', () => {
      expect(Environment.localhost).toEqual('localhost');
      expect(Environment.development).toEqual('development');
      expect(Environment.staging).toEqual('staging');
      expect(Environment.production).toEqual('production');
    });
  });

  describe('EnvironmentKeys', () => {
    it('should have the correct values', () => {
      expect(EnvironmentKeys.environment).toEqual('ENVIRONMENT');
    });
  });

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
});
