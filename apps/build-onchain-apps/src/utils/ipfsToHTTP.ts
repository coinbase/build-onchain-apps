/**
 * @param ipfsURI An ipfs protocol URI.
 * @returns An HTTPS URI that points to the data represented by the cid
 * embedded in the ipfs URI.
 */
function ipfsToHTTP(ipfsURI: string) {
  const cid = ipfsURI.replace('ipfs://', '');
  // This is a free public gateway. For production use, you'll likely want a
  // paid provider.
  return `https://ipfs.io/ipfs/${cid}`;
}

export default ipfsToHTTP;
