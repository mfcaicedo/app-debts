import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserOrmEntity {
  @PrimaryGeneratedColumn()
  userId: number;
  @Column({ unique: true })
  email: string;
  @Column()
  passwordHash: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
