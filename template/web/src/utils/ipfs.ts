/**
 * Convert IPFS URI to HTTPS URI.
 *
 * @param ipfsURI An ipfs protocol URI.
 * @param gateway The IPFS gateway to use. Defaults to ipfs.io, a free public gateway.
 *                For production use, you'll likely want a paid provider.
 * @returns An HTTPS URI that points to the data represented by the cid
 * embedded in the ipfs URI.
 */
export const ipfsToHTTP = function (ipfsURI: string, gateway = 'ipfs.io') {
  // IPNS Name is a Multihash of a serialized PublicKey.
  const cid = ipfsURI.replace('ipfs://', '');

  // Addresses using a gateway use the following form,
  // where <gateway> is the gateway address,
  // and <CID> is the content identifier.
  return `https://${gateway}/ipfs/${cid}`;
};
