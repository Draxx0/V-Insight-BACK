import { UserEntity } from 'src/models/user/entities/user.entity';

export interface TokenObject {
  access_token: string;
  user: UserEntity;
}
