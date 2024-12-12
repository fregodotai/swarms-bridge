import { Router, Request, Response } from 'express';

export const subscribeRouter = Router();

subscribeRouter.post('/subscribe', (req: Request, res: Response) => {
  res.send('Subscribe');
});
