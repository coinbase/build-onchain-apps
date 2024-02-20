/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';
import { useMediaQuery } from '../useMediaQuery';

function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

describe('useMediaQuery', () => {
  beforeEach(() => {
    mockMatchMedia(true);
  });

  it('should return true when the media query matches', () => {
    const mediaQuery = '(min-width: 768px)';
    const { result } = renderHook(() => useMediaQuery(mediaQuery));

    expect(result.current).toBe(true);
  });

  it('should return false when the media query does not match', () => {
    mockMatchMedia(false);

    const mediaQuery = '(max-width: 767px)';
    const { result } = renderHook(() => useMediaQuery(mediaQuery));

    expect(result.current).toBe(false);
  });
});
