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

export interface IRequestResponse {
  level: string;
  reqUrl: Request['originalUrl'];
  reqBody?: Request['body'];
  reqParams: Request['params'] | string;
  reqQuery?: Request['query'] | string;
  resStatus: Response['statusCode'];
  message: string;
}
