import { Routes } from '@angular/router';
import { AppLayoutComponent } from './shared/layout/app.layout.component';
import { WelcomeComponent } from './shared/components/welcome/welcome.component';
import { accountGuard, authGuard } from './auth/guards';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { RoleNames } from './auth/enums/roles.enum';
import { AccessDeniedComponent } from './auth/pages/access-denied/access-denied.component';

export const routes: Routes = [
    {
        path: 'login',
        canActivate: [accountGuard],
        loadComponent: () => import('./auth/login/pages/login.component').then(m => m.LoginComponent),
    },
    {
        path: '',
        component: AppLayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: WelcomeComponent
            },
            {
                path: 'usuarios',
                loadChildren: () => import('./user-management/user-management.routes').then(m => m.routes)
            },
            {
                path: 'deudas',
                loadChildren: () => import('./debts/debts.routes').then(m => m.routes)
            },
        ]
    },
    {
        path: 'acceso-denegado',
        canActivate: [authGuard],
        component: AccessDeniedComponent,
    },
    {
        path: '**',
        redirectTo: '/acceso-denegado'
    }
];
