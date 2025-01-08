import { start } from './app';
import config from './config/config';
import { AppDataSource } from './database/data-source';

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

start(config.port);
