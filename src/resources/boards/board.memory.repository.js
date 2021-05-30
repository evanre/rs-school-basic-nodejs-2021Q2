import db from '../../common/memoDB.js';
import tasksRepo from '../tasks/task.memory.repository.js';

/**
 * Returns the list of created boards
 * @returns {Array<Board>} - List of boards
 */
const getAll = async () => db.getAll('boards');

/**
 * Returns the board information by given id
 * @param {String} id - a board's identifier
 * @returns {Object} - Board's information
 */
const get = async (id) => db.get('boards', id);

/**
 * Removes the board by given id
 * @param {String} id - a board's identifier
 * @returns {void} - Nothing
 */
const remove = async (id) => {
  await db.remove('boards', id);
  await tasksRepo.removeByBoard(id);
};

/**
 * Creates a new board by given information
 * @param {Object} board - information for creation
 * @returns {Object} - Created board's information
 */
const create = async (board) => db.create('boards', board);

/**
 * Updates a board by given information
 * @param {Object} board - information that need to be updated
 * @returns {Object} - Updated board's information
 */
const update = async (board) => db.update('boards', board);

export default { getAll, get, remove, create, update };
