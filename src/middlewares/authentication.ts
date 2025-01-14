import * as express from 'express';

import { ApiKeyRepository } from '../database/repository/api-key.repository';
import { AuthenticationError, ServiceError } from '../utils/error-handlers';

export async function expressAuthentication(
  request: express.Request,
  securityName: string,
): Promise<any> {
  if (securityName === 'api_key') {
    const apiKey = request.headers['x-api-key'];
    if (!apiKey || Array.isArray(apiKey))
      return Promise.reject(new AuthenticationError('API key missing', 401));

    const keyRecord = await ApiKeyRepository.findOne({
      where: { apiKey },
      relations: {
        agent: { wallet: true, apiKey: true },
      },
    });

    if (!keyRecord) {
      return Promise.reject(new AuthenticationError('Invalid API key', 401));
    }

    if (keyRecord.status !== 'active') {
      return Promise.reject(new AuthenticationError('Inactive API key', 403));
    }
    request.agent = keyRecord.agent;
    return Promise.resolve(keyRecord.agent);
  }

  return Promise.reject(new ServiceError('Unsupported authentication method'));
}
