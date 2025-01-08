import { IsNumber, IsString } from 'class-validator';

export default class RegisterAgentRequestDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}
