import { getRepository, EntityTarget, DeepPartial } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes as Codes } from 'http-status-codes';
import CustomError from './CustomError';

interface IEntityMethods<T> {
  toResponse: (data: T) => DeepPartial<T>;

  fromRequest: (data: DeepPartial<T>) => DeepPartial<T>;
}

export default class Repo<T extends IEntityMethods<T>> {
  instance: T & EntityTarget<T>;

  constructor(instance: T & EntityTarget<T>) {
    this.instance = instance;
  }

  getAll = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> =>
    getRepository(this.instance)
      .find()
      .then((entities) => {
        if (!entities) throw new CustomError('Bad request', Codes.BAD_REQUEST);
        res.status(Codes.OK).json(entities.map(this.instance.toResponse));
      })
      .catch((error) => next(error));

  get = async (
    { params: { id } = {} }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> =>
    getRepository(this.instance)
      .findOne(id)
      .then((entity) => {
        if (!entity) throw new CustomError('Not found', Codes.NOT_FOUND);
        res.status(Codes.OK).json(this.instance.toResponse(entity));
      })
      .catch((error) => next(error));

  save = async (
    { body, method, params = {} }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> =>
    getRepository(this.instance)
      .save({ ...body, ...params })
      .then((entity) => {
        if (!entity) throw new CustomError('Bad request', Codes.BAD_REQUEST);
        res
          .status(Codes[method === 'PUT' ? 'OK' : 'CREATED'])
          .json(this.instance.toResponse(entity));
      })
      .catch((error) => next(error));

  delete = async (
    { params: { id = '' } = {} }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> =>
    getRepository(this.instance)
      .findOne(id)
      .then((entity) => {
        if (!entity) throw new CustomError('Not found', Codes.NOT_FOUND);
        return getRepository(this.instance).delete(id);
      })
      .then(() => {
        res.status(Codes.NO_CONTENT).send({ message: 'DELETED' });
      })
      .catch((error) => next(error));
}
