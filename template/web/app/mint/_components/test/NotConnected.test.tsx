/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import NotConnected from '../../../app/mint/_components/NotConnected';

describe('NotConnected', () => {
  it('should render', () => {
    // Render the NotConnected component
    render(<NotConnected />);
    expect(screen.getByText('Please connect your wallet to continue.')).toBeInTheDocument();
  });
});
