import cors from 'cors';
import express, { json, urlencoded } from 'express';
import swaggerUi from 'swagger-ui-express';

import { RegisterRoutes } from './routes/routes';
import { notFoundHandler } from './utils/error-handlers';
import swaggerDocument from '../swagger/swagger.json';

const app = express();

app.use(cors());

app.use(
  urlencoded({
    extended: true,
  }),
);
app.use(json());

RegisterRoutes(app);

app.use('/api/v1', notFoundHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export const start = (port: string | number) => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};
