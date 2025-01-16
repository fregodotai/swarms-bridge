import { NextFunction, Request, Response } from 'express';

import { ApiKeyRepository } from '../database/repository/api-key.repository';
import createAnchorProvider from '../utils/create-anchor-provider';
import { AuthenticationError } from '../utils/error-handlers';
import { decryptPrivateKey } from '../utils/private-key-helpers';

export default async function getAnchorProviderMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.agent) {
    const privateKey = decryptPrivateKey(req.agent.wallet.encryptedPrivateKey);
    const anchorProvider = createAnchorProvider(privateKey);

    req.anchorProvider = anchorProvider;

    return next();
  }

  const apiKey = req.query.apiKey;

  if (apiKey && typeof apiKey === 'string') {
    const keyRecord = await ApiKeyRepository.findOne({
      where: { apiKey },
      relations: {
        agent: { wallet: true, apiKey: true },
      },
    });

    if (!keyRecord) {
      return next(new AuthenticationError('Invalid API key', 401));
    }

    if (keyRecord.status !== 'active') {
      return next(new AuthenticationError('Inactive API key', 403));
    }

    const privateKey = decryptPrivateKey(
      keyRecord.agent.wallet.encryptedPrivateKey,
    );

    const anchorProvider = createAnchorProvider(privateKey);

    req.agent = keyRecord.agent;
    req.anchorProvider = anchorProvider;

    return next();
  }

  req.anchorProvider = createAnchorProvider();
  return next();
}
