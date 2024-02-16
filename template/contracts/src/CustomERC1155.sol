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
