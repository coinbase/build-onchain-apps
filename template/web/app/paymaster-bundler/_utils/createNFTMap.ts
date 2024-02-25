import { NFTType } from '../types';

export default function createNFTMap(tokenJSONs: NFTType[]) {
  const NFTMap = {};

  tokenJSONs.forEach((tokenJSON) => {
    if (NFTMap[tokenJSON.name]) {
      NFTMap[tokenJSON.name] = NFTMap[tokenJSON.name] + 1;
    } else {
      NFTMap[tokenJSON.name] = 1;
    }
  });

  return NFTMap;
}
