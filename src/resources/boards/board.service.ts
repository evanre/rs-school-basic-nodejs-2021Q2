import { getConnection } from 'typeorm';
import Repository from '../../common/repository';
import Board from '../../entities/Board';
import { IBoard } from '../../common/interfaces';
import Task from '../../entities/Task';

const boardsRepo = new Repository<IBoard>(Board);

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
const remove = async (id: string) => {
  await boardsRepo.remove(id);
  // remove corresponding tasks with the board
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Task)
    .where(`boardId = :id`, { id })
    .execute();
};

/**
 * Creates or Updates a board by given information
 * @param {object} board - information that need to be updated
 * @returns {object} - Updated board's information
 */
const update = (board: IBoard) => boardsRepo.update(board);

export default { getAll, get, remove, update };
