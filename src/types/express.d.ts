import { Agent } from '../database/entity/agent';

declare global {
  namespace Express {
    interface Request {
      agent?: Agent;
    }
  }
}

export {};
