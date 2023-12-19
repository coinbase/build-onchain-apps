import { baseGoerli, base } from 'viem/chains';
import { Environment } from './environment';
import { getChainsForEnvironment } from './chainConfiguration';

describe('getCurrentEnvironment', () => {
  it('should return testnet for localhost', () => {
    expect(getChainsForEnvironment(Environment.localhost)).toEqual([baseGoerli]);
  });

  it('should default to localhost', () => {
    expect(getChainsForEnvironment()).toEqual([baseGoerli]);
  });

  it('should return mainnet for production', () => {
    expect(getChainsForEnvironment(Environment.production)).toEqual([base]);
  });
});
