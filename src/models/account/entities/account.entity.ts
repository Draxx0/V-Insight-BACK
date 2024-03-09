import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { UserEntity } from 'src/models/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account')
export class AccountEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  account_username: string;

  @Column({ unique: true })
  account_tag: string;

  @Column({ nullable: true, default: null })
  account_banner: string;

  @ManyToOne(() => UserEntity, (user) => user.accounts)
  user: UserEntity;
}
