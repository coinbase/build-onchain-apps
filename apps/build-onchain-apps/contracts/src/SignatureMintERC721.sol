// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC721} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract COFFEEKITTEN is ERC721 {
  constructor()
    ERC721(
      'https://ipfs.io/ipfs/bafybeiexud2pveyr2ybelpjvwzhpyhw57tefraibf7jn4cecol6qu3jiau/1.json'
    )
  {}

  function mintWithSignature(address account, uint256 id, uint256 quantity, bytes memory data)
  external payable returns () {
    _mint(account, id, quantity, data);
  }
}
