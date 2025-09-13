import { DebtRepository } from '../../domain/contracts/debt.repository';
import { Debt } from '../../domain/entities/debt.entity';
import { DebtStatus } from '../../domain/enums/debt-status';

export class UpdateDebtUseCase {
  constructor(private readonly repo: DebtRepository) {}

  async executeUpdateDebt(
    debtId: number,
    description: string,
    amount: number,
    status: DebtStatus,
  ): Promise<Debt> {
    const existingDebt = await this.repo.findById(debtId);
    if (!existingDebt) {
      throw new Error('Deuda no encontrada');
    }
    if (amount <= 0) {
      throw new Error('El monto debe ser mayor o igual a 0');
    }
    if (existingDebt.status === DebtStatus.PAID) {
      throw new Error('No se puede actualizar una deuda pagada');
    }
    existingDebt.description = description;
    existingDebt.amount = amount;
    existingDebt.status = status;
    existingDebt.updatedAt = new Date();
    return this.repo.update(existingDebt);
  }
}
