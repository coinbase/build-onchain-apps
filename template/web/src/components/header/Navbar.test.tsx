/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react';
import OnchainProviders from '@/OnchainProviders';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('mounts', async () => {
    render(
      <OnchainProviders>
        <Navbar />
      </OnchainProviders>,
    );

    await waitFor(() => {
      expect(screen.getByText('Get Started')).toBeInTheDocument();
    });
  });
});
