import { Observable, interval, forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GridCode } from '../models';

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
  getGrid(bias?: string): Observable<string[][]>;
  getSecretCode(grid: string[][]): Observable<string>;
}

export function startGridGeneration(gridService: GridService, getBias?: () => string | undefined, timer = 2): Observable<GridCode> {
  return interval(timer * 1000).pipe(
    switchMap(() => {
      const bias = getBias ? getBias() : undefined;
      return gridService.getGrid(bias);
    }),
    switchMap((grid: string[][]) => {
      const code$ = gridService.getSecretCode(grid);
      return forkJoin({
        grid: of(grid),
        code: code$
      });
    })
  );
}
