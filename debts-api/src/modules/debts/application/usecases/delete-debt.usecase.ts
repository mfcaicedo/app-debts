import { DebtRepository } from '../../domain/contracts/debt.repository';
import { DebtStatus } from '../../domain/enums/debt-status';

export class DeleteDebtUseCase {
  constructor(private readonly repo: DebtRepository) {}

  async executeDeleteDebt(debtId: number): Promise<boolean> {
    const debt = await this.repo.findById(debtId);
    if (!debt) {
      throw new Error('La deuda no existe');
    }
    if (debt.status === DebtStatus.PAID) {
      throw new Error('No se puede eliminar una deuda pagada');
    }
    await this.repo.delete(debtId);
    return true;
  }
}
