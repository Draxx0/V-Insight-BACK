import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      relations: ['preferences', 'accounts'],
    });
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.preferences', 'preferences')
      .leftJoinAndSelect('user.accounts', 'accounts')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      return null;
    }
    return user;
  }

  async findOneById(id: string): Promise<UserEntity | null> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.preferences', 'preferences')
      .leftJoinAndSelect('user.accounts', 'accounts')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }
}
