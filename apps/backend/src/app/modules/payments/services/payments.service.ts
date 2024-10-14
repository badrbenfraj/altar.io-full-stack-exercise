import { Payments } from '@helpers/models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  private payments = []; // This would ideally be a database

  getPayments(): Payments[] {
    return this.payments;
  }

  addPayment(payment: Payments): void {
    this.payments.push(payment);
  }
}
