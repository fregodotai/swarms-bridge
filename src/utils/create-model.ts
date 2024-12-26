import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ValidationError } from './error-handlers';

type ClassConstructor<T> = {
  new (...args: any[]): T;
};

const validateModel = async (model: object, errorMessage: string) => {
  try {
    await validateOrReject(model);
  } catch (error) {
    throw new ValidationError(errorMessage, error);
  }
};

export const createModel = async <T extends object>(
  constructor: ClassConstructor<T>,
  params: Record<string, any>,
) => {
  const instance = plainToInstance(constructor, params);

  await validateModel(instance, 'Validation error');

  return instance;
};
