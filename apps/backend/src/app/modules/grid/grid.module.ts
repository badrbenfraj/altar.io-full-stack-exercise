import { Module } from '@nestjs/common';

import { GridController } from './grid.controller';
import { GridService } from './services/grid.service';
import { SharedModule } from '@app/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [GridController],
  providers: [GridService]
})
export class GridModule {}
