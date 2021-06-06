import boardsRepo from './board.memory.repository';
import { IBoard } from '../../common/types';

/**
 * Returns the list of created boards
 * @returns {Array<Board>} - List of boards
 */
const getAll = () => boardsRepo.getAll();

/**
 * Returns the board information by given id
 * @param {string} id - a board's identifier
 * @returns {object} - Board's information
 */
const get = (id: string) => boardsRepo.get(id);

/**
 * Removes the board by given id
 * @param {string} id - a board's identifier
 * @returns {void} - Nothing
 */
const remove = (id: string) => boardsRepo.remove(id);

/**
 * Creates a new board by given information
 * @param {object} board - information for creation
 * @returns {object} - Created board's information
 */
const create = (board: IBoard) => boardsRepo.create(board);

/**
 * Updates a board by given information
 * @param {object} board - information that need to be updated
 * @returns {object} - Updated board's information
 */
const update = (board: IBoard) => boardsRepo.update(board);

export default { getAll, get, remove, create, update };
