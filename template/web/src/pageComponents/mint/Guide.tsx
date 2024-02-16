export default function Guide() {
  return (
    <>
      <h3 className="mb-6 text-4xl font-medium text-white" id="guide">
        Guide
      </h3>
      <div className="h-px bg-white" />
      <section className="mt-10 flex flex-col">
        <h4 className="text-xl font-normal text-white">Contract Summary</h4>
        <p className="my-4 text-base font-normal text-zinc-400">The <code>AllowlistNFT.sol</code> smart contract is an 
        extension of an ERC721 smart contract. 
        The <a href="https://github.com/chiru-labs/ERC721A" target="_blank">ERC721A</a> implementation 
        is an extension of the <a href="https://eips.ethereum.org/EIPS/eip-721" target="_blank">ERC721 specification</a>, 
        and is optimized for gas savings and batch operations.</p>
      </section>
    </>
  );
}
