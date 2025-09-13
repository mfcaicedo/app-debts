import { DebtRepository } from '../../domain/contracts/debt.repository';
import { Debt } from '../../domain/entities/debt.entity';
import { DebtStatus } from '../../domain/enums/debt-status';

export class UpdateDeptStatusUseCase {
  constructor(private readonly repo: DebtRepository) {}

  async executeUpdateDebtStatus(debtId: number): Promise<Debt> {
    const existingDebt = await this.repo.findById(debtId);
    if (!existingDebt) {
      throw new Error('Deuda no encontrada');
    }
    if (existingDebt.status === DebtStatus.PAID) {
      throw new Error('La deuda ya está pagada');
    }

    existingDebt.status = DebtStatus.PAID;
    existingDebt.updatedAt = new Date();
    return this.repo.update(existingDebt);
  }
}
