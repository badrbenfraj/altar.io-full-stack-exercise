import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * This class is the parent class of all components.
 */
@Injectable()
export class ScreenComponent implements OnDestroy {
  /**
   * The Subjet emitter object to destroy all the subscriptions
   * when the component is destroyed
   */
  destroy$: Subject<boolean> = new Subject<boolean>();

  /**
   * Destroys the component and all the subscriptions
   */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
