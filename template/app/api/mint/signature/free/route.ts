import { NextRequest, NextResponse } from 'next/server';
import { Hex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { SignableMessage } from 'viem/types/misc';
import { getSignatureMintPrivateKey } from '../../../../../src/store/environment';
import { getChainById } from '../../../../../src/store/supportedChains';

/**
 * Handler for the /api/mint/signature/free
 * @param req
 * @param res
 */
export async function GET(req: NextRequest): Promise<Response> {
  try {
    const query = req.nextUrl.searchParams;
    const chainId = query.get('chainId');
    const freeMintWallet = query.get('wallet');
    if (!chainId) {
      return NextResponse.json({ error: 'chainid is required' }, { status: 400 });
    }
    const chain = getChainById(chainId);
    if (!chain) {
      return NextResponse.json({ error: 'chainid not supported' }, { status: 400 });
    }
    if (!freeMintWallet) {
      return NextResponse.json({ error: 'wallet is required' }, { status: 400 });
    }

    /**
     * Wallet signing key should be a secret held in secure storage.  Consider using something like :
     * 1. AWS KMS: https://docs.aws.amazon.com/kms/latest/developerguide/overview.html
     * 2. Google Key Management: https://cloud.google.com/security/products/security-key-management?hl=en
     *
     * Ensure this is not a secret that is ever checked into code.
     */
    const walletSigningKey = getSignatureMintPrivateKey();
    if (!walletSigningKey) {
      return NextResponse.json({ error: 'walletSigningKey is required' }, { status: 400 });
    }

    /**
     * Next, we need to sign the message specified in SignatureMintERC721.sol.  We will use the same account
     * defined in the contract to sign a message.  We will import the private key into Viem and create a signing
     * event which will return a hex hash which can be used to mint a free NFT on the contract.
     */
    const account = privateKeyToAccount(walletSigningKey as Hex);
    const messageToSign: SignableMessage = `Free Mint: ${freeMintWallet.toLowerCase()}`;
    const signedMessage = await account.signMessage({ message: messageToSign });
    const response = {
      signature: signedMessage,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching chains:', error);
    return NextResponse.json({}, { status: 500, statusText: 'Internal Server Error' });
  }
}

export const dynamic = 'force-dynamic';
