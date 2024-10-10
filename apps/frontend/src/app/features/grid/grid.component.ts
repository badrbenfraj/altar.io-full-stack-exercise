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
        }
      });
  }

  getGrid = () => this.gridService.getGrid();

  getSecretCode = (grid: string[][]) => this.gridService.getSecretCode(grid);
}
