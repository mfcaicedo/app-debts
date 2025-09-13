import { KeyValueOption } from "../../../shared/utils/models/form-builder.model";
import { DebtStatus } from "../enums/debt-status";

export interface Debt {
    debtId?: number;
    description: string;
    amount: number;
    status: DebtStatus;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface DebtRequest {
    description: string;
    amount: number;
    userId: number;
}

export interface GetAllDebtsFilter {
    userId: number;
    filter?: KeyValueOption
}