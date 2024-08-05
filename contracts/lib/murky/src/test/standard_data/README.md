## Standardized Testing Data

This folder contains standardized testing data for reproducible proofs, gas snapshotting, etc. This is an important addition to fuzz testing as it allows for consistent performance measures, comparison with other libraries and implementations, and probably other benefits that I'm not aware of yet.

The data is currently used by [StandardInput.t.sol](../StandardInput.t.sol) and is loaded at test time using Foundry's `ffi` cheatcode.

The data is encoded, and is decoded into a `bytes32[100]` array at test time.

### Files
* **StandardData.txt**: the current standard testing data file. Contains 100 addresses encoded to 32 bytes each. The generation script is [dead simple](https://gist.github.com/dmfxyz/36dce9db458eea1135e93ae739197bb3). Always interested in improvements!

* **StandardData.old.txt**: a prior testing file. Also contains 100 32 byte data points, but most are very sparse with only the two highest order bits set. It remains here as prior gas-snapshots relied on it.





