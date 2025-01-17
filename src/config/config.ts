import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

const dbUrl = process.env.JAWSDB_URL;

if (!dbUrl) {
  throw new Error('Database URL is not set');
}

const [, user, password, host, database] = dbUrl.match(
  /mysql:\/\/(.*?):(.*?)@(.*?):3306\/(.*)/,
)!;

const config = {
  port: process.env.PORT || 4545,
  rpcUrl: process.env.RPC_URL || 'https://api.devnet.solana.com',
  solanaKeyPair: process.env.SOLANA_KEYPAIR,
  db: {
    host,
    user,
    password,
    database,
    port: 3306,
  },
  isProduction: process.env.NODE_ENV === 'production',
  encryptionKey: process.env.ENCRYPTION_KEY,
  fxnTokenCa: process.env.FXN_TOKEN_CA,
  fregoApiUrl: process.env.FREGO_API_URL || 'https://api.frego.ai',
};

export default config;
