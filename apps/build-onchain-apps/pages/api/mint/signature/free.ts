import { Hex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { SignableMessage } from 'viem/types/misc';
import { getSignatureMintPrivateKey } from '../../../../src/store/environment';
import { getChainById } from '../../../../src/store/supportedChains';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Handler for the /api/mint/signature/free
 * @param req
 * @param res
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const chainId = req.query.chainId as string;
    const freeMintWallet = req.query.wallet as string;
    if (!chainId) {
      return res.status(400).json({ error: 'chainid is required' });
    }
    const chain = getChainById(chainId);
    if (!chain) {
      return res.status(400).json({ error: 'chainid not supported' });
    }
    if (!freeMintWallet) {
      return res.status(400).json({ error: 'wallet is required' });
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
      return res.status(400).json({ error: 'walletSigningKey is required' });
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
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching chains:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
