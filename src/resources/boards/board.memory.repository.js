const db = require('../../common/memoDB');

const getAll = async () => db.getAll('boards');

const get = async (id) => db.get('boards', id);

const remove = async (id) => db.remove('boards', id);

const create = async (board) => db.create('boards', board);

const update = async (board) => db.update('boards', board);

module.exports = { getAll, get, remove, create, update };
