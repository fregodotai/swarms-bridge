import { SolanaAdapter } from 'fxn-protocol-sdk';
import { Connection, Keypair } from '@solana/web3.js';
import { AnchorProvider, Wallet } from '@coral-xyz/anchor';
import config from '../config/config';

export default class Provider {
  public adapter: SolanaAdapter;

  constructor() {
    const solanaKeyPair = config.solanaKeyPair;

    if (!solanaKeyPair) {
      throw new Error(
        'SOLANA_KEYPAIR is not set in the .env file. Please generate a keypair using "npm run generate-keypair" script.',
      );
    }
    const keypairData = JSON.parse(solanaKeyPair);
    const keypair = Keypair.fromSecretKey(Uint8Array.from(keypairData));

    const rpcUrl = config.rpcUrl;
    const connection = new Connection(rpcUrl, 'confirmed');

    const wallet: Wallet = new Wallet(keypair);
    const provider = new AnchorProvider(connection, wallet, {
      preflightCommitment: 'processed',
    });
    this.adapter = new SolanaAdapter(provider);
  }
}
