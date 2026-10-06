-include .env.local

export

.PHONY: fork-sonic

fork-sonic:
	anvil --mnemonic "${TEST_ACCOUNT_MNEMONIC}" --fork-url "${SONIC_RPC_URL}" --port 8545
