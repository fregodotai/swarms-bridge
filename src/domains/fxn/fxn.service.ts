import { AnchorProvider, BN } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import { SolanaAdapter } from 'fxn-protocol-sdk';
import {
  CancelParams,
  CreateSubscriptionParams,
  RenewParams,
  SetDataProviderFeeParams,
  SubscriptionStatus,
} from 'fxn-protocol-sdk/dist/client/fxn-solana-adapter';

import {
  GetAllSubscriptionsResponse,
  GetProviderTokenAccountResponse,
  GetQualityInfoResponse,
  GetSubscriberDetailsResponse,
  GetSubscriptionStateResponse,
  GetSubscriptionStatusResponse,
  ProgramAddressResponse,
  SubscriberDetails,
  TransactionSignatureResponse,
} from './fxn.types';
import { ServiceError } from '../../utils/error-handlers';

export default class FxnService {
  private adapter: SolanaAdapter;

  constructor(anchorProvider: AnchorProvider) {
    this.adapter = new SolanaAdapter(anchorProvider);
  }

  public async setDataProviderFee(
    params: SetDataProviderFeeParams,
  ): TransactionSignatureResponse {
    try {
      const transactionSignature =
        await this.adapter.setDataProviderFee(params);
      return { transactionSignature };
    } catch (error) {
      throw new ServiceError(error, [
        {
          message: 'Failed to set data provider fee',
          reason: 'Unexpected error in fxn-protocol-sdk',
        },
      ]);
    }
  }

  public async createSubscription(
    params: CreateSubscriptionParams,
  ): TransactionSignatureResponse {
    try {
      const transactionSignature =
        await this.adapter.createSubscription(params);
      return { transactionSignature };
    } catch (error) {
      throw new ServiceError(error, [
        {
          message: 'Failed to create subscription',
          reason: 'Unexpected error in fxn-protocol-sdk',
        },
      ]);
    }
  }

  public getSubscriptionStatus(endTime: BN): GetSubscriptionStatusResponse {
    try {
      return {
        status: this.adapter.getSubscriptionStatus(
          endTime,
        ) as SubscriptionStatus['status'],
      };
    } catch (error) {
      throw new ServiceError(error, [
        {
          message: 'Failed to get subscription status',
          reason: 'Unexpected error in fxn-protocol-sdk',
        },
      ]);
    }
  }

  public async getProviderTokenAccount(
    providerAddress: PublicKey,
  ): GetProviderTokenAccountResponse {
    try {
      const tokenAccount =
        await this.adapter.getProviderTokenAccount(providerAddress);
      return { tokenAccount: tokenAccount.toBase58() };
    } catch (error) {
      throw new ServiceError(error, [
        {
          message: 'Failed to get provider token account',
          reason: 'Unexpected error in fxn-protocol-sdk',
        },
      ]);
    }
  }

  public async getSubscriptionsForProvider(
    providerPublicKey: PublicKey,
  ): GetSubscriberDetailsResponse {
    try {
      const subscriberDetails =
        await this.adapter.getSubscriptionsForProvider(providerPublicKey);
      return {
        subscriptions: subscriberDetails as unknown as SubscriberDetails[],
      };
    } catch (error) {
      throw new ServiceError(error, [
        {
          message: 'Failed to get subscriptions for provider',
          reason: 'Unexpected error in fxn-protocol-sdk',
        },
      ]);
    }
  }

  public async getAllSubscriptionsForUser(
    userPublicKey: PublicKey,
  ): GetAllSubscriptionsResponse {
    try {
      const subscriptions =
        await this.adapter.getAllSubscriptionsForUser(userPublicKey);

      return { subscriptions };
    } catch (error) {
      throw new ServiceError(error, [
        {
          message: 'Failed to get subscriptions for user',
          reason: 'Unexpected error in fxn-protocol-sdk',
        },
      ]);
    }
  }

  public async renewSubscription(
    params: RenewParams,
  ): TransactionSignatureResponse {
    try {
      const transactionSignature = await this.adapter.renewSubscription(params);
      return { transactionSignature };
    } catch (error) {
      throw new ServiceError(error, [
        {
          message: 'Failed to renew subscription',
          reason: 'Unexpected error in fxn-protocol-sdk',
        },
      ]);
    }
  }

  public async cancelSubscription(
    params: CancelParams,
  ): TransactionSignatureResponse {
    try {
      const transactionSignature =
        await this.adapter.cancelSubscription(params);
      return { transactionSignature };
    } catch (error) {
      throw new ServiceError(error, [
        {
          message: 'Failed to cancel subscription',
          reason: 'Unexpected error in fxn-protocol-sdk',
        },
      ]);
    }
  }

  public async getSubscriptionState(
    subscriptionPDA: PublicKey,
  ): GetSubscriptionStateResponse {
    try {
      return this.adapter.getSubscriptionState(subscriptionPDA);
    } catch (error) {
      throw new ServiceError(error, [
        {
          message: 'Failed to get subscription state',
          reason: 'Unexpected error in fxn-protocol-sdk',
        },
      ]);
    }
  }

  public async getQualityInfo(dataProvider: PublicKey): GetQualityInfoResponse {
    try {
      return await this.adapter.getQualityInfo(dataProvider);
    } catch (error) {
      throw new ServiceError(error, [
        {
          message: 'Failed to get quality info',
          reason: 'Unexpected error in fxn-protocol-sdk',
        },
      ]);
    }
  }

  public getProgramAddresses(
    dataProvider: PublicKey,
    subscriber: PublicKey,
  ): ProgramAddressResponse {
    try {
      return this.adapter.getProgramAddresses(dataProvider, subscriber);
    } catch (error) {
      throw new ServiceError(error, [
        {
          message: 'Failed to get program addresses',
          reason: 'Unexpected error in fxn-protocol-sdk',
        },
      ]);
    }
  }
}
