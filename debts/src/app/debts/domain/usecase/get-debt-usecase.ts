import { inject, Injectable } from "@angular/core";
import { DebtGateway } from "../models/gateway/debt-gateway";

@Injectable({
    providedIn: 'root'
})
export class GetDebtUseCase {

    private readonly debtGateway = inject(DebtGateway);

    getDebtById(debtId: number) {
        return this.debtGateway.getDebtById(debtId);
    }

}