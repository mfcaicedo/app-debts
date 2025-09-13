import { Filter } from 'src/shared/domain/common/contracts/filters-dto';

export class GetAllDebtsFilterDto {
  userId: number;
  filter?: Filter;
}
