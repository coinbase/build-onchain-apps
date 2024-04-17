// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Script, console2} from "forge-std/Script.sol";
import "../src/CustomERC1155.sol";

contract CustomERC1155Script is Script {
    function setUp() public {}

    function run() public {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(privateKey);
        COFFEEKITTEN customERC1155 = new COFFEEKITTEN();
        vm.stopBroadcast();
        console2.log("COFFEEKITTEN address: ", address(customERC1155));
    }
}
