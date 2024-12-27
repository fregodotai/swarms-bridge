import { IdlAccounts } from '@coral-xyz/anchor';
import { PublicKey, TransactionSignature } from '@solana/web3.js';
import { SubscriptionManager } from 'fxn-protocol-sdk';

export interface SubscriptionAccount {
  endTime: number;
  recipient: string;
}

export interface SubscriberDetails {
  subscriber: PublicKey;
  subscriptionPDA: PublicKey;
  subscription: SubscriptionAccount;
  status: SubscriptionStatus['status'];
}

export interface ProgramAddressResponse {
  statePDA: PublicKey;
  qualityPDA: PublicKey;
  subscriptionPDA: PublicKey;
  subscribersListPDA: PublicKey;
  dataProviderFeePDA: PublicKey;
}

export interface SubscriptionStatus {
  status: 'active' | 'expired' | 'expiring_soon';
  subscription: SubscriptionAccount;
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
  subscriptions: SubscriberDetails[];
}>;

export type GetAllSubscriptionsResponse = Promise<{
  subscriptions: SubscriptionStatus[];
}>;

export type GetSubscriptionStateResponse = Promise<{
  endTime: number;
  recipient: string;
}>;

export type GetQualityInfoResponse = Promise<
  IdlAccounts<SubscriptionManager>['qualityInfo']
>;
