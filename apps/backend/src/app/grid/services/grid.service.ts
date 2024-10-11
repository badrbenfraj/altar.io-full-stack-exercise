import { Injectable } from '@nestjs/common';
import { countOccurrences, shuffleArray } from '@helpers';

@Injectable()
export class GridService {
  private gridSize = 10;

  // Generates a 10x10 random alphabetic grid, with optional bias weighting
  generateRandomGrid(bias?: string): string[][] {
    const grid: string[][] = [];
    const characters = 'abcdefghijklmnopqrstuvwxyz';

    // Remove the bias from the random character pool (if bias is provided)
    const availableCharacters = bias ? characters.replace(bias, '') : characters;

    // Calculate total number of cells (gridSize * gridSize)
    const totalCells = this.gridSize * this.gridSize;

    // Calculate bias size (20% of total cells)
    const biasCount = bias ? Math.floor(totalCells * 0.2) : 0;
    const randomCount = totalCells - biasCount;

    // Array to store all grid characters
    let cells: string[] = new Array(totalCells);

    // Two-pointer approach: one for bias, one for random characters
    let biasPointer = 0;
    let randomPointer = biasCount;

    // Fill the remaining cells with random characters (excluding the bias character)
    for (let i = 0; i < randomCount; i++) {
      cells[randomPointer++] = availableCharacters.charAt(Math.floor(Math.random() * availableCharacters.length));
    }

    // Fill the cells with bias characters
    if (bias) {
      for (let i = 0; i < biasCount; i++) {
        cells[biasPointer++] = bias;
      }
    }

    // Shuffle the grid cells to randomly distribute the bias
    cells = shuffleArray(cells);

    // Instead of nested loops, use a flat 1D array and map it to a 2D grid in one pass
    let index = 0;
    while (index < totalCells) {
      grid.push(cells.slice(index, index + this.gridSize)); // Slice the 1D array to create rows
      index += this.gridSize;
    }

    return grid;
  }

  // Generates a 2-digit code based on grid characters and system clock seconds
  generateCode(grid: string[][]): string {
    const seconds = new Date().getSeconds().toString().padStart(2, '0');

    const char1 = grid[parseInt(seconds[0])][parseInt(seconds[1])];
    const char2 = grid[parseInt(seconds[1])][parseInt(seconds[0])];

    const countChar1 = countOccurrences(grid, char1);
    const countChar2 = countOccurrences(grid, char2);

    const code1 = this.normalizeCount(countChar1);
    const code2 = this.normalizeCount(countChar2);

    return `${code1}${code2}`;
  }

  // Normalize the count to be <= 9 (divides by the smallest integer until it fits)
  private normalizeCount(count: number): number {
    while (count > 9) {
      count = Math.floor(count / 2);
    }
    return count;
  }
}
