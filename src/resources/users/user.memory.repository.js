const db = require('../../common/memoDB');

const getAll = async () => db.getAll('users');

const get = async (id) => db.get('users', id);

const create = async (user) => db.create('users', user);

module.exports = { getAll, get, create };
