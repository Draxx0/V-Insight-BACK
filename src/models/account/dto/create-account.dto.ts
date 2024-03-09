import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  account_username: string;

  @IsString()
  @IsNotEmpty()
  account_tag: string;
}
