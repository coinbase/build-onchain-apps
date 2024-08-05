import MerkleTree from './merkle-tree';
import * as fs from 'fs';
import { ethers } from 'ethers';
import { toBuffer } from 'ethereumjs-util';
import crypto from 'crypto';

var data = [];
for (var i = 0; i < 129; ++i) {
    data.push("0x" + crypto.randomBytes(32).toString('hex'));
}
var dataAsBuffer = data.map(b => toBuffer(b));

const tree = new MerkleTree(dataAsBuffer);
process.stdout.write(ethers.utils.defaultAbiCoder.encode(['bytes32'], [tree.getRoot()]));
const encodedData = ethers.utils.defaultAbiCoder.encode(["bytes32[129]"], [data]);
if (!fs.existsSync("../data/")) {
    fs.mkdirSync("../data/");
}
fs.writeFileSync("../data/input", encodedData);

