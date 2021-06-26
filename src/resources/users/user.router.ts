import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from './user.model';
import usersService from './user.service';

const router = Router();
const { OK, CREATED, NOT_FOUND, NO_CONTENT } = StatusCodes;

router
  .route('/')

  .get(async (_: Request, res: Response) => {
    const users = await usersService.getAll();
    res.status(OK).json(users.map(User.toResponse));
  })

  .post(async ({ body }: Request, res: Response) => {
    const user = await usersService.update(User.fromRequest(body));

    if (user) {
      res.status(CREATED).json(User.toResponse(user));
    } else {
      res.status(NOT_FOUND).json('Not found');
    }
  });

router
  .route('/:id')

  .get(async ({ params }: Request, res: Response) => {
    const { id = '' } = params;
    const user = await usersService.get(id);
    if (user) {
      res.status(OK).json(User.toResponse(user));
    } else {
      res.status(NOT_FOUND).json('Not found');
    }
  })

  .put(async ({ params, body }: Request, res: Response) => {
    const { id } = params;
    const user = User.fromRequest({ ...body, id });
    await usersService.update(user);

    res.status(OK).json(user);
  })

  .delete(async ({ params }: Request, res: Response) => {
    const { id = '' } = params;
    await usersService.remove(id);

    res.status(NO_CONTENT).send({ message: 'DELETED' });
  });

export default router;
