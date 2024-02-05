import { Chain } from 'viem/chains';
import { useBlockExplorerLink } from '../../../onchainKit';

type ViewContractLinkProps = {
  chain: Chain;
  contractAddress?: `0x${string}`;
};

export default function ViewContractLink({ chain, contractAddress }: ViewContractLinkProps) {
  const explorerLink = useBlockExplorerLink(chain, contractAddress);

  if (!explorerLink) {
    return null;
  }

  return (
    <a
      href={explorerLink}
      target="_blank"
      rel="noopener noreferrer"
      className="focus:shadow-outline ml-3 inline-block rounded bg-blue-500 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none"
    >
      {' '}
      View Contract
    </a>
  );
}
