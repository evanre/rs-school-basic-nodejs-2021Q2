import usersRepo from './user.memory.repository';
import { IUser } from '../../common/types';

/**
 * Returns the list of registered users
 * @returns {Array<User>} - List of users
 */
const getAll = () => usersRepo.getAll();

/**
 * Returns the user information by given id
 * @param {String} id - a user's identifier
 * @returns {Object} - User's information
 */
const get = (id: string) => usersRepo.get(id);

/**
 * Removes the user by given id
 * @param {String} id - a user's identifier
 * @returns {void} - Nothing
 */
const remove = (id: string): Promise<void> => usersRepo.remove(id);

/**
 * Creates a new user by given information
 * @param {Object} user - information for creation
 * @returns {Object} - Created user's information
 */
const create = (user: IUser) => usersRepo.create(user);

/**
 * Updates a user by given information
 * @param {Object} user - information that need to be updated
 * @returns {Object} - Updated user's information
 */
const update = (user: IUser) => usersRepo.update(user);

export default { getAll, get, remove, create, update };
