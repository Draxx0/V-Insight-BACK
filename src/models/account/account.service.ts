import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { AccountEntity } from './entities/account.entity';
import { UpdateAccountDto } from './dto/update-account.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import VALORANT_API_URL from 'src/constants/valorant-api.constants';
import {
  ValorantAccount,
  ValorantAccountResponse,
} from 'src/common/types/valorant-api';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    private readonly userService: UserService,
    private readonly httpService: HttpService,
  ) {}

  async create(
    id: string,
    body: CreateAccountDto,
    valorantAccount: ValorantAccount,
  ) {
    const { account_level, region: account_region, card } = valorantAccount;

    const user = await this.userService.findOneById(id);

    const accountCard = {
      ...(valorantAccount.card && {
        account_card_large: card.large,
        account_card_small: card.small,
        account_card_wide: card.wide,
      }),
    };

    const account = this.accountRepository.create({
      ...body,
      ...accountCard,
      account_region,
      account_level,
      user,
    });

    return await this.accountRepository.save(account);
  }

  async findAllFromUser(id: string) {
    return await this.accountRepository
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.user', 'user')
      .where('user.id = :id', { id })
      .getMany();
  }

  async update(id: string, body: UpdateAccountDto) {
    const account = await this.accountRepository.findOneBy({ id });

    if (!account) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }

    return await this.accountRepository.save({ ...account, ...body });
  }

  async deleteFromUser(id: string, account_id: string) {
    const account = await this.accountRepository.findOneBy({
      id: account_id,
      user: { id },
    });

    if (!account) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }

    await this.accountRepository.delete(account.id);
  }

  async checkIfValorantAccountExist(
    account_username: string,
    account_tag: string,
  ): Promise<ValorantAccount> {
    const { data: response }: { data: ValorantAccountResponse } =
      await firstValueFrom(
        this.httpService
          .get(
            `${VALORANT_API_URL.V1}/account/${account_username}/${account_tag}`,
          )
          .pipe(
            catchError((error) => {
              if (error.response.status !== 404) {
                throw new HttpException(
                  'Error while checking if valorant account exist',
                  HttpStatus.INTERNAL_SERVER_ERROR,
                );
              }
              throw new HttpException(
                'Account not found',
                HttpStatus.NOT_FOUND,
              );
            }),
          ),
      );

    return response.data;
  }

  async checkIfValorantAccountAlreadyExistOnUser(
    id: string,
    account_username: string,
    account_tag: string,
  ) {
    const user = await this.userService.findOneById(id);

    const account = await this.accountRepository.findOneBy({
      user: { id: user.id },
      account_username,
      account_tag,
    });

    if (account) {
      throw new HttpException(
        `${account.account_username} #${account.account_tag} valorant account already exist on your user account`,
        HttpStatus.CONFLICT,
      );
    }

    return false;
  }
}
