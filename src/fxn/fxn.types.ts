import { IdlAccounts } from '@coral-xyz/anchor';
import { PublicKey, TransactionSignature } from '@solana/web3.js';
import { SubscriptionManager } from 'fxn-protocol-sdk';
import { SubscriptionStatus } from 'fxn-protocol-sdk/dist/client/fxn-solana-adapter';

export interface SubscriberDetails {
  subscriber: PublicKey;
  subscriptionPDA: PublicKey;
  subscription: {
    endTime: number;
    recipient: string;
  };
  status: SubscriptionStatus['status'];
}

export interface ProgramAddressResponse {
  statePDA: PublicKey;
  qualityPDA: PublicKey;
  subscriptionPDA: PublicKey;
  subscribersListPDA: PublicKey;
  dataProviderFeePDA: PublicKey;
}

export type TransactionSignatureResponse = Promise<{
  transactionSignature: TransactionSignature;
}>;

export type GetSubscriptionStatusResponse = {
  status: SubscriptionStatus['status'];
};

export type GetProviderTokenAccountResponse = Promise<{
  tokenAccount: string;
}>;

export type GetSubscriberDetailsResponse = Promise<{
  subscriberDetails: SubscriberDetails[];
}>;

export type GetAllSubscriptionsResponse = Promise<{
  subscriptions: SubscriberDetails[];
}>;

export type GetSubscriptionStateResponse = Promise<{
  endTime: number;
  recipient: string;
}>;

export type GetQualityInfoResponse = Promise<
  IdlAccounts<SubscriptionManager>['qualityInfo']
>;
