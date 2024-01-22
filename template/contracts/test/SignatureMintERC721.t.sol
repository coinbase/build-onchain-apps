// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Test, console2} from "forge-std/Test.sol";
import {SignatureMintERC721, InsufficientFunds} from "../src/SignatureMintERC721.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract SignatureMintERC721Test is Test {
    SignatureMintERC721 public signatureMintERC721;
    address private signer;
    address private minter;
    uint256 private minterKey;
    uint256 private privateKey;
    uint256 private mintCost = 0.0001 ether;
    bytes32 private insufficientFundsSignature = keccak256("InsufficientFunds()");

    function setUp() public {
        (signer, privateKey) = genKeyPair();
        (minter, minterKey) = genKeyPair();
        signatureMintERC721 = new SignatureMintERC721(signer);
    }

    // --- Utility Methods ---
    function signMessage(bytes32 message, uint256 key) internal pure returns (bytes memory) {
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(key, message);
        bytes memory signature = toBytes(r, s, v);
        return signature;
    }

    function genKeyPair() internal view returns (address, uint256) {
        uint256 key = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao)));
        address addr = vm.addr(key);
        return (addr, key);
    }

    function toBytes(bytes32 r, bytes32 s, uint8 v) internal pure returns (bytes memory) {
        return abi.encodePacked(r, s, v);
    }

    // --- Tests ---
    function testFreeMintWithWrongSignature() public {
        bytes32 messageToSign = signatureMintERC721.getBytesToSign(address(0)); //wrong address to sign
        bytes memory signature = signMessage(messageToSign, privateKey);
        vm.startPrank(minter);
        vm.expectRevert(bytes("Unable to verify Signature"));
        signatureMintERC721.freeMint(minter, signature);
        assertEq(signatureMintERC721.balanceOf(minter), 0);
        vm.stopPrank();
    }

    function testFreeMintWithInvalidSignature() public {
        bytes memory signature = bytes("N0tValid0x0x0x0");
        vm.startPrank(minter);
        vm.expectRevert();
        signatureMintERC721.verifySignature(minter, signature);
        assertEq(signatureMintERC721.balanceOf(minter), 0);
        vm.stopPrank();
    }

    function testFreeMintWithValidSignature() public {
        vm.startPrank(minter);
        assertEq(signatureMintERC721.balanceOf(minter), 0);
        bytes32 messageToSign = signatureMintERC721.getBytesToSign(minter);

        // Expect the FreeMint event to get called
        vm.expectEmit(true, true, true, true);
        emit SignatureMintERC721.Mint(minter, 1, 0);
        bytes memory signature = signMessage(messageToSign, privateKey);
        signatureMintERC721.freeMint(minter, signature);
        assertEq(signatureMintERC721.balanceOf(minter), 1);
        vm.stopPrank();
    }

    function testPaidMint() public {
        vm.startPrank(minter);
        assertEq(signatureMintERC721.balanceOf(minter), 0);
        vm.deal(minter, 1 ether);

        // Expect the FreeMint event to get called
        vm.expectEmit(true, true, true, true);
        emit SignatureMintERC721.Mint(minter, 1, mintCost);
        signatureMintERC721.mint{value: mintCost}(minter);
        assertEq(signatureMintERC721.balanceOf(minter), 1);
        vm.stopPrank();
    }

    function testPaidMintWithWrongValue() public {
        vm.startPrank(minter);
        vm.deal(minter, 1 ether);
        vm.expectRevert(InsufficientFunds.selector);
        signatureMintERC721.mint{value: 0.000001 ether}(minter);
        assertEq(signatureMintERC721.balanceOf(minter), 0);
        vm.stopPrank();
    }

    function testPaidMintWithNoFunds() public {
        vm.startPrank(minter);
        vm.expectRevert();
        signatureMintERC721.mint{value: 0.000001 ether}(minter);
        assertEq(signatureMintERC721.balanceOf(minter), 0);
        vm.stopPrank();
    }

    function testNoMintsGetToken() public {
        vm.startPrank(minter);
        vm.expectRevert(bytes("Token doesnt exist"));
        signatureMintERC721.tokenURI(0);
        assertEq(signatureMintERC721.balanceOf(minter), 0);
        vm.stopPrank();
    }

    function testFreeMintOnlyAllowsOneMint() public {
        vm.startPrank(minter);
        assertEq(signatureMintERC721.balanceOf(minter), 0);
        bytes32 messageToSign = signatureMintERC721.getBytesToSign(minter);
        bytes memory signature = signMessage(messageToSign, privateKey);
        signatureMintERC721.freeMint(minter, signature);
        vm.expectRevert(bytes("Free mint already used"));
        signatureMintERC721.freeMint(minter, signature);
        assertEq(signatureMintERC721.balanceOf(minter), 1);
        vm.stopPrank();
    }

    function testMetadataInvalidTokenId() public {
        vm.startPrank(minter);
        vm.expectRevert(bytes("Token doesnt exist"));
        signatureMintERC721.tokenURI(1000);
        vm.stopPrank();
    }

    function testStringToSignIsValid() public {
        vm.startPrank(minter);
        string memory messageToSign = signatureMintERC721.getStringToSign(minter);
        string memory addr = Strings.toHexString(uint160(minter), 20);
        string memory expected = string(abi.encodePacked("Free Mint: ", addr));
        assertEq(messageToSign, expected);
        vm.stopPrank();
    }

    function testMetadataReturnsCorrectly() public {
        vm.startPrank(minter);
        assertEq(signatureMintERC721.balanceOf(minter), 0);
        vm.deal(minter, 1 ether);
        signatureMintERC721.mint{value: mintCost}(minter);
        string memory contractUri = signatureMintERC721.contractURI();
        string memory expectedUri =
            "{\"description\":\"Buy a dog a coffee\",\"symbol\":\"CDOG\",\"image\":\"ipfs://QmQRzw5MtNQcdjg9rZ8MYugAz6WjaBdvsuNShKTLYNJdj7/coffee_dog.png\",\"animation_url\":\"\"}";
        assertEq(contractUri, expectedUri);

        string memory tokenUri = signatureMintERC721.tokenURI(0);
        string memory expectedTokenUri =
            "{\"name\":\"CoffeeDog #0\",\"description\":\"Buy a dog a coffee\",\"symbol\":\"CDOG\",\"image\":\"ipfs://QmQRzw5MtNQcdjg9rZ8MYugAz6WjaBdvsuNShKTLYNJdj7/coffee_dog.png\",\"animation_url\":\"\"}";
        assertEq(tokenUri, expectedTokenUri);

        tokenUri = signatureMintERC721.getOpenEditionUri(0);
        assertEq(tokenUri, expectedTokenUri);
        vm.stopPrank();
    }
}
