import { tasksDB } from '../../common/memoDB';
import { ITask } from '../../common/types';

/**
 * Returns the list of created tasks
 * @returns {Array<Task>} - List of tasks
 */
const getAll = (): ITask[] => tasksDB.getAll();

/**
 * Returns the task information by given id
 * @param {String} id - a task's identifier
 * @returns {Object} - Task's information
 */
const get = async (id: string) => tasksDB.get(id);

/**
 * Removes the task by given id
 * @param {String} id - a task's identifier
 * @returns {void} - Nothing
 */
const remove = async (id: string) => tasksDB.remove(id);

/**
 * Removes all tasks by linked board id that is being deleted
 * @param {String} boardId - a board's identifier
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
 * @param {Object} task - information for creation
 * @returns {Object} - Created task's information
 */
const create = async (task: ITask) => tasksDB.create(task);

/**
 * Updates a task by given information
 * @param {Object} task - information that need to be updated
 * @returns {Object} - Updated task's information
 */
const update = async (task: ITask) => tasksDB.update(task);

/**
 * Removes user's id that is being deleted from linked tasks
 * @param {String} userId - a user's identifier
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
