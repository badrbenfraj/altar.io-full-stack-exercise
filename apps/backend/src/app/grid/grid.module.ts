import { Module } from '@nestjs/common';

import { GridController } from './grid.controller';
import { GridService } from './services/grid.service';

@Module({
  imports: [],
  controllers: [GridController],
  providers: [GridService],
})
export class GridModule {}
