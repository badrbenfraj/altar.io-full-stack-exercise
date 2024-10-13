import { Inject, Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Location } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  location: Location;

  constructor(@Inject(KeycloakService) protected readonly keycloak: KeycloakService) {
    this.location = inject(Location);
  }

  intercept(request: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if ([401, 403].indexOf(err.status) !== -1) {
          this.keycloak.login({
            redirectUri: window.location.origin
          });
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
