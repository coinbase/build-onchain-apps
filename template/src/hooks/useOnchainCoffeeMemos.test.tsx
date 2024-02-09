/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react';
import { useReadContract } from 'wagmi';
import OnchainProviders from '../providers/OnchainProviders';
import { CoffeeMemo } from '../types';
import useOnchainCoffeeMemos from './useOnchainCoffeeMemos';

jest.mock('../utils/analytics', () => ({
  markStep: jest.fn(),
}));

jest.mock('wagmi', () => ({
  ...jest.requireActual<typeof import('wagmi')>('wagmi'),
  useReadContract: jest.fn(),
}));

describe('useOnchainCoffeeMemos', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return memos', () => {
    const memos: CoffeeMemo[] = [
      {
        message: 'message',
        numCoffees: BigInt(2),
        time: BigInt(1),
        userAddress: '0x1',
        userName: 'userName',
      },
    ];
    (useReadContract as jest.Mock).mockImplementation(() => ({
      data: memos,
    }));

    const { result } = renderHook(() => useOnchainCoffeeMemos(), { wrapper: OnchainProviders });

    expect(result.current.data[0].message).toStrictEqual(memos[0].message);
    expect(result.current.data[0].numCoffees).toStrictEqual(memos[0].numCoffees);
    expect(result.current.data[0].time).toStrictEqual(memos[0].time);
    expect(result.current.data[0].userAddress).toStrictEqual(memos[0].userAddress);
    expect(result.current.data[0].userName).toStrictEqual(memos[0].userName);
  });

  it('if contract read fails, should return empty array', () => {
    (useReadContract as jest.Mock).mockImplementation(() => ({
      data: [],
    }));

    const { result } = renderHook(() => useOnchainCoffeeMemos(), { wrapper: OnchainProviders });

    expect(result.current.data.length).toEqual(0);
  });
});
