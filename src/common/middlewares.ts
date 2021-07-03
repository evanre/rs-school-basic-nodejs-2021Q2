import { Request, Response, NextFunction } from 'express';
import { createLogger, format, transports } from 'winston';
import jwt from 'jsonwebtoken';
import {
  StatusCodes as Codes,
  ReasonPhrases as Reasons,
} from 'http-status-codes';

import CustomError from './CustomError';
import { JWT_SECRET_KEY } from './config';

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
    | IRequestResponse,
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
  next: NextFunction,
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

export const errorHandler = (
  { message, statusCode, stack, name }: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  res.status(statusCode).json(message);
  logger({
    level: 'error',
    message,
    stack,
    name,
  });

  // eslint-disable-next-line no-console
  console.error(stack);
};

export const unhandledRejectionHandler = (
  { message, stack }: Error,
  rejectPromise: Promise<never>,
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

export const uncaughtExceptionHandler = (
  { message, stack }: Error,
  origin: string,
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

export const wrongRouteHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  next(new CustomError('Wrong route', Codes.NOT_FOUND));
};

export const checkAuthHandler = (
  { headers: { authorization = '' } = {} }: Request,
  _res: Response,
  next: NextFunction,
): void => {
  try {
    const [type, token] = authorization?.split(' ');
    if (
      !type ||
      type !== 'Bearer' ||
      !token ||
      !jwt.verify(token, JWT_SECRET_KEY as string)
    ) {
      throw new CustomError(Reasons.UNAUTHORIZED, Codes.UNAUTHORIZED);
    }

    next();
  } catch (error) {
    next(error);
  }
};
