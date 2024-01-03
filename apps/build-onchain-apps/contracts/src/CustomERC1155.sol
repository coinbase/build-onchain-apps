// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract COFFEEKITTEN is ERC1155 {
    constructor() ERC1155("https://ipfs.io/ipfs/bafybeiexud2pveyr2ybelpjvwzhpyhw57tefraibf7jn4cecol6qu3jiau/1.json") {}

    function mint(address account, uint256 id, uint256 amount, bytes memory data) public {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public {
        _mintBatch(to, ids, amounts, data);
    }
}
