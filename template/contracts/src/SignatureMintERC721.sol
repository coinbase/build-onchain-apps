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

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import {NFTUtilities} from "./NFTUtilities.sol";

// Errors
error InsufficientFunds();

/**
 * @title SignatureMintERC721
 * @dev contract that allows a user to mint a ERC721 for free with a cryptographically signed message.
 *      This is useful for mints where you want to allow users to mint for free based on a signature from
 *      your backend API.  This is an alternative approach to a merkel tree which is fully on-chain.
 */
contract SignatureMintERC721 is ERC721 {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    // Contract Params, can make these configuable via constructor if desired.
    uint256 public constant paidMintCost = 0.0001 ether;
    address public immutable freeMintSigner; // Wallet Address for the authorized wallet to distribute free mints.
    uint256 public currentId; // Current NFT id
    mapping(address => uint256) public usedFreeMints; // Mapping to store free mints

    // Setup contract Metadata
    string public constant imageUri = "ipfs://QmQRzw5MtNQcdjg9rZ8MYugAz6WjaBdvsuNShKTLYNJdj7/coffee_dog.png";
    NFTUtilities.CollectionMetadata public metadata =
        NFTUtilities.CollectionMetadata("CoffeeDog", "Buy a dog a coffee", "CDOG", imageUri, "");

    // Events
    event Mint(address indexed buyer, uint256 tokenId, uint256 cost);

    constructor(address signer) ERC721(metadata.name, metadata.symbol) {
        freeMintSigner = signer;
    }

    /**
     * @dev Function to mint for free using a wallet signature
     * @param  account that will receive the NFT
     * @param  signature that authorizes this transaction to mint for free.
     */
    function freeMint(address account, bytes memory signature) external {
        require(this.verifySignature(account, signature), "Unable to verify Signature");

        // Check if the free mint has already been used (1 per wallet)
        require(usedFreeMints[account] == 0, "Free mint already used");
        usedFreeMints[account] = 1;

        // Mint the NFT
        _mint(account, ++currentId);
        emit Mint(account, currentId, 0);
    }

    /**
     * @dev Function to mint for a fixed cost defined in the paidMintCost parameter
     * @param  account that will receive the NFT
     */
    function mint(address account) external payable {
        if (msg.value != paidMintCost) {
            revert InsufficientFunds();
        }
        _mint(account, ++currentId);
        emit Mint(account, currentId, paidMintCost);
    }

    /**
     * @dev Function to return the contract metadata, this is stored on contract versus IPFS.  This ensures
     *      the collection information renders correctly on NFT marketplaces.
     */
    function contractURI() public view returns (string memory) {
        bytes memory jsonMetadata = abi.encodePacked(
            "{",
            NFTUtilities.getEncodedStringPair("description", metadata.description, false),
            NFTUtilities.getEncodedStringPair("symbol", metadata.symbol, false),
            NFTUtilities.getEncodedStringPair("image", metadata.image, false),
            NFTUtilities.getEncodedStringPair("animation_url", metadata.animation_url, true),
            "}"
        );
        return string(jsonMetadata);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721) returns (string memory) {
        require(tokenId <= currentId && currentId > 0, "Token doesnt exist");
        return getOpenEditionUri(tokenId);
    }

    /**
     * @dev Function to return the token metadata, this is stored on contract versus IPFS.  This is a common practice
     *      for NFT collections which all have the same metadata (a.k.a OpenEditions).
     */
    function getOpenEditionUri(uint256 token) public view returns (string memory) {
        // Generates a name with edition .. e.g. NFT => NFT #1029
        string memory nameWithTokenId = NFTUtilities.getEncodedStringPair(
            "name", string(abi.encodePacked(metadata.name, " #", Strings.toString(token))), false
        );

        bytes memory jsonMetadata = abi.encodePacked(
            "{",
            nameWithTokenId,
            NFTUtilities.getEncodedStringPair("description", metadata.description, false),
            NFTUtilities.getEncodedStringPair("symbol", metadata.symbol, false),
            NFTUtilities.getEncodedStringPair("image", metadata.image, false),
            NFTUtilities.getEncodedStringPair("animation_url", metadata.animation_url, true),
            "}"
        );
        return string(jsonMetadata);
    }

    /**
     * @dev Helper method to get the hash(bytes) needed to be signed for an account to get a free mint.
     * @param  account that will receive the NFT
     */
    function getBytesToSign(address account) external pure returns (bytes32) {
        bytes memory messageEncodedPacked = abi.encodePacked(getStringToSign(account));
        return MessageHashUtils.toEthSignedMessageHash(messageEncodedPacked);
    }

    /**
     * @dev Helper method to get the string needed to be signed by a web3 wallet.
     * @param  account that will receive the NFT
     */
    function getStringToSign(address account) public pure returns (string memory) {
        return string(abi.encodePacked("Free Mint: ", Strings.toHexString(uint256(uint160(account)), 20)));
    }

    /**
     * @dev Verifies a message was signed by the freeMintSigner wallet.
     * @param  account that will receive the NFT
     * @param  signature authorizing the action
     */
    function verifySignature(address account, bytes memory signature) public view returns (bool) {
        bytes32 ethSignedMessageHash = this.getBytesToSign(account);
        address signer = ECDSA.recover(ethSignedMessageHash, signature);

        // Assert the signer matches the expected account defined on the contract.
        return signer == freeMintSigner;
    }
}
