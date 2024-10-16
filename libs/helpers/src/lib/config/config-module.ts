import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import Joi from 'joi';

import { configs } from './backend.config';
import { validation } from './validationSchema';

export const configModule: ConfigModuleOptions = {
  isGlobal: true,
  load: [configs],
  envFilePath: `.env`,
  validationSchema: Joi.object<typeof validation>(validation)
};
