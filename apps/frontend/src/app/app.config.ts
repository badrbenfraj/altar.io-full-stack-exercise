import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_INITIALIZER } from '@angular/core';
import { appRoutes } from '@app/app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { SharedModule } from '@app/shared/shared.module';
import { AuthInterceptor } from '@app/core/auth/auth.interceptor';
import { KeycloakInitService } from '@app/core/auth/keycloak.service';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

function initializeKeycloak(keycloakInitService: KeycloakInitService): () => Promise<boolean> {
  return () => keycloakInitService.initKeycloak();
}

export const appConfig: ApplicationConfig = {
  providers: [
    KeycloakInitService,
    AuthInterceptor,
    ErrorInterceptor,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakInitService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    importProvidersFrom(SharedModule)
  ]
};
