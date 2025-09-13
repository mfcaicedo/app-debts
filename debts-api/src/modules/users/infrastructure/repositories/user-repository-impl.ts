import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { UserOrmEntity } from '../user.orm-entity';
import { UserRepository } from '../../domain/contracts/user-repository';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repo: Repository<UserOrmEntity>,
  ) {}

  async save(user: User): Promise<User> {
    const orm = this.repo.create({
      email: user.email,
      passwordHash: user.passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const saved = await this.repo.save(orm);
    return new User(
      saved.email,
      saved.passwordHash,
      saved.createdAt,
      saved.updatedAt,
      saved.userId,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = await this.repo.findOne({ where: { email } });
    return found
      ? new User(
          found.email,
          found.passwordHash,
          found.createdAt,
          found.updatedAt,
          found.userId,
        )
      : null;
  }

  async findById(userId: number): Promise<boolean | null> {
    const found = await this.repo.findOne({ where: { userId } });
    return found ? true : null;
  }
}
