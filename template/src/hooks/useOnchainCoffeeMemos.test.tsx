/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react';
import { useContractRead } from 'wagmi';
import OnchainProviders from '../providers/OnchainProviders';
import { CoffeeMemo } from '../types';
import { markStep } from '../utils/analytics';
import useOnchainCoffeeMemos from './useOnchainCoffeeMemos';

jest.mock('../utils/analytics', () => ({
  markStep: jest.fn(),
}));

jest.mock('wagmi', () => ({
  ...jest.requireActual<typeof import('wagmi')>('wagmi'),
  useContractRead: jest.fn(),
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
    (useContractRead as jest.Mock).mockImplementation(() => ({
      status: 'success',
      data: memos,
    }));
    expect(markStep).not.toHaveBeenCalled();

    const { result } = renderHook(() => useOnchainCoffeeMemos(), { wrapper: OnchainProviders });

    expect(result.current.memos).toStrictEqual(memos);
    expect(markStep).toHaveBeenCalledTimes(2);
    expect(markStep).toHaveBeenNthCalledWith(1, 'useContractRead.refetchMemos');
    expect(markStep).toHaveBeenNthCalledWith(2, 'useContractRead.refetchMemos');
  });

  it('if contract read fails, should return empty array', () => {
    const memos: CoffeeMemo[] = [
      {
        message: 'message',
        numCoffees: BigInt(2),
        time: BigInt(1),
        userAddress: '0x1',
        userName: 'userName',
      },
    ];
    (useContractRead as jest.Mock).mockImplementation(() => ({
      status: 'error',
      data: memos,
    }));
    expect(markStep).not.toHaveBeenCalled();

    const { result } = renderHook(() => useOnchainCoffeeMemos(), { wrapper: OnchainProviders });

    expect(result.current.memos).toStrictEqual([]);
    expect(markStep).toHaveBeenCalledTimes(2);
    expect(markStep).toHaveBeenNthCalledWith(1, 'useContractRead.refetchMemos');
    expect(markStep).toHaveBeenNthCalledWith(2, 'useContractRead.refetchMemos');
  });
});
