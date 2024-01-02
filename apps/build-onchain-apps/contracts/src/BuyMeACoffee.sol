// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

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

/**
 * @title BuyMeACoffee
 * @dev BuyMeACoffee contract to accept donations and for our users to leave a memo for us
 */
contract BuyMeACoffee {
    address payable public owner;
    uint256 public price;
    Memo[] public memos;

    error InsufficientFunds();
    error InvalidArguments(string message);
    error OnlyOwner();

    event BuyMeACoffeeEvent(address indexed buyer, uint256 price);
    event NewMemo(address indexed userAddress, uint256 time, string userName, string message);

    constructor() {
        owner = payable(msg.sender);
        price = 0.0001 ether;
    }

    /**
     * WRITE FUNCTIONS *************
     */

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

        if (bytes(userName).length == 0 && bytes(message).length == 0) {
            revert InvalidArguments("Invalid userName or message");
        }

        memos.push(Memo(userName, message, block.timestamp, msg.sender));

        emit NewMemo(msg.sender, block.timestamp, userName, message);
    }

    /**
     * @dev Function to remove a memo
     * @param  index The index of the memo
     */
    function removeMemo(uint256 index) public {
        if (index >= memos.length) {
            revert InvalidArguments("Invalid index");
        }

        Memo memory memo = memos[index];

        if (memo.userAddress != msg.sender || msg.sender != owner) {
            revert InvalidArguments("Operation not allowed");
        }
        Memo memory indexMemo = memos[index];
        memos[index] = memos[memos.length - 1];
        memos[memos.length - 1] = indexMemo;
        memos.pop();
    }

    /**
     * @dev Function to modify a memo
     * @param  index The index of the memo
     * @param  message The message of the memo
     */
    function modifyMemoMessage(uint256 index, string memory message) public {
        if (index >= memos.length) {
            revert InvalidArguments("Invalid index");
        }

        Memo memory memo = memos[index];

        if (memo.userAddress != msg.sender || msg.sender != owner) {
            revert InvalidArguments("Operation not allowed");
        }

        memos[index].message = message;
    }

    /**
     * @dev Function to withdraw the balance
     */
    function withdrawTips() public {
        if (msg.sender != owner) {
            revert OnlyOwner();
        }

        if (address(this).balance == 0) {
            revert InsufficientFunds();
        }

        (bool sent,) = owner.call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
    }

    /**
     * READ FUNCTIONS *************
     */

    /**
     * @dev Function to get the memos
     */
    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }

    /**
     * @dev Recieve function to accept ether
     */
    receive() external payable {}

    /**
     * @dev Fallback function to accept ether
     */
    fallback() external payable {}
}
