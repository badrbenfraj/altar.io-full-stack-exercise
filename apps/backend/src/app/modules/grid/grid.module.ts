import { Module } from '@nestjs/common';

import { GridController } from './grid.controller';
import { GridService } from './services/grid.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, KeycloakConnectModule, RoleGuard } from 'nest-keycloak-connect';
import { KeycloakConfigModule } from '../keycloak/keycloak.module';
import { KeycloakConfigService } from '../keycloak/keycloak-config.service';

@Module({
  imports: [
    KeycloakConnectModule.registerAsync({
      imports: [KeycloakConfigModule],
      useExisting: KeycloakConfigService
    })
  ],
  controllers: [GridController],
  providers: [
    GridService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    }
  ],
  exports: [GridService]
})
export class GridModule {}
