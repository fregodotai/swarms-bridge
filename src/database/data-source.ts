import 'reflect-metadata';
import { DataSource } from 'typeorm';

import config from '../config/config';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.db.host,
  port: Number(config.db.port),
  username: config.db.user,
  password: config.db.password,
  database: config.db.database,
  synchronize: false,
  logging: false,
  entities: [
    config.isProduction
      ? 'dist/src/database/entity/**/*.js'
      : 'src/database/entity/**/*.ts',
  ],
  subscribers: [
    config.isProduction
      ? 'dist/src/database/subscriber/**/*.js'
      : 'src/database/subscriber/**/*.ts',
  ],
});
