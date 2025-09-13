import { Observable } from "rxjs";
import { DebtRequest, GetAllDebtsFilter } from "../debt.model";
import { GenericResponse } from "../../../../shared/utils/models/request-response.model";

export abstract class DebtGateway {
    abstract createDebt(debtRequest: DebtRequest): Observable<GenericResponse>;
    abstract getAllDebtsByUserId(request: GetAllDebtsFilter): Observable<GenericResponse>;
    abstract getDebtById(debtId: number): Observable<GenericResponse>;
}