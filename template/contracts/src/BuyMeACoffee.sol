// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;
/**
 * ----------------------------------------------------------------------------------------------------------------
 * ---------██████╗ ██╗   ██╗██╗██╗     ██████╗        ██████╗ ███╗   ██╗ ██████╗██╗  ██╗ █████╗ ██╗███╗   ██╗-----
 * ---------██╔══██╗██║   ██║██║██║     ██╔══██╗      ██╔═══██╗████╗  ██║██╔════╝██║  ██║██╔══██╗██║████╗  ██║-----
 * ---------██████╔╝██║   ██║██║██║     ██║  ██║█████╗██║   ██║██╔██╗ ██║██║     ███████║███████║██║██╔██╗ ██║-----
 * ---------██╔══██╗██║   ██║██║██║     ██║  ██║╚════╝██║   ██║██║╚██╗██║██║     ██╔══██║██╔══██║██║██║╚██╗██║-----
 * ---------██████╔╝╚██████╔╝██║███████╗██████╔╝      ╚██████╔╝██║ ╚████║╚██████╗██║  ██║██║  ██║██║██║ ╚████║-----
 * ---------╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝        ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝-----
 * ----------------------------------------------------------------------------------------------------------------
 * https://github.com/coinbase/build-onchain-apps
 *
 * Disclaimer: The provided Solidity contracts are intended solely for educational purposes and are
 *   not warranted for any specific use. They have not been audited and may contain vulnerabilities, hence should
 *   not be deployed in production environments. Users are advised to seek professional review and conduct a
 *   comprehensive security audit before any real-world application to mitigate risks of financial loss or other
 *   consequences. The author(s) disclaim all liability for any damages arising from the use of these contracts.
 *   Use at your own risk, acknowledging the inherent risks of smart contract technology on the blockchain.
 *
 */

/**
 * @title Memos
 * @dev Memo struct
 */
struct Memo {
    uint numCoffees;
    string userName;
    string twitterHandle;
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
    event NewMemo(address indexed userAddress, uint256 time, uint numCoffees, string userName, string twitterHandle, string message);

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
     * @param  twitterHandle The Twitter handle of the user
     * @param  message The message of the user
     * (Note: Using calldata for gas efficiency)
     */
    function buyCoffee(uint numCoffees, string calldata userName, string calldata twitterHandle, string calldata message) public payable {
        if (msg.value < price*numCoffees) {
            revert InsufficientFunds();
        }

        emit BuyMeACoffeeEvent(msg.sender, msg.value);

        if (bytes(userName).length == 0 && bytes(message).length == 0) {
            revert InvalidArguments("Invalid userName or message");
        }

        memos.push(Memo(numCoffees, userName, twitterHandle, message, block.timestamp, msg.sender));

        emit NewMemo(msg.sender, block.timestamp, numCoffees, userName, twitterHandle, message);
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
}
