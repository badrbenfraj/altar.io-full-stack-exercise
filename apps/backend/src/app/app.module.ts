import { Module, Scope } from '@nestjs/common';
// import { KeycloakConnectModule, ResourceGuard, RoleGuard } from 'nest-keycloak-connect';

import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { GridModule } from '@app/modules/grid/grid.module';
import { PaymentsModule } from '@app/modules/payments/payments.module';
import { AppGateway } from './app.gateway';
import { GridService } from '@app/modules/grid/services/grid.service';
import { APP_GUARD } from '@nestjs/core';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard, KeycloakConnectModule, RoleGuard } from 'nest-keycloak-connect';
import { ConfigModule } from '@nestjs/config';

import { PaymentsService } from '@app/modules/payments/services/payments.service';
import { configModule } from '@app/core/config';
import { KeycloakConfigService } from '@app/modules/keycloak/keycloak-config.service';
import { KeycloakConfigModule } from '@app/modules/keycloak/keycloak.module';
import { KeycloakService } from './modules/keycloak/keycloak.service';
// import { Payments } from '@app/modules/payments/entities/payment.entity';
// import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(configModule),
    KeycloakConnectModule.registerAsync({
      imports: [KeycloakConfigModule],
      useExisting: KeycloakConfigService
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'username',
    //   password: 'password',
    //   database: 'altar',
    //   autoLoadEntities: true,
    //   migrationsRun: true,
    //   migrations: [join(__dirname, 'backend/database/src/lib/migrations/**/*.ts')],
    //   migrationsTableName: 'migration',
    //   synchronize: true,
    //   logging: true,
    //   logger: 'file'
    // }),
    // TypeOrmModule.forFeature([Payments]),
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
