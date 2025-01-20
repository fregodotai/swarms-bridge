import { IsSolanaPublicKey } from '../../../utils/custom-validators';

export default class SubscriptionListRequestDto {
  @IsSolanaPublicKey()
  subscriber: string;

  @IsSolanaPublicKey()
  dataProvider: string;

  @IsSolanaPublicKey()
  mySubscriptionsPDA: string;

  @IsSolanaPublicKey()
  subscribersListPDA: string;
}
