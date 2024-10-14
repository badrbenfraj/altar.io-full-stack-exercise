import { Module } from '@nestjs/common';

import { PaymentsController } from '@app/modules/payments/payments.controller';
import { PaymentsService } from '@app/modules/payments/services/payments.service';
import { SharedModule } from '@app/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class PaymentsModule {}
