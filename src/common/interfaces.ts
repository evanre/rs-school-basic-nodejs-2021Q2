import { Request, Response } from 'express';

export interface IEntity {
  id: string;
  title: string;
}

export interface IColumn extends IEntity {
  order: number;
}

export interface IBoard extends IEntity {
  columns: IColumn[] | [];
}

export interface ITask extends IEntity {
  order: number;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
  description?: string;
}

export interface IUser extends Omit<IEntity, 'title'> {
  name: string;
  login: string;
  password: string;
}

interface IError {
  level: string;
  message: Error['message'];
}

export interface IRejection extends IError {
  name: string;
  stack: string | undefined;
}

export interface IUnhandled extends IError {
  errorName: Error['name'];
  errorStack: Error['stack'];
}

export interface IException extends IError {
  name: Error['name'];
  stack: Error['stack'];
  origin: string;
}

export interface IRequestResponse extends IError {
  message: string;
  reqUrl: Request['originalUrl'];
  reqParams: Request['params'] | string;
  resStatus: Response['statusCode'];
  reqBody?: Request['body'];
  reqQuery?: Request['query'] | string;
}
