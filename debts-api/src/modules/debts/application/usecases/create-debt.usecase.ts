import { DebtRepository } from '../../domain/contracts/debt.repository';
import { Debt } from '../../domain/entities/debt.entity';
import { DebtStatus } from '../../domain/enums/debt-status';
import { CachedDebtService } from '../../infrastructure/services/cached-debts.service';

export class CreateDebtUseCase {
  constructor(
    private readonly repo: DebtRepository,
    private readonly cacheService: CachedDebtService,
  ) {}

  async executeCreateDebt(
    description: string,
    amount: number,
    userId: number,
  ): Promise<Debt> {
    if (amount <= 0) {
      throw new Error('El monto debe ser mayor o igual a 0');
    }
    const debt = new Debt(description, amount, DebtStatus.PENDING, userId);
    const response = this.repo.save(debt);
    //Invalidar cache
    await this.cacheService.invalidateCacheByUser(debt.userId);
    return response;
  }
}
