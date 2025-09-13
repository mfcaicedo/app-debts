import { inject, Injectable } from "@angular/core";
import { DebtGateway } from "../models/gateway/debt-gateway";
import { DebtRequest, GetAllDebtsFilter } from "../models/debt.model";

@Injectable({
    providedIn: 'root'
})
export class GetAllDebtsUseCase {

    private readonly debtGateway = inject(DebtGateway);

    getAllDebtsByUser(request: GetAllDebtsFilter) {
        return this.debtGateway.getAllDebtsByUserId(request);
    }

}