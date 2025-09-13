import { UserRepository } from 'src/modules/users/domain/contracts/user-repository';
import { DebtRepository } from '../../domain/contracts/debt.repository';
import { Debt } from '../../domain/entities/debt.entity';
import { GetAllDebtsFilterDto } from '../../domain/contracts/dtos/request/get-all-debts-filter-dto';
import { DebtStatus } from '../../domain/enums/debt-status';
import { CachedDebtService } from '../../infrastructure/services/cached-debts.service';

export class GetAllDebtsUseCase {
  constructor(
    private readonly repo: DebtRepository,
    private readonly repoUser: UserRepository,
    private readonly cacheService: CachedDebtService,
  ) {}

  async executeGetAllDebtsByUserId(
    request: GetAllDebtsFilterDto,
  ): Promise<Debt[]> {
    const keyParts = request.filter?.key
      ? ['user', request.userId, request.filter.key, request.filter.value]
      : ['user', request.userId, 'all'];

    //Valido que el userId sea un numero positivo y exista
    if (request.userId <= 0) {
      throw new Error('El userId debe ser un numero positivo');
    }
    const user = await this.repoUser.findById(request.userId);
    if (!user) {
      throw new Error('El usuario no existe');
    }

    if (request.filter?.key === 'status') {
      //Se consulta el cache si existe, de lo contrtario se consulta a la base de datos
      return this.cacheService.getCached<Debt[]>(keyParts, () =>
        this.repo.findAllByUserId(
          request.userId,
          request.filter?.value as DebtStatus,
        ),
      );
    } else {
      return this.cacheService.getCached<Debt[]>(keyParts, () =>
        this.repo.findAllByUserId(request.userId),
      );
    }
  }
}
