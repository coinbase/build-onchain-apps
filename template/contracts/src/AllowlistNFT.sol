// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

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
import "@ERC721A/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@solady/src/utils/MerkleProofLib.sol";
import {LibString} from "@solady/src/utils/LibString.sol";

/**
 * @title AllowlistNFT
 * @dev contract that allows a user to mint ERC721s from a allowlist or public mint.
 * @author Pop Punk (@PopPunkOnChain)
 */
contract AllowlistNFT is ERC721A, Ownable2Step {
    bytes32 public allowlistRoot;
    uint256 public immutable MAX_SUPPLY;
    uint120 public price;
    uint120 public allowlistPrice;
    bool public live;
    uint64 public maxAllowlistMint;
    uint64 public maxPublicMint;
    uint64 public allowlistOpen;
    uint64 public allowlistClose;
    string private _baseURIString;

    // errors
    error MintNotLive();
    error AllowlistNotLive();
    error MintExceeded();
    error PublicMintNotLive();
    error AllowlistMintUnauthorized();
    error SupplyExceeded();
    error InsufficientPayment();
    error InvalidAllowlistWindow();
    error TokenDoesNotExist();

    // modifiers
    modifier whenLive() {
        if (!live) revert MintNotLive();
        _;
    }

    /**
     * @dev Constructor
     * @param _name Name of the NFT
     * @param _ticker Ticker of the NFT
     * @param _allowlistRoot Merkle root of the allowlist
     * @param _maxSupply Maximum supply of the NFT
     * @param _price Price of the NFT
     * @param _allowlistPrice Price of the allowlist NFT
     * @param _allowlistOpen Timestamp of when the allowlist opens
     * @param _allowlistClose Timestamp of when the allowlist closes
     * @param _maxAllowlistMint Max allowlist mint
     * @param _maxPublicMint Max public mint
     * @param _uri Base URI of the NFT
     */
    constructor(
        string memory _name,
        string memory _ticker,
        bytes32 _allowlistRoot,
        uint256 _maxSupply,
        uint120 _price,
        uint120 _allowlistPrice,
        uint64 _allowlistOpen,
        uint64 _allowlistClose,
        uint64 _maxAllowlistMint,
        uint64 _maxPublicMint,
        string memory _uri
    ) ERC721A(_name, _ticker) Ownable(msg.sender) {
        if (_allowlistOpen > _allowlistClose) revert InvalidAllowlistWindow();
        if (_allowlistOpen == 0) revert InvalidAllowlistWindow();

        allowlistRoot = _allowlistRoot;
        MAX_SUPPLY = _maxSupply;
        price = _price;
        allowlistPrice = _allowlistPrice;
        allowlistOpen = _allowlistOpen;
        allowlistClose = _allowlistClose;
        _baseURIString = _uri;
        maxAllowlistMint = _maxAllowlistMint;
        maxPublicMint = _maxPublicMint;
    }

    /**
     * @dev Function to mint NFTs from the allowlist
     * @param _proof Merkle proof of the address
     * @param _amount Amount of NFTs to mint
     */
    function allowlistMint(bytes32[] calldata _proof, uint256 _amount) external payable whenLive {
        if (block.timestamp < allowlistOpen) revert AllowlistNotLive();
        if (block.timestamp > allowlistClose) revert AllowlistNotLive();
        // _numberMinted is shared between allowlist and public mint
        // depending on your maxAllowlistMint and maxPublicMint, an address may
        // not be able to participate in publicMint if they have participated in allowlistMint
        // example: maxAllowlistMint = 2, maxPublicMint = 1 -> an address can only mint 2 via allowlist
        // example: maxAllowlistMint = 1, maxPublicMint = 2 -> an address can mint 1 via allowlist and 1 via public
        uint256 minted = _numberMinted(msg.sender) + _amount;
        if (minted > maxAllowlistMint) revert MintExceeded();
        if (_totalMinted() + _amount > MAX_SUPPLY) revert SupplyExceeded();
        if (!MerkleProofLib.verifyCalldata(_proof, allowlistRoot, keccak256(abi.encodePacked(msg.sender)))) {
            revert AllowlistMintUnauthorized();
        }
        if (msg.value != _amount * allowlistPrice) revert InsufficientPayment();

        _mint(msg.sender, _amount);
    }

    /**
     * @dev Function to mint NFTs from the public mint
     * @param _amount Amount of NFTs to mint
     */
    function publicMint(uint256 _amount) external payable whenLive {
        if (block.timestamp < allowlistClose) revert PublicMintNotLive();
        // _numberMinted is shared between allowlist and public mint
        // depending on your maxAllowlistMint and maxPublicMint, an address may
        // not be able to participate in publicMint if they have participated in allowlistMint
        // example: maxAllowlistMint = 2, maxPublicMint = 1 -> an address can only mint 2 via allowlist
        // example: maxAllowlistMint = 1, maxPublicMint = 2 -> an address can mint 1 via allowlist and 1 via public
        uint256 minted = _numberMinted(msg.sender) + _amount;
        if (minted > maxPublicMint) revert MintExceeded();
        if (_totalMinted() + _amount > MAX_SUPPLY) revert SupplyExceeded();
        if (msg.value != _amount * price) revert InsufficientPayment();

        _mint(msg.sender, _amount);
    }

    /**
     * @dev Function to set the prices of each NFT
     * @dev Only the owner can call this function
     * @param _price Price of each NFT
     * @param _allowlistPrice Price of each allowlist NFT
     */
    function setPrices(uint120 _price, uint120 _allowlistPrice) external onlyOwner {
        price = _price;
        allowlistPrice = _allowlistPrice;
    }

    /**
     * @dev Function to toggle the minting to live or not
     */
    function toggleLive() external onlyOwner {
        live = !live;
    }

    /**
     * @dev Function to set the allowlist root
     * @param _allowlistRoot Merkle root of the allowlist
     */
    function setAllowlistRoot(bytes32 _allowlistRoot) external onlyOwner {
        allowlistRoot = _allowlistRoot;
    }

    /**
     * @dev Function to set the allowlist minting window
     * @param _allowlistOpen Timestamp of when the allowlist opens
     * @param _allowlistClose Timestamp of when the allowlist closes
     */
    function setAllowlistMintWindow(uint64 _allowlistOpen, uint64 _allowlistClose) external onlyOwner {
        if (_allowlistOpen > _allowlistClose) revert InvalidAllowlistWindow();
        if (_allowlistOpen == 0) revert InvalidAllowlistWindow();

        allowlistOpen = _allowlistOpen;
        allowlistClose = _allowlistClose;
    }

    /**
     * @dev Function to set the max allowlist mint
     * @param _maxAllowlistMint Max allowlist mint
     * @param _maxPublcMint Max public mint
     */
    function setMaxMints(uint64 _maxAllowlistMint, uint64 _maxPublcMint) external onlyOwner {
        maxAllowlistMint = _maxAllowlistMint;
        maxPublicMint = _maxPublcMint;
    }

    /**
     * @dev Function to set the base URI
     * @param _uri Base URI of the NFT
     */
    function setBaseUri(string calldata _uri) external onlyOwner {
        _baseURIString = _uri;
    }

    /**
     * @dev Function to get the base URI
     * @return Base URI of the NFT
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        if (!_exists(tokenId)) revert TokenDoesNotExist();

        string memory baseURI = _baseURIString;
        return bytes(baseURI).length != 0 ? string(abi.encodePacked(baseURI, LibString.toString(tokenId))) : "";
    }

    /**
     * @dev Function to withdraw the contract balance
     */
    function withdraw() external onlyOwner {
        (bool success,) = payable(msg.sender).call{value: address(this).balance}("");
        require(success);
    }
}
