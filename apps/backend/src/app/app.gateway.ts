import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Subject, takeUntil } from 'rxjs';
import { GridCode } from '@helpers/models';
import { GridService } from '@app/grid/services/grid.service';
import { PaymentsService } from '@app/payments/services/payments.service';
import { startGridGeneration } from '@helpers/utils';
import { Payments } from './payments/entities/payment.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: false
  }
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private clientSubjects: Map<string, Subject<boolean>> = new Map();

  bias: string;

  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly gridService: GridService
  ) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.clientSubjects.set(client.id, new Subject<boolean>());
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    const subject = this.clientSubjects.get(client.id);
    if (subject) {
      subject.next(true);
      subject.complete();
      this.clientSubjects.delete(client.id);
      this.bias = undefined;
    }
  }

  @SubscribeMessage('startGeneration')
  handleStartGenerator(client: Socket): void {
    const subject = this.clientSubjects.get(client.id);
    if (subject) {
      startGridGeneration(this.gridService, () => this.bias)
        .pipe(takeUntil(subject))
        .subscribe({
          next: (gridCode: GridCode) => {
            this.server.emit('generationStarted', gridCode);
          },
          error: (error) => {
            console.error('Error starting grid generator', error);
          },
          complete: () => {
            console.log('Grid generation complete');
          }
        });
    }
  }

  @SubscribeMessage('updateBias')
  handleUpdateBias(client: Socket, payload: { bias: string }): void {
    this.bias = payload.bias;
  }

  @SubscribeMessage('updatePayments')
  handleAddPayment(client: Socket, payment: Payments): void {
    this.paymentsService.addPayment(payment);
    const payments = this.paymentsService.getPayments();
    this.server.emit('paymentsUpdated', payments);
  }
}
