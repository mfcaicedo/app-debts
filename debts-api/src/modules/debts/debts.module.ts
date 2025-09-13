import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtOrmEntity } from './infrastructure/debt.orm-entity';
import { DebtController } from './infrastructure/controllers/debt.controller';
import { DebtRepositoryImpl } from './infrastructure/respositories/debt-respository-impl';
import { UsersModule } from '../users/users.module';
import { CachedDebtService } from './infrastructure/services/cached-debts.service';

@Module({
  imports: [TypeOrmModule.forFeature([DebtOrmEntity]), UsersModule],
  controllers: [DebtController],
  providers: [DebtRepositoryImpl, CachedDebtService],
  exports: [DebtRepositoryImpl, CachedDebtService],
})
export class DebtsModule {}
