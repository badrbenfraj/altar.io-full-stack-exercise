import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Payments } from '@database/entities/payments/payment.entity';
import { Payments as PaymentsModel } from '@helpers/models';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payments)
    private paymentsRepository: Repository<Payments>
  ) {}

  // Retrieve all payments
  async getPayments(): Promise<PaymentsModel[]> {
    return this.paymentsRepository.find();
  }

  // Add a new payment
  async addPayment(payment: PaymentsModel): Promise<PaymentsModel> {
    return this.paymentsRepository.save(payment);
  }
}
