import { boardsDB } from '../../common/memoDB';
import tasksRepo from '../tasks/task.memory.repository';
import { IBoard } from '../../common/types';

/**
 * Returns the list of created boards
 * @returns {Array<Board>} - List of boards
 */
const getAll = async () => boardsDB.getAll();

/**
 * Returns the board information by given id
 * @param {String} id - a board's identifier
 * @returns {Object} - Board's information
 */
const get = async (id: string) => boardsDB.get(id);

/**
 * Removes the board by given id
 * @param {String} id - a board's identifier
 * @returns {void} - Nothing
 */
const remove = async (id: string) => {
  await boardsDB.remove(id);
  await tasksRepo.removeByBoard(id);
};

/**
 * Creates a new board by given information
 * @param {Object} board - information for creation
 * @returns {Object} - Created board's information
 */
const create = async (board: IBoard) => boardsDB.create(board);

/**
 * Updates a board by given information
 * @param {Object} board - information that need to be updated
 * @returns {Object} - Updated board's information
 */
const update = async (board: IBoard) => boardsDB.update(board);

export default { getAll, get, remove, create, update };
