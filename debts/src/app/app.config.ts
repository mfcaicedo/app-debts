import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { DebtsPreset } from './debts.preset.config';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { UserGateway } from './user-management/domain/models/gateway/user-gateway';
import { UserManagementService } from './user-management/infrastructure/adapter/user-api/user-management.service';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './auth/auth.service';
import { authInterceptor } from './auth/auth.interceptor';
import { DatePipe } from '@angular/common';
import { provideMarkdown } from 'ngx-markdown';
import { loadingInterceptor } from './auth/loading.interceptor';
import { DebtGateway } from './debts/domain/models/gateway/debt-gateway';
import { DebtsService } from './debts/infrastructure/adapter/debts-api/debts.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideAnimationsAsync(),
    provideMarkdown(),
    provideAnimations(),
    //Se agrega el interceptor de autenticacion
    provideHttpClient(withInterceptors([authInterceptor, loadingInterceptor])),
    //Configuracion de PrimeNG
    providePrimeNG({
      theme: {
        preset: DebtsPreset,
        options: {
          darkModeSelector: false || 'none'
        }
      },
    }),

    //Auth 
    importProvidersFrom([
      //Configuracion JWT
      JwtModule.forRoot({
        config: {
          tokenGetter: () => localStorage.getItem('accessToken')
        }
      }),
    ]),
    //Configuracion de la inyeccion de dependencias para el desacoplamiento de la capa de infraestructura
    { provide: UserGateway, useClass: UserManagementService },
    { provide: DebtGateway, useClass: DebtsService },
  ]
};

export function initializerFactory(authService: AuthService) {
  return () => authService.refreshSession();
}
