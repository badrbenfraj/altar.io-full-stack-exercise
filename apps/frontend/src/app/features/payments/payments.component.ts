import { Component, inject, OnInit } from '@angular/core';
import { ScreenComponent } from '@app/core/screens/screen.component';
import { WebsocketService } from '@app/core/services/websocket.service';
import { SharedModule } from '@app/shared/shared.module';
import { Code, Grid, GridCode, Payments } from '@helpers/models';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'ac-payments',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent extends ScreenComponent implements OnInit {
  /**
   * Payments service to interact with the API
   */
  websocketService = inject(WebsocketService);

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

  ngOnInit() {
    this.loadPayments();
    this.startGeneration();
  }

  addPayment(): void {
    if (this.isAddReadOnly()) return;

    if (this.paymentAmount !== undefined) {
      const newPayment: Payments = {
        name: this.paymentName,
        amount: this.paymentAmount,
        code: this.code,
        grid: this.grid
      };
      this.websocketService.addPayment(newPayment);
      // Reset form fields
      this.paymentName = '';
      this.paymentAmount = undefined;
    } else {
      console.error('Payment amount is undefined');
    }
  }

  loadPayments(): void {
    this.websocketService.onPayments().subscribe((payments: unknown) => {
      this.payments = payments as Payments[];
    });
  }

  startGeneration(): void {
    if (this.generationStarted) return;
    this.generationStarted = true;
    this.websocketService
      .onGenerationStart()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value: unknown) => {
          const gridCode = value as GridCode;
          this.code = gridCode.code;
          this.grid = gridCode.grid;
        },
        error: () => {
          this.generationStarted = false;
        }
      });

    this.websocketService.startGeneration(true);
  }

  isAddReadOnly(): boolean {
    return this.code === '' || this.paymentName === '' || !this.paymentAmount;
  }
}
