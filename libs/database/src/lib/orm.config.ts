import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env['DB_HOST'] || 'localhost',
  port: Number(process.env['DB_PORT']) || 5432,
  username: process.env['DB_USER'] || 'postgres',
  password: process.env['DB_PASS'] || 'password',
  database: process.env['DB_NAME'] || 'altar',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  migrationsRun: true,
  migrations: [join(__dirname, 'libs/database/src/lib/migrations/**/*.ts')],
  migrationsTableName: 'migration',
  synchronize: true,
  logging: true,
  logger: 'file'
};

export const dataSource = new DataSource(ormConfig as DataSourceOptions);
