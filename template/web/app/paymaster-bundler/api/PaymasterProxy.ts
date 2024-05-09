import { createClient, createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import { ENTRYPOINT_ADDRESS_V06 } from 'permissionless';
import { paymasterActionsEip7677 } from 'permissionless/experimental';
import { willSponsor } from '../utils';

const paymasterService = process.env.NEXT_PUBLIC_PAYMASTER_URL!;

export const client = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

export const paymasterClient = createClient({
  chain: baseSepolia,
  transport: http(paymasterService),
}).extend(paymasterActionsEip7677({ entryPoint: ENTRYPOINT_ADDRESS_V06 }));

/**
 * POST function handles incoming POST requests for sponsoring operations.
 *
 * @param {Request} r - The incoming request object.
 * @returns {Promise<Response>} - The response object containing the result or an error message.
 */
export async function POST(r: Request) {
  const req = await r.json();
  const method = req.method;
  const [userOp, entrypoint, chainId] = req.params;
  console.log(req.params);

  if (!willSponsor({ chainId: parseInt(chainId), entrypoint, userOp })) {
    return Response.json({ error: 'Not a sponsorable operation' });
  }

  if (method === 'pm_getPaymasterStubData') {
    console.log('running pm_getPaymasterStubData');
    const result = await paymasterClient.getPaymasterStubData({
      userOperation: userOp,
    });
    return Response.json({ result });
  } else if (method === 'pm_getPaymasterData') {
    console.log('running pm_getPaymasterData');
    const result = await paymasterClient.getPaymasterData({
      userOperation: userOp,
    });
    return Response.json({ result });
  }
  return Response.json({ error: 'Method not found' });
}
