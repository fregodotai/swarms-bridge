import { NextFunction, Request, Response } from 'express';
import { ValidateError } from 'tsoa';

export interface ErrorResponse<T> {
  message: string;
  details?: T;
}

export interface IValidationError {
  constraints: any;
}

export interface IServiceError {
  message: string;
  reason: string;
}

export const notFoundHandler = (req: any, res: any) => {
  res.status(404).json({ message: 'Route not found' });
};

export class ValidationError extends Error {
  private _details: IValidationError;

  constructor(error: unknown, details?: any) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    } else {
      message = 'Unknown error';
    }
    super(message);
    if (details) this._details = { constraints: details };
  }

  get details() {
    return this._details;
  }

  set details(details: IValidationError) {
    this._details = details;
  }

  get message() {
    return this.message;
  }

  set message(message: string) {
    this.message = message;
  }
}

export class ServiceError extends Error {
  private _details: IServiceError[];

  constructor(error: unknown, details?: IServiceError[]) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    } else {
      message = 'Unknown error';
    }
    super(`Service error: ${message}`);
    if (details) this._details = details;
  }

  get details() {
    return this._details;
  }

  get message() {
    return this.message;
  }

  set message(message: string) {
    this.message = message;
  }
}

type ErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

export const errorHandler: ErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidateError) {
    res.status(422).json({
      message: err.message || 'Validation error',
      details: err.fields,
    });
  }

  if (err instanceof ValidationError) {
    res.status(422).json({ message: err.message, details: err.details });
  }

  if (err instanceof ServiceError) {
    res.status(500).json({ message: err.message, details: err.details });
  }

  if (err instanceof Error) {
    res.status(500).json({ message: err.message });
  }

  res.status(500).json({ message: 'Something went wrong' });

  next();
};
