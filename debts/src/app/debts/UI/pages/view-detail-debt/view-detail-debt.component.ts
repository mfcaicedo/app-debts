import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import {TextareaModule} from 'primeng/textarea';
import { ProgressBarModule } from 'primeng/progressbar';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { KeyValueOption } from '../../../../shared/utils/models/form-builder.model';
import { AuthService } from '../../../../auth/auth.service';
import { UserManagementUseCase } from '../../../../user-management/domain/usecase/user-management-usecase';
import { RadioButtonModule } from 'primeng/radiobutton';
import { filter, firstValueFrom } from 'rxjs';
import { DebtStatus } from '../../../domain/enums/debt-status';
import { CreateDebtUseCase } from '../../../domain/usecase/create-debt-usecase';
import { DebtRequest } from '../../../domain/models/debt.model';
import { GetDebtUseCase } from '../../../domain/usecase/get-debt-usecase';
@Component({
  selector: 'app-view-detail-debt',
  imports: [CommonModule, ButtonModule, ProgressBarModule, SelectModule, FormsModule, InputTextModule,
    ReactiveFormsModule, InputNumberModule, RouterModule, ToastModule, ConfirmDialogModule, RadioButtonModule,
    TextareaModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './view-detail-debt.component.html',
  styleUrl: './view-detail-debt.component.css'
})
export class ViewDetailDebtComponent implements OnInit {

  createDebtForm!: FormGroup;

  debtStatusDataList: KeyValueOption[] = [
    { key: 'PAGADA', value: DebtStatus.PAID },
    { key: 'PENDIENTE', value: DebtStatus.PENDING },
  ];

  userId = 0;
  email = '';
  debtId = 0;

  private readonly router = inject(Router);
  private readonly activeRouter = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);
  private readonly authService = inject(AuthService);
  private readonly userManagementUseCase = inject(UserManagementUseCase);
  private readonly getDebtUseCase = inject(GetDebtUseCase);

  async ngOnInit() {

    this.activeRouter.params.subscribe(async params => {
      this.debtId = params['id'] ?? 0;
    });

    this.authService.getUserDataSession().subscribe((data) => {
      this.email = data.email || '';
    });

    this.userManagementUseCase.getUserByEmail(this.email).subscribe({
      next: (user: any) => {
        if (user) {
          this.userId = user.userId;
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

    this.buildFormDebt();

    await this.getDebtById();

  }

  buildFormDebt() {
    this.createDebtForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
      amount: [null, [Validators.required, Validators.min(0.01)]],
    });
  }

  async getDebtById() {
    return new Promise<void>((resolve, reject) => {
      this.getDebtUseCase.getDebtById(this.debtId).subscribe({
        next: (response: any) => {
          this.createDebtForm.patchValue({
            description: response.description,
            amount: response.amount
          })
          this.createDebtForm.disable();
          resolve();
        },
        error: (error) => {
          console.error("error", error);
          reject();
        }
      });
    });
  }

  onSubmit() {
    this.createDebtForm.markAllAsTouched();
    if (this.createDebtForm.invalid) {
      return;
    }
  }

}
