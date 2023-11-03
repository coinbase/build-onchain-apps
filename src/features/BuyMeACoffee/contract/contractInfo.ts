import abi from './BuyMeACoffee.json';

// Contract Address & ABI
export const contractAddress =
  process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS ?? '0xeeC0bD3B58293ff45004C7eFf02917Beef28257c';
export const contractABI = abi.abi;
