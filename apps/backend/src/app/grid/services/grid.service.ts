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
        const randomChar = characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
        row.push(randomChar);
      }
      grid.push(row);
    }
    return grid;
  }
}
