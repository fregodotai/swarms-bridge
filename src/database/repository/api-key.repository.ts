import { AppDataSource } from '../data-source';
import { ApiKey } from '../entity/api-key';

export const ApiKeyRepository = AppDataSource.getRepository(ApiKey);
