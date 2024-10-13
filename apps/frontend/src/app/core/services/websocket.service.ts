import { Injectable } from '@angular/core';
import { Payments } from '@helpers/models';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  constructor(private socket: Socket) {}

  // Listen for payments updates
  onPayments() {
    return this.socket.fromEvent('paymentsUpdated');
  }

  onGenerationStart() {
    return this.socket.fromEvent('generationStarted');
  }

  updateBias(bias: string): void {
    this.socket.emit('updateBias', { bias });
  }

  // Send a new payment
  addPayment(paymentData: Payments) {
    this.socket.emit('updatePayments', paymentData);
  }

  // Send start generator signal
  startGeneration() {
    this.socket.emit('startGeneration');
  }
}
