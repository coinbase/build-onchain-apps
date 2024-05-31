import { ENTRYPOINT_ADDRESS_V06 } from 'permissionless';
import { paymasterActionsEip7677 } from 'permissionless/experimental';
import { createClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';

const paymasterService = process.env.NEXT_PUBLIC_PAYMASTER_URL ?? '';

export const paymasterClient = createClient({
  chain: baseSepolia,
  transport: http(paymasterService),
}).extend(paymasterActionsEip7677({ entryPoint: ENTRYPOINT_ADDRESS_V06 }));
