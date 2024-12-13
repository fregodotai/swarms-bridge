#!/usr/bin/env node

import fs from 'fs';
import readline from 'readline';
import bs58 from 'bs58';
import { Keypair } from '@solana/web3.js';

const prompt = (query: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise(resolve =>
    rl.question(query, ans => {
      rl.close();
      resolve(ans);
    }),
  );
};

(async () => {
  console.log('\n=== Export Solana wallet Keypair to .env ===\n');

  try {
    const base58PrivateKey = await prompt(
      'Enter your Solana wallet private key (Base58 format): ',
    );

    if (!base58PrivateKey) {
      throw new Error('No private key provided. Exiting.');
    }

    const secretKey = Uint8Array.from(bs58.decode(base58PrivateKey));

    const keypair = Keypair.fromSecretKey(secretKey);

    const publicKey = keypair.publicKey.toBase58();

    console.log('\nKeypair successfully derived:');
    console.log('Public Key:', publicKey);

    const envContent = `\nSOLANA_KEYPAIR=[${Array.from(secretKey).join(',')}]
`;

    const envFilePath = `${__dirname}../../../.env.local`;
    fs.appendFileSync(envFilePath, envContent, { encoding: 'utf-8' });
    console.log(`Keypair saved to: ${envFilePath}`);

    console.log(
      'Ensure your .env file is added to .gitignore to keep it secure.',
    );
  } catch (error) {
    console.error('\nError:', error);
  }
})();
