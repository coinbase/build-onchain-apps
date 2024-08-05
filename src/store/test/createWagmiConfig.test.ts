import { baseSepolia } from 'viem/chains';
import { createWagmiConfig } from '../createWagmiConfig';
import { Environment, EnvironmentKeys } from '../environment';

describe('createWagmiConfig', () => {
  const OLD_ENV = process.env;

  /** reference: https://stackoverflow.com/a/48042799 */
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it.each([
    Environment.localhost,
    Environment.development,
    Environment.staging,
    Environment.production,
  ])('returns valid Wagmi config when env=%s', (environment) => {
    process.env[EnvironmentKeys.environment] = environment;
    const config = createWagmiConfig('https://api.developer.coinbase.com/rpc/v1/base/example');
    expect(config.chains[0].id).toEqual(baseSepolia.id);
  });
});
