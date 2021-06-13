import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { createLogger, format, transports } from 'winston';
import {
  IUnhandledRejection,
  IUnhandledError,
  IUncaughtException,
  IRequestResponse,
} from './interfaces';

const logger = (
  logInfo:
    | IUnhandledRejection
    | IUnhandledError
    | IUncaughtException
    | IRequestResponse
): void => {
  const { combine, timestamp, prettyPrint } = format;
  createLogger({
    format: combine(timestamp(), prettyPrint()),
    transports: [
      // - Write all logs with level `error` and below to `error.log`
      new transports.File({ filename: './logs/error.log', level: 'error' }),
      // - Write all logs with level `info` and below to `info.log`
      new transports.File({ filename: './logs/info.log', level: 'info' }),
    ],
  }).log(logInfo);
};

export const requestResponse = (
  { originalUrl, method, body, params, query }: Request,
  { statusCode }: Response,
  next: NextFunction
): void => {
  logger({
    level: 'info',
    message: 'Request-response',
    body: method === 'GET' ? '' : body,
    originalUrl,
    statusCode,
    params,
    query,
  });

  next();
};

export const unhandledError = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { message, stack, name } = err;
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(name);
  logger({
    level: 'error',
    message,
    stack,
    name,
  });

  // eslint-disable-next-line no-console
  console.error(stack);

  next(err);
};

export const unhandledRejection = (
  { message, stack }: Error,
  rejectPromise: Promise<never>
) => {
  logger({
    level: 'error',
    name: 'unhandledRejection',
    message,
    stack,
  });

  // eslint-disable-next-line no-console
  console.error(rejectPromise);

  process.exitCode = 1;
};

export const uncaughtException = (
  { message, stack }: Error,
  origin: string
) => {
  logger({
    level: 'error',
    name: 'uncaughtException',
    message,
    stack,
    origin,
  });

  // eslint-disable-next-line no-console
  console.error(stack);

  process.exitCode = 1;
};
