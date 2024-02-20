/**
 * @jest-environment jsdom
 */

import { renderHook, waitFor } from '@testing-library/react';
import { useAccount } from 'wagmi';
import useCurrentBlockNumber from '../useBlockNumber';

jest.mock('wagmi', () => ({
  useAccount: jest.fn(),
}));

global.fetch = jest.fn(async () =>
  Promise.resolve({
    ok: true,
    json: async () => Promise.resolve({ block: 123 }),
  }),
) as jest.Mock;

describe('useCurrentBlockNumber', () => {
  it('should initially set block number to 0 and loading to false', () => {
    (useAccount as jest.Mock).mockReturnValue({ chain: { id: null } });
    const { result } = renderHook(() => useCurrentBlockNumber());
    expect(result.current.blockNumber).toBe(0);
    expect(result.current.isLoading).toBe(true);
  });

  it('should update block number and loading state when chainId is present', async () => {
    (useAccount as jest.Mock).mockReturnValue({ chain: { id: 1 } });
    const { result } = renderHook(() => useCurrentBlockNumber());
    await waitFor(() =>
      expect(result.current).toMatchObject({ blockNumber: 123, isLoading: false }),
    );
  });
});
