import { isValidAAEntrypoint, isWalletASmartWallet } from '@coinbase/onchainkit/wallet';
import { NextRequest, NextResponse } from 'next/server';
import { UserOperation } from 'permissionless';
import { client, paymasterClient } from '@/utils/paymasterClient';
import type {
  IsValidAAEntrypointOptions,
  IsWalletASmartWalletOptions,
} from '@coinbase/onchainkit/wallet';

type PaymasterRequest = {
  method: string;
  params: [UserOperation<'v0.6'>, string, string];
};

/**
 * POST function handles incoming POST requests for sponsoring operations.
 *
 * @param {Request} r - The incoming request object.
 * @returns {Promise<Response>} - The response object containing the result or an error message.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const reqBody: PaymasterRequest = (await req.json()) as PaymasterRequest;
  const { method, params } = reqBody;
  const [userOp, entrypoint] = params;

  // Verify the entrypoint address
  if (!isValidAAEntrypoint({ entrypoint } as IsValidAAEntrypointOptions)) {
    return NextResponse.json({ error: 'invalid entrypoint' }, { status: 400 });
  }

  // Validate the User Operation by checking if the sender address is a proxy with the expected bytecode.
  if (
    !(await isWalletASmartWallet({
      client,
      userOp,
    } as IsWalletASmartWalletOptions))
  ) {
    return NextResponse.json({ error: 'invalid wallet' }, { status: 400 });
  }

  try {
    let result;
    // Initial checks and preliminary validation.
    if (method === 'pm_getPaymasterStubData') {
      result = await paymasterClient.getPaymasterStubData({
        userOperation: userOp,
      });
      // Full validation and actual sponsorship data.
    } else if (method === 'pm_getPaymasterData') {
      result = await paymasterClient.getPaymasterData({
        userOperation: userOp,
      });
    } else {
      return NextResponse.json({ error: 'Method not found' }, { status: 404 });
    }
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
