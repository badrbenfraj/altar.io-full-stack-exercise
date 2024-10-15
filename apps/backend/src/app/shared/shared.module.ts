import { AuthGuard, KeycloakConnectModule, RoleGuard } from 'nest-keycloak-connect';
import { Module, Scope } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AppService } from '@app/app.service';
import { GridService } from '@app/modules/grid/services/grid.service';
import { PaymentsService } from '@app/modules/payments/services/payments.service';
import { configModule } from '@helpers/config';
import { KeycloakConfigService } from '@app/modules/keycloak/keycloak-config.service';
import { KeycloakConfigModule } from '@app/modules/keycloak/keycloak.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModule),
    KeycloakConnectModule.registerAsync({
      imports: [KeycloakConfigModule],
      useExisting: KeycloakConfigService
    })
  ],
  providers: [
    {
      provide: KeycloakConfigService,
      useClass: KeycloakConfigService,
      scope: Scope.REQUEST
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    },
    AppService,
    GridService,
    PaymentsService
  ],
  exports: [KeycloakConnectModule]
})
export class SharedModule {}
