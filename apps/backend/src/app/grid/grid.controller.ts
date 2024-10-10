import { Controller, Get } from '@nestjs/common';
import { GridService } from './services/grid.service';

@Controller('grid')
export class GridController {
  constructor(private readonly gridService: GridService) {}

  @Get('')
  getGrid(): string[][] {
    const grid = this.gridService.generateRandomGrid();
    return grid;
  }

  @Get('code')
  getCode(): string {
    const grid = this.getGrid();
    const code = this.gridService.generateCode(grid);
    return code;
  }
}
