import { DebtRepository } from '../../domain/contracts/debt.repository';
import { Debt } from '../../domain/entities/debt.entity';
import { DebtStatus } from '../../domain/enums/debt-status';

export class CreateDebtUseCase {
  constructor(private readonly repo: DebtRepository) {}

  async executeCreateDebt(
    description: string,
    amount: number,
    userId: number,
  ): Promise<Debt> {
    if (amount <= 0) {
      throw new Error('El monto debe ser mayor o igual a 0');
    }
    const debt = new Debt(description, amount, DebtStatus.PENDING, userId);
    return this.repo.save(debt);
  }
}
