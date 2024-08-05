<img src='./docs/logo-v-0-17.png' width='800' alt='Build Onchain Apps Template'>

# [Build Onchain Apps Template (⛵️)](https://github.com/coinbase/build-onchain-apps/)

> Accelerate your onchain creativity with the Build Onchain Apps Template. ☕️

[![GitHub contributors](https://img.shields.io/github/contributors/coinbase/build-onchain-apps?color=3498DB)](https://github.com/coinbase/build-onchain-apps/graphs/contributors) [![GitHub Stars](https://img.shields.io/github/stars/coinbase/build-onchain-apps.svg?color=3498DB)](https://github.com/coinbase/build-onchain-apps/stargazers) [![GitHub](https://img.shields.io/github/license/coinbase/build-onchain-apps?color=3498DB)](https://github.com/coinbase/build-onchain-apps/blob/main/LICENSE)

<br />

**Build Onchain Apps Template** (aka BOAT ⛵️) will help you save weeks of initial app setup and the hassle of integrating onchain components with web2 infrastructure. 🌊

We do this by taking an opinionated approach to streamlining early decisions you must make when building an onchain app.

Whether you're a hackathon participant or an ambitious entrepreneur looking to build the next big thing, this template is designed with you in mind. 💙

**Out of the box** 🧰 🧙 ✨

- Progressive Web App support using [Next.js](https://nextjs.org/) 🏗️
- Ethereum L2 support through [Base](https://base.org/) 🔵
- Easy account creation with [Smart Wallet](https://www.smartwallet.dev/why)
- Live examples and documentation for Minting and Payments experiences with [wagmi](https://wagmi.sh/) and [Viem](https://viem.sh/) 🚀
- Latest styling best practices with [Tailwind CSS](https://tailwindcss.com/) 💅
- Easy maintenance with linting, formatting, and tests ✅
- Insights into Web Vitals performance metrics with Perfume.js 📈
- Smart contract deployment with Foundry ☁️
- Support for a local testnet node for testing smart contracts using [Anvil](https://book.getfoundry.sh/reference/anvil/). 🧪

<br >

## Getting Started

#### Step 1: Setup Environment Variables

- Obtain a Base RPC URL from [Coinbase Developer Platform](https://www.coinbase.com/developer-platform/products/base-node?utm_source=boat) and assign to the `.env.local` file

```bash
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=ADD_WALLET_CONNECT_PROJECT_ID_HERE
NEXT_PRIVATE_RPC_URL=ADD_RPC_URL_HERE
```

#### Step 2: Install and Run your onchain app

```bash
# Install
yarn

# Run
yarn dev
```

## Develop

To format and lint the package locally use these quick steps.

```bash
# Format fix
yarn format

# Lint fix
yarn lint
```

## Updating ABI

After you create a project using BOAT, these are the folders and files you are interested in when updating a smart contract:
_Using BuyMeACoffee smart contract as an example below_

```bash
<project-name>
├── contracts
│   ├── src
│   │   └── BuyMeACoffee.sol          ← smart contract code
│   └──out/BuyMeACoffee.sol
│       └── BuyMeACoffee.json         ← output from "forge build" which contains the updated ABI
│
└── web/app/buy-me-coffee
    └── _contracts
        ├── BuyMeACoffeeABI.ts             ← copy of ABI from contracts/out/BuyMeACoffee.json
        └── useBuyMeACoffeeContract.ts     ← deploy address
```

### Importing updated ABI to frontend code

After updating your smart contract code, run `forge build` in the `contracts` folder. This will create a json in the `contracts/out` directory.

The output json contains additional information. We only need the `abi` property from that json object. Let's use `jq` to extract just the `abi` property

```bash
# from the "contract" folder

jq .abi out/BuyMeACoffee/BuyMeACoffee.json
```

Take the output of `jq` and update `web/app/buy-me-coffee/_contracts/BuyMeACoffeeABI.ts`

Done with first step!

### Deploying your smart contract and updating frontend code

Make sure you got all the environment variables squared away in `contracts/.env` and get some base sepolia eth from a faucet!

To deploy your smart contract,

```bash
# from the "contract" folder

source .env && forge script script/LocalContract.s.sol:LocalContractScript  --broadcast --rpc-url https://sepolia.base.org
```

In the long output, find the value for `Contract Address`.

Copy that value and update `web/app/buy-me-coffee/_contracts/useBuyMeACoffeeContract.ts` with the new address.

## Outro

This is one of the more error prone steps. Take it step by step.

If you are new smart contract deployment, just try deploying the existing `BuyMeACoffee` contract and replace the contract address. After, try updating `BuyMeACoffee.sol` and get the new ABI in your frontend code.

We are thinking of ways to make this step easier in the future! Happy hacking!

## Do you need gas for Base Sepolia? 🔵

Learn how you can obtain free testnet funds here: https://docs.base.org/tools/network-faucets/.

## Community ☁️ 🌁 ☁️

Check out the following places for more BOAT-related content:

- Follow @zizzamia ([X](https://twitter.com/zizzamia), [Farcaster](https://warpcast.com/zizzamia)) for project updates
- Join the discussions on our [OnchainKit warpcast channel](https://warpcast.com/~/channel/onchainkit)

## Authors

- [@zizzamia](https://github.com/zizzamia) ([X](https://twitter.com/Zizzamia))
- [@Sneh1999](https://github.com/Sneh1999) ([X](https://twitter.com/snoopies_eth))
- [@wespickett](https://github.com/wespickett) ([X](https://twitter.com/wespickett))
- [@mochikuan](https://github.com/mochikuan) ([X](https://twitter.com/mochikuan))
- [@renanmav](https://github.com/renanmav) ([X](https://twitter.com/renanmav))
- [@robpolak](https://github.com/robpolak) ([X](https://twitter.com/0xr0b_eth))
- [@kyhyco](https://github.com/kyhyco)
- [@cnasc](https://github.com/cnasc) ([warpcast](https://warpcast.com/cnasc))
- [@arsood](https://github.com/arsood) ([X](https://twitter.com/arsood))
- [@eragon512](https://github.com/eragon512) ([X](https://twitter.com/eragon5121))

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
