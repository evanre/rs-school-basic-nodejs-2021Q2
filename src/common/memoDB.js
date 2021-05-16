const DB = {
  users: [],
};

const getAll = async (entity) => DB[entity];

const get = async (entity, id) => DB[entity].find((el) => el.id === id);

const create = async (entity, user) => {
  DB[entity].push(user);
  return user;
};

module.exports = { getAll, get, create };
