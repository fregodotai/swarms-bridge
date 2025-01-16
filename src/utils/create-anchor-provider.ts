import { AnchorProvider, Wallet } from '@coral-xyz/anchor';
import { Connection, Keypair } from '@solana/web3.js';

import { ServiceError } from './error-handlers';
import config from '../config/config';

export default function createAnchorProvider(walletPrivateKey?: string) {
  let keypair: Keypair | undefined;

  if (walletPrivateKey) {
    keypair = Keypair.fromSecretKey(
      Uint8Array.from(walletPrivateKey.split(',')),
    );
  } else {
    const solanaKeyPair = config.solanaKeyPair;

    if (solanaKeyPair) {
      const keypairData = JSON.parse(solanaKeyPair);
      keypair = Keypair.fromSecretKey(Uint8Array.from(keypairData));
    }
  }

  if (!keypair) {
    throw new ServiceError('Solana wallet keypair is missing');
  }

  const rpcUrl = config.rpcUrl;
  const connection = new Connection(rpcUrl, 'confirmed');

  const wallet = new Wallet(keypair);

  return new AnchorProvider(connection, wallet, {
    commitment: 'confirmed',
  });
}
