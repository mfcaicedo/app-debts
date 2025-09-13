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

@Component({
  selector: 'app-create-debt',
  imports: [CommonModule, ButtonModule, ProgressBarModule, SelectModule, FormsModule, InputTextModule,
    ReactiveFormsModule, InputNumberModule, RouterModule, ToastModule, ConfirmDialogModule, RadioButtonModule,
    TextareaModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './create-debt.component.html',
  styleUrl: './create-debt.component.css'
})
export class CreateDebtComponent implements OnInit {

  createDebtForm!: FormGroup;

  debtStatusDataList: KeyValueOption[] = [
    { key: 'PAGADA', value: DebtStatus.PAID },
    { key: 'PENDIENTE', value: DebtStatus.PENDING },
  ];

  userId = 0;
  email = '';

  private readonly router = inject(Router);
  private readonly activeRouter = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);
  private readonly authService = inject(AuthService);
  private readonly userManagementUseCase = inject(UserManagementUseCase);
  private readonly createDebtUseCase = inject(CreateDebtUseCase);

  async ngOnInit() {

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

  }

  buildFormDebt() {
    this.createDebtForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
      amount: [null, [Validators.required, Validators.min(0.01)]],
    });
  }

  onSubmit() {
    this.createDebtForm.markAllAsTouched();
    if (this.createDebtForm.invalid) {
      return;
    }
    //Modal de confirmación de guardar datos 
    this.modalConfirmationSaveData();

  }

  modalConfirmationSaveData() {
    this.confirmationService.confirm({
      target: 'body' as unknown as EventTarget,
      message: '¿Está seguro(a) de guardar la información?',
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
        //Guardar datos
        await this.createDebt();
      },
    });
  }

  async createDebt() {
    const bodyRequest: DebtRequest = {
      description: this.createDebtForm.get('description')?.value,
      amount: this.createDebtForm.get('amount')?.value,
      userId: this.userId
    };

    return new Promise((resolve) => {
      this.createDebtUseCase.createDebt(bodyRequest).subscribe({
        next: (response: any) => {
          this.messageService.add(
            {
              severity: 'success',
              summary: '¡Registro exitoso!',
              detail: 'La deuda ha sido registrada exitosamente.'
            });
            setTimeout(() => {
              this.router.navigate(['../'], { relativeTo: this.activeRouter })
            }, 500);
          resolve(true);
        },
        error: (error) => {
          this.messageService.add(
            {
              severity: 'error',
              summary: 'Ups, algo salió mal',
              detail: 'Tuvimos un problema al guardar la deuda. ' +
                'Inténtelo de nuevo en unos minutos.'
            });
          resolve(false);
          console.log("error", error);
        }
      });
    });
  }

}
