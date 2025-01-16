import 'reflect-metadata';
import { DataSource } from 'typeorm';

import config from '../config/config';

export const migrationDataSource = new DataSource({
  type: 'mysql',
  host: config.db.host,
  port: Number(config.db.port),
  username: config.db.user,
  password: config.db.password,
  database: config.db.database,
  synchronize: false,
  logging: true,
  entities: [
    config.isProduction
      ? 'dist/src/database/entity/**/*.js'
      : 'src/database/entity/**/*.ts',
  ],
  migrations: [
    config.isProduction
      ? 'dist/src/database/migration/**/*.js'
      : 'src/database/migration/**/*.ts',
  ],
  migrationsTableName: 'typeorm_migration_table',
});
