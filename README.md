# [Build Onchain Apps](https://github.com/base-org/build-onchain-apps)

> The easier way to build onchain apps.

<br />
<br />

Building an Onchain Application can feel overwhelming due to the many libraries, best practices, and choices developers and entrepreneurs must make. **Build Onchain Apps** as a library focuses on automating and simplifying the creation of new Onchain Apps and enhancing existing ones.

We just started; stay tuned for more to come!!! ☕️ 🔵

## Getting Started

More coming here

## Develop

For all available scripts, check the [package.json](https://github.com/base-org/build-onchain-apps/blob/main/package.json), but if you don't know where to start, here are some useful ones.

```bash
# Install
yarn

# Format fix
yarn build

# Format fix
yarn format

# Lint fix
yarn lint
```

### Local Development

1. Run the local NPM registry:

```bash
yarn local:start-registry
```

2. In a different window, publish a new version of the packages:

```bash
yarn local:publish --ver 0.0.1 --tag latest
```

3. To test the CLI locally, run:

```bash
npx @base-org/build-onchain-apps@latest create buy-me-a-coffee-app
```

## Contribution

We welcome contributions to Build Onchain Apps! ☕️ 🔵
To contribute, please see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
