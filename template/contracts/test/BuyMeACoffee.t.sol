// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Test, console2} from "forge-std/Test.sol";
import {BuyMeACoffee, Memo} from "../src/BuyMeACoffee.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract BuyMeACoffeeTest is Test {
    BuyMeACoffee public buyMeACoffee;
    uint256 numCoffees = 1;
    string userName = "user";
    string twitterHandle = "testHandle";
    string message = "message";

    function setUp() public {
        buyMeACoffee = new BuyMeACoffee();
    }

    function testGetMemos() public {
        buyMeACoffee.buyCoffee{value: 0.0001 ether}(numCoffees, userName, twitterHandle, message);
        assertEq(buyMeACoffee.getMemos(0, 10).length, 1);
        Memo memory memo = buyMeACoffee.getMemos(0, 10)[0];
        assertEq(memo.userName, userName);
        assertEq(memo.message, message);
    }

    function testRemoveMemo() public {
        buyMeACoffee.buyCoffee{value: 0.0001 ether}(numCoffees, userName, twitterHandle, message);
        assertEq(buyMeACoffee.getMemos(0, 10).length, 1);
        buyMeACoffee.buyCoffee{value: 0.0001 ether}(numCoffees, "test", "testHandle", "testMessage");
        buyMeACoffee.removeMemo(0);
        assertEq(buyMeACoffee.getMemos(0, 10)[0].userName, "test");
    }

    function testModifyMemoMessage() public {
        buyMeACoffee.buyCoffee{value: 0.0001 ether}(numCoffees, userName, twitterHandle, message);
        assertEq(buyMeACoffee.getMemos(0, 10).length, 1);
        buyMeACoffee.modifyMemoMessage(0, "new message");
        Memo memory memo = buyMeACoffee.getMemos(0, 10)[0];
        assertEq(memo.message, "new message");
    }

    function testWithdrawTips() public {
        buyMeACoffee.buyCoffee{value: 0.0001 ether}(numCoffees, userName, twitterHandle, message);
        buyMeACoffee.withdrawTips();
        assertEq(address(buyMeACoffee).balance, 0);
    }

    function testPaging() public {
        uint256 amtToAdd = 100;
        for (uint256 i = 0; i < amtToAdd; i++) {
            buyMeACoffee.buyCoffee{value: 0.0001 ether}(1, Strings.toString(i), "", "");
        }
        for (uint256 i = 0; i < amtToAdd; i++) {
            Memo[] memory memos = buyMeACoffee.getMemos(i, 1);
            assertEq(memos.length, 1);
            assertEq(memos[0].userName, Strings.toString(i));
        }
    }

    function generateLongString(uint256 len) public returns (string memory) {
        string memory baseString = "a";
        string memory longString = "";
        for (uint256 i = 0; i < len; i++) {
            longString = string(abi.encodePacked(longString, baseString));
        }
        return longString;
    }

    function testMaxMemoMessageSize() public {
        vm.expectRevert();
        buyMeACoffee.buyCoffee{value: 0.0001 ether}(numCoffees, userName, twitterHandle, generateLongString(1026));
    }

    function testMaxMemoUsernameSize() public {
        vm.expectRevert();
        buyMeACoffee.buyCoffee{value: 0.0001 ether}(numCoffees, generateLongString(76), twitterHandle, message);
    }

    function testMaxMemoTwitterSize() public {
        vm.expectRevert();
        buyMeACoffee.buyCoffee{value: 0.0001 ether}(numCoffees, userName, generateLongString(76), message);
    }

    function testMaxMemoAllSizesAtMaximumShouldAccept() public {
        buyMeACoffee.buyCoffee{value: 0.0001 ether}(
            numCoffees, generateLongString(75), generateLongString(75), generateLongString(1024)
        );
    }

    function testEmptyMemoNoError() public {
        Memo[] memory memos = buyMeACoffee.getMemos(15, 0);
        assertEq(memos.length, 0);
    }

    function testInvalidIndexErrors() public {
        buyMeACoffee.buyCoffee{value: 0.0001 ether}(numCoffees, userName, twitterHandle, message);

        vm.expectRevert();
        Memo[] memory memos = buyMeACoffee.getMemos(15, 10);
    }

    /**
     * @dev Recieve function to accept ether
     */
    receive() external payable {}
}
