import tasksRepo from './task.memory.repository.js';

const getAll = () => tasksRepo.getAll();

const get = (id) => tasksRepo.get(id);

const remove = (id) => tasksRepo.remove(id);

const create = (task) => tasksRepo.create(task);

const update = (task) => tasksRepo.update(task);

export default { getAll, get, remove, create, update };
