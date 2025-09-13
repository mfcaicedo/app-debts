import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtOrmEntity } from './infrastructure/debt.orm-entity';
import { DebtController } from './infrastructure/controllers/debt.controller';
import { DebtRepositoryImpl } from './infrastructure/respositories/debt-respository-impl';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([DebtOrmEntity]), UsersModule],
  controllers: [DebtController],
  providers: [DebtRepositoryImpl],
  exports: [DebtRepositoryImpl],
})
export class DebtsModule {}
