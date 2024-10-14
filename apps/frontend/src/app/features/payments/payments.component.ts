import { Component, inject } from '@angular/core';
import { PaymentsService } from '@services/payments.service';
import { SharedModule } from '@app/shared/shared.module';
import { ScreenComponent } from '@app/core/screens/screen.component';
import { GridService } from '@app/core/services/grid.service';
import { take, takeUntil } from 'rxjs';
import { startGridGeneration } from '@helpers/utils';
import { Code, Grid, GridCode, Payments } from '@helpers/models';

@Component({
  selector: 'ac-payments',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent extends ScreenComponent {
  /**
   * Payments service to interact with the API
   */
  paymentsService = inject(PaymentsService);

  /**
   * Grid service to interact with the API
   */
  gridService = inject(GridService);

  /**
   * Payments list
   */
  payments: Payments[] = [];

  /**
   * The name of the payment
   */
  paymentName = '';

  /**
   * The amount of the payment
   */
  paymentAmount: number | undefined;

  /**
   * The current code that updates every second
   */
  code: Code = '';

  /**
   * The current grid that updates every second
   */
  grid: Grid = [];

  /**
   * Indicates whether the grid generation has started
   */
  generationStarted = false;

  constructor() {
    super();
    this.loadPayments();
    this.startGeneration();
  }

  addPayment(): void {
    if (this.isAddReadOnly()) return;

    const newPayment = {
      name: this.paymentName,
      amount: this.paymentAmount as number,
      code: this.code,
      grid: this.grid
    };

    this.paymentsService
      .addPayment(newPayment)
      .pipe(take(1))
      .subscribe(() => {
        this.loadPayments();
      });

    // Reset form fields
    this.paymentName = '';
    this.paymentAmount = undefined;
  }

  // Load the payment list from the API
  loadPayments(): void {
    this.paymentsService
      .getPayments()
      .pipe(take(1))
      .subscribe((data: Payments[]) => {
        this.payments = data;
      });
  }

  startGeneration(): void {
    this.generationStarted = true;
    startGridGeneration(this.gridService)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ grid, code }: GridCode) => {
          this.grid = grid;
          this.code = code;
        },
        error: () => {
          this.generationStarted = false;
        }
      });
  }

  isAddReadOnly(): boolean {
    return this.code === '' || this.paymentName === '' || !this.paymentAmount;
  }
}
