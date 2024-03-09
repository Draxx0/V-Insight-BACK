import { IsOptional, IsString } from 'class-validator';
import { CreateAccountDto } from './create-account.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
  @IsOptional()
  @IsString()
  account_banner?: string;
}
