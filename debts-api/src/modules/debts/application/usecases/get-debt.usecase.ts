import { DebtRepository } from '../../domain/contracts/debt.repository';
import { Debt } from '../../domain/entities/debt.entity';

export class GetDebtUseCase {
  constructor(private readonly repo: DebtRepository) {}

  async executeGetDebtById(debtId: number): Promise<Debt | null> {
    return this.repo.findById(debtId);
  }
}
