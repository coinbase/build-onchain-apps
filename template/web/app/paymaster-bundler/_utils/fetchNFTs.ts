import { SmartAccountClient } from 'permissionless';
import { PublicClient } from 'viem';
import PaymasterBundlerABI from '../_contracts/PaymasterBundlerABI';
import { contractAddress } from '../constants';
import { NFTType } from '../types';

export default async function fetchNFTs(smartAccount: SmartAccountClient, client: PublicClient) {
  // Get # of NFTs owned by address
  const address = smartAccount.account?.address;

  if (!address) return;

  const numTokens = await client.readContract({
    address: contractAddress,
    abi: PaymasterBundlerABI,
    functionName: 'balanceOf',
    args: [address],
  });

  // Get the token IDs and metadata by token ID
  var tokens = [] as string[];

  for (let i = 0; i < Number(numTokens); i++) {
    const tokenID = await client.readContract({
      address: contractAddress,
      abi: PaymasterBundlerABI,
      functionName: 'tokenOfOwnerByIndex',
      args: [address, BigInt(i)],
    });

    const tokenJSONLink = await client.readContract({
      address: contractAddress,
      abi: PaymasterBundlerABI,
      functionName: 'tokenURI',
      args: [BigInt(tokenID)],
    });

    tokens.push(tokenJSONLink);
  }

  const fetchOps = [] as Promise<unknown>[];
  const tokenJSONs = [] as NFTType[];

  tokens.forEach((token) => {
    fetchOps.push(
      (async () => {
        try {
          const tokenResponse = await fetch(token);
          const parsedToken = (await tokenResponse.json()) as NFTType;

          tokenJSONs.push(parsedToken);
        } catch (e) {
          console.error('Error parsing JSON');
        }
      })(),
    );
  });

  await Promise.all(fetchOps);

  return tokenJSONs;
}
