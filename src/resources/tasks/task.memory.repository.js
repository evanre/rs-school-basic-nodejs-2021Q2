const db = require('../../common/memoDB');

const getAll = async () => db.getAll('tasks');

const get = async (id) => db.get('tasks', id);

const remove = async (id) => db.remove('tasks', id);

const removeByBoard = async (boardId) => {
  const tasks = await getAll();
  tasks
    .filter((task) => task.boardId === boardId)
    .forEach((task) => db.remove('tasks', task.id));
};

const create = async (task) => db.create('tasks', task);

const update = async (task) => db.update('tasks', task);

module.exports = { getAll, get, remove, removeByBoard, create, update };
