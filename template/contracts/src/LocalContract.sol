// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Script, console2} from "forge-std/Script.sol";

/**
 * @title Memos
 * @dev Memo struct
 */
struct Memo {
    string userName;
    string message;
    uint256 time;
    address userAddress;
}

contract LocalBuyMeACoffeeContract {
    address payable public owner;
    uint256 public price;
    Memo[] public memos;

    error InsufficientFunds();
    error InvalidArguments(string message);

    event BuyMeACoffeeEvent(address indexed buyer, uint256 price);
    event NewMemo(address indexed userAddress, uint256 time, string userName, string message);

    constructor() {
        owner = payable(msg.sender);
        price = 0.0001 ether;
    }

    /**
     * @dev Function to buy a coffee
     * @param  userName The name of the user
     * @param  message The message of the user
     * (Note: Using calldata for gas efficiency)
     */
    function buyCoffee(string calldata userName, string calldata message) public payable {
        if (msg.value < price) {
            revert InsufficientFunds();
        }

        emit BuyMeACoffeeEvent(msg.sender, msg.value);

        // Can add console logs when deploying to local node
        console2.log("Buy me a coffee event was emitted");

        if (bytes(userName).length == 0 && bytes(message).length == 0) {
            revert InvalidArguments("Invalid userName or message");
        }

        console2.log("Memo Created By:", userName);

        memos.push(Memo(userName, message, block.timestamp, msg.sender));

        emit NewMemo(msg.sender, block.timestamp, userName, message);

        console2.log("New Memo was emitted");
    }
}
