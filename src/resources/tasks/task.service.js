const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

const get = (id) => tasksRepo.get(id);

const remove = (id) => tasksRepo.remove(id);

const create = (task) => tasksRepo.create(task);

const update = (task) => tasksRepo.update(task);

module.exports = { getAll, get, remove, create, update };
