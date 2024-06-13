# Changelog

## 0.31.1

### Patch Changes

- 9508542: - **fix**: Update Paymaster URL environment variable. By @cpcramer

## 0.31.0

### Minor Changes

- f1c40cd: - **feat**: Update the paymaster bundler experience to use the Coinbase Smart Wallet paymaster. By @cpcramer

## 0.30.0

### Minor Changes

- 6c6e571: - **feat**: made Smart Wallet the only choice for BOAT.

## 0.29.0

### Minor Changes

- 1197879: **feat** use api route for CDP RPC URL

## 0.28.2

### Patch Changes

- 5666cd4: - **feat**: started simple Homepage to showcase SW. By @zizzamia

## 0.28.1

### Patch Changes

- 4317480: - **fix**: setup error because of a typo in file names. By @matejos (#480)
  - **chore**: latest OnchainKit version. By @zizzamia

## 0.28.0

### Minor Changes

- 79afd16: - **feat**: add metrics tracking to CDP links. By @0xAlecv #475

## 0.27.0

### Minor Changes

- **feat**: added CDP (Coinbase Developer Portal) Node as RPC URL. You can learn more about this at https://www.coinbase.com/developer-platform/products/base-node . By @0xAlec #474 c821e67

## 0.26.0

### Minor Changes

- **feat**: added Smart Wallet to template. By @zizzamia #469 18c725a

## 0.25.0

### Minor Changes

- **fix**: on a blank app, remove experiences from the header. 7d55c5b

## 0.24.0

### Minor Changes

- **chore**: fix create command. By @kyhyco #427 1849cf0

## 0.23.0

### Minor Changes

- **fix**: git clone command. d2ecd19

## 0.22.0

### Minor Changes

- **feat**: module select during cli create. 1a5e62c
- **feat**: read onchain data without connected wallet
- **chore**: complete Guide for /mint
- **feat**: update side nav feels
- **docs**: README cleanup

## 0.21.0

### Minor Changes

- **feat**: change basescan api key during cli app creation. 43aaccf

## 0.20.0

### Minor Changes

- **feat**: better CLI. b1d4d0d

## 0.19.0

### Minor Changes

- **feat**: better CLI.

## 0.18.0

### Minor Changes

- **feat**: Updated folder structure to web and contracts. 4be879c

## 0.17.0

### Minor Changes

- **fix**: Explicitly sets metadataBase to suppress build warnings (#257 issue). By @wespickett #266 3537eae
- **feat**: Second passthrough on responsiveness. By renanmav & @mochikuan #250
- **feat**: New design for the Buy Me Coffee page. By @alvaroraminelli & @mochikuan #258
- **feat**: Added `rehype-pretty-code` for better code example. By @zizzamia #263
- **fix**: A few followup changes related to the folder structure change. By @Sneh1999 #262 #264 #265 #267
- **feat**: Added support for local node. By @Sneh1999 #260
- **feat**: Added AllowlistNFT Base smart contract. By @pop-punk & @awilliams1-cb #255

## 0.16.0

### Minor Changes

- **chore**: Moved the main template code into the template folder. By @zizzamia #252 f1e08c4
- **fix**: Removed theme null. By @wespickett #251
- **feat**: Added tob banner component. By @Sneh1999 #247
- **feat**: Added `OnchainAddress` and allow `OnchainAvatar` to have className customizable. By @zizzamia #246
- **chore**: Polished `OnchainAvatar`. By @zizzamia #244
- **chore**: More tests, build cleanup and upgraded dependecies. By @zizzamia #243 #245 #248
- **fix**: Signature mint errors. By @robpolak #240
- **docs**: Added a comment to explain the new app folder pattern. By @wespickett #238 #249
- **feat**: Added footer component. By @renanmav #235 #242

## 0.15.0

### Minor Changes

- **chore**: Optimized Contracts. By @Sneh1999 & @awilliams1-cb #227 4c90c8d
- **chore**: Moved to git clone instead of tar for setup. By @Sneh1999 #234
- **feat**: Converted to next 13 app folder. By @wespickett #232 #233
- **fix**: Next.js link console error. By @renanmav #231
- **chore**: Migrated to base sepolia. By @Sneh1999 #228 #230
- **feat**: Polished multichain support. By @cnasc #193
- **fix**: Header CSS jank. By @renanmav #226
- **feat**: Init `OnchainAvatar`. By @zizzamia #223
- **feat**: Added alphabetize import-order. By @zizzamia #222
- **feat**: Added Radix navigation menu primitives for Experiences menu. By @zizzamia #221
- **feat**: Replaced `classNames` with `clsx`. By @zizzamia #217
- **feat**: Added the Roboto Mono and Inter Google fonts. By @zizzamia #216
- **feat**: Added Signature Mint Contract + Api Route + UX. By @robpolak #213 #218

## 0.14.0

### Minor Changes

- **fix**: Optimized instructions for contracts based on feedback. #207 6d8ae28 By @Sneh1999
- **feat**: Implemented [shikiji](https://shikiji.netlify.app/) to automatically generate style for codeblocks. #208
- **fix**: Removed `walletConnectWallet` as it was adding a CSS prefix to the HTML element. #200
- **feat**: Enhanced gas efficiency (calldata) of `buyCoffee` function. #196 By @2911rahulpathak
- **feat**: Added CSS animations to the homepage for a more enjoyable experience. #194 #202
- **feat**: Deprecated Radix Themes in favor of using TailwindCSS for easier code extension and maintenance. #192 #197 #198 #201 #203 #205 #206
- **feat**: Incorporated `prettier-plugin-tailwindcss` to maintain clean and organized code. #191

## 0.13.0

### Minor Changes

- **feat**: deployed new Buy Me Coffee contract #187 (1a706dc)
- **feat**: added basic multichain config #186
- **feat**: added support for API routes in the NextJS layer + Configuration #180 #182 #185
- **feat**: added stylelint checks, and sort order "stylelint-config-idiomatic-order" #159
- **chore**: polished architecture and style #179
- **chore**: polished docs and tests #177 #183 #184

## 0.12.0

### Minor Changes

- **feat**: reduces the number of commands to run for the user in the contracts folder #168 (2a27b64)
- **chore**: code refactoring to make the app easier to test #167

## 0.11.0

### Minor Changes

- **fix**: mitigate a supply-chain attack on the `@ledgerhq/connect-kit` package. (846aa54)

## 0.10.0

### Minor Changes

- **feat**: added `yarn build` check in CI #155 #156 (20ea771)
- **fix**: moved `pages` to hold only pages, and components/hooks/styles under `src`. Also removed ts paths since they tend to cause issues. #153
- **feat**: setup Perfume.js and Web Vitals metrics #152
- **feat**: started a new homepage with a CodeBlock component #151
- **docs**: added [Stackblitz](https://stackblitz.com/github/coinbase/build-onchain-apps/tree/main/apps/build-onchain-apps) for a quick live code demo access #148
- **feat**: added ABI Types with `abitype` #146

## 0.9.1

### Patch Changes

- **fix**: added missing import and dependecies for Tailwind to work (#143) (b4b09c1)
- **fix**: now jest coverage works, and it's pretty nice (#142)
- **feat**: Initial setup for mobile menu (#137)

## 0.9.0

### Patch Changes

- **docs**: easier instructions and setup (#138) (5028c14)
- **feat**: replaced Typescript "ES5" target with "ES2020" (#136)
- **feat**: added ERC1155 contracts (#133)
- **feat**: setting up the initial Jest configuration and tests (#128) (#134)
- **feat**: added Lint and Tests into the Github Actions for apps/build-onchain-apps (#135)

## 0.8.0

### Minor Changes

- **feat**: upgraded from v1 to Yarn v4 (#123) (4c62641)
- **feat**: added Foundry support (#119)
- **feat**: added Basic Mint page example (#117)
- **feat**: init support Web Vitals with the Perfume.js library (#113)

## 0.7.3

### Patch Changes

- **feat** : create Navbar component using @radix-ui/react-navigation-menu (d0f433b)

## 0.7.2

### Patch Changes

- **feat** : converted App into a Progressive Web App (2fb70ad)

## 0.7.1

### Patch Changes

- **docs**: onchain app is now lowercase (241fdb8)

## 0.7.0

### Minor Changes

- **fea**: moved repo to @coinbase/build-onchain-apps (8cccd55)

## 0.6.0

### Minor Changes

**feat**: supported more Wallets with RainbowKit (#85)(9c3d3ed)

## 0.5.0

### Minor Changes

- **feat**: renaming templates into apps (#80) (f776f3f)

## 0.4.1

### Patch Changes

- **feat**: reversed the memos order (1203109).

## 0.4.0

### Minor Changes

- **feat**: replaced Infura with Alchemy (7ecd7ee).
- **feat**: did some nice styling on `AccountConnectButton`.
- **feat**: started a shared onchain types file.
- **fix**: got Base Goerli working properly again.
- **chore**: update viem and clean up yarn.lock.
- **chore**: moved a few of the common functions inside the utils folder.

## 0.3.0

### Minor Changes

- **feat**: replaced RainbowKit with Coinbase Wallet SDK 💙 (734c828)
- **feat**: started shaping `AccountConnectButton` onchain component

## 0.2.2

### Patch Changes

- **feat**: added some nice Linting for import/order (a77dc73)
- **feat**: added onchain/ folder to keep nice and neat all Onchain TS specific code
- **feat**: added NEXT_PUBLIC_INFURA_ID in .env.example
- **chore**: moved the code a bit around, so all Onchain code is mostly in one folder

## 0.2.1

### Patch Changes

- **fix**: polish README and fix a few console errors (1eac3f8)

## 0.2.0

### Minor Changes

- **feat**: moved templates created inside apps/ #59

## 0.1.3

### Patch Changes

- **fix**: bin path pointing to wrong folder.

## 0.1.2

### Patch Changes

- **fix**: CLI broken by missing dist files

## 0.1.1

### Patch Changes

- **chore**: release CLI

## 0.1.0

### Minor Changes

- **feat**: new build-onchain-apps CLI for onchain app creation

## 0.0.4

### Patch Changes

- **chore:** added some extra context in the README.md

## 0.0.3

### Patch Changes

- **feat:** adding buy me a coffee feature for demo reading from smart contract #7
- **chore:** added lint checks as script and in CI #11 (#18)
- **chore:** setup Github Actions format workflow #12
- **chore:** added prettier and did a nice first run ✨ #2 (#14)
- **docs** added Documentation Request template #4 (#6)
- **chore** setup initial scaffolding
