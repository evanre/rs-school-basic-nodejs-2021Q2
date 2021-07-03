import {
  StatusCodes as Codes,
  ReasonPhrases as Reasons,
} from 'http-status-codes';

export default class CustomError extends Error {
  statusCode: number;

  constructor(
    message = Reasons.INTERNAL_SERVER_ERROR,
    statusCode = Codes.INTERNAL_SERVER_ERROR,
  ) {
    super(message);
    this.statusCode = statusCode;
  }
}
