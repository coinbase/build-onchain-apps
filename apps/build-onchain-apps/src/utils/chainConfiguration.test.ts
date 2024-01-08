import { baseGoerli, base, baseSepolia } from 'viem/chains';
import { getChainsForEnvironment } from './chainConfiguration';
import { Environment } from './environment';

describe('getCurrentEnvironment', () => {
  it('should return testnet for localhost', () => {
    expect(getChainsForEnvironment(Environment.localhost)).toEqual([baseGoerli, baseSepolia]);
  });

  it('should default to localhost', () => {
    expect(getChainsForEnvironment()).toEqual([baseGoerli, baseSepolia]);
  });

  it('should return mainnet for production', () => {
    expect(getChainsForEnvironment(Environment.production)).toEqual([base]);
  });
});
