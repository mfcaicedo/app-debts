import { Routes } from "@angular/router";
import { ListDebtsComponent } from "./UI/pages/list-debts/list-debts.component";
import { CreateDebtComponent } from "./UI/pages/create-debt/create-debt.component";
import { ViewDetailDebtComponent } from "./UI/pages/view-detail-debt/view-detail-debt.component";

export const routes: Routes = [
    {
        path: '',
        component: ListDebtsComponent
    },
    {
        path: 'crear-deuda',
        component: CreateDebtComponent
    },
    {
        path: 'ver-detalle-deuda/:id',
        component: ViewDetailDebtComponent
    }
];