// This is a shim for @solana/kit to satisfy Privy's build requirements.
// It throws an error only if Solana wallet functionality is actually used.

export function getTransactionDecoder() {
  throw new Error(
    '@solana/kit is not installed. Install Solana peer dependencies if you use Solana wallets.'
  );
}

export function getTransferSolInstruction() {
  throw new Error(
    '@solana-program/system is not installed. Install Solana peer dependencies if you use Solana wallets.'
  );
}

export function createSolanaRpc() {
  throw new Error(
    '@solana/kit is not installed. Install Solana peer dependencies if you use Solana wallets.'
  );
}

export function createSolanaRpcSubscriptions() {
  throw new Error(
    '@solana/kit is not installed. Install Solana peer dependencies if you use Solana wallets.'
  );
}
