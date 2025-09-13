import { UserRepository } from 'src/modules/users/domain/contracts/user-repository';
import { DebtRepository } from '../../domain/contracts/debt.repository';
import { Debt } from '../../domain/entities/debt.entity';
import { Format } from '../../domain/enums/debt-status';
import { createObjectCsvStringifier } from 'csv-writer';

export class ExportDebtsUseCase {
  constructor(
    private readonly repo: DebtRepository,
    private readonly repoUser: UserRepository,
  ) {}

  async executeExportDebts(
    userId: number,
    format: Format = Format.JSON,
  ): Promise<{ data: any; contentType: string; filename: string }> {
    if (userId <= 0)
      throw new TypeError('El userId debe ser un número positivo');
    const user = await this.repoUser.findById(userId);
    if (!user) throw new ReferenceError('El usuario no existe');

    const debts: Debt[] = await this.repo.findAllByUserId(userId);

    if (format === Format.CSV) {
      const csvStringifier = createObjectCsvStringifier({
        header: [
          { id: 'debtId', title: 'Debt ID' },
          { id: 'description', title: 'Description' },
          { id: 'amount', title: 'Amount' },
          { id: 'status', title: 'Status' },
          { id: 'userId', title: 'User ID' },
          { id: 'createdAt', title: 'Created At' },
          { id: 'updatedAt', title: 'Updated At' },
        ],
      });

      const csv =
        csvStringifier.getHeaderString() +
        csvStringifier.stringifyRecords(
          debts.map((d) => ({
            debtId: d.debtId,
            description: d.description,
            amount: d.amount,
            status: d.status,
            userId: d.userId,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt,
          })),
        );

      return {
        data: csv,
        contentType: 'text/csv',
        filename: `debts.csv`,
      };
    }

    // Default JSON
    return {
      data: debts,
      contentType: 'application/json',
      filename: `debts.json`,
    };
  }
}
