import MerkleTree from './merkle-tree';
import { ethers } from 'ethers';
import { toBuffer } from 'ethereumjs-util';

const encoder = ethers.utils.defaultAbiCoder;
const num_leaves = process.argv[2];
const encoded_leaves = process.argv[3];
const decoded_data = encoder.decode([`bytes32[${num_leaves}]`], encoded_leaves)[0]
var dataAsBuffer = decoded_data.map(b => toBuffer(b));

const tree = new MerkleTree(dataAsBuffer);
process.stdout.write(ethers.utils.defaultAbiCoder.encode(['bytes32'], [tree.getRoot()]));


