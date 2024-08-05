export const abi = [
  {
    type: 'function',
    name: 'executeBatch',
    inputs: [
      {
        name: 'calls',
        type: 'tuple[]',
        internalType: 'struct CoinbaseSmartWallet.Call[]',
        components: [
          {
            name: 'target',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'value',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'data',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
];
