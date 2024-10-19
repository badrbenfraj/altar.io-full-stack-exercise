import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WSSocket extends Socket {
  constructor(keycloakService: KeycloakService) {
    super({
      url: '',
      options: {
        reconnection: false,
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: `Bearer ${keycloakService.getKeycloakInstance().token}`
            }
          }
        }
      }
    });
  }
}
