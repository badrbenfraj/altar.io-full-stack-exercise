import { Controller, Get } from '@nestjs/common';
import { GridService } from './services/grid.service';

@Controller('grid')
export class GridController {
  constructor(private readonly gridService: GridService) {}

  @Get('')
  getGrid(): { grid: string[][] } {
    const grid = this.gridService.generateRandomGrid();
    return { grid };
  }
}
