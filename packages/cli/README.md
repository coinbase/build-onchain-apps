# Build Onchain Apps CLI

## How to run it

To get started, open a new shell and run:

```
npx build-onchain-apps@latest create buy-me-a-coffee-app
```

## Local Development

To test the CLI locally, run:

1. Run the local NPM registry:

```
npx nx local-registry
```

2. In a different window, publish a new version of the packages:

```
npx nx run-many -t publish --ver 0.0.1 --tag latest
```
