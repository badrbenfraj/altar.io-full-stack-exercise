import { Injectable } from '@nestjs/common';
import { KeycloakConnectOptions, KeycloakConnectOptionsFactory, TokenValidation } from 'nest-keycloak-connect';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: process.env.KEYCLOAK_HOST ? `http://${process.env.KEYCLOAK_HOST}:8080` : 'http://localhost:8080',
      realm: 'master',
      clientId: 'admin-cli',
      secret: '',
      tokenValidation: TokenValidation.OFFLINE
    };
  }
}
