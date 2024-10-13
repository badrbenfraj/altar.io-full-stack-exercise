import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LiveComponent } from '@ui/components';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { KeycloakAngularModule } from 'keycloak-angular';

const config: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {}
};

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, LiveComponent, SocketIoModule.forRoot(config), KeycloakAngularModule],
  providers: [SocketIoModule],
  exports: [CommonModule, RouterModule, FormsModule, LiveComponent, SocketIoModule, KeycloakAngularModule]
})
export class SharedModule {}
