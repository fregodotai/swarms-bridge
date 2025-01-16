import { IsNumber } from 'class-validator';

export default class DataProviderFeeRequestDto {
  @IsNumber()
  fee: number;
}
