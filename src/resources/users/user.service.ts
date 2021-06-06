import usersRepo from './user.memory.repository';
import { IUser } from '../../common/interfaces';

/**
 * Returns the list of registered users
 * @returns {Array<User>} - List of users
 */
const getAll = () => usersRepo.getAll();

/**
 * Returns the user information by given id
 * @param {string} id - a user's identifier
 * @returns {object} - User's information
 */
const get = (id: string) => usersRepo.get(id);

/**
 * Removes the user by given id
 * @param {string} id - a user's identifier
 * @returns {void} - Nothing
 */
const remove = (id: string): Promise<void> => usersRepo.remove(id);

/**
 * Creates a new user by given information
 * @param {object} user - information for creation
 * @returns {object} - Created user's information
 */
const create = (user: IUser) => usersRepo.create(user);

/**
 * Updates a user by given information
 * @param {object} user - information that need to be updated
 * @returns {object} - Updated user's information
 */
const update = (user: IUser) => usersRepo.update(user);

export default { getAll, get, remove, create, update };
