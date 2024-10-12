import { Component, inject } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ScreenComponent } from '@core/screens/screen.component';
import { GridService } from '@services/grid.service';
import { SharedModule } from '@app/shared/shared.module';
import { startGridGeneration } from '@helpers/utils';

@Component({
  selector: 'ac-grid',
  standalone: true,
  imports: [SharedModule],
  providers: [],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent extends ScreenComponent {
  gridService = inject(GridService);

  grid: string[][] = [];

  code = '';

  generationStarted = false;

  character = '';

  inputDisabled = false;

  generateGrid(): void {
    if (this.generationStarted) return;
    this.generationStarted = true;

    startGridGeneration(this.gridService, () => this.character)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ grid, code }) => {
          this.grid = grid;
          this.code = code;
        },
        error: () => {
          this.generationStarted = false;
          this.inputDisabled = false;
        }
      });

    if (this.character.length === 1) {
      this.disableInput();
    }
  }

  alphabetsOnly(event: KeyboardEvent): boolean {
    const key = event.key;

    const isDeleteKey = key === 'Backspace' || key === 'Delete';

    const isAlphabet = /[a-z]/i.test(key);

    if (isAlphabet && !isDeleteKey) {
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
