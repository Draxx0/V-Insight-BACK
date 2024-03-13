import { TimestampEntity } from 'src/models/common/entities/timestamp.entity';
import { UserEntity } from 'src/models/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account')
export class AccountEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  account_username: string;

  @Column()
  account_region: string;

  @Column({ type: 'int' })
  account_level: number;

  @Column({ unique: true })
  account_tag: string;

  @Column({ nullable: true, default: null })
  account_card_small: string;

  @Column({ nullable: true, default: null })
  account_card_large: string;

  @Column({ nullable: true, default: null })
  account_card_wide: string;

  @ManyToOne(() => UserEntity, (user) => user.accounts)
  user: UserEntity;
}
