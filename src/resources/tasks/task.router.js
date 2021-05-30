import { Router } from 'express';
import Task from './task.model.js';
import tasksService from './task.service.js';

const router = Router({ mergeParams: true });

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll();
  res.json(tasks.map(Task.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const task = await tasksService.get(req.params.id);

  if (!task) res.status(404).json('Not found');

  res.json(Task.toResponse(task));
});

router.route('/').post(async ({ body, params }, res) => {
  const { boardId } = params;
  const task = await tasksService.create(
    Task.fromRequest({ ...body, boardId })
  );

  res.status(201).json(Task.toResponse(task));
});

router.route('/:id').delete(async ({ params }, res) => {
  await tasksService.remove(params.id);

  res.json('ok');
});

router.route('/:id').put(async ({ params, body }, res) => {
  const { id } = params;
  const task = Task.fromRequest({ ...body, id });
  await tasksService.update(task);

  res.json(task);
});

export default router;
