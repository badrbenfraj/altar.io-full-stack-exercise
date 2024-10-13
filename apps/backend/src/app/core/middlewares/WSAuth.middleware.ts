import { Socket } from 'socket.io';

export type SocketIoMiddleWare = {
  (client: Socket, next: (err?: Error) => void): void;
};
export const WSAuthMiddleware = (): SocketIoMiddleWare => {
  return (client: Socket, next: (err?: Error) => void) => {
    try {
      console.log('Packet received: ', client);
      next();
    } catch (err) {
      console.error('Error in WSAuthMiddleware:', err);
      next(err);
    }
  };
};
