const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id);
  // map user fields to exclude secret fields like "password"
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

module.exports = router;