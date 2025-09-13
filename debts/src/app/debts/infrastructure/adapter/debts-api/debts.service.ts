import { Injectable } from '@angular/core';
import { DebtGateway } from '../../../domain/models/gateway/debt-gateway';
import { Observable } from 'rxjs';
import { GenericResponse } from '../../../../shared/utils/models/request-response.model';
import { DebtRequest, GetAllDebtsFilter } from '../../../domain/models/debt.model';
import { HttpClient } from '@angular/common/http';
import ENVIRONMENTS from '../../../../../environments/config';

@Injectable({
  providedIn: 'root'
})
export class DebtsService extends DebtGateway{

  constructor(
    private readonly http: HttpClient
  ) {
    super();
  }

  override createDebt(debtRequest: DebtRequest): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${ENVIRONMENTS.CREATE_DEBT}`, debtRequest);
  }
  override getAllDebtsByUserId(request: GetAllDebtsFilter): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${ENVIRONMENTS.GET_ALL_DEBTS_BY_USER_ID}`, request);
  }
  override getDebtById(debtId: number): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(`${ENVIRONMENTS.GET_DEBT_BY_ID}/${debtId}`);
  }
}
