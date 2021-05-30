const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const get = (id) => boardsRepo.get(id);

const remove = (id) => boardsRepo.remove(id);

const create = (board) => boardsRepo.create(board);

const update = (board) => boardsRepo.update(board);

module.exports = { getAll, get, remove, create, update };
