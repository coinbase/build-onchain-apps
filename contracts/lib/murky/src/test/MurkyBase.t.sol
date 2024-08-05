pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "../common/MurkyBase.sol";

contract MurkyBaseTest is Test, MurkyBase {

    // Hacky way to test the base functions until transitioned to library
    function hashLeafPairs(bytes32, bytes32) public pure virtual override returns (bytes32) {
        return bytes32(0x0);
    }

    function testLogCeil(uint256 x) public{
        vm.assume(x > 0);
        this.log2ceil(x);
    }

    function testLogCeilBitMagic(uint256 x) public {
        vm.assume(x > 0);
        this.log2ceilBitMagic(x);
    }


    function testLogCeil_KnownPowerOf2() public {
        assertEq(3, this.log2ceilBitMagic(8));
    }
    function testLogCeil_Known() public {
        assertEq(8, this.log2ceilBitMagic((129)));
    }

}