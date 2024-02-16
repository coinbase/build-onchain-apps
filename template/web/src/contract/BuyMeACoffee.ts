/**
 * This ABI is trimmed down to just the functions we expect to call for the
 * sake of minimizing bytes downloaded.
 */
const abi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  { type: 'receive', stateMutability: 'payable' },
  {
    type: 'function',
    name: 'buyCoffee',
    inputs: [
      { name: 'numCoffees', type: 'uint256', internalType: 'uint256' },
      { name: 'userName', type: 'string', internalType: 'string' },
      { name: 'twitterHandle', type: 'string', internalType: 'string' },
      { name: 'message', type: 'string', internalType: 'string' },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'getMemos',
    inputs: [
      { name: 'index', type: 'uint256', internalType: 'uint256' },
      { name: 'size', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple[]',
        internalType: 'struct Memo[]',
        components: [
          { name: 'numCoffees', type: 'uint256', internalType: 'uint256' },
          { name: 'userName', type: 'string', internalType: 'string' },
          { name: 'twitterHandle', type: 'string', internalType: 'string' },
          { name: 'message', type: 'string', internalType: 'string' },
          { name: 'time', type: 'uint256', internalType: 'uint256' },
          { name: 'userAddress', type: 'address', internalType: 'address' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'memos',
    inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      { name: 'numCoffees', type: 'uint256', internalType: 'uint256' },
      { name: 'userName', type: 'string', internalType: 'string' },
      { name: 'twitterHandle', type: 'string', internalType: 'string' },
      { name: 'message', type: 'string', internalType: 'string' },
      { name: 'time', type: 'uint256', internalType: 'uint256' },
      { name: 'userAddress', type: 'address', internalType: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'modifyMemoMessage',
    inputs: [
      { name: 'index', type: 'uint256', internalType: 'uint256' },
      { name: 'message', type: 'string', internalType: 'string' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address payable' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'price',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'removeMemo',
    inputs: [{ name: 'index', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'withdrawTips',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'BuyMeACoffeeEvent',
    inputs: [
      { name: 'buyer', type: 'address', indexed: true, internalType: 'address' },
      { name: 'price', type: 'uint256', indexed: false, internalType: 'uint256' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'NewMemo',
    inputs: [
      { name: 'userAddress', type: 'address', indexed: true, internalType: 'address' },
      { name: 'time', type: 'uint256', indexed: false, internalType: 'uint256' },
      { name: 'numCoffees', type: 'uint256', indexed: false, internalType: 'uint256' },
      { name: 'userName', type: 'string', indexed: false, internalType: 'string' },
      { name: 'twitterHandle', type: 'string', indexed: false, internalType: 'string' },
      { name: 'message', type: 'string', indexed: false, internalType: 'string' },
    ],
    anonymous: false,
  },
  { type: 'error', name: 'InsufficientFunds', inputs: [] },
  {
    type: 'error',
    name: 'InvalidArguments',
    inputs: [{ name: 'message', type: 'string', internalType: 'string' }],
  },
  { type: 'error', name: 'OnlyOwner', inputs: [] },
] as const;

export default abi;
