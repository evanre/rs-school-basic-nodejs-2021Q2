import { tasksDB } from '../../common/memoDB';
import { ITask } from '../../common/interfaces';

/**
 * Returns the list of created tasks
 * @returns {ITask[]} - List of tasks
 */
const getAll = (): ITask[] => tasksDB.getAll();

/**
 * Returns the task information by given id
 * @param {string} id - a task's identifier
 * @returns {object} - Task's information
 */
const get = async (id: string) => tasksDB.get(id);

/**
 * Removes the task by given id
 * @param {string} id - a task's identifier
 * @returns {void} - Nothing
 */
const remove = async (id: string) => tasksDB.remove(id);

/**
 * Removes all tasks by linked board id that is being deleted
 * @param {string} boardId - a board's identifier
 * @returns {void} - Nothing
 */
const removeByBoard = async (boardId: string) => {
  const tasks = await getAll();
  tasks
    .filter((task) => task.boardId === boardId)
    .forEach((task) => tasksDB.remove(task.id));
};

/**
 * Creates a new task by given information
 * @param {object} task - information for creation
 * @returns {object} - Created task's information
 */
const create = async (task: ITask) => tasksDB.create(task);

/**
 * Updates a task by given information
 * @param {object} task - information that need to be updated
 * @returns {object} - Updated task's information
 */
const update = async (task: ITask) => tasksDB.update(task);

/**
 * Removes user's id that is being deleted from linked tasks
 * @param {string} userId - a user's identifier
 * @returns {void} - Nothing
 */
const resetUserLink = async (userId: string) => {
  const tasks = await getAll();

  tasks.forEach((task) => {
    if (userId === task.userId) {
      tasksDB.update({ ...task, userId: null });
    }
  });
};

export default {
  getAll,
  get,
  remove,
  removeByBoard,
  create,
  update,
  resetUserLink,
};
