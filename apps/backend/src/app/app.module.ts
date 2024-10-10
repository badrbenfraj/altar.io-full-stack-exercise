import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GridModule } from './grid/grid.module';

@Module({
  imports: [GridModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
