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
import "@ERC721A/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@solady/src/utils/MerkleProofLib.sol";
import {LibString} from "@solady/src/utils/LibString.sol";

/**
 * @title WhitelistNFT
 * @dev contract that allows a user to mint ERC721s from a whitelist or public mint.
 * @author Pop Punk (@PopPunkOnChain)
 */
contract WhitelistNFT is ERC721A, Ownable2Step {
    bytes32 public whitelistRoot;
    uint256 public immutable MAX_SUPPLY;
    uint120 public price;
    uint120 public whitelistPrice;
    bool public live;
    uint64 public maxWhitelistMint;
    uint64 public maxPublicMint;
    uint64 public whitelistOpen;
    uint64 public whitelistClose;
    string private _baseURIString;

    // errors
    error MintNotLive();
    error WhitelistNotLive();
    error MintExceeded();
    error PublicMintNotLive();
    error WhitelistMintUnauthorized();
    error SupplyExceeded();
    error InsufficientPayment();
    error InvalidWhitelistWindow();
    error TokenDoesNotExist();

    /**
     * @dev Constructor
     * @param _name Name of the NFT
     * @param _ticker Ticker of the NFT
     * @param _whitelistRoot Merkle root of the whitelist
     * @param _maxSupply Maximum supply of the NFT
     * @param _price Price of the NFT
     * @param _whitelistOpen Timestamp of when the whitelist opens
     * @param _whitelistClose Timestamp of when the whitelist closes
     * @param _maxWhitelistMint Max whitelist mint
     * @param _uri Base URI of the NFT
     */
    constructor(
        string memory _name,
        string memory _ticker,
        bytes32 _whitelistRoot,
        uint256 _maxSupply,
        uint120 _price,
        uint120 _whitelistPrice,
        uint64 _whitelistOpen,
        uint64 _whitelistClose,
        uint64 _maxWhitelistMint,
        uint64 _maxPublicMint,
        string memory _uri
    ) ERC721A(_name, _ticker) Ownable(msg.sender) {
        whitelistRoot = _whitelistRoot;
        MAX_SUPPLY = _maxSupply;
        price = _price;
        whitelistPrice = _whitelistPrice;
        whitelistOpen = _whitelistOpen;
        whitelistClose = _whitelistClose;
        _baseURIString = _uri;
        maxWhitelistMint = _maxWhitelistMint;
        maxPublicMint = _maxPublicMint;
    }

    /**
     * @dev Function to mint NFTs from the whitelist
     * @param _proof Merkle proof of the address
     * @param _amount Amount of NFTs to mint
     */
    function whitelistMint(bytes32[] calldata _proof, uint256 _amount) external payable {
        if (!live) revert MintNotLive();
        if (block.timestamp < whitelistOpen) revert WhitelistNotLive();
        if (block.timestamp > whitelistClose) revert WhitelistNotLive();
        uint256 minted = _numberMinted(msg.sender) + _amount;
        if (minted > maxWhitelistMint) revert MintExceeded();
        if (_totalMinted() + _amount > MAX_SUPPLY) revert SupplyExceeded();
        if (!MerkleProofLib.verifyCalldata(_proof, whitelistRoot, keccak256(abi.encodePacked(msg.sender)))) {
            revert WhitelistMintUnauthorized();
        }
        if (msg.value != _amount * whitelistPrice) revert InsufficientPayment();

        _mint(msg.sender, _amount);
    }

    /**
     * @dev Function to mint NFTs from the public mint
     * @param _amount Amount of NFTs to mint
     */
    function publicMint(uint256 _amount) external payable {
        if (!live) revert MintNotLive();
        if (block.timestamp < whitelistClose) revert PublicMintNotLive();
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
     * @param _whitelistPrice Price of each whitelist NFT
     */
    function setPrices(uint120 _price, uint120 _whitelistPrice) external onlyOwner {
        price = _price;
        whitelistPrice = _whitelistPrice;
    }

    /**
     * @dev Function to toggle the minting to live or not
     */
    function toggleLive() external onlyOwner {
        live = !live;
    }

    /**
     * @dev Function to set the whitelist root
     * @param _whitelistRoot Merkle root of the whitelist
     */
    function setWhitelistRoot(bytes32 _whitelistRoot) external onlyOwner {
        whitelistRoot = _whitelistRoot;
    }

    /**
     * @dev Function to set the whitelist minting window
     * @param _whitelistOpen Timestamp of when the whitelist opens
     * @param _whitelistClose Timestamp of when the whitelist closes
     */
    function setWhitelistMintWindow(uint64 _whitelistOpen, uint64 _whitelistClose) external onlyOwner {
        if (_whitelistOpen > _whitelistClose) revert InvalidWhitelistWindow();
        if (_whitelistOpen == 0) revert InvalidWhitelistWindow();

        whitelistOpen = _whitelistOpen;
        whitelistClose = _whitelistClose;
    }

    /**
     * @dev Function to set the max whitelist mint
     * @param _maxWhitelistMint Max whitelist mint
     * @param _maxPublcMint Max public mint
     */
    function setMaxMints(uint64 _maxWhitelistMint, uint64 _maxPublcMint) external onlyOwner {
        maxWhitelistMint = _maxWhitelistMint;
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
