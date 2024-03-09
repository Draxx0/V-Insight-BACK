import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { AccountEntity } from './entities/account.entity';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    private readonly userService: UserService,
  ) {}

  async create(id: string, body: CreateAccountDto) {
    const user = await this.userService.findOneById(id);

    const account = this.accountRepository.create({
      ...body,
      user,
    });

    return await this.accountRepository.save(account);
  }

  async update(id: string, body: UpdateAccountDto) {
    const account = await this.accountRepository.findOneBy({ id });

    if (!account) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }

    return await this.accountRepository.save({ ...account, ...body });
  }
}
