/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import OnchainProviders from '@/OnchainProviders';
import ContractDemo from '../ContractDemo';

describe('ContractDemo', () => {
  it("should render fallback if wallet isn't connected", () => {
    render(
      <OnchainProviders>
        <ContractDemo />
      </OnchainProviders>,
    );
    expect(screen.getByText('Please connect your wallet to continue.')).toBeInTheDocument();
  });
});
