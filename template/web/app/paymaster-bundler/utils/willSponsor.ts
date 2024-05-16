import { ENTRYPOINT_ADDRESS_V06, UserOperation } from 'permissionless';
import { Address, BlockTag, Hex, decodeAbiParameters, decodeFunctionData } from 'viem';
import { baseSepolia } from 'viem/chains';
import { coinbaseSmartWalletABI } from '../_contracts/coinbaseSmartWalletABI';
import { myNFTABI, myNFTAddress } from '../_contracts/myNFTABI';
import { client } from '../../../src/components/SmartWallets/PaymasterClient'
import {
  coinbaseSmartWalletProxyBytecode,
  coinbaseSmartWalletV1Implementation,
  erc1967ProxyImplementationSlot,
  magicSpendAddress,
} from '../constants';

/**
 * willSponsor function checks if a user operation should be sponsored based on several criteria.
 *
 * @param {Object} params - The parameters for the function.
 * @param {number} params.chainId - The chain ID to check.
 * @param {string} params.entrypoint - The entrypoint address to check.
 * @param {UserOperation<"v0.6">} params.userOp - The user operation object containing the call data.
 * @returns {Promise<boolean>} - Returns true if the user operation meets all criteria and should be sponsored, otherwise false.
 */
export async function willSponsor({
  chainId,
  entrypoint,
  userOp,
}: {
  chainId: number;
  entrypoint: string;
  userOp: UserOperation<'v0.6'>;
}) {
  // check chain id
  if (chainId !== baseSepolia.id) return false;
  // check entrypoint
  if (entrypoint.toLowerCase() !== ENTRYPOINT_ADDRESS_V06.toLowerCase()) return false;

  try {
    // check the userOp.sender is a proxy with the expected bytecode
    const code = await client.getBytecode({ address: userOp.sender });
    if (code != coinbaseSmartWalletProxyBytecode) return false;

    // check that userOp.sender proxies to expected implementation
    const implementation = await client.request<{
      Parameters: [Address, Hex, BlockTag];
      ReturnType: Hex;
    }>({
      method: 'eth_getStorageAt',
      params: [userOp.sender, erc1967ProxyImplementationSlot, 'latest'],
    });
    const implementationAddress = decodeAbiParameters([{ type: 'address' }], implementation)[0];
    if (implementationAddress != coinbaseSmartWalletV1Implementation) return false;

    // check that userOp.callData is making a call we want to sponsor
    const calldata = decodeFunctionData({
      abi: coinbaseSmartWalletABI,
      data: userOp.callData,
    });

    // keys.coinbase.com always uses executeBatch
    if (calldata.functionName !== 'executeBatch') return false;
    if (!calldata.args || calldata.args.length == 0) return false;

    const calls = calldata.args[0] as {
      target: Address;
      value: bigint;
      data: Hex;
    }[];
    // modify if want to allow batch calls to your contract
    if (calls.length > 2) return false;

    let callToCheckIndex = 0;
    if (calls.length > 1) {
      // if there is more than one call, check if the first is a magic spend call
      if (calls[0].target.toLowerCase() !== magicSpendAddress.toLowerCase()) return false;
      callToCheckIndex = 1;
    }

    if (calls[callToCheckIndex].target.toLowerCase() !== myNFTAddress.toLowerCase()) return false;

    const innerCalldata = decodeFunctionData({
      abi: myNFTABI,
      data: calls[callToCheckIndex].data,
    });
    if (innerCalldata.functionName !== 'safeMint') return false;

    return true;
  } catch (e) {
    console.error(`willSponsor check failed: ${e}`);
    return false;
  }
}
