import { Keypair } from '@solana/web3.js';

export async function generateWallet() {
  const keypair = Keypair.generate();

  const publicKey = keypair.publicKey.toString();

  const secretKey = keypair.secretKey.toString();

  return { publicKey, privateKey: secretKey };
}
