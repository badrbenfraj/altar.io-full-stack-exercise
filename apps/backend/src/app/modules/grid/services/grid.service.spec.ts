import { Test, TestingModule } from '@nestjs/testing';
import { GridService } from './grid.service';

describe('GridService', () => {
  let service: GridService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GridService]
    }).compile();

    service = module.get<GridService>(GridService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateRandomGrid', () => {
    it('should generate a 10x10 grid', () => {
      const grid = service.generateRandomGrid();
      expect(grid.length).toBe(10);
      grid.forEach((row) => {
        expect(row.length).toBe(10);
      });
    });

    it('should generate a grid with 20% bias characters', () => {
      const biasChar = 'x';
      const grid = service.generateRandomGrid(biasChar);
      const flatGrid = grid.flat();
      const biasCount = flatGrid.filter((char) => char === biasChar).length;
      expect(biasCount).toBe(Math.floor(100 * 0.2));
    });

    it('should generate a grid with random characters', () => {
      const grid = service.generateRandomGrid();
      const flatGrid = grid.flat();
      const uniqueChars = new Set(flatGrid);
      expect(uniqueChars.size).toBeGreaterThan(1);
    });
  });
});
