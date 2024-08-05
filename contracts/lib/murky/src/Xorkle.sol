// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./common/MurkyBase.sol";

/// @notice Nascent, simple, kinda efficient (and improving!) Merkle proof generator and verifier
/// @author dmfxyz
/// @dev Note Xor Based "Merkle" Tree
contract Xorkle is MurkyBase {
   
    /********************
    * HASHING FUNCTION *
    ********************/

    function hashLeafPairs(bytes32 left, bytes32 right) public pure override returns (bytes32 _hash) {
        // saves a few gas lol
        assembly {
            mstore(0x0, xor(left,right))
           _hash := keccak256(0x0, 0x20)
        }
    }
}
