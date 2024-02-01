// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Test, console2} from "forge-std/Test.sol";
import {BuyMeACoffee, Memo} from "../src/BuyMeACoffee.sol";

contract BuyMeACoffeeTest is Test {
    BuyMeACoffee public buyMeACoffee;
    uint numCoffees = 1;
    string userName = "user";
    string twitterHandle = "testHandle";
    string message = "message";

    function setUp() public {
        buyMeACoffee = new BuyMeACoffee();
        buyMeACoffee.buyCoffee{value: 0.0001 ether}(numCoffees, userName, twitterHandle, message);
    }

    function testGetMemos() public {
        assertEq(buyMeACoffee.getMemos().length, 1);
        Memo memory memo = buyMeACoffee.getMemos()[0];
        assertEq(memo.userName, userName);
        assertEq(memo.message, message);
    }

    function testRemoveMemo() public {
        assertEq(buyMeACoffee.getMemos().length, 1);
        buyMeACoffee.buyCoffee{value: 0.0001 ether}(1, "test", "testHandle", "testMessage");
        buyMeACoffee.removeMemo(0);
        assertEq(buyMeACoffee.getMemos()[0].userName, "test");
    }

    function testModifyMemoMessage() public {
        assertEq(buyMeACoffee.getMemos().length, 1);
        buyMeACoffee.modifyMemoMessage(0, "new message");
        Memo memory memo = buyMeACoffee.getMemos()[0];
        assertEq(memo.message, "new message");
    }

    function testWithdrawTips() public {
        buyMeACoffee.withdrawTips();
        assertEq(address(buyMeACoffee).balance, 0);
    }

    /**
     * @dev Recieve function to accept ether
     */
    receive() external payable {}
}
