import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakOptions, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class KeycloakInitService {
  constructor(
    private keycloak: KeycloakService,
    private http: HttpClient
  ) {}

  initKeycloak(): Promise<boolean> {
    const keycloakOptions: KeycloakOptions = {
      config: {
        url: 'http://localhost:8080/',
        realm: 'master',
        clientId: 'admin-cli'
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
      bearerExcludedUrls: ['/assets', '/clients/public']
    };
    return this.keycloak.init(keycloakOptions);
  }

  getKeycloakInstance() {
    return this.keycloak.getKeycloakInstance();
  }

  getToken() {
    return this.keycloak.getToken();
  }
}
