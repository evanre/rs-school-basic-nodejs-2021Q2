import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from './user.model';
import usersService from './user.service';

const router = Router();

router.route('/').get(async (_: Request, res: Response) => {
  const users = await usersService.getAll();
  res.status(StatusCodes.OK).json(users.map(User.toResponse));
});

router.route('/:id').get(async ({ params }: Request, res: Response) => {
  const user = await usersService.get(params['id'] || '');
  if (user) {
    res.status(StatusCodes.OK).json(User.toResponse(user));
  } else {
    res.status(StatusCodes.NOT_FOUND).json('Not found');
  }
});

router.route('/').post(async ({ body }: Request, res: Response) => {
  const user = await usersService.create(User.fromRequest(body));

  if (user) {
    res.status(StatusCodes.CREATED).json(User.toResponse(user));
  } else {
    res.status(StatusCodes.NOT_FOUND).json('Not found');
  }
});

router.route('/:id').delete(async ({ params }: Request, res: Response) => {
  await usersService.remove(params['id'] || '');

  res.status(StatusCodes.OK).json('ok');
});

router.route('/:id').put(async ({ params, body }: Request, res: Response) => {
  const { id } = params;
  const user = User.fromRequest({ ...body, id });
  await usersService.update(user);

  res.status(StatusCodes.OK).json(user);
});

export default router;
