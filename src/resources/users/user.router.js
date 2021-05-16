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
  const { name, login, password } = body;
  const user = await usersService.create(new User({ name, login, password }));
  res.status(201).json(User.toResponse(user));
});

module.exports = router;
