export const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;
export const paymasterUrl = process.env.NEXT_PUBLIC_PAYMASTER_URL;
export const entryPoint = '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789';
export const contractAddress = '0x66519FCAee1Ed65bc9e0aCc25cCD900668D3eD49';
export const factoryAddress = '0x9406Cc6185a346906296840746125a0E44976454';
export const coinbaseSmartWalletProxyBytecode =
  '0x363d3d373d3d363d7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc545af43d6000803e6038573d6000fd5b3d6000f3';
export const coinbaseSmartWalletV1Implementation = '0x000100abaad02f1cfC8Bbe32bD5a564817339E72';
export const magicSpendAddress = '0x011A61C07DbF256A68256B1cB51A5e246730aB92';
export const erc1967ProxyImplementationSlot =
  '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc';

export const coinbaseSmartWalletABI = [
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
