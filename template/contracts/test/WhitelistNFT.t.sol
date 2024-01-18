// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import "forge-std/Test.sol";
import {WhitelistNFT} from "../src/WhitelistNFT.sol";
import {Merkle} from "@murky/src/Merkle.sol";

contract WhitelistNFTTest is Test {
    WhitelistNFT nft;
    Merkle whitelistMerkle;

    bytes32 whitelistRoot;
    bytes32[] whitelistData = new bytes32[](2);

    address whitelistMinter = vm.addr(0x2);
    address publicMinter = vm.addr(0x3);

    function setUp() public {
        whitelistMerkle = new Merkle();
        whitelistData[0] = bytes32(keccak256(abi.encodePacked(whitelistMinter)));
        whitelistRoot = whitelistMerkle.getRoot(whitelistData);

        nft = new WhitelistNFT(
            "NFT", "NFT", whitelistRoot, 10000, 0.08 ether, 0.08 ether, 1, 20, 5, 5, "ipfs://your-ipfs-hash/"
        );
        nft.toggleLive();
    }

    // --- Tests ---
    function test_setup() public {
        assertEq(nft.whitelistRoot(), whitelistRoot);
        assertEq(nft.live(), true);
        assertEq(nft.whitelistOpen(), 1);
        assertEq(nft.whitelistClose(), 20);
        assertEq(nft.price(), 0.08 ether);
        assertEq(nft.MAX_SUPPLY(), 10000);
    }

    function test_whitelistMintSuccess() public {
        uint256 price = nft.price();

        payable(whitelistMinter).transfer(price * 5);

        vm.warp(5);
        vm.startPrank(whitelistMinter);

        bytes32[] memory proof = whitelistMerkle.getProof(whitelistData, 0);
        nft.whitelistMint{value: price * 5}(proof, 5);
    }

    function test_whitelistMintNotLive() public {
        uint256 price = nft.price();

        payable(whitelistMinter).transfer(10_000 ether);

        vm.warp(5);
        nft.toggleLive();
        vm.startPrank(whitelistMinter);

        bytes32[] memory proof = whitelistMerkle.getProof(whitelistData, 0);
        vm.expectRevert(WhitelistNFT.MintNotLive.selector);
        nft.whitelistMint{value: price * 1}(proof, 1);
    }

    function test_whitelistMintMintExceeded() public {
        uint256 price = nft.price();

        payable(whitelistMinter).transfer(10_000 ether);

        vm.warp(5);
        vm.startPrank(whitelistMinter);

        bytes32[] memory proof = whitelistMerkle.getProof(whitelistData, 0);
        nft.whitelistMint{value: price * 5}(proof, 5);
        vm.expectRevert(WhitelistNFT.MintExceeded.selector);
        nft.whitelistMint{value: price * 1}(proof, 1);
    }

    function test_whitelistMintWhitelistNotLive() public {
        uint256 price = nft.price();

        payable(whitelistMinter).transfer(10_000 ether);

        vm.warp(50);
        vm.startPrank(whitelistMinter);

        bytes32[] memory proof = whitelistMerkle.getProof(whitelistData, 0);
        vm.expectRevert(WhitelistNFT.WhitelistNotLive.selector);
        nft.whitelistMint{value: price * 5}(proof, 5);
    }

    function test_whitelistMintInsufficientPayment() public {
        uint256 price = nft.price();

        payable(whitelistMinter).transfer(10_000 ether);

        vm.warp(5);
        vm.startPrank(whitelistMinter);

        bytes32[] memory proof = whitelistMerkle.getProof(whitelistData, 0);
        vm.expectRevert(WhitelistNFT.InsufficientPayment.selector);
        nft.whitelistMint{value: price * 4}(proof, 5);
    }

    function test_whitelistMintUnauthorized() public {
        uint256 price = nft.price();

        payable(whitelistMinter).transfer(10_000 ether);

        vm.warp(5);

        bytes32[] memory proof = whitelistMerkle.getProof(whitelistData, 1);
        vm.expectRevert(WhitelistNFT.WhitelistMintUnauthorized.selector);
        nft.whitelistMint{value: price * 5}(proof, 5);
    }

    function test_whitelistMintSupplyExceeded() public {
        uint256 price = nft.price();

        payable(whitelistMinter).transfer(10_000 ether);

        vm.warp(5);
        nft.setMaxMints(20000, 20000);
        vm.startPrank(whitelistMinter);

        bytes32[] memory proof = whitelistMerkle.getProof(whitelistData, 0);
        nft.whitelistMint{value: price * 10000}(proof, 10000);
        vm.expectRevert(WhitelistNFT.SupplyExceeded.selector);
        nft.whitelistMint{value: price * 1}(proof, 1);
    }

    function test_publicMintSuccess() public {
        uint256 price = nft.price();

        payable(publicMinter).transfer(price * 5);

        vm.warp(60);
        vm.startPrank(publicMinter);

        nft.publicMint{value: price * 5}(5);
    }

    function test_publicMintNotLive() public {
        uint256 price = nft.price();
        payable(publicMinter).transfer(10_000 ether);

        vm.warp(5);
        nft.toggleLive();
        vm.startPrank(publicMinter);

        vm.expectRevert(WhitelistNFT.MintNotLive.selector);
        nft.publicMint{value: price * 5}(5);
    }

    function test_publicMintMintExceeded() public {
        uint256 price = nft.price();
        payable(publicMinter).transfer(10_000 ether);

        vm.warp(60);
        vm.startPrank(publicMinter);

        nft.publicMint{value: price * 5}(5);
        vm.expectRevert(WhitelistNFT.MintExceeded.selector);
        nft.publicMint{value: price * 1}(1);
    }

    function test_publicMintPublicMintNotLive() public {
        uint256 price = nft.price();
        payable(publicMinter).transfer(10_000 ether);

        vm.warp(5);
        vm.startPrank(publicMinter);

        vm.expectRevert(WhitelistNFT.PublicMintNotLive.selector);
        nft.publicMint{value: price * 5}(5);
    }

    function test_publicMintInsufficientPayment() public {
        uint256 price = nft.price();
        payable(publicMinter).transfer(10_000 ether);

        vm.warp(60);
        vm.startPrank(publicMinter);

        vm.expectRevert(WhitelistNFT.InsufficientPayment.selector);
        nft.publicMint{value: price * 4}(5);
    }

    function test_publicMintSupplyExceeded() public {
        uint256 price = nft.price();
        payable(publicMinter).transfer(10_000 ether);

        vm.warp(60);
        nft.setMaxMints(20000, 20000);
        vm.startPrank(publicMinter);

        nft.publicMint{value: price * 10000}(10000);
        vm.expectRevert(WhitelistNFT.SupplyExceeded.selector);
        nft.publicMint{value: price * 1}(1);
    }

    function test_publicMintWithSetPriceSuccess() public {
        nft.setPrices(0.06 ether, 0.06 ether);

        uint256 price = nft.price();

        assertEq(price, 0.06 ether);

        payable(publicMinter).transfer(price * 5);

        vm.warp(60);
        vm.startPrank(publicMinter);

        nft.publicMint{value: price * 5}(5);
    }

    function test_setWhitelistMindowSuccess() public {
        nft.setWhitelistMintWindow(10, 20);

        assertEq(nft.whitelistOpen(), 10);
        assertEq(nft.whitelistClose(), 20);
    }

    function test_setWhitelistMindowFailure() public {
        vm.expectRevert(WhitelistNFT.InvalidWhitelistWindow.selector);
        nft.setWhitelistMintWindow(20, 10);

        vm.expectRevert(WhitelistNFT.InvalidWhitelistWindow.selector);
        nft.setWhitelistMintWindow(0, 10);

        vm.expectRevert(WhitelistNFT.InvalidWhitelistWindow.selector);
        nft.setWhitelistMintWindow(10, 0);
    }
}
