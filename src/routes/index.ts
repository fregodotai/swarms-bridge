import { Router } from 'express';

import { subscribeRouter } from './subscribe';

export const routes = Router();

routes.use(subscribeRouter);
