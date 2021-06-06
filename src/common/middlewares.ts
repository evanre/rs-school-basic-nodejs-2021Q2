import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { createLogger, format, transports } from 'winston';
import {
  IRequestResponse,
  IException,
  IRejection,
  IUnhandled,
} from './interfaces';

export const logger = (
  logInfo: IRequestResponse | IException | IRejection | IUnhandled
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

export const requestResponseHandler = (
  { originalUrl, method, body, params, query }: Request,
  { statusCode }: Response,
  next: NextFunction
): void => {
  logger({
    level: 'info',
    message: 'Request-response log info',
    body: method === 'GET' ? '' : body,
    originalUrl,
    statusCode,
    params,
    query,
  });

  next();
};

export const unhandledError = (
  { name, stack, message }: Error,
  _req: Request,
  res: Response
): void => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(name);
  logger({
    level: 'error',
    name,
    stack,
    message,
  });
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
};

export const uncaughtException = (
  { stack, message }: Error,
  origin: string
) => {
  logger({
    level: 'error',
    name: 'uncaughtException',
    origin,
    stack,
    message,
  });

  process.exitCode = 1;
};
