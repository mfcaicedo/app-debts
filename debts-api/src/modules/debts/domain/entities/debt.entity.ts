import { DebtStatus } from '../../../debts/domain/enums/debt-status';

export class Debt {
  constructor(
    public description: string,
    public amount: number,
    public status: DebtStatus,
    public readonly userId: number,
    public debtId?: number,
    public readonly createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}
