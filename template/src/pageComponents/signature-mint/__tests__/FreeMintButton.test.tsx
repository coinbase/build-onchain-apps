/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContractWrite } from 'wagmi';
import SignatureMint721ABI from '../../../contract/SignatureMint721';
import OnchainProviders from '../../../providers/OnchainProviders';
import FreeMintButton from '../FreeMintButton';

jest.mock('wagmi', () => ({
  ...jest.requireActual<typeof import('wagmi')>('wagmi'),
  useContractWrite: jest.fn(() => ({
    write: jest.fn(),
  })),
}));

describe('FreeMintButton', () => {
  it('renders button', () => {
    render(
      <OnchainProviders>
        <FreeMintButton
          signatureMint721Contract={{
            abi: SignatureMint721ABI,
            supportedChains: [],
            status: 'ready',
            address: '0x1234',
          }}
          address={undefined}
          signature=""
        />
      </OnchainProviders>,
    );
    expect(screen.getByRole('button')).toHaveTextContent('Mint NFT Free');
  });

  it('runs Free Mint contract on button click', async () => {
    const mockFreeMintFn = jest.fn();
    (useContractWrite as jest.Mock).mockImplementation(() => ({
      write: mockFreeMintFn,
    }));
    render(
      <OnchainProviders>
        <FreeMintButton
          signatureMint721Contract={{
            abi: SignatureMint721ABI,
            supportedChains: [],
            status: 'ready',
            address: '0x1234',
          }}
          address={undefined}
          signature=""
        />
      </OnchainProviders>,
    );
    expect(screen.getByRole('button')).toHaveTextContent('Mint NFT Free');
    expect(mockFreeMintFn).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole('button'));

    expect(mockFreeMintFn).toHaveBeenCalledTimes(1);
  });
});
