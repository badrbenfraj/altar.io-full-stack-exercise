import { Component, inject } from '@angular/core';
import { forkJoin, interval, of } from 'rxjs';
import { switchMap, take, takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScreenComponent } from '@core/screens/screen.component';
import { GridService } from '@services/grid.service';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    interval(1000)
      .pipe(
        switchMap(this.getGrid),
        switchMap((grid) =>
          forkJoin({
            grid: of(grid),
            code: this.getSecretCode(grid)
          })
        ),
        takeUntil(this.destroy$)
      )
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

  getGrid = () => this.gridService.getGrid(this.character);

  getSecretCode = (grid: string[][]) => this.gridService.getSecretCode(grid);
}
