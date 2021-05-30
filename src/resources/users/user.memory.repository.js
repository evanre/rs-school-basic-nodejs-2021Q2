import db from '../../common/memoDB.js';
import tasksRepo from '../tasks/task.memory.repository.js';

/**
 * Returns the list of registered users
 * @returns {Array<User>} - List of users
 */
const getAll = async () => db.getAll('users');

/**
 * Returns the user information by given id
 * @param {String} id - a user's identifier
 * @returns {Object} - User's information
 */
const get = async (id) => db.get('users', id);

/**
 * Removes the user by given id
 * @param {String} id - a user's identifier
 * @returns {void} - Nothing
 */
const remove = async (id) => {
  db.remove('users', id);
  await tasksRepo.resetUserLink(id);
};

/**
 * Creates a new user by given information
 * @param {Object} user - information for creation
 * @returns {Object} - Created user's information
 */
const create = async (user) => db.create('users', user);

/**
 * Updates a user by given information
 * @param {Object} user - information that need to be updated
 * @returns {Object} - Updated user's information
 */
const update = async (user) => db.update('users', user);

export default { getAll, get, remove, create, update };
