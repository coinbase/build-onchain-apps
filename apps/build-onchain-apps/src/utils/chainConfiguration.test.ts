import { baseSepolia, base, sepolia, mainnet } from 'viem/chains';
import { getChainsForEnvironment } from './chainConfiguration';
import { Environment } from './environment';

describe('getCurrentEnvironment', () => {
  it('should return testnet for localhost', () => {
    expect(getChainsForEnvironment(Environment.localhost)).toEqual([baseSepolia, sepolia, mainnet]);
  });

  it('should default to localhost', () => {
    expect(getChainsForEnvironment()).toEqual([baseSepolia, sepolia, mainnet]);
  });

  it('should return mainnet for production', () => {
    expect(getChainsForEnvironment(Environment.production)).toEqual([base, mainnet]);
  });
});
