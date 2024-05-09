// import { paymasterUrl } from '../constants'

export async function POST(r: Request) {
  console.log('Running New Paymaster Proxy');

  try {
    const req = await r.json();
    const method = req.method;
    const [userOp, entrypoint, chainId] = req.params;

    if (method === 'pm_getPaymasterStubData') {
      const data = {
        id: 1,
        jsonrpc: '2.0',
        method: 'pm_getPaymasterStubData',
        params: [userOp, entrypoint, chainId],
      };
      const res = await fetch(`https://keys.coinbase.com`, {
        // URL from your paymaster service provider
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return Response.json(await res.json());

    } else if (method === 'pm_getPaymasterData') {
      // handle pm_getPaymasterData
      console.log("running pm_getPaymasterData");
    }
  } catch (error) {
    console.error('Error in POST function:', error);
    return new Response(JSON.stringify({ error: 'Failed to process request' }), { status: 500 });
  }
}
