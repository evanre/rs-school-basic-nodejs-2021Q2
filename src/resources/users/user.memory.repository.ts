import { usersDB } from '../../common/memoDB';
import tasksRepo from '../tasks/task.memory.repository';
import { IUser } from '../../common/types';

/**
 * Returns the list of registered users
 * @returns {Array<User>} - List of users
 */
const getAll = () => usersDB.getAll();

/**
 * Returns the user information by given id
 * @param {String} id - a user's identifier
 * @returns {Object} - User's information
 */
const get = async (id: string) => usersDB.get(id);

/**
 * Removes the user by given id
 * @param {String} id - a user's identifier
 * @returns {void} - Nothing
 */
const remove = async (id: string): Promise<void> => {
  usersDB.remove(id);
  await tasksRepo.resetUserLink(id);
};

/**
 * Creates a new user by given information
 * @param {Object} user - information for creation
 * @returns {Object} - Created user's information
 */
const create = async (user: IUser) => usersDB.create(user);

/**
 * Updates a user by given information
 * @param {Object} user - information that need to be updated
 * @returns {Object} - Updated user's information
 */
const update = async (user: IUser) => usersDB.update(user);

export default { getAll, get, remove, create, update };
