import { DebtStatus } from '../../../enums/debt-status';

export class UpdateDebtDto {
  debtId: number;
  description: string;
  amount: number;
  status: DebtStatus;
}
