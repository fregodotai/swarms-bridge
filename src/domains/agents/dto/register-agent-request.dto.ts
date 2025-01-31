import { IsNumber, IsString, IsBoolean, IsArray } from 'class-validator';

export default class RegisterAgentRequestDto {
  @IsNumber()
  id: number;

  @IsString()
  description: string;

  @IsString()
  name: string;

  @IsBoolean()
  restrict_subscriptions: boolean;

  @IsArray()
  @IsString({ each: true })
  capabilities: string[];

  @IsNumber()
  fee: number;
}
