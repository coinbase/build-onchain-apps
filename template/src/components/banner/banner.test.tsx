/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Banner from './banner';

describe('Banner', () => {
  it('should render banner with guide link', () => {
    render(<Banner pageName="Buy me a coffee" pageUrl="buy-me-coffee" />);
    expect(screen.getByText('Read the Guide')).toBeInTheDocument();
  });

  it('should render guide button with correct href', () => {
    render(<Banner pageName="Buy me a coffee" pageUrl="buy-me-coffee" />);

    const guideLink = screen.getByRole('link', { name: 'Read the Guide' });

    expect(guideLink).toBeInTheDocument();
    expect(guideLink).toHaveAttribute('href', '/buy-me-coffee#guide');
  });

  it('should render banner with correct text', () => {
    render(<Banner pageName="Buy me a coffee" pageUrl="buy-me-coffee" />);
    expect(screen.getByText('Step into the Buy me a coffee experience.')).toBeInTheDocument();
  });
});
