import { inject, Injectable } from "@angular/core";
import { DebtGateway } from "../models/gateway/debt-gateway";
import { DebtRequest } from "../models/debt.model";

@Injectable({
    providedIn: 'root'
})
export class CreateDebtUseCase {

    private readonly debtGateway = inject(DebtGateway);

    createDebt(debt: DebtRequest) {
        return this.debtGateway.createDebt(debt);
    }

}