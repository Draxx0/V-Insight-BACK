import { AccountEntity } from 'src/models/account/entities/account.entity';
import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { UserPreferencesEntity } from 'src/models/user-preferences/entities/user-preferences.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: false, type: 'boolean' })
  is_email_confirmed: boolean;

  @OneToMany(() => AccountEntity, (account) => account.user)
  accounts: AccountEntity[];

  @OneToOne(() => UserPreferencesEntity, (preferences) => preferences.user)
  @JoinColumn()
  preferences: UserPreferencesEntity;
}
