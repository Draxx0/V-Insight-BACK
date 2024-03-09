import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { JwtAuthGuard } from 'src/authentication/guards/jwt.guard';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('accounts')
@UseGuards(JwtAuthGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/user/:id')
  async create(@Param('id') id: string, @Body() body: CreateAccountDto) {
    return await this.accountService.create(id, body);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateAccountDto) {
    return await this.accountService.update(id, body);
  }
}
