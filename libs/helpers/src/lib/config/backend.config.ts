import { APP_PORT } from '../constants';
import { ormConfig } from './orm.config';

export const configs = () => ({
  port: APP_PORT,
  database: { ...ormConfig }
});
