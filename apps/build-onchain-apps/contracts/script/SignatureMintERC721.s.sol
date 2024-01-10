// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Script, console2} from "forge-std/Script.sol";
import "../src/SignatureMintERC721.sol";

contract SignatureMintERC721Script is Script {
    function setUp() public {}

    function run() public {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        address signer = vm.envAddress("SIGNATURE_MINT_SIGNER");
        vm.startBroadcast(privateKey);
        SignatureMintERC721 mint = new SignatureMintERC721(signer);
        vm.stopBroadcast();
        console2.log("SignatureMint address: ", address(mint));
    }
}
