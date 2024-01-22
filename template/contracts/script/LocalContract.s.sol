// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Script, console2} from "forge-std/Script.sol";
import "../src/LocalContract.sol";

contract LocalContractScript is Script {
    function setUp() public {}

    function run() public {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(privateKey);
        LocalBuyMeACoffeeContract localBuyMeACoffee = new LocalBuyMeACoffeeContract();
        vm.stopBroadcast();
        localBuyMeACoffee.buyCoffee{value: 0.0001 ether}("test", "testMessage");
    }
}
