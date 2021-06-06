import tasksRepo from './task.memory.repository';
import { ITask } from '../../common/interfaces';

/**
 * Returns the list of created tasks
 * @returns {Array<Task>} - List of tasks
 */
const getAll = (): ITask[] => tasksRepo.getAll();

/**
 * Returns the task information by given id
 * @param {string} id - a task's identifier
 * @returns {object} - Task's information
 */
const get = (id: string) => tasksRepo.get(id);

/**
 * Removes the task by given id
 * @param {string} id - a task's identifier
 * @returns {void} - Nothing
 */
const remove = (id: string) => tasksRepo.remove(id);

/**
 * Creates a new task by given information
 * @param {object} task - information for creation
 * @returns {object} - Created task's information
 */
const create = (task: ITask) => tasksRepo.create(task);

/**
 * Updates a task by given information
 * @param {object} task - information that need to be updated
 * @returns {object} - Updated task's information
 */
const update = (task: ITask) => tasksRepo.update(task);

export default { getAll, get, remove, create, update };
