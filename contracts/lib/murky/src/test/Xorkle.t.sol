// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "../Xorkle.sol";
import "forge-std/Test.sol";

contract ContractTest is DSTest {
    Xorkle m;
    Vm vm = Vm(HEVM_ADDRESS);
    function setUp() public {
        m = new Xorkle();
    }

    function testHashes(bytes32 left, bytes32 right) public {
        bytes32 hAssem = m.hashLeafPairs(left, right);
        bytes32 hNaive = keccak256(abi.encode(left ^ right));
        assertEq(hAssem, hNaive);
    }
    
    function testGenerateProof(bytes32[] memory data, uint256 node) public {
        vm.assume(data.length > 1);
        vm.assume(node < data.length);
        bytes32 root = m.getRoot(data);
        bytes32[] memory proof = m.getProof(data, node);
        bytes32 valueToProve = data[node];

        bytes32 rollingHash = valueToProve;
        for(uint i = 0; i < proof.length; ++i){
            rollingHash = m.hashLeafPairs(rollingHash, proof[i]);
        }
        assertEq(rollingHash, root);
    }

    function testVerifyProof(bytes32[] memory data, uint256 node) public {
        vm.assume(data.length > 1);
        vm.assume(node < data.length);
        bytes32 root = m.getRoot(data);
        bytes32[] memory proof = m.getProof(data, node);
        bytes32 valueToProve = data[node];
        assertTrue(m.verifyProof(root, proof, valueToProve));
    }

    function testFailVerifyProof(bytes32[] memory data, bytes32 valueToProve, uint256 node) public {
        vm.assume(data.length > 1);
        vm.assume(node < data.length);
        vm.assume(valueNotInArray(data, valueToProve));
        bytes32 root = m.getRoot(data);
        bytes32[] memory proof = m.getProof(data, node);
        assertTrue(m.verifyProof(root, proof, valueToProve));
    }

    function testWontGetRootSingleLeaf() public {
        bytes32[] memory data = new bytes32[](1);
        data[0] = bytes32(0x0); 
        vm.expectRevert("won't generate root for single leaf");
        m.getRoot(data);
    }

    function testWontGetProofSingleLeaf() public {
        bytes32[] memory data = new bytes32[](1);
        data[0] = bytes32(0x0);
        vm.expectRevert("won't generate proof for single leaf");
        m.getProof(data, 0x0);
    }

    function valueNotInArray(bytes32[] memory data, bytes32 value) public pure returns (bool) {
        for (uint i = 0; i < data.length; ++i) {
            if (data[i] == value) return false;
        }
        return true;
    }
}
