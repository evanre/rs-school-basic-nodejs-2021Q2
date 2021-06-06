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
  name: Error['name'];
  stack: Error['stack'];
}

export interface IUnhandled extends IRejection {}

export interface IException extends IRejection {
  origin: string;
}

export interface IRequestResponse extends IError {
  message: string;
  originalUrl: Request['originalUrl'];
  params: Request['params'] | string;
  statusCode: Response['statusCode'];
  body?: Request['body'];
  query?: Request['query'] | string;
}
