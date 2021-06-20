import Repository from '../../common/repository';
import { ITask } from '../../common/interfaces';
import Task from '../../entities/Task';

const tasksRepo = new Repository<ITask>(Task);

/**
 * Returns the list of created tasks
 * @returns {Array<Task>} - List of tasks
 */
const getAll = () => tasksRepo.getAll();

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
 * Creates or Updates a task by given information
 * @param {object} task - information that need to be updated
 * @returns {object} - Updated task's information
 */
const update = (task: ITask) => tasksRepo.update(task);

export default { getAll, get, remove, update };
