import { DebtRepository } from '../../domain/contracts/debt.repository';
import { DebtStatus } from '../../domain/enums/debt-status';
import { CachedDebtService } from '../../infrastructure/services/cached-debts.service';

export class DeleteDebtUseCase {
  constructor(
    private readonly repo: DebtRepository,
    private readonly cacheService: CachedDebtService,
  ) {}

  async executeDeleteDebt(debtId: number): Promise<boolean> {
    const debt = await this.repo.findById(debtId);
    if (!debt) {
      throw new Error('La deuda no existe');
    }
    if (debt.status === DebtStatus.PAID) {
      throw new Error('No se puede eliminar una deuda pagada');
    }
    await this.repo.delete(debtId);
    await this.cacheService.invalidateCacheByUser(debt.userId);
    return true;
  }
}
