# [Base App]

## Getting Started

Obtain Project ID from [Wallet Connect](https://cloud.walletconnect.com/sign-in) and assign to `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` in the `.env` file.

## Develop

For all available scripts, check the [package.json](https://github.com/base-org/build-onchain-apps/blob/main/package.json), but if you don't know where to start, here are some useful ones.

```bash
# Install
yarn

# Format fix
yarn workspace @build-onchain-apps/base-app format

# Lint fix
yarn workspace @build-onchain-apps/base-app lint

# Run
yarn workspace @build-onchain-apps/base-app dev
```
