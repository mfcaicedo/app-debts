import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../auth/auth.service';
import { RoleNames } from '../../../auth/enums/roles.enum';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-welcome',
  imports: [ButtonModule, RouterModule, CommonModule, ToastModule, ConfirmDialogModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {

  private readonly messageService = inject(MessageService);

  ngOnInit(): void {
  }

  showModalFunctionalityNotAvailable() {
    this.messageService.add({
      severity: 'info',
      summary: 'Muy pronto estará disponible',
      detail: 'Esta funcionalidad estará disponible en futuras versiones.',
    });
  }

}
