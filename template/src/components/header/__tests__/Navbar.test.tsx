/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';
import OnchainProviders from '../../../providers/OnchainProviders';

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
