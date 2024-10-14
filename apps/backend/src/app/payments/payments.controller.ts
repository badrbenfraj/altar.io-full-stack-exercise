import { Controller, Get, Post, Body } from '@nestjs/common';
import { PaymentsService } from '@app/payments/services/payments.service';
import { Payments } from '@helpers/models';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Get()
  getPayments() {
    return this.paymentsService.getPayments();
  }

  @Post()
  addPayment(@Body() payment: Payments) {
    this.paymentsService.addPayment(payment);
  }
}
