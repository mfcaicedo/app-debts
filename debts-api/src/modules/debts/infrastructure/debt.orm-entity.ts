import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserOrmEntity } from '../../users/infrastructure/user.orm-entity';

@Entity('debt')
export class DebtOrmEntity {
  @PrimaryGeneratedColumn()
  debtId: number;
  @Column()
  description: string;
  @Column('decimal')
  amount: number;
  @Column({ default: 'pending' })
  status: string;
  @Column()
  userId: number;
  @ManyToOne(() => UserOrmEntity)
  @JoinColumn({ name: 'userId' })
  user: UserOrmEntity;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
