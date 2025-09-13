import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../../auth/auth.service';
import { KeyValueOption } from '../../../../shared/utils/models/form-builder.model';
import { Application } from '../../../../shared/utils/models/applications-common.model';
import { RoleNames } from '../../../../auth/enums/roles.enum';
import { ApplicationStatuses } from '../../../../shared/utils/enums/review-applications.enum';
import { MessageModule } from 'primeng/message';
import { GetAllDebtsUseCase } from '../../../domain/usecase/get-all-debts-usecase';
import { Debt, GetAllDebtsFilter } from '../../../domain/models/debt.model';
import { UserManagementUseCase } from '../../../../user-management/domain/usecase/user-management-usecase';
import { GenericResponse } from '../../../../shared/utils/models/request-response.model';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { DebtStatus } from '../../../domain/enums/debt-status';
import { CreateDebtUseCase } from '../../../domain/usecase/create-debt-usecase';
import { GetDebtUseCase } from '../../../domain/usecase/get-debt-usecase';

@Component({
  selector: 'app-list-debts',
  imports: [
    CommonModule,
    ButtonModule,
    RouterModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    TableModule,
    MessageModule,
    SelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './list-debts.component.html',
  styleUrl: './list-debts.component.css',
})
export class ListDebtsComponent {
  @ViewChild('dt1') dt1!: Table;

  first = 0;
  rows = 5;

  userId = 0;
  email = '';
  requestFilter: GetAllDebtsFilter = {} as GetAllDebtsFilter;

  debts: Debt[] = [];

  debtStatusDataList: KeyValueOption[] = [
    { key: 'PAGADA', value: DebtStatus.PAID },
    { key: 'PENDIENTE', value: DebtStatus.PENDING },
  ];

  filterForm!: FormGroup;

  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);
  private readonly authService = inject(AuthService);
  private readonly getAllDebtsUseCase = inject(GetAllDebtsUseCase);
  private readonly createDebtUseCase = inject(CreateDebtUseCase);
  private readonly getDebtUseCase = inject(GetDebtUseCase);
  private readonly userManagementUseCase = inject(UserManagementUseCase);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  constructor() {
    this.filterForm = this.formBuilder.group({});
  }

  async ngOnInit() {
    this.authService.getUserDataSession().subscribe((data) => {
      this.email = data.email || '';
    });

    this.filterForm = this.formBuilder.group({
      status: [null],
    });

    this.userManagementUseCase.getUserByEmail(this.email).subscribe({
      next: (user: any) => {
        if (user) {
          this.userId = user.userId;
          this.requestFilter.userId = this.userId;
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error al obtener el usuario',
        });
      },
    });
    await this.getAllDebtsByUserId();
  }

  async getAllDebtsByUserId() {
    return new Promise<void>((resolve, reject) => {
      this.getAllDebtsUseCase.getAllDebtsByUser(this.requestFilter).subscribe({
        next: (response: any) => {
          if (response) {
            this.debts = response;
          }
          resolve();
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ocurrió un error al obtener las solicitudes',
          });
          resolve();
        },
      });
    });
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  pageChange(event: { first: number; rows: number }) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.debts ? this.first + this.rows >= this.debts.length : true;
  }

  isFirstPage(): boolean {
    return this.debts ? this.first === 0 : true;
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement | null;
    if (target) {
      this.dt1.filterGlobal(target.value, 'contains');
    }
  }

  createDebt() {
    this.router.navigate(['./crear-deuda'],  { relativeTo: this.activatedRoute });
  }

  viewDebt(debtId: number) {
    this.router.navigate(['./ver-detalle-deuda', debtId], { relativeTo: this.activatedRoute });
  }

  deleteDebt(debtId: number) {
    this.confirmationService.confirm({
      target: 'body' as unknown as EventTarget,
      message: '¿Está seguro(a) de eliminar la deuda?',
      header: 'Confirmación',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Aceptar',
      },
      accept: async () => {
        //Llamar al servicio para eliminar la deuda
      },
    });
  }

  async onSubmit() {
    const debtStatus = this.filterForm.get('status')?.value;

    if (debtStatus) {
      this.requestFilter.filter = { key: 'status', value: debtStatus };
      await this.getAllDebtsByUserId();
    }
  }

  async cleanFilters() {
    this.filterForm.reset();
    this.requestFilter.filter = undefined;
    await this.getAllDebtsByUserId();
    //reseteo de los filtros
    this.dt1.filters = {};
    this.dt1.clear();
  }
}
