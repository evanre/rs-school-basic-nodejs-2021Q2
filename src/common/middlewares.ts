import { createLogger, transports } from 'winston';
import { IRequestResponse } from './interfaces';

export const logger = (logInfo: IRequestResponse): void => {
  createLogger({
    transports: [new transports.File({ filename: './info.log' })],
  }).log(logInfo);
};
