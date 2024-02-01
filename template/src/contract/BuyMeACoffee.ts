/**
 * This ABI is trimmed down to just the functions we expect to call for the
 * sake of minimizing bytes downloaded.
 */
const abi = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  { inputs: [], name: 'InsufficientFunds', type: 'error' },
  {
    inputs: [{ internalType: 'string', name: 'message', type: 'string' }],
    name: 'InvalidArguments',
    type: 'error',
  },
  { inputs: [], name: 'OnlyOwner', type: 'error' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'buyer', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'price', type: 'uint256' },
    ],
    name: 'BuyMeACoffeeEvent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'userAddress', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'time', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'numCoffees', type: 'uint256' },
      { indexed: false, internalType: 'string', name: 'userName', type: 'string' },
      { indexed: false, internalType: 'string', name: 'twitterHandle', type: 'string' },
      { indexed: false, internalType: 'string', name: 'message', type: 'string' },
    ],
    name: 'NewMemo',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'numCoffees', type: 'uint256' },
      { internalType: 'string', name: 'userName', type: 'string' },
      { internalType: 'string', name: 'twitterHandle', type: 'string' },
      { internalType: 'string', name: 'message', type: 'string' },
    ],
    name: 'buyCoffee',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMemos',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'numCoffees', type: 'uint256' },
          { internalType: 'string', name: 'userName', type: 'string' },
          { internalType: 'string', name: 'twitterHandle', type: 'string' },
          { internalType: 'string', name: 'message', type: 'string' },
          { internalType: 'uint256', name: 'time', type: 'uint256' },
          { internalType: 'address', name: 'userAddress', type: 'address' },
        ],
        internalType: 'struct Memo[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'memos',
    outputs: [
      { internalType: 'uint256', name: 'numCoffees', type: 'uint256' },
      { internalType: 'string', name: 'userName', type: 'string' },
      { internalType: 'string', name: 'twitterHandle', type: 'string' },
      { internalType: 'string', name: 'message', type: 'string' },
      { internalType: 'uint256', name: 'time', type: 'uint256' },
      { internalType: 'address', name: 'userAddress', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'index', type: 'uint256' },
      { internalType: 'string', name: 'message', type: 'string' },
    ],
    name: 'modifyMemoMessage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address payable', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'price',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
    name: 'removeMemo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdrawTips',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
] as const;

export default abi;
