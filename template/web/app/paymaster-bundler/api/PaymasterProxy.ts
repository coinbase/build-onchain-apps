import { UserOperation } from 'permissionless';
import { willSponsor } from '../utils';
import { paymasterClient } from '../../../../web/src/components/SmartWallets/PaymasterClient';

type PaymasterRequest = {
  method: string;
  params: [UserOperation<'v0.6'>, string, string];
}

/**
 * POST function handles incoming POST requests for sponsoring operations.
 *
 * @param {Request} r - The incoming request object.
 * @returns {Promise<Response>} - The response object containing the result or an error message.
 */
export async function POST(r: Request): Promise<Response> {
  const req = await r.json() as PaymasterRequest;
  const { method, params } = req;
  const [userOp, entrypoint, chainId] = params;
  console.log(params);

  const shouldSponsor = await willSponsor({
    chainId: parseInt(chainId, 10),
    entrypoint,
    userOp,
  });

  if (!shouldSponsor) {
    return new Response(JSON.stringify({ error: 'Not a sponsorable operation' }), { status: 400 });
  }

  try {
    if (method === 'pm_getPaymasterStubData') {
      console.log('running pm_getPaymasterStubData');
      const result = await paymasterClient.getPaymasterStubData({
        userOperation: userOp,
      });
      return new Response(JSON.stringify({ result }));
    } else if (method === 'pm_getPaymasterData') {
      console.log('running pm_getPaymasterData');
      const result = await paymasterClient.getPaymasterData({
        userOperation: userOp,
      });
      return new Response(JSON.stringify({ result }));
    }
  } catch (error) {
    console.error('Error handling request:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }

  return new Response(JSON.stringify({ error: 'Method not found' }), { status: 404 });
}
