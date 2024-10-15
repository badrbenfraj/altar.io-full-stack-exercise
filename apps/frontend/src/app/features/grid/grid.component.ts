import { Component, inject } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ScreenComponent } from '@core/screens/screen.component';
import { SharedModule } from '@app/shared/shared.module';
import { WebsocketService } from '@app/core/services/websocket.service';
import { GridCode } from '@helpers/models';

@Component({
  selector: 'ac-grid',
  standalone: true,
  imports: [SharedModule],
  providers: [],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent extends ScreenComponent {
  websocketService = inject(WebsocketService);

  grid: string[][] = [];

  code = '';

  generationStarted = false;

  character = '';

  inputDisabled = false;

  constructor() {
    super();
  }

  generateGrid(): void {
    if (this.generationStarted) return;
    this.generationStarted = true;

    this.websocketService
      .onGenerationStart()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value: unknown) => {
          const gridCode = value as GridCode;
          this.code = gridCode.code;
          this.grid = gridCode.grid;
        },
        error: () => {
          this.generationStarted = false;
          this.inputDisabled = false;
        }
      });

    if (this.character.length === 1) {
      this.disableInput();
    }
    this.websocketService.startGeneration();
  }

  alphabetsOnly(event: KeyboardEvent): boolean {
    const key = event.key;

    const isDeleteKey = key === 'Backspace' || key === 'Delete';

    const isAlphabet = /[a-z]/i.test(key);

    if (isAlphabet && !isDeleteKey) {
      this.websocketService.updateBias(key);
      if (this.generationStarted) {
        this.disableInput();
      }
      return true;
    }

    return isDeleteKey;
  }

  disableInput(): void {
    this.inputDisabled = true;

    setTimeout(() => {
      this.inputDisabled = false;
    }, 4000);
  }

  isCharacterReadOnly(): boolean {
    return this.inputDisabled;
  }
}
