import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs';
import { UserDataSession } from '../../interfaces/models/user-data-session.model';
import { UserManagementUseCase } from '../../../../user-management/domain/usecase/user-management-usecase';
import { Login } from '../../types/login-response.type';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-create-account',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    PasswordModule,
    RouterModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css',
})
export class CreateAccountComponent {
  loginForm!: FormGroup;
  userDataSession: Partial<UserDataSession> = {};

  isLoadingLogin = false;

  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly userManagementUseCase = inject(UserManagementUseCase);

  constructor() {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onLoginFormSubmitted() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isLoadingLogin = true;
    const loginData = {
      email: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    this.authService.createUser(loginData.email, loginData.password).subscribe({
      next: async (response: any) => {
        this.authService
          .createUserDb(loginData.email, loginData.password)
          .subscribe({
            next: (responseDb: any) => {
              this.isLoadingLogin = false;
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail:
                  'Usuario creado correctamente. No olvides verificar tu correo',
              });
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 500);
            },
            error: (errorDb: any) => {
              console.log('errorDb ', errorDb);
              this.isLoadingLogin = false;
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al crear el usuario en la base de datos',
              });
            },
          });
        //Guardo el usuario en la base de datos
      },
      error: (error: any) => {
        console.log('error ', error);
        this.isLoadingLogin = false;
      },
    });
  }
}
