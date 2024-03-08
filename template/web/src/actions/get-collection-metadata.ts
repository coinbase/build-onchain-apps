import { ipfsToHTTP } from '@/utils/ipfs';

export type JsonMetadata = {
  name: string | undefined;
  description: string | undefined;
  image: string | undefined;
};

function tryParseMetadataJson(str: string, gatewayHostname?: string): JsonMetadata | undefined {
  try {
    const json = JSON.parse(str) as JsonMetadata;
    return {
      name: json.name,
      description: json.description,
      image: json.image ? ipfsToHTTP(json.image, gatewayHostname) : undefined,
    };
  } catch {}
}

/**
 * Fetches the collection metadata from the uri.
 * @param metadataURI The contract's metadata URI (e.g. ipfs://QmY5V6JZ5Yf7Z6p8n7Y1Z5dJLXhZU7Z7Q3mH2nX8vqfHc5)
 * @param gatewayHostname Optional IPFS gateway hostname
 * @returns {Promise<JsonMetadata>} The collection metadata
 */
export const getCollectionMetadataAction = async ({
  gatewayHostname,
  metadataURI,
}: {
  metadataURI: string;
  gatewayHostname?: string;
}): Promise<JsonMetadata> => {
  /**
   * Contract URIs can either be hosted externally (e.g. IPFS or HTTP) or stored as data within the contract itself as json.
   * While this is not defined in https://datatracker.ietf.org/doc/html/rfc3986#section-1.1.2 it is a common
   * practice out in the wild.
   * TODO: Also handle base64 encoded data i.e. `window.atob(str.split(';base64,')[1] || '')`
   */
  const jsonParsedMetadata = tryParseMetadataJson(metadataURI, gatewayHostname);
  if (jsonParsedMetadata) {
    return jsonParsedMetadata;
  } else {
    const response = await fetch(ipfsToHTTP(metadataURI, gatewayHostname));
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const json = (await response.json()) as JsonMetadata;
    return {
      name: json.name,
      description: json.description,
      image: ipfsToHTTP(json.image ?? '', gatewayHostname),
    };
  }
};
