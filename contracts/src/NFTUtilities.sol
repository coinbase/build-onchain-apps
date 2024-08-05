// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

library NFTUtilities {
    /*
    * @dev Struct to help define common parameters needed for defining a NFT collection.
    */
    struct CollectionMetadata {
        string name;
        string description;
        string symbol;
        string image;
        string animation_url;
    }

    /**
     * @dev Helper method to encode JSON key/value pairs.
     * @param  key value
     * @param  val is the value
     * @param  lastLine indicates if we should post-fix a comma at the end of the line
     */
    function getEncodedStringPair(string memory key, string memory val, bool lastLine)
        internal
        pure
        returns (string memory)
    {
        if (lastLine) {
            return string(abi.encodePacked('"', key, '":"', val, '"'));
        }
        return string(abi.encodePacked('"', key, '":"', val, '",'));
    }
}
