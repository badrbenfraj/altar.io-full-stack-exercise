/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app/app.module';
import { CORS } from '@helpers/constants';
import { initSwagger } from '@app/app.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  const globalPrefix = 'api';

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.enableCors(CORS);
  app.setGlobalPrefix(globalPrefix);
  initSwagger(app);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
