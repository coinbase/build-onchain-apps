/**
 * @jest-environment jsdom
 */

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
  it('should initially set block number to 0 and loading to false', async () => {
    const queryClient = new QueryClient();
    function ReactQueryTestProvider({ children }: { children: React.ReactNode }) {
      return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    }
    (useAccount as jest.Mock).mockReturnValue({ chain: { id: null } });
    const { result } = renderHook(() => useCurrentBlockNumber(), {
      wrapper: ReactQueryTestProvider,
    });
    await waitFor(() => expect(result.current.data).toBe(0));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it('should update block number and loading state when chainId is present', async () => {
    const queryClient = new QueryClient();
    function ReactQueryTestProvider({ children }: { children: React.ReactNode }) {
      return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    }
    (useAccount as jest.Mock).mockReturnValue({ chain: { id: 1 } });
    const { result } = renderHook(() => useCurrentBlockNumber(), {
      wrapper: ReactQueryTestProvider,
    });
    await waitFor(() =>
      expect(result.current).toMatchObject(
        expect.objectContaining({ data: 123, isLoading: false }),
      ),
    );
  });
});
