import { KEYCLOAK_HOST, KEYCLOAK_PORT } from '@helpers/constants';
import { Injectable } from '@nestjs/common';
import { KeycloakConnectOptions, KeycloakConnectOptionsFactory, TokenValidation } from 'nest-keycloak-connect';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: `http://${KEYCLOAK_HOST}:${KEYCLOAK_PORT}`,
      realm: 'master',
      clientId: 'admin-cli',
      secret: '',
      tokenValidation: TokenValidation.OFFLINE
    };
  }
}
