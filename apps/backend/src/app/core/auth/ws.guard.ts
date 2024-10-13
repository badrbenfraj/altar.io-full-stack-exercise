import { KeycloakService } from '@app/modules/keycloak/keycloak.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class WSAuthGuard implements CanActivate {
  constructor(private keycloakService: KeycloakService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== 'ws') {
      return true;
    }
    const client = context.switchToWs().getClient();
    const request = client.handshake;
    console.log(request.headers);
    const token = this.keycloakService.extractToken(request);

    if (!token) {
      return false;
    }

    return this.keycloakService.validateToken(token);
  }
}
