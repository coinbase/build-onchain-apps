/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import OnchainProviders from '../../providers/OnchainProviders';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('mounts', () => {
    render(
      <OnchainProviders>
        <Navbar />
      </OnchainProviders>,
    );
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });
});
