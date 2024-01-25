/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';
import { publicClient } from '../store/client';
import { inMemoryStorageService } from '../store/storageServices';
import { useEnsAvatar, ensAvatarAction } from './useEnsAvatar';
import { useOnchainActionWithCache } from './useOnchainActionWithCache';

jest.mock('../store/client');
jest.mock('../store/storageServices');
jest.mock('./useOnchainActionWithCache');

describe('useEnsAvatar Hook', () => {
  const mockUseOnchainActionWithCache = useOnchainActionWithCache as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and returns ENS avatar', () => {
    const ensName = 'example.eth';
    const expectedAvatar = 'avatarUrl';
    mockUseOnchainActionWithCache.mockImplementation(() => {
      return expectedAvatar;
    });

    const { result } = renderHook(() => useEnsAvatar(ensName));
    const avatar = result.current.ensAvatar;

    expect(avatar).toEqual(expectedAvatar);
    expect(mockUseOnchainActionWithCache).toHaveBeenCalledWith(
      expect.any(Function),
      `ens-avatar-${ensName}`,
      inMemoryStorageService,
    );
  });
});

describe('ensAvatarAction Function', () => {
  const mockGetEnsAvatar = publicClient.getEnsAvatar as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches ENS avatar for valid ENS name', async () => {
    const ensName = 'example.eth';
    const expectedAvatar = 'avatarUrl';
    mockGetEnsAvatar.mockResolvedValue(expectedAvatar);

    const action = ensAvatarAction(ensName);
    const avatar = await action();

    expect(avatar).toBe(expectedAvatar);
    expect(mockGetEnsAvatar).toHaveBeenCalledWith({ name: ensName });
  });

  it('returns undefined for invalid ENS name', async () => {
    const action = ensAvatarAction('');
    const avatar = await action();

    expect(avatar).toBeNull();
  });
});
