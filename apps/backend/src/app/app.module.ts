import { Module } from '@nestjs/common';

import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { GridModule } from '@app/grid/grid.module';
import { PaymentsModule } from '@app/payments/payments.module';
// import { Payments } from '@app/payments/entities/payment.entity';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'username',
    //   password: 'password',
    //   database: 'altar',
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    // TypeOrmModule.forFeature([Payments]),
    GridModule,
    PaymentsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
