import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, KeycloakConnectModule, RoleGuard } from 'nest-keycloak-connect';

import { PaymentsController } from '@app/modules/payments/payments.controller';
import { PaymentsService } from '@app/modules/payments/services/payments.service';
import { Payments } from '@database/entities/payments/payment.entity';
import { KeycloakConfigModule } from '../keycloak/keycloak.module';
import { KeycloakConfigService } from '../keycloak/keycloak-config.service';

@Module({
  imports: [
    KeycloakConnectModule.registerAsync({
      imports: [KeycloakConfigModule],
      useExisting: KeycloakConfigService
    }),
    TypeOrmModule.forFeature([Payments])
  ],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    }
  ],
  exports: [PaymentsService]
})
export class PaymentsModule {}
