import { AnchorProvider } from '@coral-xyz/anchor';

import { Agent } from '../database/entity/agent';

declare global {
  namespace Express {
    interface Request {
      agent?: Agent;
      anchorProvider?: AnchorProvider;
    }
  }
}

export {};
