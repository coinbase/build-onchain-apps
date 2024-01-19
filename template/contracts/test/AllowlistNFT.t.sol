// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import "forge-std/Test.sol";
import {AllowlistNFT} from "../src/AllowlistNFT.sol";
import {Merkle} from "@murky/src/Merkle.sol";

contract AllowlistNFTTest is Test {
    AllowlistNFT nft;
    Merkle allowlistMerkle;

    bytes32 allowlistRoot;
    bytes32[] allowlistData = new bytes32[](2);

    address allowlistMinter = vm.addr(0x2);
    address publicMinter = vm.addr(0x3);

    function setUp() public {
        allowlistMerkle = new Merkle();
        allowlistData[0] = bytes32(keccak256(abi.encodePacked(allowlistMinter)));
        allowlistRoot = allowlistMerkle.getRoot(allowlistData);

        nft = new AllowlistNFT(
            "NFT", "NFT", allowlistRoot, 10000, 0.08 ether, 0.08 ether, 1, 20, 5, 5, "ipfs://your-ipfs-hash/"
        );
        nft.toggleLive();
    }

    // --- Tests ---
    function test_setup() public {
        assertEq(nft.allowlistRoot(), allowlistRoot);
        assertEq(nft.live(), true);
        assertEq(nft.allowlistOpen(), 1);
        assertEq(nft.allowlistClose(), 20);
        assertEq(nft.price(), 0.08 ether);
        assertEq(nft.MAX_SUPPLY(), 10000);
    }

    function test_allowlistMintSuccess() public {
        uint256 price = nft.price();

        payable(allowlistMinter).transfer(price * 5);

        vm.warp(5);
        vm.startPrank(allowlistMinter);

        bytes32[] memory proof = allowlistMerkle.getProof(allowlistData, 0);
        nft.allowlistMint{value: price * 5}(proof, 5);
    }

    function test_allowlistMintNotLive() public {
        uint256 price = nft.price();

        payable(allowlistMinter).transfer(10_000 ether);

        vm.warp(5);
        nft.toggleLive();
        vm.startPrank(allowlistMinter);

        bytes32[] memory proof = allowlistMerkle.getProof(allowlistData, 0);
        vm.expectRevert(AllowlistNFT.MintNotLive.selector);
        nft.allowlistMint{value: price * 1}(proof, 1);
    }

    function test_allowlistMintMintExceeded() public {
        uint256 price = nft.price();

        payable(allowlistMinter).transfer(10_000 ether);

        vm.warp(5);
        vm.startPrank(allowlistMinter);

        bytes32[] memory proof = allowlistMerkle.getProof(allowlistData, 0);
        nft.allowlistMint{value: price * 5}(proof, 5);
        vm.expectRevert(AllowlistNFT.MintExceeded.selector);
        nft.allowlistMint{value: price * 1}(proof, 1);
    }

    function test_allowlistMintAllowlistNotLive() public {
        uint256 price = nft.price();

        payable(allowlistMinter).transfer(10_000 ether);

        vm.warp(50);
        vm.startPrank(allowlistMinter);

        bytes32[] memory proof = allowlistMerkle.getProof(allowlistData, 0);
        vm.expectRevert(AllowlistNFT.AllowlistNotLive.selector);
        nft.allowlistMint{value: price * 5}(proof, 5);
    }

    function test_allowlistMintInsufficientPayment() public {
        uint256 price = nft.price();

        payable(allowlistMinter).transfer(10_000 ether);

        vm.warp(5);
        vm.startPrank(allowlistMinter);

        bytes32[] memory proof = allowlistMerkle.getProof(allowlistData, 0);
        vm.expectRevert(AllowlistNFT.InsufficientPayment.selector);
        nft.allowlistMint{value: price * 4}(proof, 5);
    }

    function test_allowlistMintUnauthorized() public {
        uint256 price = nft.price();

        payable(allowlistMinter).transfer(10_000 ether);

        vm.warp(5);

        bytes32[] memory proof = allowlistMerkle.getProof(allowlistData, 1);
        vm.expectRevert(AllowlistNFT.AllowlistMintUnauthorized.selector);
        nft.allowlistMint{value: price * 5}(proof, 5);
    }

    function test_allowlistMintSupplyExceeded() public {
        uint256 price = nft.price();

        payable(allowlistMinter).transfer(10_000 ether);

        vm.warp(5);
        nft.setMaxMints(20000, 20000);
        vm.startPrank(allowlistMinter);

        bytes32[] memory proof = allowlistMerkle.getProof(allowlistData, 0);
        nft.allowlistMint{value: price * 10000}(proof, 10000);
        vm.expectRevert(AllowlistNFT.SupplyExceeded.selector);
        nft.allowlistMint{value: price * 1}(proof, 1);
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

        vm.expectRevert(AllowlistNFT.MintNotLive.selector);
        nft.publicMint{value: price * 5}(5);
    }

    function test_publicMintMintExceeded() public {
        uint256 price = nft.price();
        payable(publicMinter).transfer(10_000 ether);

        vm.warp(60);
        vm.startPrank(publicMinter);

        nft.publicMint{value: price * 5}(5);
        vm.expectRevert(AllowlistNFT.MintExceeded.selector);
        nft.publicMint{value: price * 1}(1);
    }

    function test_publicMintPublicMintNotLive() public {
        uint256 price = nft.price();
        payable(publicMinter).transfer(10_000 ether);

        vm.warp(5);
        vm.startPrank(publicMinter);

        vm.expectRevert(AllowlistNFT.PublicMintNotLive.selector);
        nft.publicMint{value: price * 5}(5);
    }

    function test_publicMintInsufficientPayment() public {
        uint256 price = nft.price();
        payable(publicMinter).transfer(10_000 ether);

        vm.warp(60);
        vm.startPrank(publicMinter);

        vm.expectRevert(AllowlistNFT.InsufficientPayment.selector);
        nft.publicMint{value: price * 4}(5);
    }

    function test_publicMintSupplyExceeded() public {
        uint256 price = nft.price();
        payable(publicMinter).transfer(10_000 ether);

        vm.warp(60);
        nft.setMaxMints(20000, 20000);
        vm.startPrank(publicMinter);

        nft.publicMint{value: price * 10000}(10000);
        vm.expectRevert(AllowlistNFT.SupplyExceeded.selector);
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

    function test_setAllowlistMindowSuccess() public {
        nft.setAllowlistMintWindow(10, 20);

        assertEq(nft.allowlistOpen(), 10);
        assertEq(nft.allowlistClose(), 20);
    }

    function test_setAllowlistMindowFailure() public {
        vm.expectRevert(AllowlistNFT.InvalidAllowlistWindow.selector);
        nft.setAllowlistMintWindow(20, 10);

        vm.expectRevert(AllowlistNFT.InvalidAllowlistWindow.selector);
        nft.setAllowlistMintWindow(0, 10);

        vm.expectRevert(AllowlistNFT.InvalidAllowlistWindow.selector);
        nft.setAllowlistMintWindow(10, 0);
    }
}
