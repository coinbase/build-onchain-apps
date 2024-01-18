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
            "NAME", // name
            "TICKER", // ticker
            0x000, // whitelistRoot
            10000, // maxSupply
            0.02 ether, // price of public mint
            0.01 ether, // price of whitelist mint
            1705597895, // whitelistOpen timestamp
            1705601495, // whitelistClose timestamp
            1, // maxWhitelistMint
            5, // maxPublicMint
            "ipfs://your-ipfs-hash/" // baseURI - this should be YOUR IPFS HASH!
        );
        vm.stopBroadcast();
        console2.log("WhitelistNFT address: ", address(whitelistNFT));
    }
}
