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
    reqUrl: originalUrl,
    resStatus: statusCode,
    message: 'Request-response log data',
    reqBody: method === 'GET' ? '' : body,
    reqParams: Object.values(params).length === 0 ? '' : params,
    reqQuery: Object.values(query).length === 0 ? '' : query,
  });

  next();
};

export const unhandledError = (
  { name: errorName, stack: errorStack, message }: Error,
  _req: Request,
  res: Response
): void => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorName);
  logger({
    level: 'error',
    errorName,
    errorStack,
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
