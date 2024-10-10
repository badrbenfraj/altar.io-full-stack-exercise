import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { forkJoin, fromEvent, interval } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {
  grid: string[][] = [];
  code = '';
  generationStarted = false;
  character = '';

  constructor(private http: HttpClient) {}

  generateGrid(): void {
    this.generationStarted = true;
    interval(1000)
      .pipe(
        switchMap(() =>
          forkJoin({
            grid: this.http.get<any>('/api/grid'),
            code: this.http.get<any>('/api/grid/code')
          })
        )
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
}
