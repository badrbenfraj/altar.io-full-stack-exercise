import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakInitService } from './keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private keycloakInitService: KeycloakInitService) {}

  intercept(req: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
    const keycloakInstance = this.keycloakInitService.getKeycloakInstance();
    const token = keycloakInstance.token;

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req);
  }
}
