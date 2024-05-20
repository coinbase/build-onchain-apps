import { UserOperation, ENTRYPOINT_ADDRESS_V06 } from 'permissionless';
import { decodeFunctionData } from 'viem';
import { baseSepolia } from 'viem/chains';
import { client } from '../../../src/components/SmartWallets/PaymasterClient';
import {
  COINBASE_SMART_WALLET_PROXY_BYTECODE,
  COINBASE_SMART_WALLET_V1_IMPLEMENTATION,
  PAYMASTER_NFT_ADDRESS,
} from '../constants';
import { willSponsor, isValidChainAndEntryPoint, isValidCallData } from './willSponsor';

jest.mock('../../../src/components/SmartWallets/PaymasterClient', () => ({
  client: {
    getBytecode: jest.fn<Promise<string>, [{ address: string }]>(),
    request: jest.fn<Promise<string>, [{ method: string; params: [string, string, string] }]>(),
  },
}));

jest.mock('viem', () => ({
  ...jest.requireActual<typeof import('viem')>('viem'),
  decodeAbiParameters: jest.fn<[unknown[], string], [string, string]>(),
  decodeFunctionData: jest.fn<
    { functionName: string; args: [unknown] },
    [{ abi: unknown; data: string }]
  >(),
}));

describe('willSponsor', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return true for sponsorable operation', async () => {
    const mockUserOp: UserOperation<'v0.6'> = {
      sender: '0xValidProxy',
      callData: '0xValidCallData',
      nonce: BigInt(0),
      initCode: '0x',
      callGasLimit: BigInt(1),
      verificationGasLimit: BigInt(1),
      preVerificationGas: BigInt(1),
      maxFeePerGas: BigInt(1),
      maxPriorityFeePerGas: BigInt(1),
      paymasterAndData: '0x',
      signature: '0x',
    };

    (client.getBytecode as jest.Mock).mockResolvedValue(COINBASE_SMART_WALLET_PROXY_BYTECODE);
    (client.request as jest.Mock).mockResolvedValue(
      `0x${COINBASE_SMART_WALLET_V1_IMPLEMENTATION.substring(2).padStart(64, '0')}`,
    );

    (decodeFunctionData as jest.Mock).mockReturnValueOnce({
      functionName: 'executeBatch',
      args: [[{ target: PAYMASTER_NFT_ADDRESS, value: 0n, data: '0xValidCallData' }]],
    });

    (decodeFunctionData as jest.Mock).mockReturnValueOnce({
      functionName: 'safeMint',
    });

    const result = await willSponsor({
      chainId: baseSepolia.id,
      entrypoint: ENTRYPOINT_ADDRESS_V06,
      userOp: mockUserOp,
    });

    expect(result).toBe(true);
  });

  it('should return false for non-sponsorable operation due to invalid chain ID and entrypoint', async () => {
    const mockUserOp: UserOperation<'v0.6'> = {
      sender: '0xInvalidProxy',
      callData: '0xInvalidCallData',
      nonce: BigInt(0),
      initCode: '0x',
      callGasLimit: BigInt(1),
      verificationGasLimit: BigInt(1),
      preVerificationGas: BigInt(1),
      maxFeePerGas: BigInt(1),
      maxPriorityFeePerGas: BigInt(1),
      paymasterAndData: '0x',
      signature: '0x',
    };

    const result = await willSponsor({
      chainId: 1234,
      entrypoint: '0xInvalid',
      userOp: mockUserOp,
    });

    expect(result).toBe(false);
  });

  it('should return false for non-sponsorable operation due to invalid call data', async () => {
    const mockUserOp: UserOperation<'v0.6'> = {
      sender: '0xValidProxy',
      callData: '0xInvalidCallData',
      nonce: BigInt(0),
      initCode: '0x',
      callGasLimit: BigInt(1),
      verificationGasLimit: BigInt(1),
      preVerificationGas: BigInt(1),
      maxFeePerGas: BigInt(1),
      maxPriorityFeePerGas: BigInt(1),
      paymasterAndData: '0x',
      signature: '0x',
    };

    (client.getBytecode as jest.Mock).mockResolvedValue(COINBASE_SMART_WALLET_PROXY_BYTECODE);
    (client.request as jest.Mock).mockResolvedValue(
      `0x${COINBASE_SMART_WALLET_V1_IMPLEMENTATION.substring(2).padStart(64, '0')}`,
    );

    (decodeFunctionData as jest.Mock).mockReturnValueOnce({
      functionName: 'executeBatch',
      args: [[{ target: '0xInvalidTarget', value: 0n, data: '0xInvalidData' }]],
    });

    const result = await willSponsor({
      chainId: baseSepolia.id,
      entrypoint: ENTRYPOINT_ADDRESS_V06,
      userOp: mockUserOp,
    });

    expect(result).toBe(false);
  });

  it('should handle errors gracefully and return false', async () => {
    const mockUserOp: UserOperation<'v0.6'> = {
      sender: '0xValidProxy',
      callData: '0xValidCallData',
      nonce: BigInt(0),
      initCode: '0x',
      callGasLimit: BigInt(1),
      verificationGasLimit: BigInt(1),
      preVerificationGas: BigInt(1),
      maxFeePerGas: BigInt(1),
      maxPriorityFeePerGas: BigInt(1),
      paymasterAndData: '0x',
      signature: '0x',
    };

    (client.getBytecode as jest.Mock).mockRejectedValue(new Error('Mock error'));

    const result = await willSponsor({
      chainId: baseSepolia.id,
      entrypoint: ENTRYPOINT_ADDRESS_V06,
      userOp: mockUserOp,
    });

    expect(result).toBe(false);
  });
});

describe('isValidChainAndEntryPoint', () => {
  it('should return true for valid chainId and entrypoint', () => {
    const validChainId = baseSepolia.id;
    const validEntrypoint = ENTRYPOINT_ADDRESS_V06.toLowerCase();

    const result = isValidChainAndEntryPoint(validChainId, validEntrypoint);
    expect(result).toBe(true);
  });

  it('should return false for invalid chainId', () => {
    const invalidChainId = 1234;
    const validEntrypoint = ENTRYPOINT_ADDRESS_V06.toLowerCase();

    const result = isValidChainAndEntryPoint(invalidChainId, validEntrypoint);
    expect(result).toBe(false);
  });

  it('should return false for invalid entrypoint', () => {
    const validChainId = baseSepolia.id;
    const invalidEntrypoint = '0xInvalidEntrypoint';

    const result = isValidChainAndEntryPoint(validChainId, invalidEntrypoint);
    expect(result).toBe(false);
  });
});

describe('isValidCallData', () => {
  it('should return true for valid call data', () => {
    const mockUserOp: UserOperation<'v0.6'> = {
      sender: '0xValidProxy',
      callData: '0xValidCallData',
      nonce: BigInt(0),
      initCode: '0x',
      callGasLimit: BigInt(1),
      verificationGasLimit: BigInt(1),
      preVerificationGas: BigInt(1),
      maxFeePerGas: BigInt(1),
      maxPriorityFeePerGas: BigInt(1),
      paymasterAndData: '0x',
      signature: '0x',
    };

    (decodeFunctionData as jest.Mock).mockReturnValueOnce({
      functionName: 'executeBatch',
      args: [[{ target: PAYMASTER_NFT_ADDRESS, value: 0n, data: '0xValidCallData' }]],
    });

    (decodeFunctionData as jest.Mock).mockReturnValueOnce({
      functionName: 'safeMint',
    });

    const result = isValidCallData(mockUserOp);
    expect(result).toBe(true);
  });

  it('should return false for invalid call data', () => {
    const mockUserOp: UserOperation<'v0.6'> = {
      sender: '0xValidProxy',
      callData: '0xInvalidCallData',
      nonce: BigInt(0),
      initCode: '0x',
      callGasLimit: BigInt(1),
      verificationGasLimit: BigInt(1),
      preVerificationGas: BigInt(1),
      maxFeePerGas: BigInt(1),
      maxPriorityFeePerGas: BigInt(1),
      paymasterAndData: '0x',
      signature: '0x',
    };

    (decodeFunctionData as jest.Mock).mockReturnValueOnce({
      functionName: 'executeBatch',
      args: [[{ target: '0xInvalidTarget', value: 0n, data: '0xInvalidData' }]],
    });

    const result = isValidCallData(mockUserOp);
    expect(result).toBe(false);
  });
});
