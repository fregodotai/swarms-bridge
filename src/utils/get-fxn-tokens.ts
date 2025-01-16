import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAssociatedTokenAddress,
  getMint,
} from '@solana/spl-token';
import { PublicKey, Transaction } from '@solana/web3.js';

import createAnchorProvider from './create-anchor-provider';
import { ServiceError } from './error-handlers';
import config from '../config/config';

export const getFxnTokens = async (
  amount: number,
  recipientPublicKey: string,
) => {
  try {
    const fxnTokenCA = config.fxnTokenCa;
    if (!fxnTokenCA) {
      throw new ServiceError('FXN token CA not configured');
    }

    const anchorProvider = createAnchorProvider();

    const rewardTokenPubKey = new PublicKey(fxnTokenCA);
    const recipientPubKey = new PublicKey(recipientPublicKey);

    const mintInfo = await getMint(
      anchorProvider.connection,
      rewardTokenPubKey,
    );

    const adjustedAmount = amount * Math.pow(10, mintInfo.decimals);

    const fromTokenAccount = await getAssociatedTokenAddress(
      rewardTokenPubKey,
      anchorProvider.wallet.publicKey,
    );

    const toTokenAccount = await getAssociatedTokenAddress(
      rewardTokenPubKey,
      recipientPubKey,
    );

    const transaction = new Transaction();

    const recipientAccountInfo =
      await anchorProvider.connection.getAccountInfo(toTokenAccount);

    if (!recipientAccountInfo) {
      transaction.add(
        createAssociatedTokenAccountInstruction(
          anchorProvider.wallet.publicKey,
          toTokenAccount,
          recipientPubKey,
          rewardTokenPubKey,
        ),
      );
    }

    transaction.add(
      createTransferInstruction(
        fromTokenAccount,
        toTokenAccount,
        anchorProvider.wallet.publicKey,
        adjustedAmount,
      ),
    );

    const signature = await anchorProvider.sendAndConfirm(transaction, [], {
      maxRetries: 3,
      skipPreflight: true,
      commitment: 'confirmed',
    });

    return {
      signature,
      status: 'success',
      message: `Successfully transferred ${amount} tokens to ${recipientPublicKey}`,
    };
  } catch (error) {
    console.error('Token transfer failed:', error);
    return {
      signature: '',
      status: 'error',
      message: (error as Error).message,
    };
  }
};
