// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Script, console2} from "forge-std/Script.sol";
import "../src/BuyMeACoffee.sol";

contract BuyMeACoffeeScript is Script {
    function setUp() public {}

    function run() public {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(privateKey);
        BuyMeACoffee buyMeACoffee = new BuyMeACoffee();
        vm.stopBroadcast();
        console2.log("BuyMeACoffee address: ", address(buyMeACoffee));
    }
}
