import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LiveComponent } from '@ui/components';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const config: SocketIoConfig = { url: '', options: {} };

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, LiveComponent, SocketIoModule.forRoot(config)],
  providers: [SocketIoModule],
  exports: [CommonModule, RouterModule, FormsModule, LiveComponent, SocketIoModule]
})
export class SharedModule {}
