import { IsNumber, IsOptional } from 'class-validator';

import { IsSolanaPublicKey } from '../../../utils/custom-validators';

export default class CancelSubscriptionRequestDto {
  @IsSolanaPublicKey()
  dataProvider: string;

  @IsNumber()
  qualityScore: number;

  @IsOptional()
  @IsSolanaPublicKey()
  nftTokenAccount?: string;
}
