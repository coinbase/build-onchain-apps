// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Script, console2} from "forge-std/Script.sol";
import "../src/WhitelistNFT.sol";

contract WhitelistNFTScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        WhitelistNFT whitelistNFT = new WhitelistNFT(
            "NAME",
            "TICKER",
            0x000,
            10000,
            0.02 ether,
            0.01 ether,
            1705597895,
            1705601495,
            1,
            5,
            "ipfs://your-ipfs-hash/"
        );
        vm.stopBroadcast();
        console2.log("WhitelistNFT address: ", address(whitelistNFT));
    }
}
