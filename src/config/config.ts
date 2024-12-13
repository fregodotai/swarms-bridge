import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

const config = {
  port: process.env.PORT || 4545,
  rpcUrl: process.env.RPC_URL || 'https://api.devnet.solana.com',
  solanaKeyPair: process.env.SOLANA_KEYPAIR,
};

export default config;
