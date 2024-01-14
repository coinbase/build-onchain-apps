import {
  Environment,
  EnvironmentKeys,
  getCurrentEnvironment,
  getSignatureMintPrivateKey,
} from './environment';

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
      expect(EnvironmentKeys.signatureMintPrivateKey).toEqual('SIGNATURE_MINT_PRIVATE_KEY');
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

  describe('getSignatureMintPrivateKey', () => {
    it('should return the correct value', () => {
      process.env[EnvironmentKeys.signatureMintPrivateKey] = '0x1234567890';
      expect(getSignatureMintPrivateKey()).toEqual('0x1234567890');
    });

    it('should return empty string when not set', () => {
      delete process.env[EnvironmentKeys.signatureMintPrivateKey];
      expect(getSignatureMintPrivateKey()).toEqual('');
    });
  });
});
