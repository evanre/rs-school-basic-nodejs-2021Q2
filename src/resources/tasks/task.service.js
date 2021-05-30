import tasksRepo from './task.memory.repository.js';

/**
 * Returns the list of created tasks
 * @returns {Array<Task>} - List of tasks
 */
const getAll = () => tasksRepo.getAll();

/**
 * Returns the task information by given id
 * @param {String} id - a task's identifier
 * @returns {Object} - Task's information
 */
const get = (id) => tasksRepo.get(id);

/**
 * Removes the task by given id
 * @param {String} id - a task's identifier
 * @returns {void} - Nothing
 */
const remove = (id) => tasksRepo.remove(id);

/**
 * Creates a new task by given information
 * @param {Object} task - information for creation
 * @returns {Object} - Created task's information
 */
const create = (task) => tasksRepo.create(task);

/**
 * Updates a task by given information
 * @param {Object} task - information that need to be updated
 * @returns {Object} - Updated task's information
 */
const update = (task) => tasksRepo.update(task);

export default { getAll, get, remove, create, update };
