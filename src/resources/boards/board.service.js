import boardsRepo from './board.memory.repository.js';

const getAll = () => boardsRepo.getAll();

const get = (id) => boardsRepo.get(id);

const remove = (id) => boardsRepo.remove(id);

const create = (board) => boardsRepo.create(board);

const update = (board) => boardsRepo.update(board);

export default { getAll, get, remove, create, update };
