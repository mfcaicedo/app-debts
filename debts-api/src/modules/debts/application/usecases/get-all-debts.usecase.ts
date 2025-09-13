import { UserRepository } from 'src/modules/users/domain/contracts/user-repository';
import { DebtRepository } from '../../domain/contracts/debt.repository';
import { Debt } from '../../domain/entities/debt.entity';
import { GetAllDebtsFilterDto } from '../../domain/contracts/dtos/request/get-all-debts-filter-dto';
import { DebtStatus } from '../../domain/enums/debt-status';

export class GetAllDebtsUseCase {
  constructor(
    private readonly repo: DebtRepository,
    private readonly repoUser: UserRepository,
  ) {}

  async executeGetAllDebtsByUserId(
    request: GetAllDebtsFilterDto,
  ): Promise<Debt[]> {
    //Valido que el userId sea un numero positivo y exista
    if (request.userId <= 0) {
      throw new Error('El userId debe ser un numero positivo');
    }
    const user = await this.repoUser.findById(request.userId);
    if (!user) {
      throw new Error('El usuario no existe');
    }

    if (request.filter?.key === 'status') {
      return this.repo.findAllByUserId(
        request.userId,
        request.filter.value as DebtStatus,
      );
    } else {
      return this.repo.findAllByUserId(request.userId);
    }
  }
}
