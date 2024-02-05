/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContractWrite } from 'wagmi';
import SignatureMint721ABI from '../../../contract/SignatureMint721';
import OnchainProviders from '../../../providers/OnchainProviders';
import PaidMintButton from '../PaidMintButton';

jest.mock('wagmi', () => ({
  ...jest.requireActual<typeof import('wagmi')>('wagmi'),
  useContractWrite: jest.fn(() => ({
    write: jest.fn(),
  })),
}));

describe('PaidMintButton', () => {
  it('renders button', () => {
    render(
      <OnchainProviders>
        <PaidMintButton
          signatureMint721Contract={{
            abi: SignatureMint721ABI,
            supportedChains: [],
            status: 'ready',
            address: '0x1234',
          }}
          address={undefined}
        />
      </OnchainProviders>,
    );
    expect(screen.getByRole('button')).toHaveTextContent('Paid Mint');
  });

  it('runs Paid Mint contract on button click', async () => {
    const mockPaidMintFn = jest.fn();
    (useContractWrite as jest.Mock).mockImplementation(() => ({
      write: mockPaidMintFn,
    }));
    render(
      <OnchainProviders>
        <PaidMintButton
          signatureMint721Contract={{
            abi: SignatureMint721ABI,
            supportedChains: [],
            status: 'ready',
            address: '0x1234',
          }}
          address={undefined}
        />
      </OnchainProviders>,
    );
    expect(screen.getByRole('button')).toHaveTextContent('Paid Mint');
    expect(mockPaidMintFn).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole('button'));

    expect(mockPaidMintFn).toHaveBeenCalledTimes(1);
  });
});
