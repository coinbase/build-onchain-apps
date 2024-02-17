/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import OnchainProviders from '@/providers/OnchainProviders';
import ContractDemo from '../../../app/mint/_components/ContractDemo';

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
