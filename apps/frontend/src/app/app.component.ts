import { Component } from '@angular/core';
import { SharedModule } from './shared/shared.module';

@Component({
  standalone: true,
  imports: [SharedModule],
  selector: 'ac-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  constructor() {
    console.log('inited');
  }
}
