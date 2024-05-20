import { ENTRYPOINT_ADDRESS_V06, UserOperation } from 'permissionless';
import { Address, Hex, decodeFunctionData } from 'viem';
import { baseSepolia } from 'viem/chains';
import { abi as CoinbaseSmartWalletABI } from '../_contracts/CoinbaseSmartWalletABI';
import { abi as PaymasterBundlerABI } from '../_contracts/PaymasterBundlerABI';
import { MAGIC_SPEND_ADDRESS, PAYMASTER_NFT_ADDRESS } from '../constants';

type ChainId = number;
type Entrypoint = string;
type UserOp = UserOperation<'v0.6'>;

type WillSponsorParams = {
  chainId: ChainId;
  entrypoint: Entrypoint;
  userOp: UserOp;
};

type CallDataTargetAddress = Address;
type CallDataValue = bigint;
type CallData = Hex;

/**
 * Checks if the chain ID and entry point address are valid.
 */
export function isValidChainAndEntryPoint(chainId: number, entrypoint: string): boolean {
  if (chainId !== baseSepolia.id) {
    return false;
  }
  if (entrypoint.toLowerCase() !== ENTRYPOINT_ADDRESS_V06.toLowerCase()) {
    return false;
  }
  return true;
}

/**
 * Checks if the call data in the user operation is valid and meets sponsorship criteria.
 */
export function isValidCallData(userOp: UserOperation<'v0.6'>): boolean {
  const calldata = decodeFunctionData({
    abi: CoinbaseSmartWalletABI,
    data: userOp.callData,
  });

  if (calldata.functionName !== 'executeBatch') {
    return false;
  }
  if (!calldata.args || calldata.args.length == 0) {
    return false;
  }

  const calls = calldata.args[0] as {
    target: CallDataTargetAddress;
    value: CallDataValue;
    data: CallData;
  }[];
  if (calls.length > 2) {
    return false;
  }

  let callToCheckIndex = 0;
  if (calls.length > 1) {
    if (calls[0].target.toLowerCase() !== MAGIC_SPEND_ADDRESS.toLowerCase()) {
      return false;
    }
    callToCheckIndex = 1;
  }

  if (calls[callToCheckIndex].target.toLowerCase() !== PAYMASTER_NFT_ADDRESS.toLowerCase()) {
    return false;
  }

  const innerCalldata = decodeFunctionData({
    abi: PaymasterBundlerABI,
    data: calls[callToCheckIndex].data,
  });
  if (innerCalldata.functionName !== 'safeMint') {
    return false;
  }

  return true;
}

/**
 * willSponsor function checks if a user operation should be sponsored based on several criteria.
 */
export const willSponsor = async ({
  chainId,
  entrypoint,
  userOp,
}: WillSponsorParams): Promise<boolean> => {
  if (!isValidChainAndEntryPoint(chainId, entrypoint)) {
    return false;
  }

  try {
    if (!isValidCallData(userOp)) {
      return false;
    }
    return true;
  } catch (e) {
    console.error(`willSponsor check failed: ${e}`);
    return false;
  }
};
