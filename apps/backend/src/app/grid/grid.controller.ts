import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GridService } from './services/grid.service';

@Controller('grid')
export class GridController {
  constructor(private readonly gridService: GridService) {}

  @Get()
  getGrid(@Query('bias') bias?: string): string[][] {
    const grid = this.gridService.generateRandomGrid(bias);
    return grid;
  }

  @Post('code')
  getCode(@Body() grid): string {
    const code = this.gridService.generateCode(grid);
    return code;
  }
}
