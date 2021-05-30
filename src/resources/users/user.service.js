const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const get = (id) => usersRepo.get(id);

const remove = (id) => usersRepo.remove(id);

const create = (user) => usersRepo.create(user);

const update = (user) => usersRepo.update(user);

module.exports = { getAll, get, remove, create, update };
