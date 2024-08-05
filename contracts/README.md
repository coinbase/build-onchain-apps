## Contracts

This project is built using Foundry. For more information, visit the docs [here](https://book.getfoundry.sh/)

# Disclaimer

The provided Solidity contracts are intended solely for educational purposes and are
not warranted for any specific use. They have not been audited and may contain vulnerabilities, hence should
not be deployed in production environments. Users are advised to seek professional review and conduct a
comprehensive security audit before any real-world application to mitigate risks of financial loss or other
consequences. The author(s) disclaim all liability for any damages arising from the use of these contracts.
Use at your own risk, acknowledging the inherent risks of smart contract technology on the blockchain.

# Contents

- [Introduction](#introduction)
  - [Contracts](#contracts)
    - [BuyMeACoffee](#buymeacoffee)
    - [CustomERC1155](#customerc1155)
    - [AllowlistNFT](#allowlistnft)
- [Project Layout](#project-layout)
- [Usage](#usage)
- [Deploying your own contract](#deploying-your-own-contract)
- [Deploying to local node](#deploy-to-local-node)
- [Contributing](#contributing)

## Introduction

### Contracts

#### BuyMeACoffee

This repository contains a sample `BuyMeACoffee.sol` contract which allows the user to buy the owner a coffee with `0.001 ether`. Along with that the user can send the owner a memo.

#### CustomERC1155

It also contains a sample implementation (`CustomERC1155.sol`) of ERC1155 using openzeppelin's [ERC1155 contract](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/IERC1155.sol)

#### AllowlistNFT

Contract that allows a user to mint a ERC721A either from a allowlist or from a public mint. This is useful for mints where you want to allow specified users to have early access and (optionally) a lower mint price. After your defined allowlist window ends, the public mint will begin immediately. This contract uses [ERC721A](https://github.com/chiru-labs/ERC721A) as base to allow for more efficient minting of multiple NFTs in a single transaction.

It also makes use of the following utility libraries for allowlist proof verification:

1. [solady MerkleProofLib](https://github.com/Vectorized/solady/blob/main/src/utils/MerkleProofLib.sol): To verify proofs when minting.
2. [murky](https://github.com/dmfxyz/murky): To easily generate merkle roots and proofs in unit tests.

Deploy Instructions:
A deploy script `AllowlistNFT.s.sol` is provided. Please be sure to update all of the constructor arguments before deploying:

1. `name`: The name of your NFT collection.
2. `ticker`: The ticker of your NFT collection.
3. `allowlistRoot`: The allowlist root generated for your allowlisted addresses. For information on generating merkle roots for allowlists, you can read about this in-depth guide [here](https://medium.com/@ItsCuzzo/using-merkle-trees-for-nft-allowlists-523b58ada3f9)
4. `maxSupply`: The maximum number of NFTs in your collection.
5. `price`: The price of a public mint.
6. `allowlistPrice`: The price of a allowlist mint.
7. `allowlistOpen`: The timestamp in which allowlist mint begins.
8. `allowlistClose`: The timestamp in which allowlist mint ends. Note: Public mint will begin immediately after `allowlistClose`.
9. `maxAllowlistMint`: The maximum number of NFTs a allowlisted address can allowlist mint.
10. `maxPublicMint`: The maximum number of NFTs an address can public mint.
11. `uri`: The base URI of your NFT. This is your IPFS hash.

### Project Layout

```
.
├── foundry.toml
├── script
│   └── BuyMeACoffee.s.sol
│   └── CustomERC155.s.sol
│   └── AllowlistNFT.s.sol
├── src
│   └── BuyMeACoffee.sol
│    └── CustomERC155.sol
│   └── AllowlistNFT.sol
└── test
    └── BuyMeACoffee.t.sol
    └── CustomERC155.t.sol
    └── AllowlistNFT.t.sol

```

- You can configure Foundry's behavior using foundry.toml.
- The default directory for contracts is src/.
- The default directory for tests is test/
- The default directory for writing scripts is script/

## Usage

### Installation

Install foundry using

```shell
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

Follow the instructions of foundryup to completely setup foundry

### Install dependencies

```shell
forge install
```

### Build

```shell
forge build
```

### Test

```shell
forge test
```

### Coverage

You will need to install [genhtml](https://github.com/linux-test-project/lcov) to generate html reports (`brew install lcov` for osx).

```shell
forge coverage --report lcov && genhtml -o report --branch-coverage lcov.info
```

### Format

```shell
forge fmt
```

### Deploy and verify contracts on Base Sepolia

Open `.env` file.

`PRIVATE_KEY` is your private wallet key. Make sure to prefix it by "0x" to convert to a hex string.

`BLOCK_EXPLORER_API_KEY` is your API Key from [basescan.org](https://docs.basescan.org/getting-started) for Base Sepolia

```bash
source .env

forge script script/BuyMeACoffee.s.sol:BuyMeACoffeeScript --broadcast --verify --rpc-url base_sepolia
```

<b>Note: The above command will print the address of your contract and a link to the block explorer. Click on the block explorer link to verify whether your contract has been deployed or not </b>

![Deployment](./assets/deployment.png)

![Verified](./assets/verified.png)

Forge runs your solidity script. In that script it tries to broadcast the transaction. It writes it back into the broadcast folder in a `run-latest.json` file.

### ABI

To extract the `abi` of your contract, you can go to `out/BuyMeACoffee.sol/BuyMeACoffee.json` and copy the value corresponding to the `abi` key

## Deploying your own contract

1. To deploy your own contract create a new `.sol` file inside the `contracts/src` folder, similar to `BuyMeACoffee.sol`
2. Format and build your contracts using `forge fmt` and `forge build` respectively.
3. Write some tests by creating a test file inside `contracts/test` folder, similar to `BuyMeACoffee.t.sol`. Run the test using `forge test`
4. Write a deployment script inside `contracts/script`, similar to `BuyMeACoffee.s.sol`
5. Create a `.env` file using the `.env.example` file provided in your contracts folder and add your private key. Make sure to add a `0x` in front of your key to convert it to a hex string.
6. Deploy your contract using the following commands:

   ```bash
   source .env

   forge script script/YOUR_SCRIPT.s.sol:YOUR_SCRIPT --broadcast --rpc-url base_sepolia
   ```

   Note: To deploy on a different network, simply add the specific RPC endpoint within the `[rpc_endpoints]` section found in the `foundry.toml` file.
   <br/>

7. To extract the `abi` of your contract, you can go to `out/YOUR_CONTRACT.sol/YOUR_CONTRACT.json` and copy the value corresponding to the `abi` key

## Deploy to local node

Initially, building on a local node can offer numerous benefits, including:

- The ability to add debug statements.
- The capability to fork a chain at a particular block, enabling the detection of reasons behind specific behaviors.
- The absence of the need for testnet/mainnet funds.
- Faster testing, as only your node is responsible for consensus.

You can deploy your contracts to local node for faster testing as follows:

```bash
make local-node
```

![anvil](./assets/anvil.png)

To deploy the contract:

- Make sure to delete the following lines from `foundry.toml` because locally we dont have a block explorer

  ```
  [etherscan]
  "${NETWORK}"={key="${BLOCK_EXPLORER_API_KEY}"}
  ```

- Create a `.env` file using the `.env.example` file provided in your contracts folder and add one the private keys printed on your terminal when you ran `make local-node`. Also update the `RPC_URL` to `http://127.0.0.1:8545`, this will make sure your contracts are deployed locally

- Deploy the sample contract using:
  ```
  source .env
  forge script script/LocalContract.s.sol:LocalContractScript  --broadcast --rpc-url ${RPC_URL}
  ```

![local-deployment](./assets/local-deployment.png)

You can observe that the console2 library facilitates the addition of console logs in the contract, which would not have been possible if you were deploying to a testnet or mainnet.

## Contributing

If you would like to contribute to contracts folder, follow the given steps for setup

### Installation

Install foundry using

```shell
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

Follow the instructions of foundryup to completely setup foundry

### Install dependencies

Run the following commands inside the contracts folder:

```shell
forge install
forge build
```

You should be good to go :) Thank you for the support ❤️
