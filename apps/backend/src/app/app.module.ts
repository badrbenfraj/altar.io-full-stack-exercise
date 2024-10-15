import { AuthGuard, KeycloakConnectModule, RoleGuard } from 'nest-keycloak-connect';
import { Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { GridModule } from '@app/modules/grid/grid.module';
import { PaymentsModule } from '@app/modules/payments/payments.module';
import { AppGateway } from './app.gateway';
import { GridService } from '@app/modules/grid/services/grid.service';
import { PaymentsService } from '@app/modules/payments/services/payments.service';
import { configModule } from '@helpers/config';
import { KeycloakConfigService } from '@app/modules/keycloak/keycloak-config.service';
import { KeycloakConfigModule } from '@app/modules/keycloak/keycloak.module';
import { KeycloakService } from './modules/keycloak/keycloak.service';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModule),
    KeycloakConnectModule.registerAsync({
      imports: [KeycloakConfigModule],
      useExisting: KeycloakConfigService
    }),
    DatabaseModule,
    GridModule,
    PaymentsModule
  ],
  controllers: [AppController],
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
    AppGateway,
    GridService,
    KeycloakService,
    PaymentsService
  ]
})
export class AppModule {}
