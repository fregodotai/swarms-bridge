import { IsNumber, IsString } from 'class-validator';

import { IsSolanaPublicKey } from '../../../utils/custom-validators';

export default class RenewSubscriptionRequestDto {
  @IsSolanaPublicKey()
  dataProvider: string;

  @IsString()
  newRecipient: string;

  @IsNumber()
  newEndTime: number;

  @IsNumber()
  qualityScore: number;

  @IsSolanaPublicKey()
  nftTokenAccount: string;
}
