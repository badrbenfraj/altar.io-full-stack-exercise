import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import { configs } from './backend.config';

export const configModule: ConfigModuleOptions = {
  isGlobal: true,
  load: [configs],
  envFilePath: `.env`
};
