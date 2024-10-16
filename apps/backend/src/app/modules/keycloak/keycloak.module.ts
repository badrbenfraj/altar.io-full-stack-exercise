// keycloak.module.ts
import { Module, Scope } from '@nestjs/common';
import { KeycloakConfigService } from './keycloak-config.service';
import { KeycloakService } from './keycloak.service';

@Module({
  exports: [
    {
      provide: KeycloakConfigService,
      useClass: KeycloakConfigService,
      scope: Scope.REQUEST
    },
    KeycloakService
  ],
  providers: [KeycloakConfigService, KeycloakService]
})
export class KeycloakConfigModule {}
