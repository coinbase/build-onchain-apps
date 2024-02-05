/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { Chain } from 'viem/chains';
import ViewContractLink from '../ViewContractLink';

const CHAIN: Chain = {
  id: 1,
  name: 'Name',
  network: 'network-name',
  nativeCurrency: {
    name: 'currencyName',
    decimals: 2,
    symbol: 'C',
  },
  rpcUrls: {
    default: {
      http: [],
    },
    public: {
      http: [],
    },
  },
  blockExplorers: {
    default: {
      name: 'default-block-explorer',
      url: 'https://default-block-explorer.com',
    },
  },
};

describe('ViewContractLink', () => {
  it('renders empty screen', () => {
    render(<ViewContractLink chain={CHAIN} />);
    expect(screen.queryByText('View Contract')).not.toBeInTheDocument();
  });

  it('renders BlockExplorer link', () => {
    render(<ViewContractLink chain={CHAIN} contractAddress="0x1234" />);
    expect(screen.getByText('View Contract')).toHaveProperty(
      'href',
      'https://default-block-explorer.com/address/0x1234',
    );
  });
});
