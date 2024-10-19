import { AuthGuard, KeycloakConnectModule, RoleGuard } from 'nest-keycloak-connect';
import { Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { Modules } from '@app/modules';
import { AppGateway } from './app.gateway';
import { configModule } from '@helpers/config';
import { KeycloakConfigService } from '@app/modules/keycloak/keycloak-config.service';
import { KeycloakConfigModule } from '@app/modules/keycloak/keycloak.module';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModule),
    KeycloakConnectModule.registerAsync({
      imports: [KeycloakConfigModule],
      useExisting: KeycloakConfigService
    }),
    DatabaseModule,
    ...Modules
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    },
    AppService,
    AppGateway
  ]
})
export class AppModule {}
