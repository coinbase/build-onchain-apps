# Build Onchain API Routes

## Supported Chains /api/chains/supported

**Method**: GET

**Response**: JSON encoded viem chain object

```json
[{"id":5,"network":"sepolia","name":"Sepolia"]
```

## Current Block Number /api/chain/blockNumber?chainId=5

Gets the current blocknumber from the backend. This might be used to ensure
your frontend has consistency with the backend (e.g what if the drift
between FE and BE).

**Method**: GET

**Response**: JSON encoded block number

```json
{ "block": "13948678" }
```
