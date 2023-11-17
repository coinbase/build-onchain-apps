# [Build Onchain Apps](https://github.com/base-org/build-onchain-apps)

> The easier way to build onchain apps.

<br />
<br />

Building an Onchain Application can feel overwhelming due to the many libraries, best practices, and choices developers and entrepreneurs must make. **Build Onchain Apps** as a library focuses on automating and simplifying the creation of new Onchain Apps and enhancing existing ones.

We just started; stay tuned for more to come!!! ☕️ 🔵

## Getting Started

```sh
npx @base-org/build-onchain-apps@latest create
```

<p align='center'>
<img src='https://images.ctfassets.net/c5bd0wqjc7v0/3dFiAAcNU2DauF5zvakbA0/cc4bcc4621a12da40e6248b41e450844/cli.gif' width='600' alt='npm start'>
</p>

If you've previously installed `@base-org/build-onchain-apps` globally via `npm install -g @base-org/build-onchain-apps`, we recommend you uninstall the package using `npm uninstall -g @base-org/build-onchain-apps` or `yarn global remove @base-org/build-onchain-apps` to ensure that npx always uses the latest version.

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

## Contribution

We welcome contributions to Build Onchain Apps! ☕️ 🔵
To contribute, please see [CONTRIBUTING.md](CONTRIBUTING.md).

### Development

For all available scripts, check the [package.json](https://github.com/base-org/build-onchain-apps/blob/main/package.json), but if you don't know where to start, here are some useful ones.

```bash
git clone https://github.com/base-org/build-onchain-apps.git
cd build-onchain-apps
yarn
```

> Do not use npm to install the dependencies, as the specific package versions in `yarn.lock` are used to build and test build-onchain-apps.

To build the compiler and all the other modules included in the package:

```bash
yarn build
```

### Testing Locally

To test the package locally, use `npm link` to link the local package to the global npm registry.

```bash
yarn build
npm link
# Call CLI using the following command
build-onchain-apps create
```

After you are done testing, you can unlink the package from the global npm registry.

```bash
npm unlink @base-org/build-onchain-apps
```

### Adding new templates

To make a new template, make a folder for it in the `templates` folder and set up your project there. Treat each template like its own Node.js project and run the commands in its folder.

```bash
cd templates/buy-me-a-coffee-app
yarn
yarn dev
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
