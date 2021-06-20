import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Task from './task.model';
import tasksService from './task.service';

const router = Router({ mergeParams: true });
const { OK, CREATED, NOT_FOUND, NO_CONTENT } = StatusCodes;

router
  .route('/')

  .get(async (_: Request, res: Response) => {
    const tasks = await tasksService.getAll();
    res.status(OK).json(tasks.map(Task.toResponse));
  })

  .post(async ({ body, params }: Request, res: Response) => {
    const { boardId } = params;
    const task = await tasksService.update(
      Task.fromRequest({ ...body, boardId }),
    );

    if (task) {
      res.status(CREATED).json(Task.toResponse(task));
    } else {
      res.status(NOT_FOUND).json('Not found');
    }
  });

router
  .route('/:id')

  .get(async ({ params }: Request, res: Response) => {
    const { id = '' } = params;
    const task = await tasksService.get(id);
    if (task) {
      res.status(OK).json(Task.toResponse(task));
    } else {
      res.status(NOT_FOUND).json('Not found');
    }
  })

  .put(async ({ params, body }: Request, res: Response) => {
    const { id } = params;
    const task = Task.fromRequest({ ...body, id });
    await tasksService.update(task);

    res.status(OK).json(task);
  })

  .delete(async ({ params }: Request, res: Response) => {
    const { id = '' } = params;
    await tasksService.remove(id);

    res.status(NO_CONTENT).send({ message: 'DELETED' });
  });

export default router;
