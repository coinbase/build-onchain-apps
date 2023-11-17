# [Build Onchain Apps](https://github.com/base-org/build-onchain-apps)

> The easier way to build onchain apps.

<br />

Building an Onchain Application can feel overwhelming due to the many libraries, best practices, and choices developers and entrepreneurs must make. **Build Onchain Apps** as a library focuses on automating and simplifying the creation of new Onchain Apps and enhancing existing ones.

We just started; stay tuned for more to come!!! ☕️ 🔵

## Getting Started

```sh
npx @base-org/build-onchain-apps@latest create <TEMPLATE_APP>
```

<p align='center'>
<img src='https://images.ctfassets.net/c5bd0wqjc7v0/3dFiAAcNU2DauF5zvakbA0/cc4bcc4621a12da40e6248b41e450844/cli.gif' width='600' alt='npm start'>
</p>

If you've previously installed `@base-org/build-onchain-apps` globally via `npm install -g @base-org/build-onchain-apps`, we recommend you uninstall the package using `npm uninstall -g @base-org/build-onchain-apps` or `yarn global remove @base-org/build-onchain-apps` to ensure that npx always uses the latest version.

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

<br >

## Contributing ☕️ 🔵

The main purpose of this repository is to continue evolving Build Onchain Apps, making it better and easier to use. Development of React happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving Build Onchain Apps.


### [Code of Conduct](CODE_OF_CONDUCT.md).
Build Onchain Apps has adopted a Code of Conduct that we expect project participants to adhere to. Please read the full text so that you can understand what actions will and will not be tolerated.


### [Contributing Guide](CONTRIBUTING.md).
Read our contributing guide to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to Build Onchain Apps.

### Develop

To build and test the package locally use these quick steps

```bash
## Quick Start
# Clone the repo
git clone https://github.com/base-org/build-onchain-apps.git
cd build-onchain-apps

# Run initial install
yarn

# Build all dependencies
yarn build


## Test Local Package
# Link the local package to the global npm registry
npm link

# Test CLI using the local package
build-onchain-apps create

# After testing, unlink the package from the global npm registry
npm unlink @base-org/build-onchain-apps
```

#### Adding new templates

To make a new template, make a folder for it in the `templates` folder and set up your project there. Treat each template like its own Node.js project and run the commands in its folder.

```bash
cd templates/buy-me-a-coffee-app
yarn
yarn dev
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
