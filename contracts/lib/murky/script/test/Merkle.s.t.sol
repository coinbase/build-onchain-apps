// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "openzeppelin-contracts/contracts/utils/cryptography/MerkleProof.sol";

import "../common/ScriptHelper.sol";

contract MerkleScriptOutputTest is Test, ScriptHelper {

    // TODO: hardcoding the output from /script/target/output.json for simplicity now

    bytes32[] proof = [
        bytes32(0x073180b765e1cf92cb05630069c8481ec19171661317b4fab88b9c3c9835fb5b),
        bytes32(0x7040f273bcf51ac5aeb606be19c784802b4a81469d609428e2487c5fa23e855e),
        bytes32(0x00d9335e1f2b15d085d331fc240a20196e4ae5037b7d317f05d597c855a329b4)
    ];
    bytes32 root =
        0xb61922e9343b32c54f90f4cca2561cc277e090b279ba4f9e75d1a9994b895123;
    bytes32 leaf =
        0x035e33df50de019c2fdafb75e088976405fe8806b0341fa28db67c78e5e7f0e7;

    address addr = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
    uint256 value = 10000;
    uint256 index = 1;

    function testAbiEncode(address a, uint256 b, uint256 c) public {
        vm.assume(a != address(0));
        vm.assume(b != 0);
        vm.assume(c != 0);

        bytes32 a_bytes = bytes32(uint256(uint160(a)));
        bytes32 b_bytes = bytes32(b);
        bytes32 c_bytes = bytes32(c);

        bytes32[] memory _bytes = new bytes32[](3);
        _bytes[0] = a_bytes;
        _bytes[1] = b_bytes;
        _bytes[2] = c_bytes;

        assertEq(
            abi.encode(a, b, c),
            ltrim64(abi.encode(_bytes))
        );
    }

    function testComputeLeaf() public {
        bytes32 computedLeaf = keccak256(bytes.concat(keccak256(abi.encode(addr, value, index))));
        assertEq(computedLeaf, leaf);
    }

    function testVerify() public {
        bytes32 computedLeaf = keccak256(bytes.concat(keccak256(abi.encode(addr, value, index))));
        assertTrue(MerkleProof.verify(proof, root, computedLeaf));
    }

    function testFalseAddress(address a) public {
        vm.assume(a != addr);

        bytes32 computedLeaf = keccak256(bytes.concat(keccak256(abi.encode(a, value, index))));
        assertFalse(MerkleProof.verify(proof, root, computedLeaf));
    }

    function testFalseValue(uint256 b, uint256 c) public {
        vm.assume(b != value);
        vm.assume(c != index);

        bytes32 computedLeaf = keccak256(bytes.concat(keccak256(abi.encode(addr, b, c))));
        assertFalse(MerkleProof.verify(proof, root, computedLeaf));
    }
}
