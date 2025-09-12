import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './infrastructure/user.orm-entity';
import { UserController } from './infrastructure/controllers/user.controller';
import { UserRepositoryImpl } from './infrastructure/repositories/user-repository-impl';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [UserController],
  providers: [UserRepositoryImpl],
  exports: [UserRepositoryImpl],
})
export class UsersModule {}
