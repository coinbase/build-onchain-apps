// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "forge-std/Test.sol";
import "../src/NFTUtilities.sol";

contract NFTUtilitiesTest is Test {
    function testGetEncodedStringPair() public {
        string memory key = "name";
        string memory value = "MyNFT";
        bool lastLine = false;

        string memory expectedOutput = '"name":"MyNFT",';
        string memory output = NFTUtilities.getEncodedStringPair(key, value, lastLine);

        assertEq(output, expectedOutput, "Output should match expected format with comma");
    }

    function testGetEncodedStringPairLastLine() public {
        string memory key = "symbol";
        string memory value = "MNFT";
        bool lastLine = true;

        string memory expectedOutput = '"symbol":"MNFT"';
        string memory output = NFTUtilities.getEncodedStringPair(key, value, lastLine);

        assertEq(output, expectedOutput, "Output should match expected format without comma");
    }

    function testGetEncodedStringPairEmptyValues() public {
        string memory key = "";
        string memory value = "";
        bool lastLine = false;

        string memory expectedOutput = '"":"",';
        string memory output = NFTUtilities.getEncodedStringPair(key, value, lastLine);

        assertEq(output, expectedOutput, "Output should correctly handle empty strings");
    }
}
