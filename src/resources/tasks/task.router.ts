import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Task from './task.model';
import tasksService from './task.service';

const router = Router({ mergeParams: true });

router.route('/').get(async (_: Request, res: Response) => {
  const tasks = await tasksService.getAll();
  res.status(StatusCodes.OK).json(tasks.map(Task.toResponse));
});

router.route('/:id').get(async ({ params }: Request, res: Response) => {
  const { id = '' } = params;
  const task = await tasksService.get(id);
  if (task) {
    res.status(StatusCodes.OK).json(Task.toResponse(task));
  } else {
    res.status(StatusCodes.NOT_FOUND).json('Not found');
  }
});

router.route('/').post(async ({ body, params }: Request, res: Response) => {
  const { boardId } = params;
  const task = await tasksService.create(
    Task.fromRequest({ ...body, boardId }),
  );

  if (task) {
    res.status(StatusCodes.CREATED).json(Task.toResponse(task));
  } else {
    res.status(StatusCodes.NOT_FOUND).json('Not found');
  }
});

router.route('/:id').delete(async ({ params }: Request, res: Response) => {
  const { id = '' } = params;
  await tasksService.remove(id);

  res.status(StatusCodes.OK).json('ok');
});

router.route('/:id').put(async ({ params, body }: Request, res: Response) => {
  const { id } = params;
  const task = Task.fromRequest({ ...body, id });
  await tasksService.update(task);

  res.status(StatusCodes.OK).json(task);
});

export default router;
