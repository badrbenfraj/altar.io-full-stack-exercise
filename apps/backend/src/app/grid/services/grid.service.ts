import { Injectable } from '@nestjs/common';

@Injectable()
export class GridService {
  private gridSize = 10;

  generateRandomGrid(): string[][] {
    const grid: string[][] = [];
    const characters = 'abcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < this.gridSize; i++) {
      const row: string[] = [];
      for (let j = 0; j < this.gridSize; j++) {
        const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
        row.push(randomChar);
      }
      grid.push(row);
    }
    return grid;
  }

  generateCode(grid: string[][]): string {
    const seconds = new Date().getSeconds().toString().padStart(2, '0');

    const char1 = grid[seconds.split('')[0]][seconds.split('')[1]];
    const char2 = grid[seconds.split('')[1]][seconds.split('')[0]];

    const countChar1 = this.countOccurrences(grid, char1);
    const countChar2 = this.countOccurrences(grid, char2);

    const code1 = this.normalizeCount(countChar1);
    const code2 = this.normalizeCount(countChar2);

    return `${code1}${code2}`;
  }

  private countOccurrences(grid: string[][], char: string): number {
    return grid.flat().filter((c) => c === char).length;
  }

  private normalizeCount(count: number): number {
    while (count > 9) {
      count = Math.floor(count / 2);
    }
    return count;
  }
}
