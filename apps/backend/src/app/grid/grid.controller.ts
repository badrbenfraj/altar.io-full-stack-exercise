import { Body, Controller, Get, Post } from '@nestjs/common';
import { GridService } from './services/grid.service';

@Controller('grid')
export class GridController {
  constructor(private readonly gridService: GridService) {}

  @Get('')
  getGrid(): string[][] {
    const grid = this.gridService.generateRandomGrid();
    return grid;
  }

  @Post('code')
  getCode(@Body() grid): string {
    const code = this.gridService.generateCode(grid);
    return code;
  }
}
