// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

/// @notice Helper functions for scripts
contract ScriptHelper is Script {

    /// @dev Compares two strings and returns true iff they are equal.
    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    /// @dev Returns a slice of `_bytes` with the first 64 bytes removed.
    function ltrim64(bytes memory _bytes) internal pure returns (bytes memory) {
        return slice(_bytes, 64, _bytes.length - 64);
    }
    
    /// @dev Returns a slice of `_bytes` starting at index `_start` and of length `_length`.
    /// referenece: https://github.com/GNSPS/solidity-bytes-utils/blob/6458fb2780a3092bc756e737f246be1de6d3d362/contracts/BytesLib.sol#L228
    function slice(bytes memory _bytes, uint256 _start, uint256 _length) internal pure returns (bytes memory) {
        require(_length + 31 >= _length, "slice_overflow");
        require(_bytes.length >= _start + _length, "slice_outOfBounds");

        bytes memory tempBytes;

        assembly {
            switch iszero(_length)
            case 0 {
                tempBytes := mload(0x40)

                let lengthmod := and(_length, 31)
                let mc := add(add(tempBytes, lengthmod), mul(0x20, iszero(lengthmod)))
                let end := add(mc, _length)

                for {
                    let cc := add(add(add(_bytes, lengthmod), mul(0x20, iszero(lengthmod))), _start)
                } lt(mc, end) {
                    mc := add(mc, 0x20)
                    cc := add(cc, 0x20)
                } {
                    mstore(mc, mload(cc))
                }

                mstore(tempBytes, _length)
                mstore(0x40, and(add(mc, 31), not(31)))
            }
            default {
                tempBytes := mload(0x40)

                mstore(tempBytes, 0)
                mstore(0x40, add(tempBytes, 0x20))
            }
        }
        return tempBytes;
    }

    /// @dev Converts a string array into a JSON array string.
    function stringArrayToString(string[] memory array) internal pure returns (string memory) {
        string memory result = "[";

        for (uint i = 0; i < array.length; i++) {
            if (i != array.length - 1)
                result = string.concat(result, "\"", array[i], "\",");
            else
                result = string.concat(result, "\"", array[i], "\"");
        }

        return string.concat(result, "]");
    }

    /// @dev Converts a string array into a JSON array string. Does not add quotes around each element.
    function stringArrayToArrayString(string[] memory array) internal pure returns (string memory) {
        string memory result = "[";

        for (uint i = 0; i < array.length; i++) {
            if (i != array.length - 1)
                result = string.concat(result, array[i], ",");
            else
                result = string.concat(result, array[i]);
        }

        return string.concat(result, "]");
    }

    /// @dev Converts a bytes32 array into a JSON array string.
    function bytes32ArrayToString(bytes32[] memory array) internal pure returns (string memory) {
        string memory result = "[";

        for (uint i = 0; i < array.length; i++) {
            if (i != array.length - 1)
                result = string.concat(result, "\"", vm.toString(array[i]), "\",");
            else
                result = string.concat(result, "\"", vm.toString(array[i]), "\"");
        }

        return string.concat(result, "]");
    }
}