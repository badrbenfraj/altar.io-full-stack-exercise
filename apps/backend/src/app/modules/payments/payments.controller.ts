import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { PaymentsService } from '@app/modules/payments/services/payments.service';
import { Payments } from '@helpers/models';
import { AuthGuard, RoleGuard } from 'nest-keycloak-connect';

@UseGuards(AuthGuard, RoleGuard)
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
