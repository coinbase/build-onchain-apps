<img src='./docs/logo-v-0-17.png' width='800' alt='Build Onchain Apps Toolkit'>

# [Build Onchain Apps Toolkit (⛵️)](https://github.com/coinbase/build-onchain-apps/)

> Accelerate your onchain creativity with the Build Onchain Apps Toolkit. ☕️

[![Current version](https://img.shields.io/github/tag/coinbase/build-onchain-apps?color=3498DB&label=version)](https://github.com/coinbase/build-onchain-apps/blob/main/CHANGELOG.md) [![GitHub contributors](https://img.shields.io/github/contributors/coinbase/build-onchain-apps?color=3498DB)](https://github.com/coinbase/build-onchain-apps/graphs/contributors) [![GitHub Stars](https://img.shields.io/github/stars/coinbase/build-onchain-apps.svg?color=3498DB)](https://github.com/coinbase/build-onchain-apps/stargazers) [![GitHub](https://img.shields.io/github/license/coinbase/build-onchain-apps?color=3498DB)](https://github.com/coinbase/build-onchain-apps/blob/main/LICENSE)

<br />

**Build Onchain Apps Toolkit** (aka BOAT ⛵️) will help you save 6+ weeks of initial onchain app setup and eliminate the hassle of integrating onchain components with web2 infrastructure. 🌊

We do this by taking an opinionated approach to streamlining early decisions you must make when building an onchain app.

Whether you're a hackathon participant or an ambitious entrepreneur looking to build the next big thing, this toolkit is designed with you in mind. 💙

**Out of the box** 🧰 🧙 ✨
- Progressive Web App support using [Next.js](https://nextjs.org/) 🏗️
- Ethereum L2 support through [Base](https://base.org/) 🔵
- Wallet connect integration with [RainbowKit](https://www.rainbowkit.com) 🌈
- Live examples and documentation for Minting and Payments experiences with [wagmi](https://wagmi.sh/) and [Viem](https://viem.sh/) 🚀
- Latest styling best practices with [Tailwind CSS](https://tailwindcss.com/) 💅
- Easy maintenance with linting, formatting, and tests ✅
- Insights into Web Vitals performance metrics with Perfume.js 📈
- Smart contract deployment with Foundry ☁️
- Support for a local testnet node for testing smart contracts using [Anvil](https://book.getfoundry.sh/reference/anvil/). 🧪

<br >

## Getting Started
To get started building with BOAT, follow this step-by-step guide. You'll be able to explore the pre-configured contracts and experiment with them.


#### Step 1: Kick off your onchain app

```bash
npx @coinbase/build-onchain-apps@latest create
```

<p align='center'>
  <img src='./docs/images/build-onchain-apps-step-1.gif'
  width='800' alt='Build Onchain Apps Toolkit'>
</p>

#### Step 2: Set Wallet Connect Project ID
Create a `.env.local` file

```bash
cp .env.local.default .env.local
```

Next, obtain Wallet Connect Project ID from [walletconnect.com](https://cloud.walletconnect.com/sign-in) and assign to the `.env.local` file. We leverage WalletConnect to allow end-users to connect their wallets to your site.

```bash
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=ADD_WALLET_CONNECT_PROJECT_ID_HERE
```

#### Step 3: Install and Run your onchain app

```bash
# cd into your new project folder
cd [app-name]

# Install dependencies
yarn

# Run onchain app
yarn dev
```

<p align='center'>
  <img src='./docs/images/build-onchain-apps-step-2-date-11-25.gif'
  width='800' alt='Build Onchain Apps'>
</p>

#### _Congrats ✨, Time to enjoy your onchain app with some coffee ☕️_

<br >

## Deploy your own contracts
#### Step 1: Kick start your contracts

```bash
# Install Foundry

curl -L https://foundry.paradigm.xyz | bash
foundryup
```

Follow the instructions of foundryup to completely setup foundry

#### Step 2: Build, test and format the sample contracts

```bash
cd contracts

# Install dependencies
forge install

# Build
forge build
```

#### Step 3: Deploy contracts to Base Sepolia

Create a `.env` file using the `.env.example` file provided in your contracts folder and add your private key. Make sure to add a `0x` in front of your key to convert it to a hex string.
Note: Get an API key from [here](https://basescan.org/) for Base Sepolia by creating an account

```bash
source .env

forge script script/BuyMeACoffee.s.sol:BuyMeACoffeeScript --broadcast --verify --rpc-url base_sepolia
forge script script/SignatureMintERC721.s.sol:SignatureMintERC721Script --broadcast --verify --rpc-url base_sepolia
```

**Note**: The above command will print the address of your contract and a link to the block explorer. Click on the block explorer link to verify whether your contract has been deployed or not.

For more information on contracts, visit [here](https://github.com/coinbase/build-onchain-apps/blob/main/template/contracts/README.md)



<br>

## For a Live demo use

- [Stackblitz](https://stackblitz.com/github/coinbase/build-onchain-apps/tree/main/template)

<br>

## Do you need gas for Base Sepolia? 🔵

Learn how you can obtain free testnet funds here: https://docs.base.org/tools/network-faucets/.


<br>

## Contributing ☕️

Read below to learn how you can take part in improving Build Onchain Apps Toolkit.

### [Code of Conduct](CODE_OF_CONDUCT.md)

### [Contributing Guide](CONTRIBUTING.md)

### Develop

To build and test either the CLI or the main App, start by cloning the repo.

```bash
# Clone the repo
git clone https://github.com/coinbase/build-onchain-apps.git
```

### Develop the App

```bash
# Go to main application
cd template

# Install and run latest template
yarn
yarn dev
```

### Develop the CLI

```bash
# From the root repo
# Install and build latest dependencies
yarn
yarn build

# Link the local package to the global npm registry
npm link

# Test CLI using the local package
build-onchain-apps create

# After testing, unlink the package from the global npm registry
npm unlink @coinbase/build-onchain-apps
npm uninstall -g @coinbase/build-onchain-apps
```

<br>
<br>

## The Team and Our Community ☁️ 🌁 ☁️

Build Onchain Apps Toolkit is all about community; for any questions, feel free to:

1. [Open an issue](https://github.com/coinbase/build-onchain-apps/issues/new?assignees=&labels=type%3A+documentation&projects=&template=documentation_request.yml&title=Documentation+Request%3A+)
2. [Tell us what project you build](https://github.com/coinbase/build-onchain-apps/discussions/64) ⛵️
3. Reach out to the core maintainers on Twitter or Farcaster
<table>
  <tbody>
    <tr>
      <td align="center" valign="top">
        <a href="https://twitter.com/Zizzamia">
          <img width="80" height="80" src="https://github.com/zizzamia.png?s=100">
        </a>
        <br />
        <a href="https://twitter.com/Zizzamia">Leonardo Zizzamia</a>
      </td>
      <td align="center" valign="top">
        <a href="https://twitter.com/snoopies_eth">
          <img width="80" height="80" src="https://github.com/Sneh1999.png?s=100">
        </a>
        <br />
        <a href="https://twitter.com/snoopies_eth">Sneh Koul</a>
      </td>
      <td align="center" valign="top">
        <a href="https://twitter.com/wespickett">
          <img width="80" height="80" src="https://github.com/wespickett.png?s=100">
        </a>
        <br />
        <a href="https://twitter.com/wespickett">Wesley Pickett</a>
      </td>
    </tr>
    <tr>
      <td align="center" valign="top">
        <a href="https://twitter.com/mochikuan">
          <img width="80" height="80" src="https://pbs.twimg.com/profile_images/1712595142614347776/c5yeQaaU_400x400.jpg">
        </a>
        <br />
        <a href="https://twitter.com/mochikuan">Rose Kuan</a>
      </td>
      <td align="center" valign="top">
        <a href="https://twitter.com/renanmav">
          <img width="80" height="80" src="https://github.com/renanmav.png?s=100">
        </a>
        <br />
        <a href="https://twitter.com/renanmav">Renan Machado</a>
      </td>
      <td align="center" valign="top">
        <a href="https://twitter.com/0xr0b_eth">
          <img width="80" height="80" src="https://github.com/robpolak.png?s=100">
        </a>
        <br />
        <a href="https://twitter.com/0xr0b_eth">Rob Polak</a>
      </td>
    </tr>
    <tr>
      <td align="center" valign="top">
        <a href="https://twitter.com/arsood">
          <img width="80" height="80" src="https://github.com/arsood.png?s=100">
        </a>
        <br />
        <a href="https://twitter.com/arsood">Arun Sood</a>
      </td>
      <td align="center" valign="top">
        <a href="https://twitter.com/alvaroraminelli">
          <img width="80" height="80" src="https://github.com/alvaroraminelli.png?s=100">
        </a>
        <br />
        <a href="https://twitter.com/alvaroraminelli">Alvaro Raminelli</a>
      </td>
      <td align="center" valign="top">
        <a href="https://warpcast.com/cnasc">
          <img width="80" height="80" src="https://github.com/cnasc.png?s=100">
        </a>
        <br />
        <a href="https://warpcast.com/cnasc">Chris Nascone</a>
      </td>
    </tr>
    <tr>
      <td align="center" valign="top">
        <a href="https://twitter.com/eragon5121">
          <img width="80" height="80" src="https://github.com/eragon512.png?s=100">
        </a>
        <br />
        <a href="https://twitter.com/eragon5121">Anirud Samala</a>
      </td>
    </tr>
  </tbody>
</table>

<br>
<br>

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
