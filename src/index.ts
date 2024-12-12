import express from 'express';
import config from './config/config';
import { routes } from './routes';
import { notFoundHandler } from './utils/error-handlers';

const app = express();

app.use(express.json());
app.use(routes, notFoundHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
