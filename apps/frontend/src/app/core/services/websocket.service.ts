import { Injectable } from '@angular/core';
import { Payments } from '@helpers/models';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  constructor(
    private keycloakService: KeycloakService,
    private socket: Socket
  ) {
    this.keycloakService.keycloakEvents$.subscribe((event) => {
      if (event.type === KeycloakEventType.OnAuthRefreshSuccess) {
        this.connectWithToken(); // Reconnect WebSocket with new token on token refresh
      }
    });
  }

  // Connect WebSocket with the Keycloak token
  async connectWithToken() {
    const token = await this.keycloakService.getToken(); // Fetch the Keycloak token

    // Set the Authorization header with the JWT token
    this.socket.ioSocket.io.opts.extraHeaders = {
      Authorization: `Bearer ${token}`
    };

    this.socket.connect(); // Connect the socket with the updated headers
  }

  // Listen for payments updates
  onPayments() {
    return this.socket.fromEvent('paymentsUpdated');
  }

  onGenerationStart() {
    this.connectWithToken();
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
