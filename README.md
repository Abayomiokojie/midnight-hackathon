# midnight-hackathon

The midnight foundation privacy blockchain project demonstrating zero-knowledge proofs on testnet.

## Patient Dashboard

A minimal static patient dashboard prototype is available at `src/dashboard`.

Files

- `src/dashboard/index.html` — static HTML for the dashboard UI.
- `src/dashboard/styles.css` — styles for the UI.
- `src/dashboard/app.js` — small mocked interactions and state.

Quick start

1. Open `src/dashboard/index.html` directly in a browser.

OR

2. Serve the folder using a static server. If you have Node.js installed, one simple option is `http-server`:

   ```powershell
   # Install http-server once globally (optional)
   npm install -g http-server
   # From project root
   http-server ./src/dashboard -c-1
   ```

This skeleton uses mocked data and UI-only interactions. Next steps: integrate wallet, Midnight/compact smart-contracts, and backend APIs for proof verification and token claims.

## Prerequisites

### 1. Node.js Version Check

You need NodeJS version 22.15 or greater:

```bash
node --version
```

Expected output: `v22.15.0` or higher.

If you get a lower version: [Install Node.js 22+](https://nodejs.org/).

### 2. Docker Installation

The [proof server](https://docs.midnight.network/develop/tutorial/using/proof-server) runs in Docker, so you need Docker Desktop:

```bash
docker --version
```

Expected output: `Docker version X.X.X`.

If Docker is not found: [Install Docker Desktop](https://docs.docker.com/desktop/). Make sure Docker Desktop is running (not just installed).

## Setup Instructions

### Install the Compact Compiler

The Compact compiler converts smart contracts written in the Compact language into executable circuits for zero-knowledge proof generation.

#### Download and install compact compiler

```bash
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh
```

#### Add to your PATH (choose based on your shell)

```bash
source $HOME/.local/bin/env                    # bash/zsh/sh
source $HOME/.local/bin/env.fish              # fish
```

#### Update to the version required by this project (optional)

```
compact update 0.25.0
```

#### Verify installation

```bash
compact compile --version
```

Expected output: `0.25.0`.

> If command not found: Restart your terminal and try the `source` command again.

### Install Project Dependencies

```bash
npm install
```

### Compile the Smart Contract

The Compact compiler generates TypeScript bindings and zero-knowledge circuits from the smart contract source code. Navigate to contract directory and compile the smart contract:

```bash
cd contract && npm run compact
```

Expected output:

```
Compiling 1 circuits:
  circuit "increment" (k=10, rows=29)
```

Note: First time may download zero-knowledge parameters (~500MB). This is normal and happens once.

### Build and Test

Build TypeScript files and run tests:

```bash
npm run build && npm run test
```

### Build the CLI Interface

Navigate to CLI directory and build the project:

```bash
cd ../counter-cli && npm run build
```

### Start the Proof Server

The proof server generates zero-knowledge proofs for transactions locally to protect private data. It must be running before you can deploy or interact with contracts.

#### Option A: Manual Proof Server (Recommended)

Pull the Docker image:

```bash
docker pull midnightnetwork/proof-server:latest
```

Then start the proof server (keep this terminal open):

```bash
docker run -p 6300:6300 midnightnetwork/proof-server -- 'midnight-proof-server --network testnet'
```

Expected output:

```
INFO midnight_proof_server: This proof server processes transactions for TestNet.
INFO actix_server::server: starting service: "actix-web-service-0.0.0.0:6300"
```

**Keep this terminal running!** The proof server must stay active while using the DApp.

#### Option B: Automatic Proof Server

This should start proof server automatically, but may fail if Docker isn't properly configured:

```bash
npm run testnet-remote-ps
```

If this fails with "Could not find a working container runtime strategy", use Option A instead.

## Run the Counter DApp

Open a new terminal (keep proof server running in the first one).

```bash
cd counter-cli && npm run start-testnet-remote
```

## Using the Counter DApp

### Create a Wallet

The CLI uses a headless wallet (separate from browser wallets like Lace) that can be called through library functions.

1. Choose option `1` to build a fresh wallet
2. The system will generate a wallet address and seed
3. **Save both the address and seed** - you'll need them later

Expected output:

```
Your wallet seed is: [64-character hex string]
Your wallet address is: mn_shield-addr_test1...
Your wallet balance is: 0
```

### Fund Your Wallet

Before deploying contracts, you need testnet tokens.

1. Copy your wallet address from the output above
2. Visit the [testnet faucet](https://midnight.network/test-faucet)
3. Paste your address and request funds
4. Wait for the CLI to detect the funds (takes 2-3 minutes)

Expected output:

```
Your wallet balance is: 1000000000
```

### Deploy Your Contract

1. Choose option `1` to deploy a new counter contract
2. Wait for deployment (takes ~30 seconds)
3. **Save the contract address** for future use

Expected output:

```
Deployed contract at address: [contract address]
```

### Interact with Your Contract

You can now:

- **Increment** the counter (submits a transaction to testnet)
- **Display** current counter value (queries the blockchain)
- **Exit** when done

Each increment creates a real transaction on Midnight Testnet.

### Reusing Your Wallet

Next time you run the DApp:

1. Choose option `2` to build wallet from seed
2. Enter your saved seed
3. Choose option `2` to join existing contract
4. Enter your saved contract address

## Integrating Midnight JS & Compact Contracts

This project includes a small client scaffold at `src/dashboard/midnight-client.js` to make it clear where real Midnight JS calls should be placed. The current functions are mocked — replace them with the Midnight SDK and compact-generated TypeScript bindings.

High level steps:

1. Install the Compact compiler and compile the contract in `contracts/` per the instructions above. This generates TypeScript bindings under `contract/`.
2. Install Midnight JS (follow Midnight docs). Typically you will import the client in a browser or Node environment and use it to sign and submit transactions.
3. Replace the functions in `src/dashboard/midnight-client.js` with real calls:
   - `connectWallet()` — integrate Lace/Metamask or a headless wallet.
   - `getPatientProfile(address)` — query on-chain state or your backend proof server.
   - `uploadData(address, payload)` — create proofs and post them to proof server / on-chain as appropriate.
   - `claimRewards(address)` — send a transaction to a compact-generated contract binding.

If you'd like, I can scaffold the real Midnight JS wiring (package.json deps, sample contract bindings usage) next — tell me if you want a browser-based or Node-based wallet flow.

## Useful Links

- [Testnet Faucet](https://midnight.network/test-faucet) - Get testnet funds
- [Midnight Documentation](https://docs.midnight.network/develop/tutorial/building) - Complete developer guide
- [Compact Language Guide](https://docs.midnight.network/develop/tutorial/compact) - Smart contract language reference

## Troubleshooting

| Issue                                               | Solution                                                                                                                |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `compact: command not found`                        | Run `source $HOME/.local/bin/env` then `compact compile --version`                                                      |
| `connect ECONNREFUSED 127.0.0.1:6300`               | Start proof server: `docker run -p 6300:6300 midnightnetwork/proof-server -- 'midnight-proof-server --network testnet'` |
| Could not find a working container runtime strategy | Docker isn't running properly. Restart Docker Desktop and try again                                                     |
| Tests fail with "Cannot find module"                | Compile contract first: `cd contract && npm run compact && npm run build && npm run test`                               |
| Wallet seed validation errors                       | Enter complete 64-character hex string without extra spaces                                                             |
| Node.js warnings about experimental features        | Normal warnings - don't affect functionality                                                                            |
