import { usersDB } from '../../common/memoDB';
import tasksRepo from '../tasks/task.memory.repository';
import { IUser } from '../../common/interfaces';

/**
 * Returns the list of registered users
 * @returns {Array<User>} - List of users
 */
const getAll = () => usersDB.getAll();

/**
 * Returns the user information by given id
 * @param {string} id - a user's identifier
 * @returns {object} - User's information
 */
const get = async (id: string) => usersDB.get(id);

/**
 * Removes the user by given id
 * @param {string} id - a user's identifier
 * @returns {void} - Nothing
 */
const remove = async (id: string): Promise<void> => {
  usersDB.remove(id);
  await tasksRepo.resetUserLink(id);
};

/**
 * Creates a new user by given information
 * @param {object} user - information for creation
 * @returns {object} - Created user's information
 */
const create = async (user: IUser) => usersDB.create(user);

/**
 * Updates a user by given information
 * @param {object} user - information that need to be updated
 * @returns {object} - Updated user's information
 */
const update = async (user: IUser) => usersDB.update(user);

export default { getAll, get, remove, create, update };
