export const myNFTABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'to', type: 'address' }],
    name: 'safeMint',
    outputs: [],
  },
] as const;

export const myNFTAddress = '0x119Ea671030FBf79AB93b436D2E20af6ea469a19';
