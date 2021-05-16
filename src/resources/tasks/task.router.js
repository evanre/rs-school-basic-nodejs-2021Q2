const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll();
  // map task fields to exclude secret fields like "password"
  res.json(tasks.map(Task.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const task = await tasksService.get(req.params.id);
  // map task fields to exclude secret fields like "password"
  res.json(Task.toResponse(task));
});

router.route('/').post(async ({ body }, res) => {
  const task = await tasksService.create(Task.fromRequest(body));

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

module.exports = router;
