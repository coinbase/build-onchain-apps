/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

jest.mock('wagmi', () => ({
  useAccount: jest.fn(() => ({
    address: null,
    isError: null,
    isLoading: null,
  })),
  useBalance: jest.fn(),
  useDisconnect: jest.fn(),
}));

jest.mock('@rainbow-me/rainbowkit', () => ({
  ConnectButton: jest.fn(() => ({
    address: null,
    isError: null,
    isLoading: null,
  })),
}));

describe('Header', () => {
  // Changes scroll state based on user scroll behavior
  it('should change the scroll state based on user scroll behavior', () => {
    // Mock the useState and useEffect hooks
    const useStateMock = jest.spyOn(React, 'useState');
    const useEffectMock = jest.spyOn(React, 'useEffect');

    // Render the Header component
    render(<Header />);

    // Assert that the useState and useEffect hooks are called
    expect(useStateMock).toHaveBeenCalledWith('at-top');
    expect(useEffectMock).toHaveBeenCalled();
  });
});
