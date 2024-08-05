/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
  jest.useFakeTimers();

  it('should initially return the same value', () => {
    const initialValue = 'test';
    const { result } = renderHook(() => useDebounce(initialValue, 500));

    expect(result.current).toBe(initialValue);
  });

  it('debounces', async () => {
    const initialValue = 'init';
    const delay = 1;
    const { rerender, result } = renderHook(({ value }) => useDebounce(value, delay), {
      initialProps: { value: initialValue },
    });

    const updatedValue = 'updatedValue';
    act(() => rerender({ value: updatedValue }));
    expect(result.current).toBe(initialValue);
    act(() => {
      jest.runAllTimers();
    });
    expect(result.current).not.toBe(initialValue);
    expect(result.current).toBe(updatedValue);
  });
});
