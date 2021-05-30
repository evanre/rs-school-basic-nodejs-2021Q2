import usersRepo from './user.memory.repository.js';

const getAll = () => usersRepo.getAll();

const get = (id) => usersRepo.get(id);

const remove = (id) => usersRepo.remove(id);

const create = (user) => usersRepo.create(user);

const update = (user) => usersRepo.update(user);

export default { getAll, get, remove, create, update };
