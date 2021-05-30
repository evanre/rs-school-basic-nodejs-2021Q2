const db = require('../../common/memoDB');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = async () => db.getAll('users');

const get = async (id) => db.get('users', id);

const remove = async (id) => {
  db.remove('users', id);
  await tasksRepo.resetUserLink(id);
};

const create = async (user) => db.create('users', user);

const update = async (user) => db.update('users', user);

module.exports = { getAll, get, remove, create, update };
