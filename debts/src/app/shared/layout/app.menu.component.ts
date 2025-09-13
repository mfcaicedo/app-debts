import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AppMenuitemComponent } from './app.menuitem.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserRole } from '../../auth/interfaces/models/user.model';
import { RoleNames } from '../../auth/enums/roles.enum';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    imports: [AppMenuitemComponent, CommonModule, RouterModule]
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    roles: Partial<UserRole>[] = [];

    constructor(
        public layoutService: LayoutService,
        private readonly authService: AuthService
    ) { }

    ngOnInit() {
        this.buildMenu();
    }

    private buildMenu() {
        this.model = [
            {
                label: 'Gestión de deudas',
                items: [
                    { label: 'Deudas', icon: 'pi pi-fw pi-home', routerLink: ['/deudas'] }
                ]
            },
        ];
    }

}
