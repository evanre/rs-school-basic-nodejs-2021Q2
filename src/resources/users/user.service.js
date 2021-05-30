import usersRepo from './user.memory.repository.js';

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
const get = (id) => usersRepo.get(id);

/**
 * Removes the user by given id
 * @param {String} id - a user's identifier
 * @returns {void} - Nothing
 */
const remove = (id) => usersRepo.remove(id);

/**
 * Creates a new user by given information
 * @param {Object} user - information for creation
 * @returns {Object} - Created user's information
 */
const create = (user) => usersRepo.create(user);

/**
 * Updates a user by given information
 * @param {Object} user - information that need to be updated
 * @returns {Object} - Updated user's information
 */
const update = (user) => usersRepo.update(user);

export default { getAll, get, remove, create, update };
