## Differential Testing
Differential testing is used to compare Murky's solidity implementation to reference implementations in other languages. This directory contains the scripts needed to support this testing, as well as the differential tests themselves.

Currently, the only reference implementation is adapted from the [Uniswap/merkle-distributor](https://github.com/uniswap/merkle-distributor) implementation. It is written in javascript.


### Setup
From the [scripts directory](./scripts/), run
```sh
npm install
npm run compile
```


### Test the javascript implementation
From the scripts directory:
```sh
npm run generate-root
```

### Run the differential test using foundry
Now you can run the tests.  
From the root of the Murky repo, run:
```sh
forge test --ffi -c differential_testing/test/DifferentialTests.t.sol
```



