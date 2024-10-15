import { Observable, interval, forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Code, Grid, GridCode } from '../models';

export function countOccurrences(grid: string[][], char: string): number {
  return grid.flat().filter((c) => c === char).length;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

interface GridService {
  generateRandomGrid(bias?: string): Grid;
  generateCode(grid: Grid): Code;
}

export function startGridGeneration(gridService: GridService, getBias?: () => string | undefined, timer = 2): Observable<GridCode> {
  return interval(timer * 1000).pipe(
    switchMap(() => {
      const bias = getBias ? getBias() : undefined;
      return of(gridService.generateRandomGrid(bias));
    }),
    switchMap((grid: string[][]) => {
      const code$ = gridService.generateCode(grid);
      return forkJoin({
        grid: of(grid),
        code: of(code$)
      });
    })
  );
}
