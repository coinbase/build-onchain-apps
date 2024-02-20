import { useAccount, useBalance } from 'wagmi';
import { useAddressCanAfford, useLoggedInUserCanAfford } from '../useUserCanAfford';

jest.mock('wagmi', () => ({
  useBalance: jest.fn().mockReturnValue({ data: { value: 100n } }),
  useAccount: jest.fn().mockReturnValue({ address: 1 }),
}));

const mockedUseBalance = useBalance as jest.MockedFunction<typeof useBalance>;
const mockedUseAccount = useAccount as jest.MockedFunction<typeof useAccount>;

describe('useAddressCanAfford', () => {
  it('returns true if the address balance is greater than the amount', async () => {
    mockedUseBalance.mockReturnValue({ data: { value: 100n } });

    const result = useAddressCanAfford(1, 50n);

    expect(result).toBe(true);
  });

  it('returns false if the address balance is less than the amount', async () => {
    mockedUseBalance.mockReturnValue({ data: { value: 50n } });

    const result = useAddressCanAfford(1, 100n);

    expect(result).toBe(false);
  });
});

describe('useLoggedInUserCanAfford', () => {
  it('returns true if the logged in user balance is greater than the amount', async () => {
    mockedUseAccount.mockReturnValue({ address: 1 });
    mockedUseBalance.mockReturnValue({ data: { value: 100n } });

    const result = useLoggedInUserCanAfford(50n);

    expect(result).toBe(true);
  });

  it('returns false if the logged in user balance is less than the amount', async () => {
    mockedUseAccount.mockReturnValue({ address: 1 });
    mockedUseBalance.mockReturnValue({ data: { value: 50n } });

    const result = useLoggedInUserCanAfford(100n);

    expect(result).toBe(false);
  });
});
