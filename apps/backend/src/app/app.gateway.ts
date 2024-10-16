import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
// import { RoleGuard, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { Logger, UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Subject, takeUntil } from 'rxjs';
import { GridCode } from '@helpers/models';
import { GridService } from '@app/modules/grid/services/grid.service';
import { PaymentsService } from '@app/modules/payments/services/payments.service';
import { Payments } from '@database/entities/payments/payment.entity';
import { startGridGeneration } from '@helpers/utils';
import { WSAuthGuard } from '@app/core/auth/ws.guard';

// @UseGuards(WSAuthGuard, RoleGuard)
@UseGuards(WSAuthGuard)
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
    Logger.log(`Client connected: ${client.id}`);
    this.clientSubjects.set(client.id, new Subject<boolean>());
  }

  handleDisconnect(client: Socket) {
    Logger.log(`Client disconnected: ${client.id}`);
    const subject = this.clientSubjects.get(client.id);
    if (subject) {
      subject.next(true);
      subject.complete();
      this.clientSubjects.delete(client.id);
      this.bias = undefined;
    }
  }

  // @Roles({ roles: ['user'], mode: RoleMatchingMode.ANY })
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
            Logger.log('Grid generation complete');
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
