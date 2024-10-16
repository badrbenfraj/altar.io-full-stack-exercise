import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_SYNC, DB_USER } from '@helpers/constants';
import { join } from 'path';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  entities: [`${join(process.cwd(), 'libs', 'database', 'src', 'lib', 'entities')}/**/*.entity{.ts,.js}`],
  autoLoadEntities: true,
  migrationsRun: true,
  migrations: [`${join(process.cwd(), 'libs', 'database', 'src', 'lib', 'migrations')}/**/*.ts`],
  migrationsTableName: 'migration',
  synchronize: DB_SYNC,
  logging: true,
  logger: 'file'
};

export const dataSource = new DataSource(ormConfig as DataSourceOptions);
