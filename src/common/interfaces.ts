import { Request, Response } from 'express';

export interface IEntity {
  id: string;
}

export interface IColumn extends IEntity {
  title: string;
  order: number;
}

export interface IBoard extends IEntity {
  title: string;
  columns: [];
}

export interface ITask extends IEntity {
  title: string;
  order: number;
  userId: Pick<IUser, 'id'> | null;
  boardId: Pick<IBoard, 'id'> | null;
  columnId: Pick<IColumn, 'id'> | null;
  description?: string;
}

export interface IUser extends IEntity {
  name: string;
  login: string;
  password: string;
}

interface ILog {
  level: string;
  message: Error['message'];
  stack?: Error['stack'];
}

export interface IUnhandledRejection extends ILog {
  name: Error['name'];
}

export interface IUnhandledError extends IUnhandledRejection {}

export interface IUncaughtException extends IUnhandledRejection {
  origin: string;
}

export interface IRequestResponse extends ILog {
  message: string;
  originalUrl: Request['originalUrl'];
  params: Request['params'] | string;
  statusCode: Response['statusCode'];
  body?: Request['body'];
  query?: Request['query'] | string;
}
