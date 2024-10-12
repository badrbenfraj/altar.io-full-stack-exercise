import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ac-live',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './live.component.html',
  styleUrl: './live.component.scss'
})
export class LiveComponent {
  /**
   * Indicates whether the grid generation has started
   * @type {boolean}
   * @memberof LiveComponent
   * @default false
   * @public
   * @required
   */
  @Input() generationStarted = false;

  /**
   * The current code that updates every second
   * @type {string | undefined}
   * @memberof LiveComponent
   * @public
   * @optional
   */
  @Input() code: string | undefined;
}
