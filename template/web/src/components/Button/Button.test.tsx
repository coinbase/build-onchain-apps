/**
 * @jest-environment jsdom
 */
import React from 'react';
import { SymbolIcon } from '@radix-ui/react-icons';
import { render, screen, within } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('should render Button', () => {
    render(<Button buttonContent="BOAT button" />);

    expect(screen.getByRole('button', { name: 'BOAT button' })).toBeInTheDocument();
  });

  it('should button with primary styles by default', () => {
    render(<Button buttonContent="BOAT button" />);

    const primaryClassNames = ['bg-white', 'text-black'];
    const btnEl = screen.getByRole('button', { name: 'BOAT button' });

    expect(btnEl).toHaveClass(primaryClassNames[0]);
    expect(btnEl).toHaveClass(primaryClassNames[1]);
  });

  it('should render disabled button', () => {
    render(<Button buttonContent="BOAT button" disabled />);

    const btnEl = screen.getByRole('button', { name: 'BOAT button' });

    expect(btnEl).toHaveAttribute('disabled');
  });

  it('should render icon with text', () => {
    render(<Button buttonContent="BOAT button" icon={<SymbolIcon data-testid="symbol-icon" />} />);

    const btnEl = screen.getByRole('button', { name: 'BOAT button' });

    expect(within(btnEl).getByTestId('symbol-icon')).toBeInTheDocument();
  });
});
