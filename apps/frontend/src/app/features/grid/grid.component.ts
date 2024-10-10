import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { fromEvent, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
  generationStarted = false;
  character = ''

  constructor(private http: HttpClient) {}

  generateGrid(): void {
    this.generationStarted = true;
    interval(1000)
      .pipe(
        switchMap(() => this.http.get<any>('/api/grid'))
      )
      .subscribe(response => {
        this.grid = response.grid;
      });
  }
}
