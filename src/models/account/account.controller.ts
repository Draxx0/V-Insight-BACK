import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { JwtAuthGuard } from 'src/authentication/guards/jwt.guard';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';

@Controller('accounts')
@UseGuards(JwtAuthGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('/user/:id')
  async findAllFromUser(@Param('id') id: string) {
    return await this.accountService.findAllFromUser(id);
  }

  @Post('/user/:id')
  async create(@Param('id') id: string, @Body() body: CreateAccountDto) {
    await this.accountService.checkIfValorantAccountAlreadyExistOnUser(
      id,
      body.account_username,
      body.account_tag,
    );

    const valorantAccount =
      await this.accountService.checkIfValorantAccountExist(
        body.account_username,
        body.account_tag,
      );

    return await this.accountService.create(id, body, valorantAccount);
  }

  @Delete('/user/:id')
  async deleteFromUser(
    @Param('id') id: string,
    @Body() { account_id }: DeleteAccountDto,
  ) {
    return await this.accountService.deleteFromUser(id, account_id);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateAccountDto) {
    return await this.accountService.update(id, body);
  }
}
