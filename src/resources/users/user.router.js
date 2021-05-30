import { Router } from 'express';
import User from './user.model.js';
import usersService from './user.service.js';

const router = Router();

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id);
  res.json(User.toResponse(user));
});

router.route('/').post(async ({ body }, res) => {
  const user = await usersService.create(User.fromRequest(body));

  res.status(201).json(User.toResponse(user));
});

router.route('/:id').delete(async ({ params }, res) => {
  await usersService.remove(params.id);

  res.json('ok');
});

router.route('/:id').put(async ({ params, body }, res) => {
  const { id } = params;
  const user = User.fromRequest({ ...body, id });
  await usersService.update(user);

  res.json(user);
});

export default router;
