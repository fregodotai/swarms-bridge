import { IsNumber, IsString } from 'class-validator';

import { IsSolanaPublicKey } from '../../utils/custom-validators';

export default class CreateSubscriptionRequestDto {
  @IsSolanaPublicKey()
  dataProvider: string;

  @IsString()
  recipient: string;

  @IsNumber({})
  durationInDays: number;

  @IsSolanaPublicKey()
  nftTokenAccount: string;
}
