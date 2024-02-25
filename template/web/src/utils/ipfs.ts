import { cid } from 'is-ipfs';

export const DEFAULT_IPFS_GATEWAY_KEYS = {
  cloudflare: 'cloudflare',
  ipfsIo: 'ipfsIo',
  pinata: 'pinata',
  nftStorage: 'nftStorage',
};

export type DefaultIpfsGatewayKeys =
  (typeof DEFAULT_IPFS_GATEWAY_KEYS)[keyof typeof DEFAULT_IPFS_GATEWAY_KEYS];

export type IpfsGateways = Record<DefaultIpfsGatewayKeys, string>;

export const DEFAULT_IPFS_GATEWAY_HOSTNAMES: IpfsGateways = {
  cloudflare: 'cloudflare-ipfs.com',
  ipfsIo: 'ipfs.io',
  pinata: 'gateway.pinata.cloud',
  nftStorage: 'nftstorage.link',
};

/**
 * Checks if a string contains an IPFS CID
 * @param ipfsURI
 * @returns an object with a boolean indicating if the string contains a CID and the CID if it does
 */
export const containsCID = (ipfsURI?: string | null) => {
  if (typeof ipfsURI !== 'string') {
    throw new Error('url is not string');
  }
  const splitUrl = ipfsURI.split(/\/|\?/);
  for (const split of splitUrl) {
    if (cid(split)) {
      return {
        containsCid: true,
        cid: split,
      };
    }
    const splitOnDot = split.split('.')[0];
    if (cid(splitOnDot)) {
      return {
        containsCid: true,
        cid: splitOnDot,
      };
    }
  }

  return {
    containsCid: false,
    cid: '',
  };
};

/**
 * Transforms an IPFS URL to a desired gateway.
 * The input URL can either already be a http url or an ipfs uri.
 * Supports ipns and ipfs uris with folder paths
 * @param ipfsURI - ipfs uri or http url (ipfs://${cid} or http://ipfs.io/ipfs/${cid})
 * @param gatewayHostname - preferred gateway provider
 */
export const transformIpfsUrlToUrlGateway = (
  ipfsURI?: string | null,
  gatewayHostname = DEFAULT_IPFS_GATEWAY_HOSTNAMES[DEFAULT_IPFS_GATEWAY_KEYS.pinata],
) => {
  const results = containsCID(ipfsURI);
  if (!ipfsURI || !results.containsCid || !results.cid) {
    throw new Error('url does not contain CID');
  }

  if (gatewayHostname?.startsWith('http')) {
    throw new Error('gatewayHostname should not start with http');
  }

  const splitUrl = ipfsURI.split(results.cid);
  //case 1 - the ipfs://cid path
  if (ipfsURI.includes(`ipfs://${results.cid}`)) {
    return `https://${gatewayHostname}/ipfs/${results.cid}${splitUrl[1]}`;
  }

  //case 2 - the /ipfs/cid path (this should cover ipfs://ipfs/cid as well
  if (ipfsURI.includes(`/ipfs/${results.cid}`)) {
    return `https://${gatewayHostname}/ipfs/${results.cid}${splitUrl[1]}`;
  }

  //case 3 - the /ipns/cid path
  if (ipfsURI.includes(`/ipns/${results.cid}`)) {
    return `https://${gatewayHostname}/ipns/${results.cid}${splitUrl[1]}`;
  }

  if (!ipfsURI.includes('ipfs') && ipfsURI === results.cid) {
    return `https://${gatewayHostname}/ipfs/${results.cid}${splitUrl[1]}`;
  }

  console.warn(`Unsupported URL pattern: ${ipfsURI}. Attempting a default fallback.`);
  return `https://${gatewayHostname}/ipfs/${results.cid}${splitUrl[1]}`;
};

/**
 * Convert IPFS or HTTP URI to HTTPS URI with an ipfs gateway provider (if provided).
 *
 * @param ipfsURI A value from contract. Can be an ipfs or http URI.
 * @param gatewayHostname The IPFS gateway to use. Defaults to ipfs.io, a free public gateway.
 *                For production use, you'll likely want a paid provider.
 * @returns An HTTPS URI that points to the data represented by the cid
 * embedded in the ipfs URI.
 */
export const ipfsToHTTP = (ipfsURI?: string | null, gatewayHostname?: string) => {
  if (!ipfsURI) return '';

  if (ipfsURI.startsWith('http') && !containsCID(ipfsURI).containsCid) {
    return ipfsURI.replace('http://', 'https://');
  }

  // If no gateway url is passed, and url contains cid, and url already starts with http, just return it as is, making sure it's https
  if (ipfsURI.startsWith('http') && containsCID(ipfsURI).containsCid && !gatewayHostname) {
    return ipfsURI.replace('http://', 'https://');
  }

  if (containsCID(ipfsURI).containsCid) {
    return transformIpfsUrlToUrlGateway(
      ipfsURI,
      gatewayHostname ?? DEFAULT_IPFS_GATEWAY_HOSTNAMES[DEFAULT_IPFS_GATEWAY_KEYS.ipfsIo],
    );
  }

  return '';
};
