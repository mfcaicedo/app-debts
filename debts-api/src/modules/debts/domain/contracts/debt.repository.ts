import { Debt } from '../entities/debt.entity';
import { DebtStatus } from '../enums/debt-status';

export abstract class DebtRepository {
  abstract save(debt: Debt): Promise<Debt>;
  abstract findById(debtId: number): Promise<Debt | null>;
  abstract findAllByUserId(
    userId: number,
    status?: DebtStatus,
  ): Promise<Debt[]>;
  abstract findByDebtIdAndUserId(
    debtId: number,
    userId: number,
  ): Promise<Debt | null>;
  abstract update(debt: Debt): Promise<Debt>;
  abstract delete(debtId: number): Promise<void>;
}
